import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapComponent } from './components/map/map.component';
import { OperationDetailsComponent } from './components/operation-details/operation-details.component';
import { OperationComponent } from './components/operation/operation.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { TextComponent } from './components/text/text.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    OperationComponent,
    MapComponent,
    IconsComponent,
    OperationDetailsComponent,
    RealEstateComponent,
    ResourcesComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
  ],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
