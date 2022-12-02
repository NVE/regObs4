import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../../../core/services/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-modal-save-or-delete-buttons',
  templateUrl: './modal-save-or-delete-buttons.component.html',
  styleUrls: ['./modal-save-or-delete-buttons.component.scss'],
})
export class ModalSaveOrDeleteButtonsComponent {
  @Input() saveText = 'DIALOGS.OK';
  @Input() saveDisabled = false;
  @Output() saveClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @Input() showDelete = false;
  @Input() alertTitle = 'DIALOGS.ARE_YOU_SURE';
  @Input() alertMessage = '';

  constructor(
    private translateService: TranslateService,
    private alertController: AlertController,
    private confirmationModalService: ConfirmationModalService
  ) {}

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
