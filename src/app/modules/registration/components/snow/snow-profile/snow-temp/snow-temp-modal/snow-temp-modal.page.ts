import { Component, OnInit, Input } from '@angular/core';
import { TempObsDto, TempProfileObsDto } from '../../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { SnowTempLayerModalPage } from '../snow-temp-layer-modal/snow-temp-layer-modal.page';

@Component({
  selector: 'app-snow-temp-modal',
  templateUrl: './snow-temp-modal.page.html',
  styleUrls: ['./snow-temp-modal.page.scss'],
})
export class SnowTempModalPage implements OnInit {

  @Input() tempProfile: TempObsDto;

  get hasLayers() {
    return this.tempProfile && this.tempProfile.Layers && this.tempProfile.Layers.length > 0;
  }


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.sortLayers();
  }

  ok() {
    this.modalController.dismiss(this.tempProfile);
  }

  cancel() {
    this.modalController.dismiss();
  }

  addLayerBottom() {
    this.addOrEditLayer(this.hasLayers ? (this.tempProfile.Layers.length) : 0, undefined);
  }

  async addOrEditLayer(index: number, layer: TempProfileObsDto) {
    const add = (layer === undefined);
    const modal = await this.modalController.create({
      component: SnowTempLayerModalPage,
      componentProps: {
        layer,
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        this.removeLayer(index);
      } else {
        const stratProfileLayer: TempProfileObsDto = result.data;
        this.setLayer(index, stratProfileLayer, add);
      }
    }
  }

  private setLayer(index: number, layer: TempProfileObsDto, add: boolean) {
    if (!this.tempProfile) {
      this.tempProfile = {};
    }
    if (this.tempProfile.Layers === undefined) {
      this.tempProfile.Layers = [];
    }
    this.tempProfile.Layers.splice(index, (add ? 0 : 1), layer);
    this.sortLayers();
  }

  private removeLayer(index: number) {
    this.tempProfile.Layers.splice(index, 1);
    this.sortLayers();
  }

  private sortLayers() {
    if (this.tempProfile && this.tempProfile.Layers) {
      this.tempProfile.Layers = this.tempProfile.Layers.sort((a, b) => a.Depth - b.Depth);
    }
  }

}
