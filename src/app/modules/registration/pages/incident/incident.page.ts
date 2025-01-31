import {
  IonToolbar,
  IonListHeader,
  IonLabel,
  IonContent,
  IonBackButton,
  IonTitle,
  IonList,
  IonHeader,
  IonButtons,
} from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { BasePage } from '../base.page';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IncidentEditModel } from 'src/app/modules/common-regobs-api';
import { IncidentValidation } from 'src/app/core/helpers/incident-validation';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../components/registration-content-wrapper/registration-content-wrapper.component';
import { KdvSelectComponent } from '../../../../components/kdv-select/kdv-select.component';
import { NumericInputComponent } from '../../components/numeric-input/numeric-input.component';
import { TextCommentComponent } from '../../components/text-comment/text-comment.component';
import { AddWebUrlItemComponent } from '../../components/add-web-url-item/add-web-url-item.component';
import { EditImagesComponent } from '../../components/edit-images/edit-images.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss'],
  imports: [
    AddWebUrlItemComponent,
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    NgIf,
    NumericInputComponent,
    RegistrationContentWrapperComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class IncidentPage extends BasePage {
  override registrationTid = RegistrationTid.Incident;

  isCasualtiesValid = true;
  isDeadValid = true;

  get geoHazardName(): string {
    return GeoHazard[this.draft.registration.GeoHazardTID];
  }

  get incident(): IncidentEditModel {
    if (this.draft.registration.Incident == null) {
      this.draft.registration.Incident = {};
    }
    return this.draft.registration.Incident;
  }

  constructor() {
    super();
  }

  groupValidate() {
    this.isCasualtiesValid = IncidentValidation.onCasualtiesNumChange(this.incident);
    this.isDeadValid = IncidentValidation.onDeadNumChange(this.incident);
  }

  override isValid() {
    this.groupValidate();
    return this.isCasualtiesValid && this.isDeadValid;
  }
}
