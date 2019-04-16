import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileDto, StratProfileLayerDto } from '../../../../../../regobs-api/models';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { NumberHelper } from '../../../../../../../core/helpers/number-helper';

@Component({
  selector: 'app-strat-profile-modal',
  templateUrl: './strat-profile-modal.page.html',
  styleUrls: ['./strat-profile-modal.page.scss'],
})
export class StratProfileModalPage implements OnInit {

  @Input() profile: StratProfileDto;

  get hasLayers() {
    return this.profile && this.profile.Layers && this.profile.Layers.length > 0;
  }

  constructor(private modalController: ModalController, private zone: NgZone) { }

  ngOnInit() {
  }

  ok() {
    this.modalController.dismiss(this.profile);
  }

  cancel() {
    this.modalController.dismiss();
  }

  addLayerTop() {
    this.addLayer(0);
  }

  addLayerBottom() {
    this.addLayer(this.hasLayers ? (this.profile.Layers.length - 1) : 0);
  }

  private async addLayer(index: number) {
    const modal = await this.modalController.create({
      component: StratProfileLayerModalPage,
      componentProps: {
        layer: (this.hasLayers && this.profile.Layers.length > index) ? this.profile.Layers[index] : undefined,
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        // this.removeLayerAtIndex(index);
      } else {
        const stratProfileLayer: StratProfileLayerDto = result.data;
        this.setLayer(index, stratProfileLayer);
      }
    }
  }

  private setLayer(index: number, layer: StratProfileLayerDto) {
    if (!this.profile) {
      this.profile = {};
    }
    if (this.profile.Layers === undefined) {
      this.profile.Layers = [];
    }
    this.zone.run(() => {
      this.profile.Layers.push(layer);
    });
    // this.calculate();
  }

  convertMToCM(value: number) {
    return NumberHelper.setDecimalPlaces(value * 100.0, 2);
  }
}
