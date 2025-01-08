import { Component, computed, inject, input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { StratProfileModalPage } from './strat-profile-modal/strat-profile-modal.page';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

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
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslatePipe],
})
export class StratProfileComponent {
  private modalContoller = inject(ModalController);
  private draftrepository = inject(DraftRepositoryService);

  draft = input.required<RegistrationDraft>();

  layers = computed(() => this.draft().registration.SnowProfile2?.StratProfile?.Layers || []);
  isEmpty = computed(() => isEmpty(this.draft().registration.SnowProfile2?.StratProfile));

  private modal?: HTMLIonModalElement | null;

  constructor() {
    addIcons({ checkmarkCircle });
  }

  async openModal() {
    if (!this.modal) {
      await this.draftrepository.save(this.draft()); // Save registration before open modal page
      this.modal = await this.modalContoller.create({
        component: StratProfileModalPage,
        componentProps: {
          uuid: this.draft().uuid,
        },
      });
      this.modal.present();
      await this.modal.onDidDismiss();
      this.modal = null;
    }
  }
}
