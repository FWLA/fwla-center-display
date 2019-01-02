import { Component, Input } from '@angular/core';
import * as leaflet from 'leaflet';
import { Coordinate } from '../coordinate';
import { Operation } from '../operation';

const padding: leaflet.PointExpression = [10, 10];
const redMarkerIcon: leaflet.Icon = leaflet.icon({
  iconSize: [25, 41],
  iconAnchor: [13, 41],
  shadowSize: [41, 41],
  iconUrl: 'assets/images/marker-icon-2x-red.png',
  shadowUrl: 'assets/images/marker-shadow.png'
});
const greenMarkerIcon: leaflet.Icon = leaflet.icon({
  iconSize: [25, 41],
  iconAnchor: [13, 41],
  shadowSize: [41, 41],
  iconUrl: 'assets/images/marker-icon-2x-green.png',
  shadowUrl: 'assets/images/marker-shadow.png'
});
const mapTileLayer = function () {
  return leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'openstreetmap.org'
  });
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  private _operation: Operation;
  private _home: Coordinate;

  closeMap: leaflet.Map;
  closeMapOptions: leaflet.MapOptions;
  closeMapLayers: leaflet.Layer[] = [];
  closeMapFeatureGroup: leaflet.FeatureGroup;

  routeMap: leaflet.Map;
  routeMapOptions: leaflet.MapOptions;
  routeMapLayers: leaflet.Layer[] = [];
  routeMapFeatureGroup: leaflet.FeatureGroup;

  @Input() set home(home: Coordinate) {
    this._home = home;
    this.valueChange();
  }

  @Input() set operation(operation: Operation) {
    this._operation = operation;
    this.valueChange();
  }

  private valueChange() {

    if (this._home == null || this._operation == null) {
      return;
    }


    if (!this.closeMapOptions) {
      this.init();
    }

    const value = this._operation.location.coordinate;

    this.closeMapOptions.center = leaflet.latLng(value.latitude, value.longitude);
    this.routeMapOptions.center = leaflet.latLng(value.latitude, value.longitude);

    this.closeMapLayers = [];
    this.routeMapLayers = [];

    this.closeMapLayers.push(leaflet.marker(
      leaflet.latLng(value.latitude, value.longitude), {
        icon: redMarkerIcon
      }
    ));
    this.routeMapLayers.push(leaflet.marker(
      leaflet.latLng(this._home.latitude, this._home.longitude), {
        icon: greenMarkerIcon
      }
    ));
    this.routeMapLayers.push(leaflet.marker(
      leaflet.latLng(value.latitude, value.longitude), {
        icon: redMarkerIcon
      }
    ));

    this.closeMapLayers.push(leaflet.geoJSON(this._operation.directions, {
      style: this.styleFeature
    }));
    this.routeMapLayers.push(leaflet.geoJSON(this._operation.directions, {
      style: this.styleFeature
    }));

    if (this.closeMap != null) {
      this.fitCloseMapBounds();
    }
    if (this.routeMap != null) {
      this.fitRouteMapBounds();
    }
  }

  onCloseMapReady(map: leaflet.Map) {
    this.closeMap = map;
    this.fitCloseMapBounds();
  }

  onRouteMapReady(map: leaflet.Map) {
    this.routeMap = map;
    this.fitRouteMapBounds();
  }

  private fitCloseMapBounds() {
  }

  private fitRouteMapBounds() {
    this.routeMapFeatureGroup = leaflet.featureGroup(this.routeMapLayers);
    this.routeMap.fitBounds(this.routeMapFeatureGroup.getBounds(), {
      padding: padding
    });
  }

  private styleFeature(): any {
    return {
      fillColor: 'red',
      weight: 5,
      opacity: .6,
      color: 'red',  // Outline color
      fillOpacity: 0.7
    };
  }

  private init() {
    this.closeMapOptions = this.baseMapOptions(17);
    this.routeMapOptions = this.baseMapOptions(16);
  }

  private baseMapOptions(zoom: number): leaflet.MapOptions {
    return {
      layers: [
        mapTileLayer()
      ],
      zoom: zoom,
      center: leaflet.latLng(0, 0)
    };
  }
}
