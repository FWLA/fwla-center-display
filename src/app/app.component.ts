import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { DisplayState } from './model/DisplayState';
import { DisplayService } from './services/display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private lastServerVersion: string;
  displayState: DisplayState;

  constructor(private displayService: DisplayService) { }

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.displayService.getDisplay())
      )
      .subscribe(res => this.handleRetValue(res), error => {
        console.log(error);
      });
  }

  private handleRetValue(displayState: DisplayState) {
    // initial
    if (!displayState) {
      return;
    }

    if (!this.displayState || this.displayState === null) {
      this.newState(displayState);
      return;
    }

    if (this.lastServerVersion !== displayState.serverVersion) {
      window.location.reload();
    }

    // when state changes
    if (this.displayState.state !== displayState.state) {
      this.newState(displayState);
      return;
    }

    if (displayState.state === 'OPERATION') {
      // when operation id changes
      if (this.displayState.operation.id !== displayState.operation.id) {
        this.newState(displayState);
        return;
      }
    }

    // when text changes
    if (displayState.state === 'TEXT') {
      if (this.displayState.text !== displayState.text) {
        this.newState(displayState);
        return;
      }
    }
  }

  private newState(displayState: DisplayState) {
    this.displayState = displayState;
    if (this.lastServerVersion === null) {
      this.lastServerVersion = displayState.serverVersion;
    }
  }
}
