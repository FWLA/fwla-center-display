import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../../model/Operation';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  @Input() operation: Operation;

  constructor() { }

  ngOnInit() {
  }

}
