import { Component, Input } from '@angular/core';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { StratProfileModalPage } from './strat-profile-modal/strat-profile-modal.page';
import { StratProfileEditModel } from 'src/app/modules/common-regobs-api/models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

/**
 * The small summary component on the main snow profile page,
 * showing how many layers you have added.
 * When you click on this component, you open / navigate to the
 * modal where you add layers etc.
 */
@Component({
  selector: 'app-strat-profile',
  templateUrl: './strat-profile.component.html',
  styleUrls: ['./strat-profile.component.scss'],
})
export class StratProfileComponent {
  @Input() draft: RegistrationDraft;

  private modal: HTMLIonModalElement;

  get profile(): StratProfileEditModel {
    return this.draft?.registration?.SnowProfile2?.StratProfile || {};
  }

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profile);
  }

  constructor(private modalContoller: ModalController, private draftrepository: DraftRepositoryService) {}

  async openModal() {
    if (!this.modal) {
      await this.draftrepository.save(this.draft); // Save registration before open modal page
      this.modal = await this.modalContoller.create({
        component: StratProfileModalPage,
        componentProps: {
          uuid: this.draft.uuid,
        },
      });
      this.modal.present();
      await this.modal.onDidDismiss();
      this.modal = null;
    }
  }
}
