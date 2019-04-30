import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SnowDensityLayerViewModel } from '../../../../../../regobs-api/models';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';
import { IsEmptyHelper } from '../../../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-snow-density-layer-modal',
  templateUrl: './snow-density-layer-modal.page.html',
  styleUrls: ['./snow-density-layer-modal.page.scss'],
})
export class SnowDensityLayerModalPage implements OnInit {

  @Input() layer: SnowDensityLayerViewModel;
  @Input() useCylinder = true;
  @Input() cylinderDiameterInM: number;
  @Input() tareWeightInG: number;
  @Input() index: number;
  private initialModel: SnowDensityLayerViewModel;
  showDelete = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.initialModel = { ... this.layer };
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
    this.layer = this.initialModel;
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  calculate() {
    if (this.useCylinder) {
      this.layer.Density = HydrologyHelper.calculateDensity(
        this.layer.Weight,
        this.layer.Depth,
        this.tareWeightInG,
        this.cylinderDiameterInM);
      if (this.layer.Density !== undefined) {
        this.layer.WaterEquivalent = HydrologyHelper.calculateWaterEquivalent(this.layer.Density, this.layer.Depth);
      }
    }
  }
}
