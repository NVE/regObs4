import { Component, Input } from '@angular/core';
import { CompressionTestListModalPage } from './compression-test-list-modal/compression-test-list-modal.page';
import { ModalController } from '@ionic/angular';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService } from '../../../../services/registration.service';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss']
})
export class CompressionTestComponent {
  @Input() reg: IRegistration;
  private compressionTestListModal: HTMLIonModalElement;

  get connectedTests(): CompressionTestEditModel[] {
    return this.tests.filter((t) => t.IncludeInSnowProfile === true);
  }

  get tests(): CompressionTestEditModel[] {
    return this.reg.request.CompressionTest || [];
  }

  get isEmpty(): boolean {
    return this.connectedTests.length === 0;
  }

  constructor(
    private modalContoller: ModalController,
    private registrationService: RegistrationService
  ) {}

  async openModal(): Promise<void> {
    if (!this.compressionTestListModal) {
      await this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
      this.compressionTestListModal = await this.modalContoller.create({
        component: CompressionTestListModalPage,
        componentProps: {
          regId: this.reg.id
        }
      });
      this.compressionTestListModal.present();
      await this.compressionTestListModal.onDidDismiss();
      this.compressionTestListModal = null;
    }
  }
}
