import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CompressionTestListModalPage } from './compression-test-list-modal/compression-test-list-modal.page';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompressionTestComponent {
  private modalContoller = inject(ModalController);

  readonly draft = input.required<RegistrationDraft>();
  tests = computed(() => this.draft().registration.CompressionTest || []);
  nTests = computed(() => this.tests().length);
  connectedTests = computed(() => this.tests().filter((t) => t.IncludeInSnowProfile === true));
  isEmpty = computed(() => this.connectedTests().length === 0);

  private compressionTestListModal?: HTMLIonModalElement | null;

  constructor() {
    addIcons({ checkmarkCircle });
  }

  async openModal(): Promise<void> {
    if (!this.compressionTestListModal) {
      this.compressionTestListModal = await this.modalContoller.create({
        component: CompressionTestListModalPage,
      });
      this.compressionTestListModal.present();
      await this.compressionTestListModal.onDidDismiss();
      this.compressionTestListModal = null;
    }
  }
}
