import { Component, inject, model , ChangeDetectionStrategy } from '@angular/core';
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  ModalController,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonContent,
  IonButtons,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-edit-picture-info-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-picture-info-modal.component.html',
  styleUrls: ['./edit-picture-info-modal.component.scss'],
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonList,
    TranslatePipe,
  ],
})
/** Brukes til å endre standard rettighetshaver og fotograf for bilder */
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
