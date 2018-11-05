import { Component, Input } from '@angular/core';
import { Operation } from '../operation';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.scss']
})
export class OperationDetailsComponent {
  @Input() operation: Operation;
}
