import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DisplayState } from '../model/DisplayState';
import { catchError } from 'rxjs/operators';
import { idleDisplayState, devOperationDisplayState } from './sample-display-states';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private displayUrl = '/api/v1/display';

  constructor(private http: HttpClient) { }

  getDisplay(): Observable<DisplayState> {
    if (!isDevMode()) {
      return this.http.get<DisplayState>(this.displayUrl).pipe(
        catchError(this.handleError(idleDisplayState))
      );
    }
    const millis = new Date().getTime();
    const seconds = Math.floor(millis / 1000);
    if (Math.floor(seconds / 10) % 2 === 0) {
      return of(idleDisplayState);
    }
    return of(devOperationDisplayState);
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
