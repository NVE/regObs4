import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DensityProfileDto, SnowDensityLayerViewModel } from '../../../../../../regobs-api/models';
import { SnowDensityLayerModalPage } from '../snow-density-layer-modal/snow-density-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';

@Component({
  selector: 'app-snow-density-modal',
  templateUrl: './snow-density-modal.page.html',
  styleUrls: ['./snow-density-modal.page.scss'],
})
export class SnowDensityModalPage implements OnInit {

  @Input() profile: DensityProfileDto;

  useCylinder = true;

  get hasLayers() {
    return this.profile && this.profile.Layers && this.profile.Layers.length > 0;
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.profile === undefined) {
      this.profile = {};
    }
  }

  ok() {
    this.modalController.dismiss(this.profile);
  }

  cancel() {
    this.modalController.dismiss();
  }

  addLayerTop() {
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom() {
    this.addOrEditLayer(this.hasLayers ? (this.profile.Layers.length) : 0, undefined);
  }

  async addOrEditLayer(index: number, layer: SnowDensityLayerViewModel) {
    const add = (layer === undefined);
    const modal = await this.modalController.create({
      component: SnowDensityLayerModalPage,
      componentProps: {
        layer,
        useCylinder: this.useCylinder,
        cylinderDiameterInM: this.profile.CylinderDiameter,
        tareWeightInG: this.profile.TareWeight,
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        this.removeLayer(index);
      } else {
        const snowDensityLayer: SnowDensityLayerViewModel = result.data;
        this.setLayer(index, snowDensityLayer, add);
      }
    }
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.profile.Layers = ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  private setLayer(index: number, layer: SnowDensityLayerViewModel, add: boolean) {
    if (!this.profile) {
      this.profile = {};
    }
    if (this.profile.Layers === undefined) {
      this.profile.Layers = [];
    }
    this.profile.Layers.splice(index, (add ? 0 : 1), layer);
  }

  private removeLayer(index: number) {
    this.profile.Layers.splice(index, 1);
  }

}
