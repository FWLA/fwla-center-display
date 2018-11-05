import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../operation';
import { Weather } from '../weather';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {

  @Input() operation: Operation;
  @Input() weather: Weather;
}
