import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-picture-info-modal',
  templateUrl: './edit-picture-info-modal.component.html',
  styleUrls: ['./edit-picture-info-modal.component.scss'],
})
export class EditPictureInfoModalComponent {

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
