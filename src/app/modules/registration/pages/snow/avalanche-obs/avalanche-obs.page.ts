import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import * as L from 'leaflet';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import * as moment from 'moment';
import { NumberHelper } from '../../../../../core/helpers/number-helper';

@Component({
  selector: 'app-avalanche-obs',
  templateUrl: './avalanche-obs.page.html',
  styleUrls: ['./avalanche-obs.page.scss'],
})
export class AvalancheObsPage extends BasePage {

  expoArray = [
    {
      name: 'DIRECTION.N',
      val: '10000000'
    },
    {
      name: 'DIRECTION.NE',
      val: '01000000'
    },
    {
      name: 'DIRECTION.E',
      val: '00100000'
    },
    {
      name: 'DIRECTION.SE',
      val: '00010000'
    },
    {
      name: 'DIRECTION.S',
      val: '00001000'
    },
    {
      name: 'DIRECTION.SW',
      val: '00000100'
    },
    {
      name: 'DIRECTION.W',
      val: '00000010'
    },
    {
      name: 'DIRECTION.NW',
      val: '00000001'
    }
  ];

  showWarning = false;
  maxDate: string;
  minFractureHeight = 0;
  maxFractureHeight = 9999;
  minFractureWidth = 0;
  maxFractureWidth = 99999;

  get fractureHeightValid() {
    return NumberHelper.isValid(
      this.registration.request.AvalancheObs.FractureHeight,
      this.minFractureHeight,
      this.maxFractureHeight,
      false,
      true);
  }

  get fractureWidthValid() {
    return NumberHelper.isValid(
      this.registration.request.AvalancheObs.FractureWidth,
      this.minFractureWidth,
      this.maxFractureWidth,
      false,
      true);
  }

  get dateIsDifferentThanObsTime() {
    return this.registration.request.AvalancheObs.DtAvalancheTime
      && !moment(this.registration.request.AvalancheObs.DtAvalancheTime)
        .startOf('day').isSame(moment(this.registration.request.DtObsTime).startOf('day'));
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {
    super(RegistrationTid.AvalancheObs, basePageService, activatedRoute);
  }

  onInit() {
    if (!this.registration.request.Incident) {
      this.registration.request.Incident = {};
    }
    this.maxDate = moment().toISOString(true);
  }

  async onReset() {
    this.showWarning = false;
    // Also reset Incident when Avalanche obs is reset.
    await this.basePageService.reset(this.registration, RegistrationTid.Incident);
  }

  isValid() {
    this.showWarning = true;
    return !!this.registration.request.AvalancheObs.DtAvalancheTime && this.fractureHeightValid;
  }

  isEmpty() {
    return this.basePageService.RegistrationService.isEmpty(this.registration, this.registrationTid)
      && this.basePageService.RegistrationService.isEmpty(this.registration, RegistrationTid.Incident);
  }

  setAvalancheTimeTimeToNow() {
    this.registration.request.AvalancheObs.DtAvalancheTime = moment().toISOString(true);
  }

  async setAvalanchePosition() {
    const relativeToLatLng = this.registration.request.ObsLocation
      ? L.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
    const startLatLng = this.registration.request.AvalancheObs.StartLat && this.registration.request.AvalancheObs.StartLong ?
      L.latLng(this.registration.request.AvalancheObs.StartLat, this.registration.request.AvalancheObs.StartLong) : null;
    const endLatLng = this.registration.request.AvalancheObs.StopLat && this.registration.request.AvalancheObs.StopLong ?
      L.latLng(this.registration.request.AvalancheObs.StopLat, this.registration.request.AvalancheObs.StopLong) : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: { relativeToLatLng, startLatLng, endLatLng, geoHazard: this.registration.geoHazard },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.registration.request.AvalancheObs.StartLat = start.lat;
      this.registration.request.AvalancheObs.StartLong = start.lng;
      this.registration.request.AvalancheObs.StopLat = end.lat;
      this.registration.request.AvalancheObs.StopLong = end.lng;
    }
  }

}
