import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { MapService } from '../../../map/services/map/map.service';
import { take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss'],
})
export class ObsLocationPage implements OnInit, OnDestroy {
  private map: L.Map;
  registration: IRegistration;
  private locationMarker: L.Marker;
  private followMode = true;
  private userposition: Geoposition;
  private pathLine: L.Polyline;

  constructor(
    private registrationService: RegistrationService,
    private mapService: MapService,
    private navController: NavController) { }

  async ngOnInit() {
    const defaultIcon = L.icon({
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;

    this.registration = await this.registrationService.getCurrentRegistration();
    if (this.hasLocation(this.registration)) {
      this.followMode = false;
      this.locationMarker = L.marker(
        {
          lat: this.registration.ObsLocation.Latitude,
          lng: this.registration.ObsLocation.Longitude
        }
      );
    } else {
      const lastView = await this.mapService.mapViewObservable$.pipe(take(1)).toPromise();
      if (lastView) {
        this.locationMarker = L.marker(lastView.center);
      } else {
        this.locationMarker = L.marker(L.latLng(59.1, 10.3)); // TODO: Try to set to current user position?
      }
    }
  }

  ngOnDestroy(): void {
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.locationMarker.addTo(this.map);
    this.map.setView(this.locationMarker.getLatLng(), 15); // TODO: Set initial view in component
    this.map.on('drag', () => this.moveLocationMarkerToCenter());
  }

  private moveLocationMarkerToCenter() {
    this.followMode = false;
    const center = this.map.getCenter();
    this.locationMarker.setLatLng(center);
    this.updatePathAndDistance();
  }

  private hasLocation(reg: IRegistration) {
    return reg
      && reg.ObsLocation
      && reg.ObsLocation.Latitude
      && reg.ObsLocation.Longitude;
  }

  positionChange(position: Geoposition) {
    if (position.coords) {
      this.userposition = position;
      if (this.followMode) {
        this.locationMarker.setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      } else {
        this.updatePathAndDistance();
      }
    }
  }

  updatePathAndDistance() {
    if (this.userposition) {
      const path = [this.locationMarker.getLatLng(),
      L.latLng(this.userposition.coords.latitude, this.userposition.coords.longitude)];
      if (!this.pathLine) {
        this.pathLine = L.polyline(path, { color: 'black', weight: 6, opacity: .9, dashArray: '1,12' }).addTo(this.map);
      } else {
        this.pathLine.setLatLngs(path);
      }
    }
  }

  async confirmLocation() {
    const latLng = this.locationMarker.getLatLng();
    if (!this.registration) {
      this.registration = await this.registrationService.createNewRegistration();
    }
    this.registration.ObsLocation = {
      Latitude: latLng.lat,
      Longitude: latLng.lng
    };
    await this.registrationService.saveRegistration(this.registration);
    if (this.registration.DtObsTime) {
      this.navController.navigateForward('registration');
    } else {
      this.navController.navigateForward('registration/set-time');
    }
  }

}
