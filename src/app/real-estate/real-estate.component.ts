import { Component, Input } from '@angular/core';
import { Operation } from '../operation';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})
export class RealEstateComponent {
  @Input() operation: Operation;
}
