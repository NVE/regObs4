import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupportMapInfoPage } from '../../../../../map/pages/support-map-info/support-map-info.page';

@Component({
  selector: 'app-steepness-common-legend',
  templateUrl: './steepness-common-legend.component.html',
  styleUrls: ['./steepness-common-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteepnessCommonLegendComponent {
  constructor(private modalController: ModalController) {}

  async openAboutMapsModal() {
    const modalInfoPage = await this.modalController.create({
      component: SupportMapInfoPage,
    });
    modalInfoPage.present();
  }
}
