import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DensityProfileDto } from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';
import { IRegistration } from '../../../../models/registration.model';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss']
})
export class SnowDensityComponent implements OnInit {

  @Input() reg: IRegistration;
  private densityModal: HTMLIonModalElement;

  get profiles(): DensityProfileDto[] {
    return (((this.reg || {}).request || {}).SnowProfile2 || {}).SnowDensity || [];
  }

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profiles);
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.densityModal) {
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
