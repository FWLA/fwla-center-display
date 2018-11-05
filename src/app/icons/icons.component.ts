import { Component, Input } from '@angular/core';
import { Operation } from '../operation';
import { DisplayState } from '../display-state';
import { Weather } from '../weather';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent {

  @Input() operation: Operation;
  @Input() weather: Weather;

  isDangerToLife(): boolean {
    if (!this.operation || !this.operation.code) {
      return false;
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
