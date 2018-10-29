import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { UtmSource } from '../obs-location/utm-source.enum';
import { NavController, IonBackButton } from '@ionic/angular';
import { IRegistration } from '../../models/registration.model';
import { DamageObsDto, ObsLocationDto } from '../../../regobs-api/models';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { IsEmptyHelper } from '../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-set-damage-location',
  templateUrl: './set-damage-location.page.html',
  styleUrls: ['./set-damage-location.page.scss'],
})
export class SetDamageLocationPage implements OnInit {

  private currentRegistration: IRegistration;
  private damageObs: DamageObsDto;
  fromMarker: L.Marker;
  locationMarker: L.Marker;
  private damageTypeTid: number;

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController,
    public activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.damageTypeTid = parseInt(this.activatedRoute.snapshot.params['damageTypeTid'], 10);
    this.currentRegistration = await this.registrationService.getCurrentRegistration();
    if (this.currentRegistration) {
      if (this.currentRegistration.ObsLocation) {
        const obsLocation = this.currentRegistration.ObsLocation;
        const latLng = L.latLng(obsLocation.Latitude, obsLocation.Longitude);
        this.fromMarker = L.marker(latLng);
      } else {
        this.fromMarker = L.marker(L.latLng(59.1, 10.3));
        // TODO: Create getUserPosition, lastView or last default value in map service
      }
      if (this.currentRegistration.DamageObs) {
        this.damageObs = this.currentRegistration.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeTid);
      }
    }
    if (!this.damageObs) {
      this.navController.goBack();
    } else {
      if (!IsEmptyHelper.isEmpty(this.damageObs.DamagePosition)) {
        const latLng = L.latLng(this.damageObs.DamagePosition.Latitude, this.damageObs.DamagePosition.Longitude);
        this.locationMarker = L.marker(latLng);
      }
    }
  }

  async onLocationSet(event: ObsLocationDto) {
    if (this.damageObs) {
      this.damageObs.DamagePosition = { Latitude: event.Latitude, Longitude: event.Longitude };
      await this.registrationService.saveRegistration(this.currentRegistration);
    }
    this.navController.goBack();
  }
}
