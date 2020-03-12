import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { DisplayStateChangedHandler } from 'src/app/services/DisplayStateChangedHandler';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, DisplayStateChangedHandler {

  available = false;
  version: string = environment.version;

  constructor(displayService: DisplayService) {
    displayService.registerHandler(this);
  }

  ngOnInit() {
  }

  onSuccess() {
    this.available = true;
  }

  onClientError() {
    this.available = false;
  }

  onBackendError() {
    this.available = false;
  }
}
