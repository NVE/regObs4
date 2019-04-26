import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DensityProfileDto } from '../../../../../../regobs-api/models';

@Component({
  selector: 'app-snow-density-modal',
  templateUrl: './snow-density-modal.page.html',
  styleUrls: ['./snow-density-modal.page.scss'],
})
export class SnowDensityModalPage implements OnInit {

  @Input() profile: DensityProfileDto;

  useCylinder = true;

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

}
