import { Component, NgZone, inject } from '@angular/core';
import { KdvKey, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../base.page';
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
import { AddOrEditDangerObsModalPage } from './add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.page';
import { DangerObsEditModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { Subscription } from 'rxjs';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgFor } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../components/registration-content-wrapper/registration-content-wrapper.component';
import { EditImagesComponent } from '../../components/edit-images/edit-images.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

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
    NgFor,
    NgIf,
    RegistrationContentWrapperComponent,
    TranslatePipe,
  ],
})
export class DangerObsPage extends BasePage {
  override registrationTid = RegistrationTid.DangerObs;
  private modalController = inject(ModalController);
  private zone = inject(NgZone);
  private kdvService = inject(KdvService);

  private dangerSignKdv?: KdvElement[];
  private dangerSignKdvSubscription?: Subscription;

  get dangerObs(): DangerObsEditModel[] {
    if (!Array.isArray(this.draft.registration.DangerObs)) {
      this.draft.registration.DangerObs = [] as DangerObsEditModel[];
    }
    return this.draft.registration.DangerObs;
  }

  constructor() {
    super();
    addIcons({ addCircleOutline });
  }

  override onBeforeLeave() {
    if (this.dangerSignKdvSubscription) {
      this.dangerSignKdvSubscription.unsubscribe();
    }
  }

  override onInit() {
    const kdvKey = `${GeoHazard[this.draft.registration.GeoHazardTID]}_DangerSignKDV` as KdvKey;
    this.dangerSignKdvSubscription = this.kdvService.getKdvRepositoryByKeyObservable(kdvKey).subscribe((val) => {
      this.zone.run(() => {
        this.dangerSignKdv = val;
      });
    });
  }

  async addOrEdit(index?: number) {
    const dangerObs = index !== undefined ? this.dangerObs[index] : undefined;
    const modal = await this.modalController.create({
      component: AddOrEditDangerObsModalPage,
      componentProps: { dangerObs, geoHazard: this.draft.registration.GeoHazardTID },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete && index != null) {
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
      this.dangerObs[index] = dangerObs;
    });
  }

  addDangerObs(dangerObs: DangerObsEditModel) {
    this.zone.run(() => {
      this.dangerObs.push(dangerObs);
    });
  }

  removeAtIndex(index: number) {
    this.zone.run(() => {
      if (this.dangerObs.length > 0) {
        this.dangerObs.splice(index, 1);
      }
    });
  }

  getSummaryText(dangerObs: DangerObsEditModel) {
    const text = [];
    if (dangerObs.DangerSignTID % 100 !== 0 && this.dangerSignKdv) {
      const kdvElement = this.dangerSignKdv.find((x) => x.Id === dangerObs.DangerSignTID);
      if (kdvElement?.Name) {
        text.push(kdvElement.Name.trim());
      }
    }
    if (dangerObs.Comment) {
      text.push(dangerObs.Comment);
    }
    return text.join(', ');
  }
}
