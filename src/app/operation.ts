import { Location } from "./location";

export class Operation {
  id: string;
  time: string;
  place: string;
  object: string;
  location: Location;
  code: string;
  message: string;
  notice: string;
  operationType: string;
  isTraining: boolean;
  closed: boolean;
}
