import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DisplayState } from './display-state';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private displayUrl = '/api/v1/display';

  private devDisplayState: DisplayState = {
    state: 'operation',
    operation: {
      id: "1",
      time: "",
      place: "Bahndamm",
      object: null,
      location: {
        street: "Florianstraße 4",
        town: "Lampertheim",
        district: "Hofheim",
        coordinate: {
          latitude: 49.590176,
          longitude: 8.487903
        }
      },
      code: "FY-2",
      message: "Feuer klein",
      notice: "Bahnmanager unterwegs",
      operationType: "F",
      isTraining: false,
      closed: false
    },
    weather: {
      temperature: 1,
      coordinate: {
        latitude: 49.590176,
        longitude: 8.487903
      },
      description: "Windy",
      iconCode: "1n",
      wind: {
        speed: 5,
        degrees: 120
      }
    },
  };

  constructor(private http: HttpClient) { }

  getDisplay(): Observable<DisplayState> {
    if (!isDevMode()) {
      return this.http.get<DisplayState>(this.displayUrl);
    }
    return of(this.devDisplayState);
  }
}
