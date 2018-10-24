import { Component, OnInit, Inject } from '@angular/core';
import { Textarea } from '@ionic/angular';
import { RegistrationService } from '../../services/registration.service';
import { GeneralObservationDto, PictureRequestDto } from '../../../regobs-api/models';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { IRegistration } from '../../models/registration.model';
import { RegistationTid } from '../../models/registrationTid.enum';
import { BasePage } from '../base.page';

@Component({
  selector: 'app-general-comment',
  templateUrl: './general-comment.page.html',
  styleUrls: ['./general-comment.page.scss'],
})
export class GeneralCommentPage extends BasePage {
  registrationTid = RegistationTid.GeneralObservation;
  constructor(
    registrationService: RegistrationService
  ) {
    super(registrationService);
  }

  onInit() {
    if (!this.registration.GeneralObservation) {
      this.registration.GeneralObservation = {};
    }
    if (!this.registration.Picture) {
      this.registration.Picture = [];
    }
  }
}
