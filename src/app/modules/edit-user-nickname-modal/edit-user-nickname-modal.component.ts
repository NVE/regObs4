import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonIcon, IonInput, IonItem, IonList, ModalController } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-edit-user-nickname-modal',
  templateUrl: './edit-user-nickname-modal.component.html',
  styleUrls: ['./edit-user-nickname-modal.component.scss'],
  imports: [FormsModule, IonButton, IonIcon, IonInput, IonItem, IonList, TranslatePipe],
})
export class EditUserNicknameModalComponent {
  modalController = inject(ModalController);

  nickName = model<string>();
  validationError = signal<string>('');

  constructor() {
    addIcons({ close });
  }

  save() {
    if (this.nickName()) {
      this.modalController.dismiss({ nick: this.nickName()?.trim() });
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
