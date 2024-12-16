import { Component } from '@angular/core';
import { ModalSearchPage } from '../../../pages/modal-search/modal-search.page';
import { IonFab, IonFabButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss'],
  imports: [IonFab, IonFabButton, IonIcon],
})
export class MapSearchComponent {
  constructor(private modalController: ModalController) {
    addIcons({ search });
  }

  async openModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalSearchPage,
    });
    modal.present();
  }
}
