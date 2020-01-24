import { Location } from './Location';
import { OperationKey } from './OperationKey';
import { RealEstate } from './RealEstate';

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
  stations?: string[];
  ambulanceCalled: boolean;
  time: string;
  training: boolean;
}
