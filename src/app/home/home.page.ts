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
    });
  }

  ionViewWillLeave() {
    this.watchSubscription.unsubscribe();
  }
}
