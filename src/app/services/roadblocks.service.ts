import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinate } from '../model/Coordinate';
import { Roadblock } from '../model/Roadblock';
import { isProxy } from '../util/IsProxy';
import { devRoadblocks } from './sample-roadblocks';

@Injectable({
  providedIn: 'root'
})
export class RoadblocksService {

  private roadblocksUrl = '/api/v1/services/roadblocks';

  constructor(private http: HttpClient) {
  }

  public getRoadblocks(sw: Coordinate, ne: Coordinate): Observable<Roadblock[]> {
    if (!isDevMode() || isProxy()) {
      return this.http.post<Roadblock[]>(this.roadblocksUrl, {
        sw: sw,
        ne: ne
      });
    }
    return devRoadblocks;
  }
}
