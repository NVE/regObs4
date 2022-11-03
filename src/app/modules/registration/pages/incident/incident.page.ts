import { Component } from '@angular/core';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IncidentEditModel } from 'src/app/modules/common-regobs-api';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss']
})
export class IncidentPage extends BasePage {

  isInvolvedValid = true;
  isCasualtiesValid = true;
  isDeadValid = true;

  get geoHazardName(): string {
    return GeoHazard[this.draft.registration.GeoHazardTID];
  }

  get incident(): IncidentEditModel {
    return this.draft.registration.Incident;
  }

  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.Incident, basePageService, activatedRoute);
  }

  /**
   * If InvolvedNum is set then:
   * CasualtiesNum must be equal to or less than InvolvedNum.
   * DeadNum must be equal to or less than CasualtiesNum.
   * All numbers must be >= 0.
   * CasualtiesNum and DeadNum can be empty.
   */
  isValid() {
    const {
      InvolvedNum,
      CasualtiesNum,
      DeadNum
    } = this.incident;

    if (InvolvedNum) {
      this.isInvolvedValid = InvolvedNum >= 0;
      this.isCasualtiesValid = CasualtiesNum === undefined || CasualtiesNum <= InvolvedNum;
      this.isDeadValid = DeadNum === undefined || DeadNum <= CasualtiesNum;
    }

    return this.isInvolvedValid && this.isCasualtiesValid && this.isDeadValid;
  }
}
