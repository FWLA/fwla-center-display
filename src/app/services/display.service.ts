import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DisplayState } from '../model/DisplayState';
import { isProxy } from '../util/IsProxy';
import { idleDisplayState, roundRobin } from './sample-display-states';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private displayUrl = '/api/v1/display';

  constructor(private http: HttpClient) { }

  getDisplay(): Observable<DisplayState> {
    if (!isDevMode() || isProxy()) {
      return this.http.get<DisplayState>(this.displayUrl, {
        observe: 'response',
      }).pipe(
        catchError(this.handleError(idleDisplayState))
      ).pipe(map(response => {
        if ((<HttpResponse<DisplayState>>response).status === 200) {
          return (<HttpResponse<DisplayState>>response).body;
        }
        return idleDisplayState;
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
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
