import { Component, NgZone } from '@angular/core';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';
import { ModalController } from '@ionic/angular';
import { IceLayerPage } from './ice-layer/ice-layer.page';
import { IceThicknessLayerDto } from '../../../../regobs-api/models';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { NumberHelper } from '../../../../../core/helpers/number-helper';

@Component({
  selector: 'app-ice-thickness',
  templateUrl: './ice-thickness.page.html',
  styleUrls: ['./ice-thickness.page.scss'],
})
export class IceThicknessPage extends BasePage {

  iceHeightBefore: boolean = undefined;
  iceHeightAfter: boolean = undefined;

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
    if (this.registration.request.IceThickness.IceHeightBefore < 0) {
      this.registration.request.IceThickness.IceHeightBefore = this.registration.request.IceThickness.IceHeightBefore * -1;
      this.iceHeightBefore = true;
    } else if (this.registration.request.IceThickness.IceHeightBefore === 0) {
      this.iceHeightBefore = false;
    }
    if (this.registration.request.IceThickness.IceHeightAfter > 0) {
      this.iceHeightAfter = false;
    } else if (this.registration.request.IceThickness.IceHeightAfter < 0) {
      this.registration.request.IceThickness.IceHeightAfter = this.registration.request.IceThickness.IceHeightAfter * -1;
      this.iceHeightAfter = true;
    }
  }

  onBeforeLeave() {
    if (this.registration) {
      if (this.iceHeightBefore === undefined) {
        this.registration.request.IceThickness.IceHeightBefore = undefined;
      } else if (this.registration.request.IceThickness.IceHeightBefore > 0) {
        this.registration.request.IceThickness.IceHeightBefore = this.registration.request.IceThickness.IceHeightBefore * -1;
      } else {
        this.registration.request.IceThickness.IceHeightBefore = 0;
      }
      if (this.iceHeightAfter === undefined) {
        this.registration.request.IceThickness.IceHeightAfter = undefined;
      } else if (this.iceHeightAfter === true && NumberHelper.isNumeric(this.registration.request.IceThickness.IceHeightAfter)) {
        this.registration.request.IceThickness.IceHeightAfter = this.registration.request.IceThickness.IceHeightAfter * -1;
      }
    }
  }


  isEmpty() {
    return this.basePageService.RegistrationService.isEmpty(this.registration, this.registrationTid) &&
      this.iceHeightAfter === undefined && this.iceHeightBefore === undefined;
  }

  onReset() {
    this.iceHeightAfter = undefined;
    this.iceHeightBefore = undefined;
    this.registration.request.IceThickness.IceThicknessLayer = [];
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
    const newSum = (this.registration.request.IceThickness.IceThicknessLayer || [])
      .reduce((p, c) => p + (c.IceLayerThickness || 0), 0);
    this.ngZone.run(() => {
      this.registration.request.IceThickness.IceThicknessSum = newSum;
    });
  }

  removeLayerAtIndex(index: number) {
    this.ngZone.run(() => {
      this.registration.request.IceThickness.IceThicknessLayer.splice(index, 1);
    });
    this.calculateIceThicknessSum();
  }
}
