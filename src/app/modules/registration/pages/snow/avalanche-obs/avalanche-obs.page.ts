import { Component, inject } from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import L from 'leaflet';
import moment from 'moment';
import { IncidentValidation } from 'src/app/core/helpers/incident-validation';
import {
  createEmptyRegistration,
  hasAnyDataBesidesPropertyToExclude,
} from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { AvalancheObsEditModel, IncidentEditModel } from 'src/app/modules/common-regobs-api';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { BasePage } from '../../base.page';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgClass, DecimalPipe } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { DatetimePickerComponent } from '../../../../../components/datetime-picker/datetime-picker.component';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { FormsModule } from '@angular/forms';
import { NumericInputComponent } from '../../../components/numeric-input/numeric-input.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { AddWebUrlItemComponent } from '../../../components/add-web-url-item/add-web-url-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { time, location, chevronForward } from 'ionicons/icons';

/**
 * Used to register both avalanche observations and incidents, so this page contains two forms.
 * You can also upload images which will be attached to the avalanche observation.
 */
@Component({
  selector: 'app-avalanche-obs',
  templateUrl: './avalanche-obs.page.html',
  styleUrls: ['./avalanche-obs.page.scss'],
  imports: [
    AddWebUrlItemComponent,
    DatetimePickerComponent,
    DecimalPipe,
    EditImagesComponent,
    FormsModule,
    HeaderColorDirective,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar,
    KdvSelectComponent,
    NgClass,
    NgIf,
    NumericInputComponent,
    RegistrationContentWrapperComponent,
    SelectComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class AvalancheObsPage extends BasePage {
  override registrationTid = RegistrationTid.AvalancheObs;

  private modalController = inject(ModalController);

  expoArray: SelectOption[] = [
    {
      text: 'DIRECTION.N',
      id: '10000000',
    },
    {
      text: 'DIRECTION.NE',
      id: '01000000',
    },
    {
      text: 'DIRECTION.E',
      id: '00100000',
    },
    {
      text: 'DIRECTION.SE',
      id: '00010000',
    },
    {
      text: 'DIRECTION.S',
      id: '00001000',
    },
    {
      text: 'DIRECTION.SW',
      id: '00000100',
    },
    {
      text: 'DIRECTION.W',
      id: '00000010',
    },
    {
      text: 'DIRECTION.NW',
      id: '00000001',
    },
  ];

  showWarning = false;
  maxDate = this.getMaxDateForNow();

  isInvolvedValid = true;
  isCasualtiesValid = true;
  isDeadValid = true;
  isHarmedValid = true;
  isErrorMessageHarmAndDead = false;

  get avalancheObs(): AvalancheObsEditModel {
    if (!this.draft.registration.AvalancheObs) {
      this.draft.registration.AvalancheObs = {
        DtAvalancheTime: this.draft.registration.DtObsTime,
      };
    } else if (!this.draft.registration.AvalancheObs.DtAvalancheTime) {
      this.draft.registration.AvalancheObs.DtAvalancheTime = this.draft.registration.DtObsTime;
    }
    return this.draft.registration.AvalancheObs;
  }

  get incident(): IncidentEditModel {
    if (!this.draft.registration.Incident) {
      this.draft.registration.Incident = {};
    }
    return this.draft.registration.Incident;
  }

  get dayDtAvalancheTimeIsDifferentThanDayObsTime() {
    return (
      this.avalancheObs.DtAvalancheTime &&
      !moment(this.avalancheObs.DtAvalancheTime)
        .startOf('day')
        .isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
    );
  }

  get dtAvalancheTimeIsDifferentThanObsTime() {
    return (
      this.avalancheObs.DtAvalancheTime &&
      !moment(this.avalancheObs.DtAvalancheTime).isSame(this.draft.registration.DtObsTime)
    );
  }

  constructor() {
    super();
    addIcons({ time, location, chevronForward });
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  override async reset() {
    const pleaseReset = await super.reset();
    if (pleaseReset) {
      // Also create new empty incident form
      this.draft = createEmptyRegistration(this.draft, RegistrationTid.Incident);
    }
    return pleaseReset;
  }

  override async delete() {
    //delete both forms
    this.draft = await this.basePageService.delete(this.draft, [this.registrationTid, RegistrationTid.Incident]);
  }

  groupValidate() {
    this.isCasualtiesValid = IncidentValidation.isCasualtiesValid(this.incident);
    this.onHarmedChange();
  }

  onHarmedChange() {
    const deadHasValue = this.incident.DeadNum != null;
    const harmedHasValue = this.incident.HarmedNum != null;
    const maxDeadAndHarmed = this.incident.CasualtiesNum || this.incident.InvolvedNum;
    const nDeadAndHarmed = (this.incident.HarmedNum || 0) + (this.incident.DeadNum || 0);
    const isDeadAndHarmedTooMany = maxDeadAndHarmed != null ? nDeadAndHarmed > maxDeadAndHarmed : false;
    this.isErrorMessageHarmAndDead = deadHasValue && harmedHasValue ? isDeadAndHarmedTooMany : false;
    this.isDeadValid = deadHasValue ? !isDeadAndHarmedTooMany : true;
    this.isHarmedValid = harmedHasValue ? !isDeadAndHarmedTooMany : true;
  }

  override isValid() {
    this.showWarning = true;

    this.groupValidate();

    return (
      !!this.avalancheObs.DtAvalancheTime &&
      this.isInvolvedValid &&
      this.isCasualtiesValid &&
      this.isDeadValid &&
      this.isHarmedValid
    );
  }

  override async isEmpty(): Promise<boolean> {
    // we need to ignore the default value of DtAvalancheTime

    if (
      this.avalancheObs.DtAvalancheTime &&
      (hasAnyDataBesidesPropertyToExclude(this.avalancheObs, ['DtAvalancheTime']) ||
        this.dtAvalancheTimeIsDifferentThanObsTime)
    ) {
      return false;
    }

    const hasAttachments = await super.hasAttachments(RegistrationTid.AvalancheObs);
    if (hasAttachments) {
      return false;
    }

    const isIncidentEmpty = await super.isEmpty(RegistrationTid.Incident);
    return isIncidentEmpty;
  }

  setAvalancheTimeTimeToNow() {
    this.avalancheObs.DtAvalancheTime = moment().toISOString(true);
  }

  async setAvalanchePosition() {
    const relativeToLatLng = this.draft.registration.ObsLocation
      ? L.latLng(this.draft.registration.ObsLocation.Latitude, this.draft.registration.ObsLocation.Longitude)
      : null;
    const startLatLng =
      this.avalancheObs.StartLat && this.avalancheObs.StartLong
        ? L.latLng(this.avalancheObs.StartLat, this.avalancheObs.StartLong)
        : null;
    const endLatLng =
      this.avalancheObs.StopLat && this.avalancheObs.StopLong
        ? L.latLng(this.avalancheObs.StopLat, this.avalancheObs.StopLong)
        : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: {
        relativeToLatLng,
        startLatLng,
        endLatLng,
        extent: this.avalancheObs.Extent,
        startExtent: this.avalancheObs.StartExtent,
        endExtent: this.avalancheObs.StopExtent,
        geoHazard: this.draft.registration.GeoHazardTID,
      },
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.avalancheObs.StartLat = start.lat;
      this.avalancheObs.StartLong = start.lng;
      this.avalancheObs.StopLat = end.lat;
      this.avalancheObs.StopLong = end.lng;
      this.avalancheObs.Extent = result.data.totalPolygon;
      this.avalancheObs.StartExtent = result.data.startPolygon;
      this.avalancheObs.StopExtent = result.data.endPolygon;
    }
  }
}

function isNaNOrNullish(value: number | null | undefined) {
  if (value == null) {
    return true;
  }
  return isNaN(value);
}
