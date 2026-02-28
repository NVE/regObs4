import { Component, EventEmitter, Output, inject, input , ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/angular/standalone';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../../../core/services/confirmation-modal/confirmation-modal.service';

import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-modal-save-or-delete-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-save-or-delete-buttons.component.html',
  styleUrls: ['./modal-save-or-delete-buttons.component.scss'],
  imports: [IonButton, IonCol, IonGrid, IonIcon, IonRow, TranslatePipe],
})
export class ModalSaveOrDeleteButtonsComponent {
  private confirmationModalService = inject(ConfirmationModalService);

  readonly saveText = input('DIALOGS.OK');
  readonly saveDisabled = input(false);
  @Output() saveClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  readonly showDelete = input(false);
  readonly alertTitle = input('DIALOGS.ARE_YOU_SURE');
  readonly alertMessage = input('');

  constructor() {
    addIcons({ trash });
  }

  ok() {
    this.saveClicked.emit();
  }

  async delete() {
    const alertMessage = this.alertMessage();
    await this.confirmationModalService.askForConfirmation({
      header: this.alertTitle(),
      message: alertMessage,
      buttons: [
        {
          text: 'DIALOGS.CANCEL',
          role: PopupResponse.CANCEL,
        },
        {
          text: 'DIALOGS.OK',
          handler: () => {
            this.deleteClicked.emit();
          },
          role: PopupResponse.CONFIRM,
        },
      ],
    });
  }
}
