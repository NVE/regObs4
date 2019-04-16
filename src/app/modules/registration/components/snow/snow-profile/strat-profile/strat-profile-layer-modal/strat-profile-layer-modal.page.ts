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

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.layer === undefined) {
      this.layer = {};
    }
  }

  ok() {
    this.modalController.dismiss(this.layer);
  }

  cancel() {
    this.modalController.dismiss();
  }

  deleteLayer() {
    this.modalController.dismiss({ delete: true });
  }
}
