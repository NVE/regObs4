import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../../services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';
import { ModalController } from '@ionic/angular';
import { IceLayerPage } from './ice-layer/ice-layer.page';
import { IceThicknessLayerDto } from '../../../../regobs-api/models';

@Component({
  selector: 'app-ice-thickness',
  templateUrl: './ice-thickness.page.html',
  styleUrls: ['./ice-thickness.page.scss'],
})

export class IceThicknessPage extends BasePage {
  minSnowDepth = 0;
  maxSnowDepth = 10000;

  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController,
  ) {
    super(RegistrationTid.IceThickness, registrationService, actvatedRoute, changeDetectorRef);
  }

  onInit() {
    if (!this.registration.IceThickness.IceThicknessLayer) {
      this.registration.IceThickness.IceThicknessLayer = [];
    }
  }

  onSnowDepthChange(val: number) {
    if (val < this.minSnowDepth) {
      val = this.minSnowDepth;
    }
    this.changeDetectorRef.detectChanges();
  }

  async addOrEditThicknessLayer(index?: number) {
    const modal = await this.modalController.create({
      component: IceLayerPage,
      componentProps: { iceThicknessLayer: this.registration.IceThickness.IceThicknessLayer[index] },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const iceThicknessLayerCopy: IceThicknessLayerDto = result.data;
      if (index !== undefined) {
        this.registration.IceThickness.IceThicknessLayer[index] = iceThicknessLayerCopy;
      } else {
        this.registration.IceThickness.IceThicknessLayer.push(iceThicknessLayerCopy);
      }
      this.registration.IceThickness.IceThicknessSum = this.registration.IceThickness.IceThicknessLayer
        .reduce((p, c) => p + (c.IceLayerThickness || 0), 0);
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
