import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
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
  private handlers: DisplayStateChangedHandler[] = [];

  constructor(private http: HttpClient) {

    let path = window.location.pathname;
    let pathSegments = path.split('/');
    let stationId = pathSegments.slice(-1).pop();

    interval(5000).pipe(
      startWith(0),
      switchMap(() => {
        this.requestDisplayState(stationId);
        return of('null');
      })
    ).subscribe();

    // interval(5000).subscribe(() => this.requestDisplayState(stationId));
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

  private requestDisplayState(stationId: string) {
    console.log(`Requesting state for ${stationId}`);
    var observable : Observable<HttpResponse<DisplayState>>;
    if (!isDevMode() || isProxy()) {
      observable = this.http.get<DisplayState>(this.displayUrl + '/' + stationId, {
        observe: 'response'
      });
    } else {
      observable = roundRobin();
    }

    this.handleObservable(observable);
  }

  private handleObservable(observable: Observable<HttpResponse<DisplayState>>) {
    console.debug('Handling observable.');
    observable.subscribe(httpResponse => {
      console.debug('Received http response', httpResponse);
      this.handleHttpResponse(httpResponse);
    }, error => {
      console.error('Received error.', error);
      this.handleError(error);
    });
  }

  private handleHttpResponse(httpResponse: HttpResponse<DisplayState>) {
    if (httpResponse.status !== 200) {
      console.error('Http Status code is not 200.', httpResponse);
      this.handleError({
        status: httpResponse.status,
        error: httpResponse.body
      });
    }

    console.debug('Received 200 http response.');
    this.handleDisplayState(httpResponse.body);
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      this.handlers.forEach(h => {
        if (h.onClientError) {
          h.onClientError(error.error);
        }
      });
      return;
    }
    if (error.status) {
      this.handlers.forEach(h => {
        if (h.onBackendError) {
          h.onBackendError(error.status, error.error);
        }
      });
      return;
    }

    // back off
    this.handlers.forEach(h => {
      if (h.onClientError) {
        h.onClientError(error);
      }
    });
  }

  private handleDisplayState(displayState: DisplayState) {
    this.handlers.forEach(h => {
      if (h.onSuccess) {
        h.onSuccess(displayState);
      }
    });

    // initial display state after reload / new load
    if (!this.displayState || this.displayState === null) {
      this.newState(displayState);
      return;
    }

    // check for changed server version to force window reload
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
    this.lastServerVersion = displayState.serverVersion;
    this.handlers.forEach(h => {
      if (h.onStateChanged) {
        h.onStateChanged(displayState);
      }
    });
  }
}
