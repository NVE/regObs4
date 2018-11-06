import { Component } from '@angular/core';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-comment',
  templateUrl: './general-comment.page.html',
  styleUrls: ['./general-comment.page.scss'],
})
export class GeneralCommentPage extends BasePage {
  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.GeneralObservation, basePageService, activatedRoute);
  }
}
