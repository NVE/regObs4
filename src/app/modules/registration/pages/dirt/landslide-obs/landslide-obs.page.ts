import { Component, inject } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import * as L from 'leaflet';
import moment from 'moment';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgClass, DecimalPipe } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { DatetimePickerComponent } from '../../../../../components/datetime-picker/datetime-picker.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { AddWebUrlItemComponent } from '../../../components/add-web-url-item/add-web-url-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { location, chevronForward, time } from 'ionicons/icons';
import { LandslideEditModel } from 'src/app/modules/common-regobs-api';

/**
 * Form to register landslide observations
 */
@Component({
  selector: 'app-landslide-obs',
  templateUrl: './landslide-obs.page.html',
  styleUrls: ['./landslide-obs.page.scss'],
  imports: [
    AddWebUrlItemComponent,
    DatetimePickerComponent,
    DecimalPipe,
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonText,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    NgClass,
    NgIf,
    RegistrationContentWrapperComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class LandslideObsPage extends BasePage {
  override registrationTid = RegistrationTid.LandSlideObs;
  private modalController = inject(ModalController);

  maxDateStart?: string;
  maxDateEnd?: string;
  minDateEnd?: string;

  constructor() {
    super();
    addIcons({ location, chevronForward, time });
  }

  get edit(): LandslideEditModel {
    if (this.draft.registration.LandSlideObs == null) {
      this.draft.registration.LandSlideObs = {} as LandslideEditModel;
    }
    return this.draft.registration.LandSlideObs;
  }

  get dateIsDifferentThanObsTime() {
    return (
      this.edit.DtLandSlideTime &&
      !moment(this.edit.DtLandSlideTime).startOf('day').isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
    );
  }

  get dateEndIsDifferentThanObsTime() {
    return (
      this.edit.DtLandSlideTimeEnd &&
      !moment(this.edit.DtLandSlideTimeEnd)
        .startOf('day')
        .isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
    );
  }

  override onInit() {
    if (!this.edit.Urls) {
      this.edit.Urls = [];
    }
    if (this.edit.DtLandSlideTimeEnd) {
      this.maxDateStart = moment(this.edit.DtLandSlideTimeEnd).toISOString(true);
    } else {
      this.maxDateStart = this.getMaxDateForNow();
    }
    if (this.edit.DtLandSlideTime) {
      this.minDateEnd = moment(this.edit.DtLandSlideTime).toISOString(true);
    }
    this.maxDateEnd = this.getMaxDateForNow();
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().toISOString(true);
  }

  dtTimeChanged() {
    this.minDateEnd = moment(this.edit.DtLandSlideTime).toISOString(true);
    if (
      this.edit.DtLandSlideTimeEnd &&
      moment(this.edit.DtLandSlideTimeEnd).isBefore(moment(this.edit.DtLandSlideTime))
    ) {
      this.edit.DtLandSlideTimeEnd = this.edit.DtLandSlideTime;
    }
  }

  dtEndTimeChanged() {
    this.maxDateStart = moment(this.edit.DtLandSlideTimeEnd).toISOString(true);
    if (this.edit.DtLandSlideTime && moment(this.edit.DtLandSlideTime).isAfter(moment(this.edit.DtLandSlideTimeEnd))) {
      this.edit.DtLandSlideTime = this.edit.DtLandSlideTimeEnd as string;
    }
  }

  override isValid() {
    return (
      this.draft?.registration?.LandSlideObs != null && !!this.edit.DtLandSlideTime && !!this.edit.DtLandSlideTimeEnd
    );
  }

  setDtLandSlideTimeToNow() {
    this.edit.DtLandSlideTime = moment().toISOString(true);
  }

  setDtLandSlideTimeEndToNow() {
    this.edit.DtLandSlideTimeEnd = moment().toISOString(true);
  }

  async setLandslidePosition() {
    const obsLocation = this.draft.registration.ObsLocation;
    const relativeToLatLng = obsLocation ? L.latLng(obsLocation.Latitude, obsLocation.Longitude) : null;
    const startLatLng =
      this.edit.StartLat && this.edit.StartLong ? L.latLng(this.edit.StartLat, this.edit.StartLong) : null;
    const endLatLng = this.edit.StopLat && this.edit.StopLong ? L.latLng(this.edit.StopLat, this.edit.StopLong) : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: {
        relativeToLatLng,
        startLatLng,
        endLatLng,
        extent: this.edit.Extent,
        startExtent: this.edit.StartExtent,
        endExtent: this.edit.StopExtent,
        geoHazard: this.draft.registration.GeoHazardTID,
      },
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.edit.StartLat = start.lat;
      this.edit.StartLong = start.lng;
      this.edit.StopLat = end.lat;
      this.edit.StopLong = end.lng;
      this.edit.Extent = result.data.totalPolygon;
      this.edit.StartExtent = result.data.startPolygon;
      this.edit.StopExtent = result.data.endPolygon;
    }
  }
}
