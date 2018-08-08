import { Component, AfterViewInit } from '@angular/core';
import * as L from "leaflet";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: L.Map;

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

  ionViewDidEnter() {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }
}
