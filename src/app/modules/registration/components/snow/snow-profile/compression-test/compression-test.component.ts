import { Component, Input } from '@angular/core';
import { CompressionTestListModalPage } from './compression-test-list-modal/compression-test-list-modal.page';
import { ModalController } from '@ionic/angular';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss'],
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

  constructor(private modalContoller: ModalController, private draftService: DraftRepositoryService) {}

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
