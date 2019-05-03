import { Component, OnInit, Input } from '@angular/core';
import { TempProfileObsDto } from '../../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-snow-temp-layer-modal',
  templateUrl: './snow-temp-layer-modal.page.html',
  styleUrls: ['./snow-temp-layer-modal.page.scss'],
})
export class SnowTempLayerModalPage implements OnInit {

  @Input() layer: TempProfileObsDto;
  @Input() index: number;
  showDelete = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.layer === undefined) {
      this.layer = {};
    } else {
      this.showDelete = true;
    }
  }

  ok(gotoIndex?: number) {
    this.modalController.dismiss({ layer: this.layer, gotoIndex });
  }

  cancel() {
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

}
