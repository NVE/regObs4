import { Component } from '@angular/core';
import { IonButton, IonIcon, IonInput, IonItem, IonList, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-edit-picture-info-modal',
  templateUrl: './edit-picture-info-modal.component.html',
  styleUrls: ['./edit-picture-info-modal.component.scss'],
  imports: [FormsModule, IonButton, IonIcon, IonInput, IonItem, IonList, TranslatePipe],
})
export class EditPictureInfoModalComponent {
  copyright: string;
  photographer: string;

  constructor(public modalController: ModalController) {
    addIcons({ close });
  }

  save() {
    this.copyright = this.copyright.trim();
    this.photographer = this.photographer.trim();
    this.modalController.dismiss({ copyright: this.copyright, photographer: this.photographer });
  }

  close() {
    this.modalController.dismiss();
  }
}
