import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
    private ngZone: NgZone,
  ) {
    super(RegistrationTid.IceThickness, registrationService, actvatedRoute, changeDetectorRef);
  }

  onInit() {
    if (!this.registration.IceThickness.IceThicknessLayer) {
      this.registration.IceThickness.IceThicknessLayer = [];
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
      componentProps: { iceThicknessLayer: this.registration.IceThickness.IceThicknessLayer[index] },
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
      this.reorderList(this.registration.IceThickness.IceThicknessLayer, event.detail.from, event.detail.to);
    });
    event.detail.complete();
  }

  reorderList(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  }

  setIceThicknessLayer(index: number, iceThicknessLayer: IceThicknessLayerDto) {
    this.ngZone.run(() => {
      this.registration.IceThickness.IceThicknessLayer[index] = iceThicknessLayer;
    });
    this.calculateIceThicknessSum();
  }

  addIceThicknessLayer(iceThicknessLayer: IceThicknessLayerDto) {
    this.ngZone.run(() => {
      this.registration.IceThickness.IceThicknessLayer.push(iceThicknessLayer);
    });
    this.calculateIceThicknessSum();
  }

  calculateIceThicknessSum() {
    this.ngZone.run(() => {
      this.registration.IceThickness.IceThicknessSum = this.registration.IceThickness.IceThicknessLayer
        .reduce((p, c) => p + (c.IceLayerThickness || 0), 0);
    });
  }

  removeLayerAtIndex(index: number) {
    this.ngZone.run(() => {
      this.registration.IceThickness.IceThicknessLayer.splice(index, 1);
    });
    this.calculateIceThicknessSum();
  }
}
