import { Location } from './location';
import { OperationKey } from './operation-key';
import { RealEstate } from './real-estate';
import { Resource } from './resource';

export class Operation {
  closed: boolean;
  code: string;
  id: string;
  location: Location;
  message: string;
  notice: string;
  object: string;
  operationKey: OperationKey;
  place: string;
  realEstate: RealEstate;
  resourceKeys: string[];
  resources: Resource[];
  ambulanceCalled: boolean;
  time: string;
  training: boolean;
}
