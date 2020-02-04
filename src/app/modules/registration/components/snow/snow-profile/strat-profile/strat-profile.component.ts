import { Component, OnInit, Input } from '@angular/core';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { StratProfileModalPage } from './strat-profile-modal/strat-profile-modal.page';
import { IRegistration } from '../../../../models/registration.model';
import { RegistrationService } from '../../../../services/registration.service';
import { StratProfileDto } from '../../../../../regobs-api/models';

@Component({
  selector: 'app-strat-profile',
  templateUrl: './strat-profile.component.html',
  styleUrls: ['./strat-profile.component.scss']
})
export class StratProfileComponent implements OnInit {

  @Input() reg: IRegistration;

  private modal: HTMLIonModalElement;

  get profile(): StratProfileDto {
    if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.StratProfile) {
      return this.reg.request.SnowProfile2.StratProfile;
    }
    return {};
  }

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profile);
  }

  constructor(private modalContoller: ModalController, private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.modal) {
      await this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
      this.modal = await this.modalContoller.create({
        component: StratProfileModalPage,
        componentProps: {
          regId: this.reg.id,
        }
      });
      this.modal.present();
      await this.modal.onDidDismiss();
      this.modal = null;
    }
  }
}
