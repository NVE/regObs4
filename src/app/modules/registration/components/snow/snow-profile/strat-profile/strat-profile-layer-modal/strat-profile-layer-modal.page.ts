import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileLayerDto } from '../../../../../../regobs-api/models';

@Component({
  selector: 'app-strat-profile-layer-modal',
  templateUrl: './strat-profile-layer-modal.page.html',
  styleUrls: ['./strat-profile-layer-modal.page.scss'],
})
export class StratProfileLayerModalPage implements OnInit {

  @Input() layer: StratProfileLayerDto;

  showDelete = false;
  layerCopy: StratProfileLayerDto;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.layer !== undefined) {
      this.showDelete = true;
      this.layerCopy = { ...this.layer };
      return;
    }
    this.layerCopy = {};
  }

  ok() {
    this.modalController.dismiss(this.layerCopy);
  }

  cancel() {
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
