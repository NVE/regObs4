import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DensityProfileDto, DensityProfileLayerDto } from '../../../../../../regobs-api/models';
import { SnowDensityLayerModalPage } from '../snow-density-layer-modal/snow-density-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';

@Component({
  selector: 'app-snow-density-modal',
  templateUrl: './snow-density-modal.page.html',
  styleUrls: ['./snow-density-modal.page.scss'],
})
export class SnowDensityModalPage implements OnInit {

  @Input() profile: DensityProfileDto;
  useCylinder = true;
  private isOpen = false;

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

  async addOrEditLayer(index: number, layer: DensityProfileLayerDto) {
    if (!this.isOpen) {
      this.isOpen = true;
      const add = (layer === undefined);
      const modal = await this.modalController.create({
        component: SnowDensityLayerModalPage,
        componentProps: {
          layer: layer !== undefined ? { ...layer } : undefined,
          useCylinder: this.useCylinder,
          cylinderDiameterInM: this.profile.CylinderDiameter,
          tareWeight: this.profile.TareWeight,
          index,
        }
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.isOpen = false;
      if (result.data) {
        if (result.data.delete) {
          this.removeLayer(index);
        } else {
          let currentIndex = index;
          const snowDensityLayer: DensityProfileLayerDto = result.data.layer;
          const isEmpty = this.isEmpty(snowDensityLayer);
          if (isEmpty && !add) {
            this.removeLayer(index);
            currentIndex--;
          } else if (!isEmpty) {
            this.setLayer(index, snowDensityLayer, add);
          }
          if (result.data.gotoIndex !== undefined) {
            const nextIndex = currentIndex + result.data.gotoIndex;
            const nextLayer = this.hasLayers ? this.profile.Layers[nextIndex] : undefined;
            this.addOrEditLayer(nextIndex, nextLayer);
          }
        }
      }
    }
  }

  private isEmpty(snowDensityLayer: DensityProfileLayerDto) {
    return this.useCylinder ? (
      snowDensityLayer.Thickness === undefined &&
      snowDensityLayer.Weight === undefined) :
      (snowDensityLayer.Density === undefined);
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.profile.Layers = ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  private setLayer(index: number, layer: DensityProfileLayerDto, add: boolean) {
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

  recalculateLayers() {
    if (this.useCylinder && this.hasLayers) {
      this.profile.Layers.forEach((layer: DensityProfileLayerDto) => {
        layer.Density = HydrologyHelper.calculateDensity(
          layer.Weight,
          layer.Thickness,
          this.profile.TareWeight,
          this.profile.CylinderDiameter);
      });
    }
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }

}
