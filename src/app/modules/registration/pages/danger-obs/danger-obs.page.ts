import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { BasePage } from '../base.page';
import { ModalController } from '@ionic/angular';
import { AddOrEditDangerObsModalPage } from './add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.page';
import { DangerObsDto } from '../../../regobs-api/models';

@Component({
  selector: 'app-danger-obs',
  templateUrl: './danger-obs.page.html',
  styleUrls: ['./danger-obs.page.scss'],
})
export class DangerObsPage extends BasePage {
  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController,
    private zone: NgZone,
  ) {
    super(RegistrationTid.DangerObs, registrationService, actvatedRoute, changeDetectorRef);
  }

  async addOrEdit(index: number) {
    const dangerObs = index !== undefined ? this.registration.DangerObs[index] : undefined;
    const modal = await this.modalController.create({
      component: AddOrEditDangerObsModalPage,
      componentProps: { dangerObs, geoHazard: this.registration.GeoHazardTID },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        this.removeAtIndex(index);
      } else {
        if (index !== undefined) {
          this.setDangerObs(index, result.data);
        } else {
          this.addDangerObs(result.data);
        }
      }
    }
  }

  setDangerObs(index: number, dangerObs: DangerObsDto) {
    this.zone.run(() => {
      this.registration.DangerObs[index] = dangerObs;
    });
  }

  addDangerObs(dangerObs: DangerObsDto) {
    this.zone.run(() => {
      this.registration.DangerObs.push(dangerObs);
    });
  }

  removeAtIndex(index: number) {
    this.zone.run(() => {
      if (this.registration.DangerObs.length > 0) {
        this.registration.DangerObs.splice(index, 1);
      }
    });
  }
}

