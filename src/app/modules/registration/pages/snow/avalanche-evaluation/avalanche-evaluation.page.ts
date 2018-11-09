import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-avalanche-evaluation',
  templateUrl: './avalanche-evaluation.page.html',
  styleUrls: ['./avalanche-evaluation.page.scss'],
})
export class AvalancheEvaluationPage extends BasePage {
  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.AvalancheEvaluation3, basePageService, activatedRoute);
  }

  onBeforeLeave() {
    if (!this.isEmpty() && this.registration.AvalancheEvaluation3.AvalancheDangerTID === undefined) {
      this.registration.AvalancheEvaluation3.AvalancheDangerTID = 0;
      // NOTE: If anything is registered, but danger is not set, set to 0 - not evaluated
    }
  }
}

