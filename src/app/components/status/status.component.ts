import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { DisplayStateChangedHandler } from 'src/app/services/DisplayStateChangedHandler';
import { DisplayState } from 'src/app/model/DisplayState';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, DisplayStateChangedHandler {

  available = false;

  constructor(displayService: DisplayService) {
    displayService.registerHandler(this);
  }

  ngOnInit() {
  }

  onState(_displayState: DisplayState) {
    this.available = true;
  }

  onStateChanged(_displayState: DisplayState) {
    this.available = true;
  }

  onBackendError(_error: string) {
    this.available = false;
  }
}
