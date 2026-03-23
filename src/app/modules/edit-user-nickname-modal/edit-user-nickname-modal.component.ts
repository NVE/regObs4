import { Component, inject, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  ModalController,
  IonContent,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-edit-user-nickname-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-user-nickname-modal.component.html',
  styleUrls: ['./edit-user-nickname-modal.component.scss'],
  imports: [
    IonHeader,
    IonButtons,
    IonContent,
    FormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonList,
    IonToolbar,
    IonTitle,
    TranslatePipe,
  ],
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
