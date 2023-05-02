import { Component } from '@angular/core';
import { ModalSearchPage } from '../../../pages/modal-search/modal-search.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss'],
})
export class MapSearchComponent {
  constructor(private modalController: ModalController) {}

  async openModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalSearchPage,
    });
    modal.present();
  }
}
