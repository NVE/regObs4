import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { RegistrationService } from '../../../services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import * as L from 'leaflet';

@Component({
  selector: 'app-landslide-obs',
  templateUrl: './landslide-obs.page.html',
  styleUrls: ['./landslide-obs.page.scss'],
})
export class LandslideObsPage extends BasePage {

  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController,
  ) {
    super(RegistrationTid.LandSlideObs, registrationService, actvatedRoute, changeDetectorRef);
  }

  onReset() {
    this.changeDetectorRef.detectChanges();
  }

  updateUi() {
    this.changeDetectorRef.detectChanges();
  }

  async setLandslidePosition() {
    const relativeToLatLng = this.registration.ObsLocation
      ? L.latLng(this.registration.ObsLocation.Latitude, this.registration.ObsLocation.Longitude) : null;
    const startLatLng = this.registration.LandSlideObs.StartLat && this.registration.LandSlideObs.StartLong ?
      L.latLng(this.registration.LandSlideObs.StartLat, this.registration.LandSlideObs.StartLong) : null;
    const endLatLng = this.registration.LandSlideObs.StopLat && this.registration.LandSlideObs.StopLong ?
      L.latLng(this.registration.LandSlideObs.StopLat, this.registration.LandSlideObs.StopLong) : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: { relativeToLatLng, startLatLng, endLatLng },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.registration.LandSlideObs.StartLat = start.lat;
      this.registration.LandSlideObs.StartLong = start.lng;
      this.registration.LandSlideObs.StopLat = end.lat;
      this.registration.LandSlideObs.StopLong = end.lng;
    }
  }

}
