import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.page.html',
  styleUrls: ['./compression-test.page.scss']
})
export class CompressionTestPage extends BasePage {
  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute
  ) {
    super(RegistrationTid.CompressionTest, basePageService, activatedRoute);
  }
}
