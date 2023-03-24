import { Component, NgZone } from '@angular/core';
import { KdvKey, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../base.page';
import { ModalController } from '@ionic/angular';
import { AddOrEditDangerObsModalPage } from './add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.page';
import { DangerObsEditModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { KdvService } from 'src/app/modules/common-registration/registration.services';

/**
 * Used to add or edit danger observations.
 * Contains a list of danger observations already registered.
 * You may click an observation to open the specific observation in a form.
 * Contains also a button to add new observations and a function to upload images.
 */
@Component({
  selector: 'app-danger-obs',
  templateUrl: './danger-obs.page.html',
  styleUrls: ['./danger-obs.page.scss'],
})
export class DangerObsPage extends BasePage {
  private dangerSignKdv: KdvElement[];
  private dangerSignKdvSubscription: Subscription;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private zone: NgZone,
    private kdvService: KdvService
  ) {
    super(RegistrationTid.DangerObs, basePageService, activatedRoute);
  }

  onBeforeLeave() {
    if (this.dangerSignKdvSubscription) {
      this.dangerSignKdvSubscription.unsubscribe();
    }
  }

  onInit() {
    const geoHazardName = this.kdvService.getKdvName(this.draft.registration.GeoHazardTID);
    const kdvKey = `${geoHazardName}_DangerSignKDV` as KdvKey;
    this.dangerSignKdvSubscription = this.kdvService.getKdvRepositoryByKeyObservable(kdvKey).subscribe((val) => {
      this.zone.run(() => {
        this.dangerSignKdv = val;
      });
    });
  }

  async addOrEdit(index?: number) {
    const dangerObs = index !== undefined ? this.draft.registration.DangerObs[index] : undefined;
    const modal = await this.modalController.create({
      component: AddOrEditDangerObsModalPage,
      componentProps: { dangerObs, geoHazard: this.draft.registration.GeoHazardTID },
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

  setDangerObs(index: number, dangerObs: DangerObsEditModel) {
    this.zone.run(() => {
      if (!this.draft.registration.DangerObs) {
        this.draft.registration.DangerObs = [];
      }
      this.draft.registration.DangerObs[index] = dangerObs;
    });
  }

  addDangerObs(dangerObs: DangerObsEditModel) {
    this.zone.run(() => {
      if (!this.draft.registration.DangerObs) {
        this.draft.registration.DangerObs = [];
      }
      this.draft.registration.DangerObs.push(dangerObs);
    });
  }

  removeAtIndex(index: number) {
    this.zone.run(() => {
      if (!this.draft.registration.DangerObs) {
        this.draft.registration.DangerObs = [];
      }
      if (this.draft.registration.DangerObs.length > 0) {
        this.draft.registration.DangerObs.splice(index, 1);
      }
    });
  }

  getSummaryText(dangerObs: DangerObsEditModel) {
    const text = [];
    if (dangerObs.DangerSignTID % 100 !== 0 && this.dangerSignKdv) {
      const kdvElement = this.dangerSignKdv.find((x) => x.Id === dangerObs.DangerSignTID);
      if (kdvElement) {
        text.push(kdvElement.Name.trim());
      }
    }
    if (dangerObs.Comment) {
      text.push(dangerObs.Comment);
    }
    return text.join(', ');
  }
}
