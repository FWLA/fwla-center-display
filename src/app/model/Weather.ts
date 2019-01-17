import { Coordinate } from './Coordinate';
import { Wind } from './Wind';

export class Weather {
  coordinate: Coordinate;
  wind: Wind;
  temperature: number;
  iconCode: string;
  description: string;
}
