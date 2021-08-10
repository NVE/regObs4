import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {

  copyright: string;
  photographer: string;

  constructor(public modalController: ModalController) { }

  save(){
    this.modalController.dismiss({copyright: this.copyright, photographer: this.photographer});
  }

  close(){
    this.modalController.dismiss();
  }


}
