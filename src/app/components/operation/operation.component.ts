import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../../model/Operation';
import { Weather } from '../../model/Weather';
import { Coordinate } from '../../model/Coordinate';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {

  @Input() operation: Operation;
  @Input() home: Coordinate;
  @Input() weather: Weather;
}
