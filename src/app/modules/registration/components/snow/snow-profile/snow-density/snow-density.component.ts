import { Component, Input } from '@angular/core';
import { SnowDensityModel } from 'src/app/modules/common-regobs-api/models';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslateModule],
})
export class SnowDensityComponent {
  @Input() draft: RegistrationDraft;
  private densityModal: HTMLIonModalElement;

  get profiles(): SnowDensityModel[] {
    if (this.draft?.registration?.SnowProfile2?.SnowDensity?.length > 0) {
      return this.draft.registration.SnowProfile2.SnowDensity;
    }
    return [];
  }

  get isEmpty(): boolean {
    return isEmpty(this.profiles);
  }

  constructor(private modalContoller: ModalController, private draftRepository: DraftRepositoryService) {
    addIcons({ checkmarkCircle });
  }

  async openModal(): Promise<void> {
    if (!this.densityModal) {
      await this.draftRepository.save(this.draft); // Save registration before open modal page
      this.densityModal = await this.modalContoller.create({
        component: SnowDensityModalPage,
        componentProps: {
          uuid: this.draft.uuid,
        },
      });
      this.densityModal.present();
      await this.densityModal.onDidDismiss();
      this.densityModal = null;
    }
  }
}
