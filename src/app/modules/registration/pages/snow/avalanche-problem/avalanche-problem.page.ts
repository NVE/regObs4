import { Component, inject, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { ItemReorderEventDetail } from '@ionic/core';
import { AvalancheEvalProblem2EditModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { AvalancheProblemModalPage } from './avalanche-problem-modal/avalanche-problem-modal.page';
import { Subscription } from 'rxjs';
import { ArrayHelper } from 'src/app/core/helpers/array-helper';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { NgIf } from '@angular/common';

/**
 * Start page / CRUD page for avalanche problems.
 * Shows list of registered problems and offers to add new problems, edit exising problems or delete problems.
 * You can also add pictures connected to avalanche problems.
 */
@Component({
  selector: 'app-avalanche-problem',
  templateUrl: './avalanche-problem.page.html',
  styleUrls: ['./avalanche-problem.page.scss'],
  imports: [
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonReorder,
    IonReorderGroup,
    IonTitle,
    IonToolbar,
    RegistrationContentWrapperComponent,
    TranslatePipe,
    NgIf,
  ],
})
export class AvalancheProblemPage extends BasePage {
  override registrationTid = RegistrationTid.AvalancheEvalProblem2;

  private modalController = inject(ModalController);
  private ngZone = inject(NgZone);
  private kdvService = inject(KdvService);

  private avalancheCause: KdvElement[] = [];
  private kdvSubscription?: Subscription;

  constructor() {
    super();
    addIcons({ addCircleOutline });
  }

  override onInit() {
    this.kdvSubscription = this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseKDV').subscribe((val) => {
      this.avalancheCause = val;
    });
  }

  override onBeforeLeave() {
    if (this.kdvSubscription) {
      this.kdvSubscription.unsubscribe();
    }
  }

  async addOrEditAvalancheProblem(index?: number) {
    if (this.draft?.registration?.AvalancheEvalProblem2) {
      const modal = await this.modalController.create({
        component: AvalancheProblemModalPage,
        componentProps: {
          avalancheEvalProblem: index != null ? this.draft.registration.AvalancheEvalProblem2[index] : undefined,
        },
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.ngZone.run(() => {
        if (this.draft?.registration?.AvalancheEvalProblem2) {
          if (result.data) {
            if (result.data.delete && index != null) {
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
    const cause = this.avalancheCause.find((c) => c.Id === avalancheEvalProblem.AvalCauseTID);
    return cause?.Name || 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
  }

  onProblemReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    if (this.draft.registration.AvalancheEvalProblem2 == null) {
      throw new Error('AvalancheEvalProblem2 not initialized');
    }
    this.draft.registration.AvalancheEvalProblem2 = ArrayHelper.reorderList(
      this.draft.registration.AvalancheEvalProblem2,
      event.detail.from,
      event.detail.to
    );
    event.detail.complete();
  }
}
