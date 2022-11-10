import { Injectable } from '@angular/core';
import { AlertButton, AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core/dist/types/components/alert/alert-interface';
import { IonicSafeString } from '@ionic/core/dist/types/utils/sanitization';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export enum PopupResponse {
  CANCEL = 'cancel',
  CONFIRM = 'confirm'
}

// We use ConfirmationModalButton instead of AlertButton to make sure that the role is set
export interface ConfirmationModalButton extends AlertButton {
  role: PopupResponse;
}

// We use ConfirmationModalButtons to make sure the array has at least two buttons (Yes and Cancel)
export type ConfirmationModalButtons = [ConfirmationModalButton, ConfirmationModalButton, ...ConfirmationModalButton[]];

export interface ConfirmationModal extends AlertOptions {
  message: string | IonicSafeString;
  buttons: ConfirmationModalButtons;
}

interface AskForConfirmationParams {
  message: string | Array<string>;
  header?: string | Array<string>;
  opts?: Omit<ConfirmationModal, 'message' | 'header'>;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {
  }

  /**
   * Creates a confirmation dialog with a message and two buttons.
   *
   * @param message
   * @param header
   * @param opts
   * @returns Promise boolean value based on user button input.
   */
  async askForConfirmation({ message, header, opts }: AskForConfirmationParams): Promise<boolean> {
    if (opts && opts.buttons && opts.buttons.length < 2) {
      throw new Error('ConfirmationModalService: You must provide at least two buttons');
    }

    if (!opts && !opts.buttons) {
      opts.buttons = await this.getDefaultButtons();
    }

    opts.buttons.map((button) => {
      if (button.role === PopupResponse.CONFIRM && !button.cssClass) {
        button.cssClass = 'alert-button-confirm';
      }
    });

    const _message = await firstValueFrom(this.translateService.get(message));
    const _header = await firstValueFrom(this.translateService.get(header));

    const alert = await this.alertController.create({
      ...opts,
      message: _message,
      header: _header,
      backdropDismiss: false
    });

    await alert.present();
    const result = await alert.onWillDismiss();
    return result.role === PopupResponse.CONFIRM;
  }

  /**
   * We want to make sure we have at least two buttons (Confirm and Cancel)
   * @returns An array of objects with the following properties:
   *   text: The text to be displayed on the button
   *   role: The role of the button
   *   cssClass: The css class to be applied to the button
   */
  private async getDefaultButtons(): Promise<ConfirmationModalButtons> {
    const translations = await firstValueFrom(this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']));
    return [
      {
        text: translations['DIALOGS.CANCEL'],
        role: PopupResponse.CANCEL,
        cssClass: 'alert-button-cancel'
      },
      {
        text: translations['DIALOGS.YES'],
        role: PopupResponse.CONFIRM,
        cssClass: 'alert-button-confirm'
      }
    ];
  }
}
