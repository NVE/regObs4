import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, ModalController } from '@ionic/angular/standalone';
import { SupportMapInfoPage } from '../../../../../map/pages/support-map-info/support-map-info.page';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-steepness-common-legend',
  templateUrl: './steepness-common-legend.component.html',
  styleUrls: ['./steepness-common-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, IonCol, IonGrid, IonRow, NgIf, TranslatePipe],
})
export class SteepnessCommonLegendComponent {
  private modalController = inject(ModalController);

  readonly show27to30 = input(true);

  async openAboutMapsModal() {
    const modalInfoPage = await this.modalController.create({
      component: SupportMapInfoPage,
    });
    modalInfoPage.present();
  }
}
