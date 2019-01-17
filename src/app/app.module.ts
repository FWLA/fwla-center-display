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


@NgModule({
  declarations: [
    AppComponent,
    OperationComponent,
    MapComponent,
    IconsComponent,
    OperationDetailsComponent,
    RealEstateComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
