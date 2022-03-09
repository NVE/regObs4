import { Component, NgZone } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ModalController } from '@ionic/angular';
import { AvalancheActivityModalPage } from './avalanche-activity-modal/avalanche-activity-modal.page';
import {
  AvalancheActivityObs2EditModel,
  KdvElement
} from 'src/app/modules/common-regobs-api/models';
import { KdvService } from '../../../../../core/services/kdv/kdv.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-avalanche-activity',
  templateUrl: './avalanche-activity.page.html',
  styleUrls: ['./avalanche-activity.page.scss']
})
export class AvalancheActivityPage extends BasePage {
  private avalancheCause: KdvElement[];
  private estimatedNumber: KdvElement[];
  private kdvSubscription: Subscription;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
    private kdvService: KdvService
  ) {
    super(
      RegistrationTid.AvalancheActivityObs2,
      basePageService,
      activatedRoute
    );
    this.avalancheCause = [];
    this.estimatedNumber = [];
  }

  get avalancheActivities(): AvalancheActivityObs2EditModel[] {
    return this.draft.registration.AvalancheActivityObs2;
  }

  onInit() {
    this.kdvSubscription = combineLatest([
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheExtKDV'),
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_EstimatedNumKDV')
    ]).subscribe(([causeKdv, estimatedNumberKdv]) => {
      this.avalancheCause = causeKdv;
      this.estimatedNumber = estimatedNumberKdv;
    });
  }

  onBeforeLeave() {
    if (this.kdvSubscription) {
      this.kdvSubscription.unsubscribe();
    }
  }

  async addOrEditAvalancheActivity(index?: number) {
    const modal = await this.modalController.create({
      component: AvalancheActivityModalPage,
      componentProps: {
        avalancheActivity: this.avalancheActivities[index],
        dtObsTime: this.draft.registration.DtObsTime
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.ngZone.run(() => {
      if (result.data) {
        if (result.data.delete) {
          this.avalancheActivities.splice(index, 1);
        } else {
          const avalancheActivityObs: AvalancheActivityObs2EditModel = result.data;
          if (index !== undefined) {
            this.avalancheActivities[index] = avalancheActivityObs;
          } else {
            this.avalancheActivities.push(avalancheActivityObs);
          }
        }
      }
    });
  }

  getCause(avalancheActivityObs: AvalancheActivityObs2EditModel) {
    const cause = this.avalancheCause.find(
      (c) => c.Id === avalancheActivityObs.AvalancheExtTID
    );
    if (cause) {
      return cause.Name;
    } else {
      return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
    }
  }

  getEstimatedNumber(avalancheActivityObs: AvalancheActivityObs2EditModel) {
    const kdvalue = this.estimatedNumber.find(
      (c) => c.Id === avalancheActivityObs.EstimatedNumTID
    );
    if (kdvalue) {
      return kdvalue.Name;
    } else {
      return 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.UNKNOWN_NUMBER';
    }
  }
}
