import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DensityProfileDto } from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';
import { IRegistration } from '../../../../models/registration.model';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { RegistrationService } from '../../../../services/registration.service';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss']
})
export class SnowDensityComponent implements OnInit {

  @Input() reg: IRegistration;
  private densityModal: HTMLIonModalElement;

  get profiles(): DensityProfileDto[] {
    if (this.reg
      && this.reg.request
      && this.reg.request.SnowProfile2
      && this.reg.request.SnowProfile2.SnowDensity
      && this.reg.request.SnowProfile2.SnowDensity.length > 0) {
      return this.reg.request.SnowProfile2.SnowDensity;
    }
    return [];
  }

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profiles);
  }

  constructor(private modalContoller: ModalController, private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.densityModal) {
      await this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
      this.densityModal = await this.modalContoller.create({
        component: SnowDensityModalPage,
        componentProps: {
          regId: this.reg.id,
        }
      });
      this.densityModal.present();
      await this.densityModal.onDidDismiss();
      this.densityModal = null;
    }
  }
}
