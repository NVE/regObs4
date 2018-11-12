import { Component, OnInit, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController, ModalController } from '@ionic/angular';
import { RegistrationTid } from '../../models/registrationTid.enum';
import * as L from 'leaflet';
import { SetDamageLocationPage } from '../../pages/set-damage-location/set-damage-location.page';
import { DamageObsDto, ObsLocationDto } from '../../../regobs-api/models';

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
  @Output() registrationChange = new EventEmitter();

  isSelected: boolean;

  get damageObs() {
    return this.registration.request.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeId);
  }

  // set damageObs(val: DamageObsDto) {
  //   const index = this.registration.request.DamageObs.indexOf(val);
  //   this.ngZone.run(() => {
  //     this.registration.request.DamageObs[index] = val;
  //     this.registrationChange.emit(this.registration);
  //   });
  // }

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController,
    private ngZone: NgZone,
    private modalController: ModalController,
    private cdr: ChangeDetectorRef
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
      this.registrationChange.emit(this.registration);
    }
  }

  toggleDamageType() {
    this.isSelected = !this.isSelected;
    this.cdr.detectChanges();
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
    this.registrationChange.emit(this.registration);
  }

  async setDamagePosition() {
    const fromLatLng = this.registration.request.ObsLocation
      ? L.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
    const modal = await this.modalController.create({
      component: SetDamageLocationPage,
      componentProps: { fromLatLng, damageObs: this.damageObs },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const obs: ObsLocationDto = result.data;
      this.damageObs.DamagePosition = { Latitude: obs.Latitude, Longitude: obs.Longitude };
      this.ngZone.run(() => {
        this.registrationChange.emit(this.registration);
      });
    }
  }
}
