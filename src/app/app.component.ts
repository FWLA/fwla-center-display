import { Component, OnInit } from '@angular/core';
import { DisplayState } from './model/DisplayState';
import { DisplayService } from './services/display.service';
import { Observable, interval, of } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayState: DisplayState;
  clock: Observable<Date>;

  constructor(displayService: DisplayService) {
    displayService.registerHandler({
      onStateChanged: (state) => this.displayState = state
    });
  }

  ngOnInit() {
    this.clock = interval(1000).pipe(
      startWith(0),
      map(() => {
        return new Date();
      })
    );
  }
}
