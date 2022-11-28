import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.page.html',
  styleUrls: ['./help-modal.page.scss']
})
export class HelpModalPage {
  @Input() helpText: string;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
