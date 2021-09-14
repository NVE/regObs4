import { Component, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import {
  AvalancheEvalProblem2EditModel,
  KdvElement
} from '@varsom-regobs-common/regobs-api';
import { AvalancheProblemModalPage } from './avalanche-problem-modal/avalanche-problem-modal.page';
import { KdvService } from '../../../../../core/services/kdv/kdv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avalanche-problem',
  templateUrl: './avalanche-problem.page.html',
  styleUrls: ['./avalanche-problem.page.scss']
})
export class AvalancheProblemPage extends BasePage {
  private avalancheCause: KdvElement[];
  private kdvSubscription: Subscription;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
    private kdvService: KdvService
  ) {
    super(
      RegistrationTid.AvalancheEvalProblem2,
      basePageService,
      activatedRoute
    );
    this.avalancheCause = [];
  }

  onInit() {
    this.kdvSubscription = this.kdvService
      .getKdvRepositoryByKeyObservable('Snow_AvalCauseKDV')
      .subscribe((val) => {
        this.avalancheCause = val;
      });
  }

  onBeforeLeave() {
    if (this.kdvSubscription) {
      this.kdvSubscription.unsubscribe();
    }
  }

  async addOrEditAvalancheProblem(index?: number) {
    if (
      this.registration &&
      this.registration.request &&
      this.registration.request.AvalancheEvalProblem2
    ) {
      const modal = await this.modalController.create({
        component: AvalancheProblemModalPage,
        componentProps: {
          avalancheEvalProblem: this.registration.request.AvalancheEvalProblem2[
            index
          ]
        }
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.ngZone.run(() => {
        if (
          this.registration &&
          this.registration.request &&
          this.registration.request.AvalancheEvalProblem2
        ) {
          if (result.data) {
            if (result.data.delete) {
              this.registration.request.AvalancheEvalProblem2.splice(index, 1);
            } else {
              const avalancheEvalProblem: AvalancheEvalProblem2EditModel =
                result.data;
              if (index !== undefined) {
                this.registration.request.AvalancheEvalProblem2[
                  index
                ] = avalancheEvalProblem;
              } else {
                this.registration.request.AvalancheEvalProblem2.push(
                  avalancheEvalProblem
                );
              }
            }
          }
        }
      });
    }
  }

  getDescription(avalancheEvalProblem: AvalancheEvalProblem2EditModel) {
    const cause = this.avalancheCause.find(
      (c) => c.Id === avalancheEvalProblem.AvalCauseTID
    );
    if (cause) {
      return cause.Name;
    } else {
      return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
    }
  }
}
