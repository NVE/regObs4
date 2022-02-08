import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomAnimation } from '../../../../../core/animations/custom.animation';
import { ModalSearchPage } from '../../../pages/modal-search/modal-search.page';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent {
  constructor(private modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalSearchPage,
      keyboardClose: true,
      enterAnimation: CustomAnimation.slideInFromRight,
      leaveAnimation: CustomAnimation.slideOutToRight
    });
    return await modal.present();
  }
}
