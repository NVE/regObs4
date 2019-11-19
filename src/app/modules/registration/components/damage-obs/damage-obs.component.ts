import { Component, OnInit, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from '../../models/registrationTid.enum';
import * as L from 'leaflet';
import { SetDamageLocationPage } from '../../pages/set-damage-location/set-damage-location.page';
import { ObsLocationDto } from '../../../regobs-api/models';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-damage-obs',
  templateUrl: './damage-obs.component.html',
  styleUrls: ['./damage-obs.component.scss']
})
export class DamageObsComponent implements OnInit {

  @Input() damageTypeId: number;
  @Input() damageTypeName: string;
  @Input() registration: IRegistration;
  @Input() registrationTid: RegistrationTid;

  isSelected: boolean;

  get damageObs() {
    if (this.registration && this.registration.request && this.registration.request.DamageObs) {
      return this.registration.request.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeId);
    }
    return undefined;
  }

  constructor(
    private ngZone: NgZone,
    private modalController: ModalController,
    private registrationService: RegistrationService
  ) {
  }

  ngOnInit() {
    if (this.damageObs) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
    if (this.damageObs && this.damageObs.Pictures === undefined) {
      this.damageObs.Pictures = [];
    }
  }

  toggleDamageType() {
    this.isSelected = !this.isSelected;
  }

  onCheckedChange() {
    if (this.isSelected) {
      if (!this.damageObs) {
        this.registration.request.DamageObs.push({
          DamageTypeTID: this.damageTypeId,
          Pictures: [],
        });
      }
    } else {
      this.registration.request.DamageObs = this.registration.request.DamageObs.filter((x) => x.DamageTypeTID !== this.damageTypeId);
    }
    this.save();
  }

  save() {
    return this.registrationService.saveRegistration(this.registration);
  }

  getSaveFunc() {
    return () => this.save();
  }

  async setDamagePosition() {
    const fromLatLng = this.registration.request.ObsLocation
      ? L.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
    const modal = await this.modalController.create({
      component: SetDamageLocationPage,
      componentProps: { fromLatLng, damageObs: this.damageObs, geoHazard: this.registration.geoHazard },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const obs: ObsLocationDto = result.data;
      this.damageObs.DamagePosition = { Latitude: obs.Latitude, Longitude: obs.Longitude };
      await this.save();
    }
  }
}
