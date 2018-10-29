import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { BasePage } from '../base.page';

@Component({
  selector: 'app-general-comment',
  templateUrl: './general-comment.page.html',
  styleUrls: ['./general-comment.page.scss'],
})
export class GeneralCommentPage extends BasePage {
  constructor(
    registrationService: RegistrationService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(RegistrationTid.GeneralObservation, registrationService, changeDetectorRef);
  }

  onInit() {
  }
}
