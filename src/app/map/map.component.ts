import { Component, Input, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Layer, marker, icon } from 'leaflet';
import { Coordinate } from '../coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  mapOptions: MapOptions;
  markers: Layer[] = [];

  @Input() set coordinate(value: Coordinate) {
    if (!this.mapOptions) {
      this.init();
    }
    this.mapOptions.center = latLng(value.latitude, value.longitude);

    this.markers = [];
    this.markers.push(marker(
      latLng(value.latitude, value.longitude), {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }
    ));
  }

  @Input() set zoom(value: number) {
    if (!this.mapOptions) {
      this.init();
    }
    this.mapOptions.zoom = value;
  }

  private init() {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...'
        })
      ],
      zoom: 0,
      center: latLng(0, 0)
    };
  }
}
