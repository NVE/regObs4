import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { Geoposition } from '@ionic-native/geolocation/ngx';

export class UserMarker {
  userMarker: L.Marker;
  userMarkerIcon: L.DivIcon;
  headingSubscription: Subscription;
  accuracyMarker: L.Circle;
  map: L.Map;
  position: Geoposition;
  watchId: number;

  accuracyCircleStyle = {
    stroke: true,
    color: '#03f',
    weight: 3,
    opacity: 0.5,
    fillOpacity: 0.15,
    fillColor: '#03f',
    clickable: false
  };

  constructor(map: L.Map, position: Geoposition) {
    this.map = map;
    this.position = position;
    this.userMarkerIcon = L.divIcon({
      className: 'leaflet-usermarker',
      iconSize: [18, 18],
      html: '<div class=\'heading\'></div><i class=\'pulse\'></i>'
    });
    const latLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.userMarker = L.marker(latLng, { icon: this.userMarkerIcon });
    this.userMarker.addTo(this.map);

    this.accuracyMarker = L.circle(
      latLng,
      position.coords.accuracy,
      this.accuracyCircleStyle
    );
    this.accuracyMarker.addTo(this.map);

    // NOTE: Leaflet doesn't handle rescaling the CircleMarker while the zoom
    // is triggering repaints. This results in the accuracy circle drifting
    // around the map in strange ways. Until this is resolved, simply hide the
    // circle during the zoom operations.
    //
    // For more info: https://github.com/Leaflet/Leaflet/issues/5321
    this.map.on('doubletapdragstart', () => this.onMapZoomStart());
    this.map.on('doubletapdragend', () => this.onMapZoomEnd());

    this.setAccuracy(latLng, position.coords.accuracy);
  }

  getPosition(): Geoposition {
    return this.position;
  }

  updatePosition(position: Geoposition) {
    this.position = position;
    const latLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.userMarker.setLatLng(latLng);
    this.setAccuracy(latLng, position.coords.accuracy);
    // if (position.coords.heading !== null) {
    //     this.setHeading(position.coords.heading);
    // }
    // NOTE: This is set by compass instead of gps
  }

  setHeading(degrees: number) {
    const element: HTMLElement = this.userMarker.getElement()
      .childNodes[0] as HTMLElement;
    const rotateZ = degrees - 90;
    element.style['-webkit-transform'] =
      'rotate(' + rotateZ + 'deg) translateX(15px)';
    element.style.display = 'block';
  }

  private setAccuracy(latLng: L.LatLngExpression, accuracy: number) {
    this.accuracyMarker.setRadius(accuracy);
    this.accuracyMarker.setLatLng(latLng);
  }

  private onMapZoomStart() {
    this.accuracyMarker.removeFrom(this.map);
  }

  private onMapZoomEnd() {
    this.accuracyMarker.addTo(this.map);
  }
}
