import { Component, Input } from '@angular/core';
import { Operation } from '../../model/Operation';
import { Weather } from '../../model/Weather';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent {

  @Input() operation: Operation;
  @Input() weather: Weather;

  isDangerToLife(): boolean {
    if (!this.operation) {
      return false;
    }
    if (!!this.operation.operationKey) {
      return this.operation.operationKey.dangerToLife;
    }
    return this.operation.code.toLowerCase().indexOf('y') !== -1;
  }

  isFrost(): boolean {
    if (!this.weather) {
      return false;
    }
    return this.weather.temperature < 3;
  }
}
