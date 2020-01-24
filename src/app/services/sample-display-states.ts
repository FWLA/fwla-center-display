import { Observable, of } from 'rxjs';
import { DisplayState } from '../model/DisplayState';
import { HttpResponse } from '@angular/common/http';

export const roundRobin = (): Observable<HttpResponse<DisplayState>> => {
  const millis = new Date().getTime();
  const seconds = Math.floor(millis / 1000);
  const mod = Math.floor(seconds / 10) % 3;
  var displayState: DisplayState;
  if (mod === 0) {
    displayState = idleDisplayState;
  } else if (mod === 1) {
    displayState = textDisplayState;
  } else {
    displayState = devOperationDisplayState;
  }
  var response = new HttpResponse({
    body: displayState,
    status: 200
  });

  return of(response);
};

export const devOperationDisplayState: DisplayState = {
  state: 'OPERATION',
  serverVersion: '0.0.1',
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
      address: {
        street: 'Heide',
        town: 'Musterstadt',
        district: 'Musterstadt'
      },
      coordinate: {
        latitude: 49.59635236,
        longitude: 8.41496478
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
    stations: [
      "Feuerwehr Hofheim",
      "Feuerwehr Hüttenfeld"
    ],
    operationKey: {
      id: '630104af-da4f-4ca0-917c-e9f817095bcb',
      key: 'F-2 Y',
      code: 'F-2 Y',
      type: 'FIRE',
      dangerToLife: true
    },
    realEstate: null,
    realEstateAdditional: null,
    ambulanceCalled: true,
    training: false,
  },
  home: {
    latitude: 49.591657,
    longitude: 8.480847
  }
};

export const idleDisplayState: DisplayState = {
  state: 'IDLE',
  serverVersion: '0.0.1',
  home: {
    latitude: 49.591657,
    longitude: 8.480847
  }
};

export const textDisplayState: DisplayState = {
  state: 'TEXT',
  serverVersion: '0.0.1',
  home: {
    latitude: 49.591657,
    longitude: 8.480847
  },
  text: `
  <h1>Welcome</h1>
  <p>to this meeting!</p>
  `
};
