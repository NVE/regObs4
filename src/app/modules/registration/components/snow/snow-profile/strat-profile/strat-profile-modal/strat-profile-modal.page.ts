import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileDto, StratProfileLayerDto, ObsLocationDto } from '../../../../../../regobs-api/models';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { IsEmptyHelper } from '../../../../../../../core/helpers/is-empty.helper';
import { StratProfileLayerHistoryModalPage } from '../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page';
import { LoginService } from '../../../../../../login/services/login.service';

@Component({
  selector: 'app-strat-profile-modal',
  templateUrl: './strat-profile-modal.page.html',
  styleUrls: ['./strat-profile-modal.page.scss'],
})
export class StratProfileModalPage implements OnInit {

  @Input() profile: StratProfileDto;
  @Input() obsLocation: ObsLocationDto;

  totalThickness: number;

  private isOpen = false;

  get hasLayers() {
    return this.profile && this.profile.Layers && this.profile.Layers.length > 0;
  }

  constructor(private modalController: ModalController, private loginService: LoginService) { }

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

  async getPrevousUsedLayers() {
    const loggedInUser = await this.loginService.getLoggedInUser(true);
    if (loggedInUser && loggedInUser.isLoggedIn) {
      if (!this.isOpen) {
        this.isOpen = true;
        const modal = await this.modalController.create({
          component: StratProfileLayerHistoryModalPage,
          componentProps: {
            observerGuid: loggedInUser.user.Guid,
            obsLocation: this.obsLocation,
          }
        });
        modal.present();
        const result = await modal.onDidDismiss();
        this.isOpen = false;
        if (result.data) {
          this.profile.Layers = result.data;
          this.calculate();
        }
      }
    }
  }

  async addOrEditLayer(index: number, layer: StratProfileLayerDto) {
    if (!this.isOpen) {
      this.isOpen = true;
      const add = (layer === undefined);
      const modal = await this.modalController.create({
        component: StratProfileLayerModalPage,
        componentProps: {
          layer: layer === undefined ? undefined : { ...layer },
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
          const stratProfileLayer: StratProfileLayerDto = result.data.layer;
          const isEmpty = IsEmptyHelper.isEmpty(stratProfileLayer);
          if (isEmpty && !add) {
            this.removeLayer(index);
            currentIndex--;
          } else if (!isEmpty) {
            this.setLayer(index, stratProfileLayer, add);
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
