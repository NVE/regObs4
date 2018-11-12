import { Component, NgZone } from '@angular/core';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';
import { ModalController } from '@ionic/angular';
import { IceLayerPage } from './ice-layer/ice-layer.page';
import { IceThicknessLayerDto } from '../../../../regobs-api/models';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ice-thickness',
  templateUrl: './ice-thickness.page.html',
  styleUrls: ['./ice-thickness.page.scss'],
})

export class IceThicknessPage extends BasePage {
  minSnowDepth = 0;
  maxSnowDepth = 10000;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
  ) {
    super(RegistrationTid.IceThickness, basePageService, activatedRoute);
  }

  onInit() {
    if (!this.registration.request.IceThickness.IceThicknessLayer) {
      this.registration.request.IceThickness.IceThicknessLayer = [];
    }
  }

  onSnowDepthChange(val: number) {
    this.ngZone.run(() => {
      if (val < this.minSnowDepth) {
        val = this.minSnowDepth;
      }
    });
  }

  async addOrEditThicknessLayer(index?: number) {
    const modal = await this.modalController.create({
      component: IceLayerPage,
      componentProps: { iceThicknessLayer: this.registration.request.IceThickness.IceThicknessLayer[index] },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        this.removeLayerAtIndex(index);
      } else {
        const iceThicknessLayerCopy: IceThicknessLayerDto = result.data;
        if (index !== undefined) {
          this.setIceThicknessLayer(index, iceThicknessLayerCopy);
        } else {
          this.addIceThicknessLayer(iceThicknessLayerCopy);
        }
      }
    }
  }

  onIceThicknessReorder(event: CustomEvent) {
    this.ngZone.run(() => {
      this.reorderList(this.registration.request.IceThickness.IceThicknessLayer, event.detail.from, event.detail.to);
    });
    event.detail.complete();
  }

  reorderList(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  }

  setIceThicknessLayer(index: number, iceThicknessLayer: IceThicknessLayerDto) {
    this.ngZone.run(() => {
      this.registration.request.IceThickness.IceThicknessLayer[index] = iceThicknessLayer;
    });
    this.calculateIceThicknessSum();
  }

  addIceThicknessLayer(iceThicknessLayer: IceThicknessLayerDto) {
    this.ngZone.run(() => {
      this.registration.request.IceThickness.IceThicknessLayer.push(iceThicknessLayer);
    });
    this.calculateIceThicknessSum();
  }

  calculateIceThicknessSum() {
    this.ngZone.run(() => {
      this.registration.request.IceThickness.IceThicknessSum = this.registration.request.IceThickness.IceThicknessLayer
        .reduce((p, c) => p + (c.IceLayerThickness || 0), 0);
    });
  }

  removeLayerAtIndex(index: number) {
    this.ngZone.run(() => {
      this.registration.request.IceThickness.IceThicknessLayer.splice(index, 1);
    });
    this.calculateIceThicknessSum();
  }
}
