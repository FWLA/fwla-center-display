import { Weather } from './weather';
import { Operation } from './operation';
import { Coordinate } from './coordinate';

export class DisplayState {
  state: string;
  weather: Weather;
  operation: Operation;
  home: Coordinate;
}
