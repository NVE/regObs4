import { Component, computed, inject, input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { SnowTempModalPage } from './snow-temp-modal/snow-temp-modal.page';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslatePipe],
})
export class SnowTempComponent {
  private modalContoller = inject(ModalController);

  readonly draft = input.required<RegistrationDraft>();
  layers = computed(() => this.draft().registration.SnowProfile2?.SnowTemp?.Layers || []);
  nLayers = computed(() => this.layers().length || 0);
  isEmpty = computed(() => isEmpty(this.layers()));

  private snowTempModal?: HTMLIonModalElement | null;

  constructor() {
    addIcons({ checkmarkCircle });
  }

  async openModal() {
    if (!this.snowTempModal) {
      this.snowTempModal = await this.modalContoller.create({
        component: SnowTempModalPage,
        componentProps: {
          uuid: this.draft().uuid,
        },
      });
      this.snowTempModal.present();
      await this.snowTempModal.onDidDismiss();
      this.snowTempModal = null;
    }
  }
}
