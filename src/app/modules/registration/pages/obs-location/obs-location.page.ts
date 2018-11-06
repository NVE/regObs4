import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController } from '@ionic/angular';
import { ObsLocationDto, ObsLocationsResponseDtoV2 } from '../../../regobs-api/models';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private registrationService: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private navController: NavController,
  ) {

  }

  async ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.registration = await this.registrationService.getSavedRegistrationById(this.activatedRoute.snapshot.params['id']);
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
          lat: this.registration.ObsLocation.Latitude,
          lng: this.registration.ObsLocation.Longitude
        }, { icon: locationMarkerIcon }
      );
      if (this.registration.ObsLocation.ObsLocationID) {
        this.selectedLocation = {
          Name: this.registration.ObsLocation.LocationName,
          Id: this.registration.ObsLocation.ObsLocationID,
        };
      }
    }
    this.isLoaded = true;
    this.changeDetectorRef.detectChanges();
  }

  private hasLocation(reg: IRegistration) {
    return reg
      && reg.ObsLocation
      && reg.ObsLocation.Latitude
      && reg.ObsLocation.Longitude;
  }

  async onLocationSet(event: ObsLocationDto) {
    if (!this.registration) {
      this.registration = await this.registrationService.createNewRegistration();
    }
    this.registration.ObsLocation = event;
    await this.registrationService.saveRegistration(this.registration);
    if (this.registration.DtObsTime) {
      this.navController.navigateForward('registration/edit/' + this.registration.Id);
    } else {
      this.navController.navigateForward('registration/set-time/' + this.registration.Id);
    }
  }

}
