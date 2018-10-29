import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController } from '@ionic/angular';
import { ObsLocationDto, ObsLocationsResponseDtoV2 } from '../../../regobs-api/models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss'],
})
export class ObsLocationPage implements OnInit, OnDestroy {
  registration: IRegistration;
  locationMarker: L.Marker;
  isLoaded = false;
  selectedLocation: ObsLocationsResponseDtoV2;

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController
  ) { }

  async ngOnInit() {
    this.registration = await this.registrationService.getCurrentRegistration();
    if (this.hasLocation(this.registration)) {
      this.locationMarker = L.marker(
        {
          lat: this.registration.ObsLocation.Latitude,
          lng: this.registration.ObsLocation.Longitude
        }
      );
      if (this.registration.ObsLocation.ObsLocationID) {
        this.selectedLocation = {
          Name: this.registration.ObsLocation.LocationName,
          Id: this.registration.ObsLocation.ObsLocationID,
        };
      }
    }
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
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
      this.navController.navigateForward('registration');
    } else {
      this.navController.navigateForward('registration/set-time');
    }
  }

}
