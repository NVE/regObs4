import { Component } from '@angular/core';
import { RegistrationTid } from '@varsom-regobs-common/registration';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ice-cover',
  templateUrl: './ice-cover.page.html',
  styleUrls: ['./ice-cover.page.scss']
})
export class IceCoverPage extends BasePage {
  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute
  ) {
    super(RegistrationTid.IceCoverObs, basePageService, activatedRoute);
  }
}
