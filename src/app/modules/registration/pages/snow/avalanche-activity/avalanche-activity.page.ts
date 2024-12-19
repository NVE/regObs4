import { Component, NgZone, inject } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
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
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { AvalancheActivityModalPage } from './avalanche-activity-modal/avalanche-activity-modal.page';
import { AvalancheActivityObs2EditModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { Subscription, combineLatest } from 'rxjs';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgFor, LowerCasePipe } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-avalanche-activity',
  templateUrl: './avalanche-activity.page.html',
  styleUrls: ['./avalanche-activity.page.scss'],
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
    IonTitle,
    IonToolbar,
    LowerCasePipe,
    NgFor,
    NgIf,
    RegistrationContentWrapperComponent,
    TranslatePipe,
  ],
})
export class AvalancheActivityPage extends BasePage {
  private modalController = inject(ModalController);
  private ngZone = inject(NgZone);
  private kdvService = inject(KdvService);

  private avalancheCause: KdvElement[];
  private estimatedNumber: KdvElement[];
  private kdvSubscription: Subscription;

  constructor() {
    const basePageService = inject(BasePageService);
    const activatedRoute = inject(ActivatedRoute);

    super(RegistrationTid.AvalancheActivityObs2, basePageService, activatedRoute);
    this.avalancheCause = [];
    this.estimatedNumber = [];
    addIcons({ addCircleOutline });
  }

  get avalancheActivities(): AvalancheActivityObs2EditModel[] {
    return this.draft.registration.AvalancheActivityObs2;
  }

  onInit() {
    this.kdvSubscription = combineLatest([
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheExtKDV'),
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_EstimatedNumKDV'),
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
        dtObsTime: this.draft.registration.DtObsTime,
      },
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
    const cause = this.avalancheCause.find((c) => c.Id === avalancheActivityObs.AvalancheExtTID);
    if (cause) {
      return cause.Name;
    } else {
      return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
    }
  }

  getEstimatedNumber(avalancheActivityObs: AvalancheActivityObs2EditModel) {
    const kdvalue = this.estimatedNumber.find((c) => c.Id === avalancheActivityObs.EstimatedNumTID);
    if (kdvalue) {
      return kdvalue.Name;
    } else {
      return 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.UNKNOWN_NUMBER';
    }
  }
}
