import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../../model/Operation';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  @Input() operation: Operation;

  constructor() { }

  ngOnInit() {
  }

}
