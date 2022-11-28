import { Component, NgZone } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../../base.page';
import { ModalController } from '@ionic/angular';
import { IceLayerPage } from './ice-layer/ice-layer.page';
import { IceThicknessEditModel, IceThicknessLayerEditModel } from 'src/app/modules/common-regobs-api/models';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ice-thickness',
  templateUrl: './ice-thickness.page.html',
  styleUrls: ['./ice-thickness.page.scss'],
})
export class IceThicknessPage extends BasePage {
  isWaterBefore: boolean = undefined;
  isWaterAfter: boolean = undefined;
  waterHeightBefore: number = undefined;
  waterHeightAfter: number = undefined;
  waterDepthAfter: number = undefined;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone
  ) {
    super(RegistrationTid.IceThickness, basePageService, activatedRoute);
  }

  get iceThickness(): IceThicknessEditModel {
    return this.draft.registration.IceThickness;
  }

  onInit() {
    const iceThickness = this.iceThickness;

    if (!iceThickness.IceThicknessLayers) {
      iceThickness.IceThicknessLayers = [];
    }

    if (iceThickness.IceHeightBefore < 0) {
      this.isWaterBefore = true;
      this.waterHeightBefore = -iceThickness.IceHeightBefore;
    } else if (iceThickness.IceHeightBefore === 0) {
      this.isWaterBefore = false;
    }

    if (iceThickness.IceHeightAfter < 0) {
      this.isWaterAfter = true;
      this.waterHeightAfter = -iceThickness.IceHeightAfter;
    } else if (iceThickness.IceHeightAfter >= 0) {
      this.isWaterAfter = false;
      this.waterDepthAfter = iceThickness.IceHeightAfter;
    }
  }

  makeValidBeforeAfter() {
    const iceThickness = this.iceThickness;

    if (this.isWaterBefore === undefined) {
      iceThickness.IceHeightBefore = undefined;
    } else if (this.isWaterBefore && this.waterHeightBefore > 0) {
      iceThickness.IceHeightBefore = -this.waterHeightBefore;
    } else {
      iceThickness.IceHeightBefore = 0;
    }

    if (this.isWaterAfter === undefined) {
      iceThickness.IceHeightAfter = undefined;
    } else if (this.isWaterAfter && !isNaN(this.waterHeightAfter)) {
      iceThickness.IceHeightAfter = -this.waterHeightAfter;
    } else if (!this.isWaterAfter && !isNaN(this.waterDepthAfter)) {
      iceThickness.IceHeightAfter = this.waterDepthAfter;
    } else {
      iceThickness.IceHeightAfter = 0;
    }
  }

  isValid() {
    const checkBefore =
      Boolean(this.isWaterBefore) == Boolean(this.waterHeightBefore) || Boolean(this.isWaterBefore) == false;
    const checkAfter =
      (this.isWaterAfter && !isNaN(this.waterHeightAfter)) ||
      (this.isWaterAfter == false && !isNaN(this.waterDepthAfter)) ||
      this.isWaterAfter == undefined;

    const valid = checkBefore && checkAfter;
    if (valid) {
      this.makeValidBeforeAfter();
    }
    return valid;
  }

  async isEmpty(): Promise<boolean> {
    return (await super.isEmpty()) && this.isWaterAfter === undefined && this.isWaterBefore === undefined;
  }

  onReset() {
    this.isWaterAfter = undefined;
    this.isWaterBefore = undefined;
    this.waterHeightBefore = undefined;
    this.waterHeightAfter = undefined;
    this.waterDepthAfter = undefined;
    this.iceThickness.IceThicknessLayers = [];
  }

  async addOrEditThicknessLayer(index?: number) {
    const modal = await this.modalController.create({
      component: IceLayerPage,
      componentProps: {
        iceThicknessLayer: this.iceThickness.IceThicknessLayers[index],
      },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        this.removeLayerAtIndex(index);
      } else {
        const iceThicknessLayerCopy: IceThicknessLayerEditModel = result.data;
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
      this.reorderList(this.iceThickness.IceThicknessLayers, event.detail.from, event.detail.to);
    });
    event.detail.complete();
  }

  reorderList(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  }

  setIceThicknessLayer(index: number, iceThicknessLayer: IceThicknessLayerEditModel) {
    this.ngZone.run(() => {
      this.iceThickness.IceThicknessLayers[index] = iceThicknessLayer;
    });
    this.calculateIceThicknessSum();
  }

  addIceThicknessLayer(iceThicknessLayer: IceThicknessLayerEditModel) {
    this.ngZone.run(() => {
      this.iceThickness.IceThicknessLayers.push(iceThicknessLayer);
    });
    this.calculateIceThicknessSum();
  }

  calculateIceThicknessSum() {
    const newSum = (this.iceThickness.IceThicknessLayers || []).reduce((p, c) => p + (c.IceLayerThickness || 0), 0);
    this.ngZone.run(() => {
      this.iceThickness.IceThicknessSum = newSum;
    });
  }

  removeLayerAtIndex(index: number) {
    this.ngZone.run(() => {
      this.iceThickness.IceThicknessLayers.splice(index, 1);
    });
    this.calculateIceThicknessSum();
  }
}
