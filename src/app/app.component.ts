import { Component, OnInit, OnDestroy } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { DisplayService } from './display.service';
import { DisplayState } from './display-state';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayState: DisplayState;

  constructor(private displayService: DisplayService) { }

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.displayService.getDisplay())
      )
      .subscribe(res => this.handleRetValue(res));
  }

  private handleRetValue(displayState: DisplayState) {
    // initial
    if (!this.displayState || this.displayState === null) {
      this.newState(displayState);
      return;
    }

    // when state changes
    if (this.displayState.state !== displayState.state) {
      this.newState(displayState);
      return;
    }

    // when operation id changes
    if (this.displayState.operation.id !== displayState.operation.id) {
      this.newState(displayState);
      return;
    }
  }

  private newState(displayState: DisplayState) {
    this.displayState = displayState;
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 17,
    center: latLng(49.590176, 8.487903)
  };
}
