import {
  Component,
  OnInit,
  Input,
  NgZone,
} from '@angular/core';
import { IRegistration, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { SetDamageLocationPage } from '../../pages/set-damage-location/set-damage-location.page';
import { ObsLocationEditModel } from 'src/app/modules/common-regobs-api/models';
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
    if (
      this.registration &&
      this.registration.request &&
      this.registration.request.DamageObs
    ) {
      return this.registration.request.DamageObs.find(
        (x) => x.DamageTypeTID === this.damageTypeId
      );
    }
    return undefined;
  }

  constructor(
    private ngZone: NgZone,
    private modalController: ModalController,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    if (this.damageObs) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
    if (this.damageObs && this.damageObs.Attachments === undefined) {
      this.damageObs.Attachments = [];
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
          Attachments: []
        });
      }
    } else {
      this.registration.request.DamageObs = this.registration.request.DamageObs.filter(
        (x) => x.DamageTypeTID !== this.damageTypeId
      );
    }
    this.save();
  }

  save() {
    return this.registrationService.saveRegistrationAsync(this.registration);
  }

  getSaveFunc() {
    return () => this.save();
  }

  async setDamagePosition() {
    const fromLatLng = this.registration.request.ObsLocation
      ? L.latLng(
        this.registration.request.ObsLocation.Latitude,
        this.registration.request.ObsLocation.Longitude
      )
      : null;
    const modal = await this.modalController.create({
      component: SetDamageLocationPage,
      componentProps: {
        fromLatLng,
        damageObs: this.damageObs,
        geoHazard: this.registration.geoHazard
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const obs: ObsLocationEditModel = result.data;
      this.damageObs.DamagePosition = {
        Latitude: obs.Latitude,
        Longitude: obs.Longitude
      };
      await this.save();
    }
  }
}
