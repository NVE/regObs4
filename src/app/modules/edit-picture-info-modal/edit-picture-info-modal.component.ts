import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-picture-info-modal',
  templateUrl: './edit-picture-info-modal.component.html',
  styleUrls: ['./edit-picture-info-modal.component.scss'],
  imports: [IonicModule, FormsModule, TranslateModule],
})
export class EditPictureInfoModalComponent {
  copyright: string;
  photographer: string;

  constructor(public modalController: ModalController) {}

  save() {
    this.copyright = this.copyright.trim();
    this.photographer = this.photographer.trim();
    this.modalController.dismiss({ copyright: this.copyright, photographer: this.photographer });
  }

  close() {
    this.modalController.dismiss();
  }
}
