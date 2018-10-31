import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';
import { RegistrationService } from '../../../services/registration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ice-cover',
  templateUrl: './ice-cover.page.html',
  styleUrls: ['./ice-cover.page.scss'],
})
export class IceCoverPage extends BasePage {

  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(RegistrationTid.IceCoverObs, registrationService, actvatedRoute, changeDetectorRef);
  }
}
