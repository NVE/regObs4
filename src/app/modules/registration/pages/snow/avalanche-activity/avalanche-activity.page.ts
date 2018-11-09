import { Component, OnInit, NgZone } from '@angular/core';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ModalController } from '@ionic/angular';
import { AvalancheActivityModalPage } from './avalanche-activity-modal/avalanche-activity-modal.page';
import { AvalancheActivityObs2Dto } from '../../../../regobs-api/models';

@Component({
  selector: 'app-avalanche-activity',
  templateUrl: './avalanche-activity.page.html',
  styleUrls: ['./avalanche-activity.page.scss'],
})
export class AvalancheActivityPage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
  ) {
    super(RegistrationTid.AvalancheActivityObs2, basePageService, activatedRoute);
  }

  async addOrEditAvalancheActivity(index?: number) {
    const modal = await this.modalController.create({
      component: AvalancheActivityModalPage,
      componentProps: { avalancheActivity: this.registration.AvalancheActivityObs2[index] },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.ngZone.run(() => {
      if (result.data) {
        if (result.data.delete) {
          this.registration.AvalancheActivityObs2.splice(index, 1);
        } else {
          const avalancheActivityObs: AvalancheActivityObs2Dto = result.data;
          if (index !== undefined) {
            this.registration.AvalancheActivityObs2[index] = avalancheActivityObs;
          } else {
            this.registration.AvalancheActivityObs2.push(avalancheActivityObs);
          }
        }
      }
    });
  }

  getDescription(avalancheActivityObs: AvalancheActivityObs2Dto) {
    return '';
    // const cause = this.avalancheCause.find((c) => c.Id === avalancheActivityObs.AvalCauseTID);
    // if (cause) {
    //   return cause.Name;
    // } else {
    //   return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
    // }
  }
}
