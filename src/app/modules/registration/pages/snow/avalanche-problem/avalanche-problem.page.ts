import { Component, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { ItemReorderEventDetail } from '@ionic/core';
import {
  AvalancheEvalProblem2EditModel,
  KdvElement
} from 'src/app/modules/common-regobs-api/models';
import { AvalancheProblemModalPage } from './avalanche-problem-modal/avalanche-problem-modal.page';
import { Subscription } from 'rxjs';
import { ArrayHelper } from 'src/app/core/helpers/array-helper';
import { KdvService } from 'src/app/modules/common-registration/registration.services';

/**
 * Start page / CRUD page for avalanche problems.
 * Shows list of registered problems and offers to add new problems, edit exising problems or delete problems.
 * You can also add pictures connected to avalanche problems.
 */
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
    if (this.draft?.registration?.AvalancheEvalProblem2) {
      const modal = await this.modalController.create({
        component: AvalancheProblemModalPage,
        componentProps: {
          avalancheEvalProblem: this.draft.registration.AvalancheEvalProblem2[index]
        }
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.ngZone.run(() => {
        if (this.draft?.registration?.AvalancheEvalProblem2) {
          if (result.data) {
            if (result.data.delete) {
              this.draft.registration.AvalancheEvalProblem2.splice(index, 1);
            } else {
              const avalancheEvalProblem: AvalancheEvalProblem2EditModel = result.data;
              if (index !== undefined) {
                this.draft.registration.AvalancheEvalProblem2[index] = avalancheEvalProblem;
              } else {
                this.draft.registration.AvalancheEvalProblem2.push(avalancheEvalProblem);
              }
            }
          }
        }
      });
    }
  }

  getDescription(avalancheEvalProblem: AvalancheEvalProblem2EditModel): string {
    const cause = this.avalancheCause.find(
      (c) => c.Id === avalancheEvalProblem.AvalCauseTID
    );
    if (cause) {
      return cause.Name;
    } else {
      return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
    }
  }

  onProblemReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    this.draft.registration.AvalancheEvalProblem2 = ArrayHelper.reorderList(
      this.draft.registration.AvalancheEvalProblem2,
      event.detail.from,
      event.detail.to
    );
    event.detail.complete();
  }
}
