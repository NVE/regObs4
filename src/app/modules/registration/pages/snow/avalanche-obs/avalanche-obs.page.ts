import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import * as L from 'leaflet';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';

@Component({
  selector: 'app-avalanche-obs',
  templateUrl: './avalanche-obs.page.html',
  styleUrls: ['./avalanche-obs.page.scss'],
})
export class AvalancheObsPage extends BasePage {

  expoArray = [
    {
      name: 'N',
      val: '10000000'
    },
    {
      name: 'NØ',
      val: '01000000'
    },
    {
      name: 'Ø',
      val: '00100000'
    },
    {
      name: 'SØ',
      val: '00010000'
    },
    {
      name: 'S',
      val: '00001000'
    },
    {
      name: 'SV',
      val: '00000100'
    },
    {
      name: 'V',
      val: '00000010'
    },
    {
      name: 'NV',
      val: '00000001'
    }
  ];

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
  ) {
    super(RegistrationTid.AvalancheObs, basePageService, activatedRoute);
  }

  onInit() {
    if (!this.registration.Incident) {
      this.registration.Incident = {};
    }
  }

  async onReset() {
    await this.basePageService.reset(this.registration, RegistrationTid.Incident);
  }

  isValid() {
    return !!this.registration.AvalancheObs.DtAvalancheTime;
  }

  isEmpty() {
    return this.basePageService.RegistrationService.isEmpty(this.registration, this.registrationTid)
      && this.basePageService.RegistrationService.isEmpty(this.registration, RegistrationTid.Incident);
  }

  async setAvalanchePosition() {
    const relativeToLatLng = this.registration.ObsLocation
      ? L.latLng(this.registration.ObsLocation.Latitude, this.registration.ObsLocation.Longitude) : null;
    const startLatLng = this.registration.AvalancheObs.StartLat && this.registration.AvalancheObs.StartLong ?
      L.latLng(this.registration.AvalancheObs.StartLat, this.registration.AvalancheObs.StartLong) : null;
    const endLatLng = this.registration.AvalancheObs.StopLat && this.registration.AvalancheObs.StopLong ?
      L.latLng(this.registration.AvalancheObs.StopLat, this.registration.AvalancheObs.StopLong) : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: { relativeToLatLng, startLatLng, endLatLng },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.registration.AvalancheObs.StartLat = start.lat;
      this.registration.AvalancheObs.StartLong = start.lng;
      this.registration.AvalancheObs.StopLat = end.lat;
      this.registration.AvalancheObs.StopLong = end.lng;
    }
  }

}
