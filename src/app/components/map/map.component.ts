import { Component, Input } from '@angular/core';
import * as leaflet from 'leaflet';
import { DirectionsService } from 'src/app/services/directions.service';
import { RoadblocksService } from 'src/app/services/roadblocks.service';
import { Coordinate } from '../../model/Coordinate';
import { Operation } from '../../model/Operation';

const padding: leaflet.PointExpression = [20, 20];
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
const roadblockMarkerIcon: leaflet.Icon = leaflet.icon({
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  iconUrl: 'assets/images/marker-roadblock.png'
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

  constructor(private directionsService: DirectionsService, private roadblocksService: RoadblocksService) {
  }

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

    this.directionsService.getDirections(this._home, this._operation.location.coordinate).subscribe(directions => {
      this.closeMapLayers.push(leaflet.geoJSON(directions));
      this.routeMapLayers.push(leaflet.geoJSON(directions));
    });

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

    this.addRoadblocksToMap(this.closeMap, this.closeMapLayers);
  }

  onRouteMapReady(map: leaflet.Map) {
    this.routeMap = map;
    this.fitRouteMapBounds();

    this.addRoadblocksToMap(this.routeMap, this.routeMapLayers);
  }

  private fitCloseMapBounds() {
    this.closeMap.panTo(this.closeMapOptions.center);
  }

  private fitRouteMapBounds() {
    this.routeMapFeatureGroup = leaflet.featureGroup(this.routeMapLayers);
    this.routeMap.fitBounds(this.routeMapFeatureGroup.getBounds(), {
      padding: padding
    });
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
      zoomControl: false,
      center: leaflet.latLng(0, 0)
    };
  }

  private addRoadblocksToMap(map: L.Map, layers: L.Layer[]) {
    let bounds = map.getBounds();
    let sw = this.coord(bounds.getSouthWest());
    let ne = this.coord(bounds.getNorthEast());
    this.roadblocksService.getRoadblocks(sw, ne).subscribe(roadblocks => {
      roadblocks.forEach(roadblock => {
        layers.push(leaflet.marker(
          leaflet.latLng(roadblock.coordinate.latitude, roadblock.coordinate.longitude), {
            icon: roadblockMarkerIcon
          }
        ));
      });
    });
  }

  private coord(latLng: L.LatLng): Coordinate {
    return {
      latitude: latLng.lat,
      longitude: latLng.lng
    };
  }
}
