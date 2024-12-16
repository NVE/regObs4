import { Component, Input } from '@angular/core';
import { CompressionTestListModalPage } from './compression-test-list-modal/compression-test-list-modal.page';
import { IonIcon, IonItem, IonLabel, IonText, ModalController } from '@ionic/angular/standalone';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonText, NgIf, TranslateModule],
})
export class CompressionTestComponent {
  @Input() draft: RegistrationDraft;
  private compressionTestListModal: HTMLIonModalElement;

  get connectedTests(): CompressionTestEditModel[] {
    return this.tests.filter((t) => t.IncludeInSnowProfile === true);
  }

  get tests(): CompressionTestEditModel[] {
    return this.draft.registration.CompressionTest || [];
  }

  get isEmpty(): boolean {
    return this.connectedTests.length === 0;
  }

  constructor(private modalContoller: ModalController, private draftService: DraftRepositoryService) {
    addIcons({ checkmarkCircle });
  }

  async openModal(): Promise<void> {
    if (!this.compressionTestListModal) {
      await this.draftService.save(this.draft); // Save registration before open modal page
      this.compressionTestListModal = await this.modalContoller.create({
        component: CompressionTestListModalPage,
        componentProps: {
          uuid: this.draft.uuid,
        },
      });
      this.compressionTestListModal.present();
      await this.compressionTestListModal.onDidDismiss();
      this.compressionTestListModal = null;
    }
  }
}
