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
    state: 'OPERATION',
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
      object: 'DA DRUEBEN',
      location: {
        street: 'Heide',
        town: 'Musterstadt',
        district: 'Musterstadt',
        coordinate: {
          latitude: 49.1234546,
          longitude: 8.123513456
        }
      },
      code: 'F-2 Y',
      message: 'unklarer Brand',
      notice: 'Gebäude nebendran',
      closed: false,
      resourceKeys: [
        'MUST 01',
        'MUST 02',
        'MUST 1/10-1',
        'MUST 1/25-1',
        'MUST 1/44-1',
        'MUSTER 1'
      ],
      resources: [
        {
          id: "id1",
          name: "Kdow",
          key: "MUST 1/10-1",
          radio: "Florian Musterort 1/10-1",
          stationId: "1",
          inService: true
        },
        {
          id: "id2",
          name: "TLF 16/25",
          key: "MUST 1/22-1",
          radio: "Florian Musterort 1/22-1",
          stationId: "1",
          inService: true
        },
        {
          id: "id3",
          name: "HLF 16",
          key: "MUST 1/44-1",
          radio: "Florian Musterort 1/44-1",
          stationId: "1",
          inService: false
        }
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
        name: 'DaDrüben',
        key: 'DA DRUEBEN',
        information: 'Gasstation in der Nähe!',
        address: {
          street: null,
          zip: '12345',
          town: 'Musterstadt',
          district: null
        }
      },
      ambulanceCalled: true,
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
