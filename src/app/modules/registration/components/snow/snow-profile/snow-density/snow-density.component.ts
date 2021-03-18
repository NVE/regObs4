import { Component, Input } from '@angular/core';
import { SnowDensityModel } from '@varsom-regobs-common/regobs-api';
import { ModalController } from '@ionic/angular';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';
import { IRegistration } from '@varsom-regobs-common/registration';
import { RegistrationService } from '../../../../services/registration.service';
import { isEmpty } from '@varsom-regobs-common/core';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss']
})
export class SnowDensityComponent {
  @Input() reg: IRegistration;
  private densityModal: HTMLIonModalElement;

  get profiles(): SnowDensityModel[] {
    if (
      this.reg &&
      this.reg.request &&
      this.reg.request.SnowProfile2 &&
      this.reg.request.SnowProfile2.SnowDensity &&
      this.reg.request.SnowProfile2.SnowDensity.length > 0
    ) {
      return this.reg.request.SnowProfile2.SnowDensity;
    }
    return [];
  }

  get isEmpty(): boolean {
    return isEmpty(this.profiles);
  }

  constructor(
    private modalContoller: ModalController,
    private registrationService: RegistrationService
  ) {}

  async openModal(): Promise<void> {
    if (!this.densityModal) {
      await this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
      this.densityModal = await this.modalContoller.create({
        component: SnowDensityModalPage,
        componentProps: {
          regId: this.reg.id
        }
      });
      this.densityModal.present();
      await this.densityModal.onDidDismiss();
      this.densityModal = null;
    }
  }
}
