import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomAnimation } from '../../../../../core/animations/custom.animation';
import { ModalSearchPage } from '../../../pages/modal-search/modal-search.page';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalSearchPage,
      showBackdrop: true,
      backdropDismiss: true,
      enterAnimation: CustomAnimation.scaleUpEnterV2,
      leaveAnimation: CustomAnimation.scaleUpLeaveV2
    });
    return await modal.present();
  }

}
