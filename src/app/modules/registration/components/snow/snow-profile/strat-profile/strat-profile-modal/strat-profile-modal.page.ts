import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileDto, StratProfileLayerDto } from '../../../../../../regobs-api/models';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { NumberHelper } from '../../../../../../../core/helpers/number-helper';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { KdvService } from '../../../../../../../core/services/kdv/kdv.service';

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

  constructor(private modalController: ModalController, private zone: NgZone, private kdvService: KdvService) { }

  ngOnInit() {
    this.calculate();
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


  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.profile.Layers = ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  reorderList(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
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
}
