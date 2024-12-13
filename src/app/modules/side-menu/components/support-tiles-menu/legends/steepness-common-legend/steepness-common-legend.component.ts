import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { SupportMapInfoPage } from '../../../../../map/pages/support-map-info/support-map-info.page';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-steepness-common-legend',
  templateUrl: './steepness-common-legend.component.html',
  styleUrls: ['./steepness-common-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, NgIf, TranslateModule],
})
export class SteepnessCommonLegendComponent {
  @Input() show27to30 = true;

  constructor(private modalController: ModalController) {}

  async openAboutMapsModal() {
    const modalInfoPage = await this.modalController.create({
      component: SupportMapInfoPage,
    });
    modalInfoPage.present();
  }
}
