import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IceThicknessLayerDto } from '../../../../../regobs-api/models';

@Component({
  selector: 'app-ice-layer',
  templateUrl: './ice-layer.page.html',
  styleUrls: ['./ice-layer.page.scss'],
})
export class IceLayerPage implements OnInit {
  @Input() iceThicknessLayer: IceThicknessLayerDto;

  layerCopy: IceThicknessLayerDto; // Using object copy so cancel does not change input object

  constructor(private modalController: ModalController, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.iceThicknessLayer) {
      this.layerCopy = {};
    } else {
      this.layerCopy = { ...this.iceThicknessLayer };
    }
    this.cdr.detectChanges();
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.layerCopy);
  }

  updateUi() {
    this.cdr.detectChanges();
  }

}
