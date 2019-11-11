import { Component, OnInit, Input } from '@angular/core';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { SnowTempModalPage } from './snow-temp-modal/snow-temp-modal.page';
import { IRegistration } from '../../../../models/registration.model';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss']
})
export class SnowTempComponent implements OnInit {
  @Input() reg: IRegistration;
  private snowTempModal: HTMLIonModalElement;

  get tempProfile() {
    return (((this.reg || {}).request || {}).SnowProfile2 || {}).SnowTemp || {};
  }

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.tempProfile);
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.snowTempModal) {
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
