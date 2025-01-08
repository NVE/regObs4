import { Component, inject, model } from '@angular/core';
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
  modalController = inject(ModalController);

  copyright = model<string>();
  photographer = model<string>();

  constructor() {
    addIcons({ close });
  }

  save() {
    this.modalController.dismiss({ copyright: this.copyright()?.trim(), photographer: this.photographer()?.trim() });
  }

  close() {
    this.modalController.dismiss();
  }
}
