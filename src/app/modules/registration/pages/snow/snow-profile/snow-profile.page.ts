import { Component, OnInit } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';

@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.page.html',
  styleUrls: ['./snow-profile.page.scss'],
})
export class SnowProfilePage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.SnowProfile, basePageService, activatedRoute);
  }
}
