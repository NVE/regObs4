import { Component, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { AvalancheEvalProblem2Dto } from '../../../../regobs-api/models';
import { AvalancheProblemModalPage } from './avalanche-problem-modal/avalanche-problem-modal.page';

@Component({
  selector: 'app-avalanche-problem',
  templateUrl: './avalanche-problem.page.html',
  styleUrls: ['./avalanche-problem.page.scss'],
})
export class AvalancheProblemPage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
  ) {
    super(RegistrationTid.AvalancheEvalProblem2, basePageService, activatedRoute);
  }

  async addOrEditAvalancheProblem(index?: number) {
    const modal = await this.modalController.create({
      component: AvalancheProblemModalPage,
      componentProps: { avalancheEvalProblem: this.registration.AvalancheEvalProblem2[index] },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.ngZone.run(() => {
      if (result.data) {
        if (result.data.delete) {
          this.registration.AvalancheEvalProblem2.splice(index, 1);
        } else {
          const avalancheEvalProblem: AvalancheEvalProblem2Dto = result.data;
          if (index !== undefined) {
            this.registration.AvalancheEvalProblem2[index] = avalancheEvalProblem;
          } else {
            this.registration.AvalancheEvalProblem2.push(avalancheEvalProblem);
          }
        }
      }
    });
  }

  getDescription(avalancheEvalProblem: AvalancheEvalProblem2Dto) {
    return avalancheEvalProblem.Comment;
  }

}
