import { Component, NgZone, inject } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../../base.page';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { IceLayerPage } from './ice-layer/ice-layer.page';
import { IceThicknessEditModel, IceThicknessLayerEditModel } from 'src/app/modules/common-regobs-api/models';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { NumericInputComponent } from '../../../components/numeric-input/numeric-input.component';
import { YesNoSelectComponent } from '../../../components/yes-no-select/yes-no-select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslatePipe } from '@ngx-translate/core';
import { KdvDescriptionPipe } from '../../../pipes/kdv-description.pipe';
import { MetersToCmPipe } from '../../../pipes/meters-to-cm.pipe';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ice-thickness',
  templateUrl: './ice-thickness.page.html',
  styleUrls: ['./ice-thickness.page.scss'],
  imports: [
    AsyncPipe,
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonReorder,
    IonReorderGroup,
    IonTitle,
    IonToolbar,
    KdvDescriptionPipe,
    MetersToCmPipe,
    NgFor,
    NgIf,
    NumericInputComponent,
    RegistrationContentWrapperComponent,
    TextCommentComponent,
    TranslatePipe,
    YesNoSelectComponent,
  ],
})
export class IceThicknessPage extends BasePage {
  override registrationTid = RegistrationTid.IceThickness;

  private modalController = inject(ModalController);
  private ngZone = inject(NgZone);

  isWaterBefore?: boolean;
  isWaterAfter?: boolean;
  waterHeightBefore?: number;
  waterHeightAfter?: number;
  waterDepthAfter?: number;

  constructor() {
    super();
    addIcons({ addCircleOutline });
  }

  get iceThickness(): IceThicknessEditModel {
    if (this.draft.registration.IceThickness == null) {
      this.draft.registration.IceThickness = {};
    }
    return this.draft.registration.IceThickness;
  }

  get layers(): IceThicknessLayerEditModel[] {
    const iceThickness = this.iceThickness;
    if (!Array.isArray(iceThickness.IceThicknessLayers)) {
      iceThickness.IceThicknessLayers = [];
    }
    return iceThickness.IceThicknessLayers;
  }

  override onInit() {
    const iceThickness = this.iceThickness;
    if (iceThickness.IceHeightBefore != null && iceThickness.IceHeightBefore < 0) {
      this.isWaterBefore = true;
      this.waterHeightBefore = -iceThickness.IceHeightBefore;
    } else if (iceThickness.IceHeightBefore === 0) {
      this.isWaterBefore = false;
    }

    if (iceThickness.IceHeightAfter != null && iceThickness.IceHeightAfter < 0) {
      this.isWaterAfter = true;
      this.waterHeightAfter = -iceThickness.IceHeightAfter;
    } else if (iceThickness.IceHeightAfter != null && iceThickness.IceHeightAfter >= 0) {
      this.isWaterAfter = false;
      this.waterDepthAfter = iceThickness.IceHeightAfter;
    }
  }

  makeValidBeforeAfter() {
    const iceThickness = this.iceThickness;

    if (this.isWaterBefore === undefined) {
      iceThickness.IceHeightBefore = undefined;
    } else if (this.isWaterBefore && this.waterHeightBefore != null && this.waterHeightBefore > 0) {
      iceThickness.IceHeightBefore = -this.waterHeightBefore;
    } else {
      iceThickness.IceHeightBefore = 0;
    }

    if (this.isWaterAfter === undefined) {
      iceThickness.IceHeightAfter = undefined;
    } else if (this.isWaterAfter && isNumber(this.waterHeightAfter)) {
      iceThickness.IceHeightAfter = -this.waterHeightAfter;
    } else if (!this.isWaterAfter && isNumber(this.waterDepthAfter)) {
      iceThickness.IceHeightAfter = this.waterDepthAfter;
    } else {
      iceThickness.IceHeightAfter = 0;
    }
  }

  override isValid() {
    const checkBefore =
      Boolean(this.isWaterBefore) == Boolean(this.waterHeightBefore) || Boolean(this.isWaterBefore) == false;
    const checkAfter =
      (this.isWaterAfter && isNumber(this.waterHeightAfter)) ||
      (this.isWaterAfter == false && isNumber(this.waterDepthAfter)) ||
      this.isWaterAfter == undefined;

    const valid = checkBefore && checkAfter;
    if (valid) {
      this.makeValidBeforeAfter();
    }
    return valid;
  }

  override async isEmpty(): Promise<boolean> {
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
        iceThicknessLayer: index != null ? this.layers[index] : undefined,
      },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete && index !== undefined) {
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
      this.reorderList(this.layers, event.detail.from, event.detail.to);
    });
    event.detail.complete();
  }

  reorderList(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  }

  setIceThicknessLayer(index: number, iceThicknessLayer: IceThicknessLayerEditModel) {
    this.ngZone.run(() => {
      this.layers[index] = iceThicknessLayer;
    });
    this.calculateIceThicknessSum();
  }

  addIceThicknessLayer(iceThicknessLayer: IceThicknessLayerEditModel) {
    this.ngZone.run(() => {
      this.layers.push(iceThicknessLayer);
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
      this.layers.splice(index, 1);
    });
    this.calculateIceThicknessSum();
  }
}

function isNumber(value?: any): value is number {
  if (typeof value !== 'number') {
    return false;
  }
  return !isNaN(value);
}
