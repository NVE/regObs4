import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import * as L from 'leaflet';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import moment from 'moment';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';

@Component({
  selector: 'app-avalanche-obs',
  templateUrl: './avalanche-obs.page.html',
  styleUrls: ['./avalanche-obs.page.scss'],
})
export class AvalancheObsPage extends BasePage {

  expoArray: SelectOption[] = [
    {
      text: 'DIRECTION.N',
      id: '10000000'
    },
    {
      text: 'DIRECTION.NE',
      id: '01000000'
    },
    {
      text: 'DIRECTION.E',
      id: '00100000'
    },
    {
      text: 'DIRECTION.SE',
      id: '00010000'
    },
    {
      text: 'DIRECTION.S',
      id: '00001000'
    },
    {
      text: 'DIRECTION.SW',
      id: '00000100'
    },
    {
      text: 'DIRECTION.W',
      id: '00000010'
    },
    {
      text: 'DIRECTION.NW',
      id: '00000001'
    }
  ];

  showWarning = false;
  maxDate: string;

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
    this.maxDate = this.getMaxDateForNow();
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  async onReset() {
    this.showWarning = false;
    // Also reset Incident when Avalanche obs is reset.
    await this.basePageService.reset(this.registration, RegistrationTid.Incident);
  }

  isValid() {
    this.showWarning = true;
    return !!this.registration.request.AvalancheObs.DtAvalancheTime;
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
