import { Component, computed, inject, input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslatePipe],
})
export class SnowDensityComponent {
  private modalContoller = inject(ModalController);
  private draftRepository = inject(DraftRepositoryService);

  readonly draft = input.required<RegistrationDraft>();

  profiles = computed(() => {
    const draft = this.draft();
    if (draft.registration.SnowProfile2?.SnowDensity && draft.registration.SnowProfile2.SnowDensity.length > 0) {
      return draft.registration.SnowProfile2.SnowDensity;
    }
    return [];
  });
  nLayers = computed(() => {
    // from template: profiles[0].Layers ? profiles[0].Layers.length : 0
    const { Layers } = this.profiles()[0];
    if (Layers != null) {
      return Layers.length;
    }
    return 0;
  });
  isEmpty = computed(() => isEmpty(this.profiles()));

  private densityModal?: HTMLIonModalElement | null;

  constructor() {
    addIcons({ checkmarkCircle });
  }

  async openModal(): Promise<void> {
    if (!this.densityModal) {
      await this.draftRepository.save(this.draft()); // Save registration before open modal page
      this.densityModal = await this.modalContoller.create({
        component: SnowDensityModalPage,
        componentProps: {
          uuid: this.draft().uuid,
        },
      });
      this.densityModal.present();
      await this.densityModal.onDidDismiss();
      this.densityModal = null;
    }
  }
}
