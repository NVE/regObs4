import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
  followMode = true;

  constructor(private platform: Platform, private geolocation: Geolocation, private deviceOrientation: DeviceOrientation) {

  }

  options: L.MapOptions = {
    layers: [
      // tslint:disable-next-line:max-line-length
      L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=matrikkel_bakgrunn&zoom={z}&x={x}&y={y}&format=image/jpeg')
    ],
    zoom: 13,
    center: L.latLng(59.911197, 10.741059),
    attributionControl: false,
    zoomControl: false,
  };

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.on('moveend', this.onMapMoved);
    this.map.on('dragstart', this.disableFollowMode);
  }

  centerMapToUser() {
    this.followMode = true;
    if (this.userMarker) {
      const currentPosition = this.userMarker.getPosition();
      this.map.panTo(L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
    }
  }

  private onMapMoved() {
    console.log('map moved');
  }

  private disableFollowMode() {
    this.followMode = false;
  }

  async ionViewDidEnter() {

    await this.platform.ready();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    this.watchSubscription = this.geolocation.watchPosition()
      .subscribe(
        (data) => this.onPositionUpdate(data),
        (error) => this.onPositionError(error)
      );
  }

  private onPositionUpdate(data: Geoposition) {
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
        if (this.followMode) {
          this.map.panTo(latLng);
        }
      }
    }
  }

  private onPositionError(error: any) {
    // TODO: Handle error
    console.log(error);
  }

  ionViewWillLeave() {
    this.watchSubscription.unsubscribe();
    this.userMarker.stopWatch();
  }
}
