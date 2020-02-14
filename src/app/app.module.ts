import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapComponent } from './components/map/map.component';
import { OperationDetailsComponent } from './components/operation-details/operation-details.component';
import { OperationComponent } from './components/operation/operation.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { StationsComponent } from './components/stations/stations.component';
import { StatusComponent } from './components/status/status.component';
import { TextComponent } from './components/text/text.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    OperationComponent,
    MapComponent,
    IconsComponent,
    OperationDetailsComponent,
    RealEstateComponent,
    StationsComponent,
    TextComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-DE" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
