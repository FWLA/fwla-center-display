import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DisplayState } from '../model/DisplayState';
import { isProxy } from '../util/IsProxy';
import { DisplayStateChangedHandler } from './DisplayStateChangedHandler';
import { roundRobin } from './sample-display-states';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private displayUrl = '/api/v1/display';
  private displayState: DisplayState;
  private lastServerVersion: string;
  private lastResponse: HttpResponse<DisplayState>;
  private handlers: DisplayStateChangedHandler[] = [];

  constructor(private http: HttpClient) {

    let path = window.location.pathname;
    let pathSegments = path.split('/');
    let stationId = pathSegments.slice(-1).pop();

    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.getDisplay(stationId))
      )
      .subscribe(res => this.handleRetValue(res), error => {
        console.log(error);
      });
  }

  registerHandler(handler: DisplayStateChangedHandler) {
    this.handlers.push(handler);
  }

  unregisterHandler(handler: DisplayStateChangedHandler) {
    const index = this.handlers.indexOf(handler, 0);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }

  private getDisplay(stationId: string): Observable<HttpResponse<DisplayState>> {
    if (!isDevMode() || isProxy()) {
      return this.http.get<DisplayState>(this.displayUrl + '/' + stationId, {
        observe: 'response',
      }).pipe(
        catchError(this.handleError())
      ).pipe(map(o => {
        return <HttpResponse<DisplayState>>o;
      }));
    }

    return roundRobin();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError() {
    return (error: any): Observable<HttpResponse<DisplayState>> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.handlers.forEach(h => {
        if (h.onBackendError) {
          h.onBackendError('Unknown error occured. ' + error);
        }
      });

      // Let the app keep running by returning last valid result.
      return of(this.lastResponse);
    };
  }

  private handleRetValue(response: HttpResponse<DisplayState>) {
    // initial
    if (!response) {
      return;
    }

    if (200 !== response.status) {
      this.handlers.forEach(h => {
        if (h.onBackendError) {
          h.onBackendError('Bad http status code.');
        }
      });
      return;
    }

    this.lastResponse = response;
    var displayState = response.body;

    if (!this.displayState || this.displayState === null) {
      this.newState(displayState);
      return;
    }

    if (this.lastServerVersion !== displayState.serverVersion) {
      window.location.reload();
    }

    // when state changes
    if (this.displayState.state !== displayState.state) {
      this.newState(displayState);
      return;
    }

    if (displayState.state === 'OPERATION') {
      // when operation id changes
      if (this.displayState.operation.id !== displayState.operation.id) {
        this.newState(displayState);
        return;
      }
    }

    // when text changes
    if (displayState.state === 'TEXT') {
      if (this.displayState.text !== displayState.text) {
        this.newState(displayState);
        return;
      }
    }
  }

  private newState(displayState: DisplayState) {
    this.displayState = displayState;
    if (this.lastServerVersion === null) {
      this.lastServerVersion = displayState.serverVersion;
    }
    this.handlers.forEach(h => h.onStateChanged(displayState));
  }
}
