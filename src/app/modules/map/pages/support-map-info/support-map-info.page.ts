import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-support-map-info',
  templateUrl: './support-map-info.page.html',
  styleUrls: ['./support-map-info.page.scss']
})
export class SupportMapInfoPage {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
