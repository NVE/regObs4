import { Component, OnInit, Input, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObsLocationDto } from '../../../regobs-api/models';
import * as L from 'leaflet';
import { TranslateService } from '@ngx-translate/core';
import { SetLocationInMapComponent } from '../../components/set-location-in-map/set-location-in-map.component';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-set-avalanche-position',
  templateUrl: './set-avalanche-position.page.html',
  styleUrls: ['./set-avalanche-position.page.scss'],
})
export class SetAvalanchePositionPage implements OnInit {
  @Input() startLatLng?: L.LatLng;
  @Input() endLatLng?: L.LatLng;
  @Input() relativeToLatLng?: L.LatLng;
  @Input() geoHazard: GeoHazard;
  @Input() showPolyline = true;

  start: L.LatLng;
  end: L.LatLng;
  private map: L.Map;
  private pathLine: L.Polyline;

  fromMarker: L.Marker;
  locationMarker: L.Marker;
  confirmLocationText = '';
  locationText = '';
  startImageUrl = '/assets/icon/map/GPS_start.svg';
  private startIcon = L.icon({
    iconUrl: this.startImageUrl,
    iconSize: [27, 42],
    iconAnchor: [13.5, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  endImageUrl = '/assets/icon/map/GPS_stop.svg';
  private endIcon = L.icon({
    iconUrl: this.endImageUrl,
    iconSize: [27, 42],
    iconAnchor: [13.5, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  locationMarkerIcon = L.icon({
    iconUrl: '/assets/icon/map/obs-location.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  private startMarker: L.Marker;
  private endMarker: L.Marker;
  private translations;
  private startIsActive = true;
  locationMarkerIconUrl = this.startImageUrl;

  @ViewChild(SetLocationInMapComponent) setLocationInMapComponent: SetLocationInMapComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private ngZone: NgZone,
    private modalController: ModalController) { }

  async ngOnInit() {
    this.translations = await this.translateService.get([
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION',
      'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION',
      'DIALOGS.CONFIRM'
    ]).toPromise();
    const fallbackLatlng = L.latLng(59.1, 10.3);
    if (this.startLatLng) {
      this.start = L.latLng(this.startLatLng.lat, this.startLatLng.lng);
    }
    if (this.endLatLng) {
      this.end = L.latLng(this.endLatLng.lat, this.endLatLng.lng);
    }
    this.locationMarker = L.marker(this.relativeToLatLng || fallbackLatlng, {
      icon: this.startIcon
    });
    this.startMarker = L.marker(this.locationMarker.getLatLng(), { icon: this.startIcon })
      .on('click', () => {
        this.map.panTo(this.startMarker.getLatLng());
        this.startIsActive = true;
        this.updateMarkers();
      });
    this.endMarker = L.marker(this.locationMarker.getLatLng(), { icon: this.endIcon })
      .on('click', () => {
        this.map.panTo(this.endMarker.getLatLng());
        this.startIsActive = false;
        this.updateMarkers();
      });
    if (this.relativeToLatLng) {
      this.fromMarker = L.marker(this.relativeToLatLng, { icon: this.locationMarkerIcon });
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.updateMarkers();
  }

  private setStartLocationText() {
    this.confirmLocationText =
      `${this.translations['DIALOGS.CONFIRM']} ${this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'].toLowerCase()}`;
    this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'];
    this.locationMarkerIconUrl = this.startImageUrl;
  }

  private setEndLocationText() {
    this.confirmLocationText =
      `${this.translations['DIALOGS.CONFIRM']} ${this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'].toLowerCase()}`;
    this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'];
    this.locationMarkerIconUrl = this.endImageUrl;
  }

  private updateMarkers() {
    this.startMarker.remove();
    this.endMarker.remove();
    if (!this.start) {
      this.locationMarker.setIcon(this.startIcon);
      this.setStartLocationText();
    } else {
      if (!this.startIsActive) {
        this.locationMarker.setIcon(this.endIcon);
        this.locationMarker.setLatLng(this.end || this.start);
        this.setEndLocationText();
        this.startMarker.setLatLng(this.start);
        this.startMarker.addTo(this.map);
      } else {
        this.locationMarker.setIcon(this.startIcon);
        this.locationMarker.setLatLng(this.start);
        this.setStartLocationText();
        if (this.end) {
          this.endMarker.setLatLng(this.end);
          this.endMarker.addTo(this.map);
        }
      }

      this.ngZone.runOutsideAngular(() => {
        this.map.on('drag', () => this.updatePolyline());
        this.updatePolyline();
      });
    }
    this.cdr.detectChanges();
  }

  updatePolyline() {
    const path = [this.locationMarker.getLatLng(), this.startIsActive ? this.end : this.start];
    if (!this.pathLine) {
      this.pathLine = L.polyline(path, { color: 'red', weight: 6, opacity: .9 }).addTo(this.map);
    } else {
      this.pathLine.setLatLngs(path);
    }
  }

  async onLocationSet(event: ObsLocationDto) {
    if (this.startIsActive) {
      this.start = L.latLng(event.Latitude, event.Longitude);
      if (this.end) {
        this.map.panTo(this.end);
      }
      this.startIsActive = false;
      this.updateMarkers();
    } else {
      this.end = L.latLng(event.Latitude, event.Longitude);
      this.modalController.dismiss({ start: this.start, end: this.end });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.setLocationInMapComponent.confirmLocation();
  }
}
