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

  totalThickness: number;

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
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom() {
    this.addOrEditLayer(this.hasLayers ? (this.profile.Layers.length) : 0, undefined);
  }

  async addOrEditLayer(index: number, layer: StratProfileLayerDto) {
    const add = (layer === undefined);
    const modal = await this.modalController.create({
      component: StratProfileLayerModalPage,
      componentProps: {
        layer,
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.zone.run(() => {
      if (result.data) {
        if (result.data.delete) {
          // this.removeLayerAtIndex(index);
          this.removeLayer(index);
        } else {
          const stratProfileLayer: StratProfileLayerDto = result.data;
          this.setLayer(index, stratProfileLayer, add);
        }
      }
    });
  }

  private setLayer(index: number, layer: StratProfileLayerDto, add: boolean) {
    if (!this.profile) {
      this.profile = {};
    }
    if (this.profile.Layers === undefined) {
      this.profile.Layers = [];
    }
    this.profile.Layers.splice(index, (add ? 0 : 1), layer);
    this.calculate();
  }

  private removeLayer(index: number) {
    this.profile.Layers.splice(index, 1);
    this.calculate();
  }

  private calculate() {
    const layers = ((this.profile || {}).Layers || []);
    const sum = layers.filter((x) => x.Thickness !== undefined)
      .map(((layer) => layer.Thickness))
      .reduce((pv, cv) => pv + cv, 0);
    this.totalThickness = sum;
  }

  convertMToCM(value: number) {
    return NumberHelper.setDecimalPlaces(value * 100.0, 2);
  }
}
