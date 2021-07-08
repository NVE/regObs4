import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '@varsom-regobs-common/registration';

@Component({
  selector: 'app-snow-surface',
  templateUrl: './snow-surface.page.html',
  styleUrls: ['./snow-surface.page.scss']
})
export class SnowSurfacePage extends BasePage {
  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute
  ) {
    super(
      RegistrationTid.SnowSurfaceObservation,
      basePageService,
      activatedRoute
    );
  }
}
