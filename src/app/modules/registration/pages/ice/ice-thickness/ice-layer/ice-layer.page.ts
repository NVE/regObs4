import { Component, inject, input, linkedSignal, computed } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { IceThicknessLayerEditModel } from 'src/app/modules/common-regobs-api/models';
import { HeaderColorDirective } from '../../../../../shared/directives/header-color/header-color.directive';
import { KdvSelectComponent } from '../../../../../../components/kdv-select/kdv-select.component';
import { NumericInputComponent } from '../../../../components/numeric-input/numeric-input.component';
import { ModalSaveOrDeleteButtonsComponent } from '../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-ice-layer',
  templateUrl: './ice-layer.page.html',
  styleUrls: ['./ice-layer.page.scss'],
  imports: [
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    ModalSaveOrDeleteButtonsComponent,
    NumericInputComponent,
    TranslatePipe,
  ],
})
export class IceLayerPage {
  private modalController = inject(ModalController);

  readonly iceThicknessLayer = input<IceThicknessLayerEditModel>();
  layerTid = linkedSignal(() => this.iceThicknessLayer()?.IceLayerTID);
  thickness = linkedSignal(() => this.iceThicknessLayer()?.IceLayerThickness);
  isValid = computed(() => this.thickness() != null);
  isNew = computed(() => this.iceThicknessLayer() != null);

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.getEditResult());
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  private getEditResult(): IceThicknessLayerEditModel {
    return {
      ...(this.iceThicknessLayer() || {}),
      IceLayerThickness: this.thickness(),
      IceLayerTID: this.layerTid(),
    };
  }
}
