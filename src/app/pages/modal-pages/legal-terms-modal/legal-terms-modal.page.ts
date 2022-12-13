import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-legal-terms-modal',
  templateUrl: './legal-terms-modal.page.html',
  styleUrls: ['./legal-terms-modal.page.scss'],
})
export class LegalTermsModalPage {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
