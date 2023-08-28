import { Component } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { hasAnyDataBesidesPropertyToExclude } from 'src/app/modules/common-registration/registration.helpers';

@Component({
  selector: 'app-general-comment',
  templateUrl: './general-comment.page.html',
  styleUrls: ['./general-comment.page.scss'],
})
export class GeneralCommentPage extends BasePage {
  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.GeneralObservation, basePageService, activatedRoute);
  }
  async isEmpty(): Promise<boolean> {
    //check if the existing generalObservation has any data besides excluded fields
    if (
      this.draft.registration.GeneralObservation.GeoHazardTID &&
      hasAnyDataBesidesPropertyToExclude(this.draft.registration.GeneralObservation, ['GeoHazardTID', 'GeoHazardName'])
    ) {
      return false;
    }
    // check if there are any attachments connected to the generalObservationG
    const hasAttachments = await super.hasAttachments(RegistrationTid.GeneralObservation);
    if (hasAttachments) {
      return false;
    }

    // check if a new generalObservation is not emtpy
    const isGeneralObservationEmpty = await super.isEmpty(RegistrationTid.GeneralObservation);
    return isGeneralObservationEmpty;
  }
}
