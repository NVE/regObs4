import { Component, AfterViewInit } from '@angular/core';
import * as L from "leaflet";
import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: L.Map;
  watch: Observable<Geoposition>;
  watchSubscription: Subscription;
  userMarker: L.Marker;
  userMarkerIcon: L.DivIcon;

  constructor(private platform: Platform, private geolocation: Geolocation) {

  }

  options: L.MapOptions = {
    layers: [
      L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=matrikkel_bakgrunn&zoom={z}&x={x}&y={y}&format=image/jpeg')
    ],
    zoom: 13,
    center: L.latLng(59.911197, 10.741059),
    attributionControl: false,
    zoomControl: false,
  };

  onMapReady(map: L.Map) {
    this.map = map;
  }

  async ionViewDidEnter() {

    await this.platform.ready();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    this.watch = this.geolocation.watchPosition();
    this.watchSubscription = this.watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data);
      if (!this.userMarker) {
        this.createUserMarker(data);
      } else {
        this.updateUserMarkerPosition(data);
      }
    });
  }

  ionViewWillLeave() {
    this.watchSubscription.unsubscribe();
  }

  createUserMarker(pos: Geoposition) {
    this.userMarkerIcon = L.divIcon({
      className: "leaflet-usermarker",
      iconSize: [18, 18],
      html: "<div class='heading'></div><i class='pulse'></i>"
    });
    const latLng = L.latLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    this.userMarker = L.marker(
      latLng,
      { icon: this.userMarkerIcon }
    );
    this.userMarker.addTo(this.map);
    this.map.panTo(latLng);
  }

  updateUserMarkerPosition(pos: Geoposition) {
    this.userMarker.setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  }
}
