import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinate } from '../model/Coordinate';
import { isProxy } from '../util/IsProxy';
import { devDirections } from './sample-directions';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  private directionsUrl = '/api/v1/services/geo/directions';

  constructor(private http: HttpClient) {
  }

  public getDirections(from: Coordinate, to: Coordinate): Observable<any> {
    if (!isDevMode() || isProxy()) {
      return this.http.post<any>(this.directionsUrl, {
        from: from,
        to: to
      });
    }
    return devDirections;
  }
}
