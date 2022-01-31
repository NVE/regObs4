import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SnowTempModalPage } from './snow-temp-modal/snow-temp-modal.page';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService } from '../../../../services/registration.service';
import { isEmpty } from 'src/app/modules/common-core/helpers';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss']
})
export class SnowTempComponent {
  @Input() reg: IRegistration;
  private snowTempModal: HTMLIonModalElement;

  get tempProfile() {
    if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp) {
      return this.reg.request.SnowProfile2.SnowTemp;
    }
    return {};
  }

  get isEmpty() {
    return isEmpty(this.tempProfile);
  }

  constructor(private modalContoller: ModalController, private registrationService: RegistrationService) {}

  async openModal() {
    if (!this.snowTempModal) {
      await this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
      this.snowTempModal = await this.modalContoller.create({
        component: SnowTempModalPage,
        componentProps: {
          regId: this.reg.id
        }
      });
      this.snowTempModal.present();
      await this.snowTempModal.onDidDismiss();
      this.snowTempModal = null;
    }
  }
}
