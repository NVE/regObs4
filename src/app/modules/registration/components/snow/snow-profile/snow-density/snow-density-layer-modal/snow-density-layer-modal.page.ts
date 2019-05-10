import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DensityProfileLayerDto } from '../../../../../../regobs-api/models';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';

@Component({
  selector: 'app-snow-density-layer-modal',
  templateUrl: './snow-density-layer-modal.page.html',
  styleUrls: ['./snow-density-layer-modal.page.scss'],
})
export class SnowDensityLayerModalPage implements OnInit {

  @Input() layer: DensityProfileLayerDto;
  @Input() useCylinder = true;
  @Input() cylinderDiameterInM: number;
  @Input() tareWeight: number;
  @Input() index: number;
  showDelete = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.layer === undefined) {
      this.layer = {};
    } else {
      this.showDelete = true;
    }
    this.calculate();
  }

  ok(gotoIndex?: number) {
    this.modalController.dismiss({ layer: this.layer, gotoIndex });
  }

  cancel() {
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  calculate() {
    if (this.useCylinder) {
      this.layer.Density = HydrologyHelper.calculateDensity(
        this.layer.Weight,
        this.layer.Thickness,
        this.tareWeight,
        this.cylinderDiameterInM);
    }
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }
}
