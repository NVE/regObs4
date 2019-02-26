import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-legal-terms-modal',
  templateUrl: './legal-terms-modal.page.html',
  styleUrls: ['./legal-terms-modal.page.scss'],
})
export class LegalTermsModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
