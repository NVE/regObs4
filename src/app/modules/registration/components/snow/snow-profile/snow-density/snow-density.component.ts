import { Component, Input } from '@angular/core';
import { SnowDensityModel } from 'src/app/modules/common-regobs-api/models';
import { ModalController } from '@ionic/angular';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss'],
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

  constructor(private modalContoller: ModalController, private draftRepository: DraftRepositoryService) {}

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
