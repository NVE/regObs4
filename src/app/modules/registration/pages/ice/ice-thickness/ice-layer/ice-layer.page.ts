import { Component, OnInit, Input, NgZone, inject } from '@angular/core';
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
export class IceLayerPage implements OnInit {
  private modalController = inject(ModalController);
  private ngZone = inject(NgZone);

  @Input() iceThicknessLayer: IceThicknessLayerEditModel;

  isNew = false;
  get isValid() {
    return this.layerCopy.IceLayerThickness !== undefined;
  }

  layerCopy: IceThicknessLayerEditModel;

  ngOnInit() {
    if (!this.iceThicknessLayer) {
      this.layerCopy = {};
      this.isNew = true;
    } else {
      this.layerCopy = { ...this.iceThicknessLayer };
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.layerCopy);
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
