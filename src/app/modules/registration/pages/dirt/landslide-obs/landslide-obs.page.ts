import { Component, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '@varsom-regobs-common/registration';
import { ModalController } from '@ionic/angular';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import * as L from 'leaflet';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-landslide-obs',
  templateUrl: './landslide-obs.page.html',
  styleUrls: ['./landslide-obs.page.scss']
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
      this.registration.request.LandSlideObs.DtLandSlideTime &&
      !moment(this.registration.request.LandSlideObs.DtLandSlideTime)
        .startOf('day')
        .isSame(moment(this.registration.request.DtObsTime).startOf('day'))
    );
  }

  get dateEndIsDifferentThanObsTime() {
    return (
      this.registration.request.LandSlideObs.DtLandSlideTimeEnd &&
      !moment(this.registration.request.LandSlideObs.DtLandSlideTimeEnd)
        .startOf('day')
        .isSame(moment(this.registration.request.DtObsTime).startOf('day'))
    );
  }

  onInit() {
    if (!this.registration.request.LandSlideObs.Urls) {
      this.registration.request.LandSlideObs.Urls = [];
    }
    if (this.registration.request.LandSlideObs.DtLandSlideTimeEnd) {
      this.maxDateStart = moment(
        this.registration.request.LandSlideObs.DtLandSlideTimeEnd
      ).toISOString(true);
    } else {
      this.maxDateStart = this.getMaxDateForNow();
    }
    if (this.registration.request.LandSlideObs.DtLandSlideTime) {
      this.minDateEnd = moment(
        this.registration.request.LandSlideObs.DtLandSlideTime
      ).toISOString(true);
    }
    this.maxDateEnd = this.getMaxDateForNow();
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().toISOString(true);
  }

  dtTimeChanged() {
    this.minDateEnd = moment(
      this.registration.request.LandSlideObs.DtLandSlideTime
    ).toISOString(true);
    if (
      this.registration.request.LandSlideObs.DtLandSlideTimeEnd &&
      moment(
        this.registration.request.LandSlideObs.DtLandSlideTimeEnd
      ).isBefore(moment(this.registration.request.LandSlideObs.DtLandSlideTime))
    ) {
      this.registration.request.LandSlideObs.DtLandSlideTimeEnd = this.registration.request.LandSlideObs.DtLandSlideTime;
    }
  }

  dtEndTimeChanged() {
    this.maxDateStart = moment(
      this.registration.request.LandSlideObs.DtLandSlideTimeEnd
    ).toISOString(true);
    if (
      this.registration.request.LandSlideObs.DtLandSlideTime &&
      moment(this.registration.request.LandSlideObs.DtLandSlideTime).isAfter(
        moment(this.registration.request.LandSlideObs.DtLandSlideTimeEnd)
      )
    ) {
      this.registration.request.LandSlideObs.DtLandSlideTime = this.registration.request.LandSlideObs.DtLandSlideTimeEnd;
    }
  }

  isValid() {
    return (
      this.registration &&
      this.registration.request.LandSlideObs &&
      !!this.registration.request.LandSlideObs.DtLandSlideTime &&
      !!this.registration.request.LandSlideObs.DtLandSlideTimeEnd
    );
  }

  setDtLandSlideTimeToNow() {
    this.registration.request.LandSlideObs.DtLandSlideTime = moment().toISOString(
      true
    );
  }

  setDtLandSlideTimeEndToNow() {
    this.registration.request.LandSlideObs.DtLandSlideTimeEnd = moment().toISOString(
      true
    );
  }

  async setLandslidePosition() {
    const relativeToLatLng = this.registration.request.ObsLocation
      ? L.latLng(
        this.registration.request.ObsLocation.Latitude,
        this.registration.request.ObsLocation.Longitude
      )
      : null;
    const startLatLng =
      this.registration.request.LandSlideObs.StartLat &&
      this.registration.request.LandSlideObs.StartLong
        ? L.latLng(
          this.registration.request.LandSlideObs.StartLat,
          this.registration.request.LandSlideObs.StartLong
        )
        : null;
    const endLatLng =
      this.registration.request.LandSlideObs.StopLat &&
      this.registration.request.LandSlideObs.StopLong
        ? L.latLng(
          this.registration.request.LandSlideObs.StopLat,
          this.registration.request.LandSlideObs.StopLong
        )
        : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: {
        relativeToLatLng,
        startLatLng,
        endLatLng,
        geoHazard: this.registration.geoHazard
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.registration.request.LandSlideObs.StartLat = start.lat;
      this.registration.request.LandSlideObs.StartLong = start.lng;
      this.registration.request.LandSlideObs.StopLat = end.lat;
      this.registration.request.LandSlideObs.StopLong = end.lng;
    }
  }
}
