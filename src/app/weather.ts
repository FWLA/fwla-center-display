import { Coordinate } from './coordinate';
import { Wind } from './wind';

export class Weather {
  coordinate: Coordinate;
  wind: Wind;
  temperature: number;
  iconCode: string;
  description: string;
}
