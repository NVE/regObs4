import { Component, Input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { SnowTempModalPage } from './snow-temp-modal/snow-temp-modal.page';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslateModule],
})
export class SnowTempComponent {
  @Input() draft: RegistrationDraft;
  private snowTempModal: HTMLIonModalElement;

  get tempProfile() {
    return this.draft.registration.SnowProfile2.SnowTemp;
  }

  get isEmpty() {
    return isEmpty(this.tempProfile);
  }

  constructor(private modalContoller: ModalController, private draftService: DraftRepositoryService) {
    addIcons({ checkmarkCircle });
  }

  async openModal() {
    if (!this.snowTempModal) {
      await this.draftService.save(this.draft); // Save registration before open modal page
      this.snowTempModal = await this.modalContoller.create({
        component: SnowTempModalPage,
        componentProps: {
          uuid: this.draft.uuid,
        },
      });
      this.snowTempModal.present();
      await this.snowTempModal.onDidDismiss();
      this.snowTempModal = null;
    }
  }
}
