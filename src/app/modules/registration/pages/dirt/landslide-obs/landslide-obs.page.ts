import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { ModalController, IonicModule } from '@ionic/angular';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import * as L from 'leaflet';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgClass, DecimalPipe } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { DatetimePickerComponent } from '../../../../../components/datetime-picker/datetime-picker.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { AddWebUrlItemComponent } from '../../../components/add-web-url-item/add-web-url-item.component';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Form to register landslide observations
 */
@Component({
  selector: 'app-landslide-obs',
  templateUrl: './landslide-obs.page.html',
  styleUrls: ['./landslide-obs.page.scss'],
  imports: [
    IonicModule,
    HeaderColorDirective,
    NgIf,
    RegistrationContentWrapperComponent,
    NgClass,
    DatetimePickerComponent,
    KdvSelectComponent,
    TextCommentComponent,
    EditImagesComponent,
    AddWebUrlItemComponent,
    DecimalPipe,
    TranslateModule,
  ],
})
export class LandslideObsPage extends BasePage {
  maxDateStart: string;
  maxDateEnd: string;
  minDateEnd: string;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {
    super(RegistrationTid.LandSlideObs, basePageService, activatedRoute);
  }

  get dateIsDifferentThanObsTime() {
    return (
      this.draft.registration.LandSlideObs.DtLandSlideTime &&
      !moment(this.draft.registration.LandSlideObs.DtLandSlideTime)
        .startOf('day')
        .isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
    );
  }

  get dateEndIsDifferentThanObsTime() {
    return (
      this.draft.registration.LandSlideObs.DtLandSlideTimeEnd &&
      !moment(this.draft.registration.LandSlideObs.DtLandSlideTimeEnd)
        .startOf('day')
        .isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
    );
  }

  onInit() {
    if (!this.draft.registration.LandSlideObs.Urls) {
      this.draft.registration.LandSlideObs.Urls = [];
    }
    if (this.draft.registration.LandSlideObs.DtLandSlideTimeEnd) {
      this.maxDateStart = moment(this.draft.registration.LandSlideObs.DtLandSlideTimeEnd).toISOString(true);
    } else {
      this.maxDateStart = this.getMaxDateForNow();
    }
    if (this.draft.registration.LandSlideObs.DtLandSlideTime) {
      this.minDateEnd = moment(this.draft.registration.LandSlideObs.DtLandSlideTime).toISOString(true);
    }
    this.maxDateEnd = this.getMaxDateForNow();
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().toISOString(true);
  }

  dtTimeChanged() {
    this.minDateEnd = moment(this.draft.registration.LandSlideObs.DtLandSlideTime).toISOString(true);
    if (
      this.draft.registration.LandSlideObs.DtLandSlideTimeEnd &&
      moment(this.draft.registration.LandSlideObs.DtLandSlideTimeEnd).isBefore(
        moment(this.draft.registration.LandSlideObs.DtLandSlideTime)
      )
    ) {
      this.draft.registration.LandSlideObs.DtLandSlideTimeEnd = this.draft.registration.LandSlideObs.DtLandSlideTime;
    }
  }

  dtEndTimeChanged() {
    this.maxDateStart = moment(this.draft.registration.LandSlideObs.DtLandSlideTimeEnd).toISOString(true);
    if (
      this.draft.registration.LandSlideObs.DtLandSlideTime &&
      moment(this.draft.registration.LandSlideObs.DtLandSlideTime).isAfter(
        moment(this.draft.registration.LandSlideObs.DtLandSlideTimeEnd)
      )
    ) {
      this.draft.registration.LandSlideObs.DtLandSlideTime = this.draft.registration.LandSlideObs.DtLandSlideTimeEnd;
    }
  }

  isValid() {
    return (
      this.draft?.registration?.LandSlideObs &&
      !!this.draft.registration.LandSlideObs.DtLandSlideTime &&
      !!this.draft.registration.LandSlideObs.DtLandSlideTimeEnd
    );
  }

  setDtLandSlideTimeToNow() {
    this.draft.registration.LandSlideObs.DtLandSlideTime = moment().toISOString(true);
  }

  setDtLandSlideTimeEndToNow() {
    this.draft.registration.LandSlideObs.DtLandSlideTimeEnd = moment().toISOString(true);
  }

  async setLandslidePosition() {
    const reg = this.draft.registration;
    const relativeToLatLng = reg.ObsLocation ? L.latLng(reg.ObsLocation.Latitude, reg.ObsLocation.Longitude) : null;
    const startLatLng =
      reg.LandSlideObs.StartLat && reg.LandSlideObs.StartLong
        ? L.latLng(reg.LandSlideObs.StartLat, reg.LandSlideObs.StartLong)
        : null;
    const endLatLng =
      reg.LandSlideObs.StopLat && reg.LandSlideObs.StopLong
        ? L.latLng(reg.LandSlideObs.StopLat, reg.LandSlideObs.StopLong)
        : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: {
        relativeToLatLng,
        startLatLng,
        endLatLng,
        extent: reg.LandSlideObs.Extent,
        startExtent: reg.LandSlideObs.StartExtent,
        endExtent: reg.LandSlideObs.StopExtent,
        geoHazard: reg.GeoHazardTID,
      },
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      const reg = this.draft.registration;
      reg.LandSlideObs.StartLat = start.lat;
      reg.LandSlideObs.StartLong = start.lng;
      reg.LandSlideObs.StopLat = end.lat;
      reg.LandSlideObs.StopLong = end.lng;
      reg.LandSlideObs.Extent = result.data.totalPolygon;
      reg.LandSlideObs.StartExtent = result.data.startPolygon;
      reg.LandSlideObs.StopExtent = result.data.endPolygon;
    }
  }
}
