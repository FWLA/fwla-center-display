import { Location } from './Location';
import { OperationKey } from './OperationKey';
import { RealEstate } from './RealEstate';
import { Resource } from './Resource';

export class Operation {
  closed: boolean;
  code: string;
  id: string;
  location: Location;
  message?: string;
  notice?: string;
  object?: string;
  operationKey?: OperationKey;
  place?: string;
  realEstate?: RealEstate;
  realEstateAdditional?: string;
  resourceKeys: string[];
  resources?: Resource[];
  ambulanceCalled: boolean;
  time: string;
  training: boolean;
}
