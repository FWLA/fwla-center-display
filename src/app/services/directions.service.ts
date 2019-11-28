import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinate } from '../model/Coordinate';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  private directionsUrl = '/api/v1/services/geo/directions';

  constructor(private http: HttpClient) {
  }

  public getDirections(from, to: Coordinate): Observable<any> {
    return this.http.post<any>(this.directionsUrl, {
      from: from,
      to: to
    });
  }
}
