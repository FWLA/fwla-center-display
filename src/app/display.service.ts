import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DisplayState } from './display-state';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private displayUrl = '/api/v1/display';

  private devOperationDisplayState: DisplayState = {
    state: 'operation',
    weather: {
      wind: {
        speed: 3.6,
        degrees: 50
      },
      coordinate: {
        latitude: 49.58,
        longitude: 8.5
      },
      temperature: 3.07,
      iconCode: '03n',
      description: 'Überwiegend bewölkt'
    },
    operation: {
      id: '1170022993',
      time: '2017-05-24T13:09:39Z',
      place: null,
      object: 'KEGELZENTRUM HEIDE',
      location: {
        street: 'Heide',
        town: 'Lampertheim',
        district: 'Lampertheim',
        coordinate: {
          latitude: 49.58342036,
          longitude: 8.50401432
        }
      },
      code: 'F-2 Y',
      message: 'unklarer Brand',
      notice: 'Gebäude nebendran',
      closed: false,
      resourceKeys: [
        'LAMP 01',
        'LAMP 02',
        'LAMP 1/10-1',
        'LAMP 1/25-1',
        'LAMP 1/44-1',
        'LAMPER 1'
      ],
      operationKey: {
        id: '630104af-da4f-4ca0-917c-e9f817095bcb',
        key: 'F-2 Y',
        code: 'F-2 Y',
        type: 'FIRE',
        dangerToLife: true
      },
      realEstate: {
        id: '659ff264-49e6-4e7c-bf92-acbe9c096d7a',
        name: 'Kegelzentrum Heide',
        key: 'KEGELZENTRUM HEIDE',
        information: 'Gasstation in der Nähe!',
        address: {
          street: null,
          zip: '68623',
          town: 'Lampertheim',
          district: null
        }
      },
      training: false
    }
  };

  private devIdleDisplayState: DisplayState = {
    state: 'IDLE',
    operation: null,
    weather: null
  }

  constructor(private http: HttpClient) { }

  getDisplay(): Observable<DisplayState> {
    if (!isDevMode()) {
      return this.http.get<DisplayState>(this.displayUrl);
    }
    var millis = new Date().getTime();
    var seconds = Math.floor(millis / 1000);
    if (Math.floor(seconds / 10) % 2 == 0) {
      return of(this.devIdleDisplayState);
    }
    return of(this.devOperationDisplayState);
  }
}
