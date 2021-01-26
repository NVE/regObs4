import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IceThicknessLayerDto } from '../../../../../regobs-api/models';

@Component({
  selector: 'app-ice-layer',
  templateUrl: './ice-layer.page.html',
  styleUrls: ['./ice-layer.page.scss']
})
export class IceLayerPage implements OnInit {
  @Input() iceThicknessLayer: IceThicknessLayerDto;

  isNew = false;
  get isValid() {
    return this.layerCopy.IceLayerThickness !== undefined;
  }

  layerCopy: IceThicknessLayerDto; // Using object copy so cancel does not change input object

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
