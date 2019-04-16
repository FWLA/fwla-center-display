import { Component, OnInit, Input } from '@angular/core';
import { Coordinate } from 'src/app/model/Coordinate';
import { Weather } from 'src/app/model/Weather';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() text: string;
  @Input() home: Coordinate;
  @Input() weather: Weather;
}
