import {
  IonToolbar,
  IonListHeader,
  IonLabel,
  IonItemDivider,
  IonContent,
  IonBackButton,
  IonTitle,
  IonList,
  IonHeader,
  IonButtons,
} from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../base.page';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { RegistrationContentWrapperComponent } from '../../components/registration-content-wrapper/registration-content-wrapper.component';
import { TextCommentComponent } from '../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../components/edit-images/edit-images.component';
import { AddWebUrlItemComponent } from '../../components/add-web-url-item/add-web-url-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { hasAnyDataBesidesPropertyToExclude } from 'src/app/modules/common-registration/registration.helpers';
import { GeneralObservationEditModel, GeneralObservationViewModel } from 'src/app/modules/common-regobs-api';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-general-comment',
  templateUrl: './general-comment.page.html',
  styleUrls: ['./general-comment.page.scss'],
  imports: [
    AddWebUrlItemComponent,
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    RegistrationContentWrapperComponent,
    TextCommentComponent,
    TranslatePipe,
    NgIf,
  ],
})
export class GeneralCommentPage extends BasePage {
  override registrationTid = RegistrationTid.GeneralObservation;

  constructor() {
    super();
  }

  get edit(): GeneralObservationEditModel {
    if (this.draft.registration.GeneralObservation == null) {
      this.draft.registration.GeneralObservation = {};
    }
    return this.draft.registration.GeneralObservation;
  }

  override async isEmpty(): Promise<boolean> {
    //check if the existing generalObservation has any data besides excluded fields
    if (
      this.draft.registration.GeneralObservation?.GeoHazardTID &&
      hasAnyDataBesidesPropertyToExclude<GeneralObservationViewModel>(this.draft.registration.GeneralObservation, [
        'GeoHazardTID',
        'GeoHazardName',
      ])
    ) {
      return false;
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
