import { Weather } from './Weather';
import { Operation } from './Operation';
import { Coordinate } from './Coordinate';

export class DisplayState {
  state: string;
  serverVersion: string;
  weather?: Weather;
  operation?: Operation;
  home?: Coordinate;
  text?: string;
}
