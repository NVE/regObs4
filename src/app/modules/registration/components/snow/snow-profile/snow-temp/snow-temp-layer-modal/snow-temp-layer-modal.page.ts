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
  private initialModel: TempProfileObsDto;
  showDelete = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.initialModel = { ... this.layer };
    if (this.layer === undefined) {
      this.layer = {};
    } else {
      this.showDelete = true;
    }
  }

  ok() {
    this.modalController.dismiss(this.layer);
  }

  cancel() {
    this.layer = this.initialModel;
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

}
