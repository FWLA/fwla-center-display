import { Component, Input } from '@angular/core';
import { icon, geoJSON, latLng, Layer, MapOptions, marker, tileLayer, Map, FeatureGroup, featureGroup, PointExpression, Icon } from 'leaflet';
import { Coordinate } from '../coordinate';
import { Operation } from '../operation';

const padding: PointExpression = [10, 10];
const markerIcon: Icon = icon({
  iconSize: [ 25, 41 ],
  iconAnchor: [ 13, 41 ],
  shadowSize: [41, 41],
  iconUrl: 'assets/images/marker-icon-2x-red.png',
  shadowUrl: 'assets/images/marker-shadow.png'
});
const mapTileLayer: Layer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '...'
})

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  closeMap: Map;
  closeMapOptions: MapOptions;
  closeMapLayers: Layer[] = [];
  closeMapFeatureGroup: FeatureGroup;

  routeMap: Map;
  routeMapOptions: MapOptions;
  routeMapLayers: Layer[] = [];
  routeMapFeatureGroup: FeatureGroup;

  @Input() set operation(operation: Operation) {
    if (!this.closeMapOptions) {
      this.init();
    }

    var value = operation.location.coordinate;

    this.closeMapOptions.center = latLng(value.latitude, value.longitude);
    this.routeMapOptions.center = latLng(value.latitude, value.longitude);

    this.closeMapLayers = [];
    this.routeMapLayers = [];

    this.closeMapLayers.push(marker(
      latLng(value.latitude, value.longitude), {
        icon: markerIcon
      }
    ));
    this.routeMapLayers.push(marker(
      latLng(value.latitude, value.longitude), {
        icon: markerIcon
      }
    ));

    this.routeMapLayers.push(geoJSON(operation.directions, {
      style: this.styleFeature
    }));

    if (this.closeMap != null) {
      this.fitCloseMapBounds();
    }
    if (this.routeMap != null) {
      this.fitRouteMapBounds();
    }
  }

  onCloseMapReady(map: Map) {
    this.closeMap = map;
    this.fitCloseMapBounds();
  }

  onRouteMapReady(map: Map) {
    this.routeMap = map;
    this.fitRouteMapBounds();
  }

  private fitCloseMapBounds() {
  }

  private fitRouteMapBounds() {
    this.routeMapFeatureGroup = featureGroup(this.routeMapLayers);
    this.routeMap.fitBounds(this.routeMapFeatureGroup.getBounds(), {
      padding: padding
    });
  }

  private styleFeature(): any {
    return {
      fillColor: 'red',
      weight: 5,
      opacity: .6,
      color: 'red',  //Outline color
      fillOpacity: 0.7
    }
  }

  private init() {
    this.closeMapOptions = this.baseMapOptions(18);
    this.routeMapOptions = this.baseMapOptions(16);
  }

  private baseMapOptions(zoom: number): MapOptions {
    return {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: zoom,
          attribution: '...'
        })
      ],
      zoom: 15,
      center: latLng(0, 0)
    };
  }
}
