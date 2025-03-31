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
  IonRow,
  IonCol,
  IonIcon,
  IonGrid,
} from '@ionic/angular/standalone';
import { IceThicknessLayerEditModel } from 'src/app/modules/common-regobs-api/models';
import { HeaderColorDirective } from '../../../../../shared/directives/header-color/header-color.directive';
import { KdvSelectComponent } from '../../../../../../components/kdv-select/kdv-select.component';
import { NumericInputComponent } from '../../../../components/numeric-input/numeric-input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, chevronDown, chevronUp, trash } from 'ionicons/icons';

@Component({
  selector: 'app-ice-layer',
  templateUrl: './ice-layer.page.html',
  styleUrls: ['./ice-layer.page.scss'],
  imports: [
    IonGrid,
    IonIcon,
    IonCol,
    IonRow,
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
    NumericInputComponent,
    TranslatePipe,
  ],
})
/** Skjema for å registrere et islag */
export class IceLayerPage {
  private modalController = inject(ModalController);

  readonly iceThicknessLayer = input<IceThicknessLayerEditModel>();
  layerTid = linkedSignal(() => this.iceThicknessLayer()?.IceLayerTID);
  thickness = linkedSignal(() => this.iceThicknessLayer()?.IceLayerThickness);
  isValid = computed(() => this.thickness() != null);
  isNew = computed(() => this.iceThicknessLayer() == null);

  constructor() {
    addIcons({ chevronUp, chevronDown, arrowBack, arrowForward, trash });
  }

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
