import { Component, OnInit, Input, QueryList, ViewChildren, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IceThicknessLayerDto } from '../../../../../regobs-api/models';
import { NumericInputComponent } from '../../../../components/numeric-input/numeric-input.component';

@Component({
  selector: 'app-ice-layer',
  templateUrl: './ice-layer.page.html',
  styleUrls: ['./ice-layer.page.scss'],
})
export class IceLayerPage implements OnInit {
  @Input() iceThicknessLayer: IceThicknessLayerDto;
  @ViewChildren(NumericInputComponent) private numericInputs: QueryList<NumericInputComponent>;

  isNew = false;
  isValid = true;

  layerCopy: IceThicknessLayerDto; // Using object copy so cancel does not change input object

  constructor(private modalController: ModalController, private ngZone: NgZone) { }

  ngOnInit() {
    if (!this.iceThicknessLayer) {
      this.layerCopy = {};
      this.isNew = true;
    } else {
      this.layerCopy = { ...this.iceThicknessLayer };
    }
  }

  valueChanged() {
    this.ngZone.run(() => {
      this.isValid = this.numericInputs && !this.numericInputs.some((x) => !x.isValid);
    });
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
