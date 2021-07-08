import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IceThicknessLayerEditModel } from '@varsom-regobs-common/regobs-api';

@Component({
  selector: 'app-ice-layer',
  templateUrl: './ice-layer.page.html',
  styleUrls: ['./ice-layer.page.scss']
})
export class IceLayerPage implements OnInit {
  @Input() iceThicknessLayer: IceThicknessLayerEditModel;

  isNew = false;
  get isValid() {
    return this.layerCopy.IceLayerThickness !== undefined;
  }

  layerCopy: IceThicknessLayerEditModel; // Using object copy so cancel does not change input object

  constructor(
    private modalController: ModalController,
    private ngZone: NgZone
  ) {}

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
