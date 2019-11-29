import { Observable, of } from 'rxjs';
import { Roadblock } from '../model/Roadblock';

export const devRoadblocks: Observable<Roadblock[]> = of([
  {
    id: 'id1',
    coordinate: {
      latitude: 49.59247,
      longitude: 8.480568
    }
  },
  {
    id: 'id2',
    coordinate: {
      latitude: 49.595719,
      longitude: 8.462889
    }
  }
]);
