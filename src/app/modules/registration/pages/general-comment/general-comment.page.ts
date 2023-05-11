import { Component } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { hasAnyDataBesidesPropertyToExclude } from 'src/app/modules/common-registration/registration.helpers';

// while creating generalObservation api adds two fields GeoHazardTID and GeoHazardName
// user cannot see those fields therefore while editing generalObservation and removing all the data in the app
// UI will show that generalObservation is still filled
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
    if (this.draft.registration.GeneralObservation.GeoHazardTID) {
      if (
        hasAnyDataBesidesPropertyToExclude(this.draft.registration.GeneralObservation, [
          'GeoHazardTID',
          'GeoHazardName',
        ])
      ) {
        return false;
      } else return true;
    }

    // check if there are any attachments connected to the generalObservation
    const hasAttachments = await super.hasAttachments(RegistrationTid.GeneralObservation);
    if (hasAttachments) {
      return false;
    }

    // check if a new generalObservation is not emtpy
    const isGeneralObservationEmpty = await super.isEmpty(RegistrationTid.GeneralObservation);
    return isGeneralObservationEmpty;
  }
}
