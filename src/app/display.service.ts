import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DisplayState } from './display-state';
import { catchError } from 'rxjs/operators';

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
      resources: [
        {
          id: 'id1',
          name: 'Kdow',
          key: 'MUST 1/10-1',
          radio: 'Florian Musterort 1/10-1',
          stationId: '1',
          inService: true
        },
        {
          id: 'id2',
          name: 'TLF 16/25',
          key: 'MUST 1/22-1',
          radio: 'Florian Musterort 1/22-1',
          stationId: '1',
          inService: true
        },
        {
          id: 'id3',
          name: 'HLF 16',
          key: 'MUST 1/44-1',
          radio: 'Florian Musterort 1/44-1',
          stationId: '1',
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
      training: false,
      directions: { 'type': 'FeatureCollection', 'bbox': [8.416763, 49.590767, 8.480847, 49.596978], 'features': [{ 'type': 'Feature', 'properties': { 'summary': [{ 'duration': 652.2, 'distance': 5596.4 }], 'bbox': [8.416763, 49.590767, 8.480847, 49.596978], 'way_points': [0, 120] }, 'geometry': { 'type': 'LineString', 'coordinates': [[8.480847, 49.591657], [8.480568, 49.59247], [8.480477, 49.592669], [8.480335, 49.592977], [8.480277, 49.59303], [8.480176, 49.59297], [8.479977, 49.592925], [8.479003, 49.59284], [8.478888, 49.593412], [8.477935, 49.593184], [8.476284, 49.592783], [8.476166, 49.592753], [8.475245, 49.592529], [8.474395, 49.592322], [8.474265, 49.592289], [8.47409, 49.592245], [8.473901, 49.592205], [8.473594, 49.592139], [8.473441, 49.592127], [8.47327, 49.592125], [8.472885, 49.592172], [8.472694, 49.592221], [8.472648, 49.592231], [8.472035, 49.59239], [8.471636, 49.592495], [8.471397, 49.592555], [8.47113, 49.592627], [8.470901, 49.592682], [8.470421, 49.592798], [8.470093, 49.592897], [8.470055, 49.592909], [8.469294, 49.59315], [8.46906, 49.593253], [8.468332, 49.593573], [8.467824, 49.593796], [8.467638, 49.593955], [8.467395, 49.594158], [8.467298, 49.59422], [8.467141, 49.594302], [8.466962, 49.594384], [8.466764, 49.594473], [8.466209, 49.594717], [8.465858, 49.594853], [8.465421, 49.595015], [8.464281, 49.595348], [8.463817, 49.595466], [8.463369, 49.595602], [8.462889, 49.595719], [8.462791, 49.595722], [8.462654, 49.595708], [8.46261, 49.595608], [8.462116, 49.594825], [8.461911, 49.594476], [8.461599, 49.59392], [8.461557, 49.593849], [8.461496, 49.593745], [8.460909, 49.592737], [8.460688, 49.592468], [8.460436, 49.592216], [8.460295, 49.592107], [8.460214, 49.59205], [8.459858, 49.591808], [8.459823, 49.591788], [8.459648, 49.591806], [8.459494, 49.591826], [8.459341, 49.591906], [8.459297, 49.591941], [8.459233, 49.591992], [8.459063, 49.592069], [8.458833, 49.592122], [8.455492, 49.59236], [8.455393, 49.592366], [8.454979, 49.592392], [8.454308, 49.592435], [8.452747, 49.592535], [8.451034, 49.592688], [8.449358, 49.592946], [8.448088, 49.59314], [8.447655, 49.593169], [8.447297, 49.593182], [8.446817, 49.593136], [8.445866, 49.59295], [8.445306, 49.592824], [8.44226, 49.591949], [8.44185, 49.591833], [8.441705, 49.591789], [8.441571, 49.591752], [8.440756, 49.59152], [8.440355, 49.591406], [8.439339, 49.591119], [8.438814, 49.590983], [8.438009, 49.590842], [8.437001, 49.590767], [8.43605, 49.590821], [8.435274, 49.590967], [8.434596, 49.591172], [8.433158, 49.59175], [8.431312, 49.592557], [8.429972, 49.592974], [8.429057, 49.593134], [8.428361, 49.593187], [8.427718, 49.593201], [8.427049, 49.593154], [8.426445, 49.593077], [8.425753, 49.592949], [8.42457, 49.592702], [8.424145, 49.592654], [8.423792, 49.592667], [8.423353, 49.592728], [8.422873, 49.592876], [8.422493, 49.593088], [8.422147, 49.59342], [8.420755, 49.595135], [8.420474, 49.595426], [8.420104, 49.595708], [8.418844, 49.596575], [8.418469, 49.596782], [8.418031, 49.59692], [8.417628, 49.596978], [8.417187, 49.596977], [8.416763, 49.596922]] }, 'id': 'fid--73e0a3f3_167c1964d2f_-5e88' }] }
    },
    home: {
      latitude: 49.591657,
      longitude: 8.480847
    }
  };

  private idleDisplayState: DisplayState = {
    state: 'IDLE',
    operation: null,
    weather: null,
    home: {
      latitude: 49.591657,
      longitude: 8.480847
    }
  };

  constructor(private http: HttpClient) { }

  getDisplay(): Observable<DisplayState> {
    if (!isDevMode()) {
      return this.http.get<DisplayState>(this.displayUrl).pipe(
        catchError(this.handleError(this.idleDisplayState))
      );
    }
    const millis = new Date().getTime();
    const seconds = Math.floor(millis / 1000);
    if (Math.floor(seconds / 10) % 2 === 0) {
      return of(this.idleDisplayState);
    }
    return of(this.devOperationDisplayState);
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
