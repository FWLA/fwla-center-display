import { Component, OnInit } from '@angular/core';
import { DisplayState } from './model/DisplayState';
import { DisplayService } from './services/display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayState: DisplayState;

  constructor(displayService: DisplayService) {
    displayService.registerHandler({
      onStateChanged: (state) => this.displayState = state
    });
  }

  ngOnInit() {
  }
}
