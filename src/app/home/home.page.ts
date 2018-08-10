import { Component, AfterViewInit } from '@angular/core';
import * as L from "leaflet";
import { Geolocation, Coordinates, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { UserMarker } from '../shared/user-marker/user-marker';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: L.Map;
  watchSubscription: Subscription;
  userMarker: UserMarker;

  constructor(private platform: Platform, private geolocation: Geolocation, private deviceOrientation: DeviceOrientation) {

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

    this.watchSubscription = this.geolocation.watchPosition().subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      if (data.coords) {
        const latLng = L.latLng({ lat: data.coords.latitude, lng: data.coords.longitude });
        if (!this.userMarker) {
          this.userMarker = new UserMarker(this.deviceOrientation, this.map, data);
          this.userMarker.watchHeading();
          this.map.panTo(latLng);
        } else {
          this.userMarker.updatePosition(data);
          //TODO: If follow mode
          this.map.panTo(latLng);
        }
      }
    }, error => {
      //TODO: Handle error
      console.log(error);
    });
  }

  ionViewWillLeave() {
    this.watchSubscription.unsubscribe();
    this.userMarker.stopWatch();
  }
}
