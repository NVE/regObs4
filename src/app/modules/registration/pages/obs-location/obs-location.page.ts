import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController, Events } from '@ionic/angular';
import { ObsLocationDto, ObsLocationsResponseDtoV2 } from '../../../regobs-api/models';
import { ActivatedRoute } from '@angular/router';
import { settings } from '../../../../../settings';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss'],
})
export class ObsLocationPage implements OnInit {
  locationMarker: L.Marker;
  isLoaded = false;
  selectedLocation: ObsLocationsResponseDtoV2;
  registration: IRegistration;
  fullscreen = false;
  geoHazard: GeoHazard;

  constructor(
    private registrationService: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private navController: NavController,
    private events: Events,
  ) {

  }

  async ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
      this.registration =
        await this.registrationService.getSavedRegistrationById(id);
      this.geoHazard = this.registration.geoHazard;
    } else if (this.activatedRoute.snapshot.queryParams['geoHazard']) {
      this.geoHazard = parseInt(this.activatedRoute.snapshot.queryParams['geoHazard'], 10);
    }
    if (this.hasLocation(this.registration)) {
      const locationMarkerIcon = L.icon({
        iconUrl: '/assets/icon/map/GPS_stop.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41],
      });
      this.locationMarker = L.marker(
        {
          lat: this.registration.request.ObsLocation.Latitude,
          lng: this.registration.request.ObsLocation.Longitude
        }, { icon: locationMarkerIcon }
      );
      if (this.registration.request.ObsLocation.ObsLocationID) {
        this.selectedLocation = {
          Name: this.registration.request.ObsLocation.LocationName,
          Id: this.registration.request.ObsLocation.ObsLocationID,
        };
      }
    }
    this.ngZone.run(() => {
      this.isLoaded = true;
    });
    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen: boolean) => {
      this.ngZone.run(() => {
        this.fullscreen = isFullscreen; // TODO: change to observable and unsubscribe!
      });
    });
  }

  private hasLocation(reg: IRegistration) {
    return reg
      && reg.request.ObsLocation
      && reg.request.ObsLocation.Latitude
      && reg.request.ObsLocation.Longitude;
  }

  async onLocationSet(event: ObsLocationDto) {
    if (!this.registration) {
      this.registration = await this.registrationService.createNewRegistration(this.geoHazard);
    }
    this.registration.request.ObsLocation = event;
    const id = await this.registrationService.saveRegistration(this.registration);
    if (this.registration.request.DtObsTime) {
      this.navController.navigateForward('registration/edit/' + id);
    } else {
      this.navController.navigateForward('registration/set-time/' + id);
    }
  }

}
