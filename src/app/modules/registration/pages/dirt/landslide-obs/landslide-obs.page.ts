import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { ModalController } from '@ionic/angular';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import * as L from 'leaflet';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landslide-obs',
  templateUrl: './landslide-obs.page.html',
  styleUrls: ['./landslide-obs.page.scss'],
})
export class LandslideObsPage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
  ) {
    super(RegistrationTid.LandSlideObs, basePageService, activatedRoute);
  }

  onInit() {
    if (!this.registration.request.LandSlideObs.Urls) {
      this.registration.request.LandSlideObs.Urls = [];
    }
  }

  isValid() {
    return this.registration
      && this.registration.request.LandSlideObs
      && !!this.registration.request.LandSlideObs.DtLandSlideTime
      && !!this.registration.request.LandSlideObs.DtLandSlideTimeEnd;
  }

  async setLandslidePosition() {
    const relativeToLatLng = this.registration.request.ObsLocation
      ? L.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
    const startLatLng = this.registration.request.LandSlideObs.StartLat && this.registration.request.LandSlideObs.StartLong ?
      L.latLng(this.registration.request.LandSlideObs.StartLat, this.registration.request.LandSlideObs.StartLong) : null;
    const endLatLng = this.registration.request.LandSlideObs.StopLat && this.registration.request.LandSlideObs.StopLong ?
      L.latLng(this.registration.request.LandSlideObs.StopLat, this.registration.request.LandSlideObs.StopLong) : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: { relativeToLatLng, startLatLng, endLatLng },
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
