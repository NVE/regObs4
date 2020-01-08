import { Component, OnInit, Input } from '@angular/core';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { SnowTempModalPage } from './snow-temp-modal/snow-temp-modal.page';
import { IRegistration } from '../../../../models/registration.model';
import { RegistrationService } from '../../../../services/registration.service';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss']
})
export class SnowTempComponent implements OnInit {
  @Input() reg: IRegistration;
  private snowTempModal: HTMLIonModalElement;

  get tempProfile() {
    if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp) {
      return this.reg.request.SnowProfile2.SnowTemp;
    }
    return {};
  }

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.tempProfile);
  }

  constructor(private modalContoller: ModalController, private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.snowTempModal) {
      await this.registrationService.saveRegistration(this.reg); // Save registration before open modal page
      this.snowTempModal = await this.modalContoller.create({
        component: SnowTempModalPage,
        componentProps: {
          regId: this.reg.id,
        }
      });
      this.snowTempModal.present();
      await this.snowTempModal.onDidDismiss();
      this.snowTempModal = null;
    }
  }
}
