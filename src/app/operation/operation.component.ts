import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../operation';
import { Weather } from '../weather';
import { Coordinate } from '../coordinate';

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
