import { Component, Input } from '@angular/core';
import { Operation } from '../operation';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.scss']
})
export class OperationDetailsComponent {
  @Input() operation: Operation;

  getOperationColor(): string {
    if (!!this.operation.operationKey) {
      return this.operation.operationKey.type === 'FIRE' ? 'red' : 'blue';
    }
    return this.operation.code.startsWith('F') ? 'red' : 'blue';
  }
}
