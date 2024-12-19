import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { AlertController, IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/angular/standalone';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../../../core/services/confirmation-modal/confirmation-modal.service';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-modal-save-or-delete-buttons',
  templateUrl: './modal-save-or-delete-buttons.component.html',
  styleUrls: ['./modal-save-or-delete-buttons.component.scss'],
  imports: [IonButton, IonCol, IonGrid, IonIcon, IonRow, NgIf, TranslatePipe],
})
export class ModalSaveOrDeleteButtonsComponent {
  private translateService = inject(TranslateService);
  private alertController = inject(AlertController);
  private confirmationModalService = inject(ConfirmationModalService);

  @Input() saveText = 'DIALOGS.OK';
  @Input() saveDisabled = false;
  @Output() saveClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @Input() showDelete = false;
  @Input() alertTitle = 'DIALOGS.ARE_YOU_SURE';
  @Input() alertMessage = '';

  constructor() {
    addIcons({ trash });
  }

  ok() {
    this.saveClicked.emit();
  }

  async delete() {
    await this.confirmationModalService.askForConfirmation({
      header: this.alertTitle,
      message: this.alertMessage ? this.alertMessage : undefined,
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
