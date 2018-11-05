import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MaterialModule } from './material';
import { AppComponent } from './app.component';
import { OperationComponent } from './operation/operation.component';
import { MapComponent } from './map/map.component';
import { IconsComponent } from './icons/icons.component';
import { OperationDetailsComponent } from './operation-details/operation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationComponent,
    MapComponent,
    IconsComponent,
    OperationDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule,
    LeafletModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
