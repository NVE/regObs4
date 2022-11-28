import { Injectable } from '@angular/core';
import { AlertButton, AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core/dist/types/components/alert/alert-interface';
import { IonicSafeString } from '@ionic/core/dist/types/utils/sanitization';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export enum PopupResponse {
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
}

// We use ConfirmationModalButton instead of AlertButton to make sure that the role is set
interface ConfirmationModalButton extends AlertButton {
  text: string;
  role: PopupResponse;
}

// We use ConfirmationModalButtons to make sure the array has at least one buttons (Confirm)
type ConfirmationModalButtons = [ConfirmationModalButton, ...ConfirmationModalButton[]];

interface ConfirmationModal extends AlertOptions {
  message: string | IonicSafeString;
}

interface AskForConfirmationParams {
  message: string;
  header?: string;
  buttons?: ConfirmationModalButtons;
  opts?: Omit<ConfirmationModal, 'message' | 'header' | 'buttons'>;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  constructor(private alertController: AlertController, private translateService: TranslateService) {}

  /**
   * Creates a confirmation dialog with a message and two buttons.
   * If no buttons are provided, default 'Confirm' and 'Cancel'-buttons will be added.
   * @param message: The key of the message to be displayed in the dialog
   * @param header: The key of the header to be displayed in the dialog
   * @param buttons: All the buttons to be displayed in the dialog
   * @param opts: The options to be passed to the dialog
   * @returns Promise boolean value based on user button input.
   * This promise will resolve to true if the button has the role 'confirm'
   * and false if the button has the role 'cancel'.
   */
  async askForConfirmation({ message, header, buttons, opts }: AskForConfirmationParams): Promise<boolean> {
    const _buttons = [...(buttons || (await this.getDefaultButtons()))];

    const translations = await firstValueFrom(
      this.translateService.get([message, header, ..._buttons.map((button) => button.text)])
    );

    _buttons.map((button) => {
      if (button.role === PopupResponse.CONFIRM && !button.cssClass) {
        button.cssClass = 'alert-button-confirm';
      }
      button.text = translations[button.text];
    });

    const alert = await this.alertController.create({
      ...opts,
      message: translations[message],
      header: translations[header],
      buttons: _buttons,
      backdropDismiss: false,
    });

    await alert.present();
    const result = await alert.onWillDismiss();
    return result.role === PopupResponse.CONFIRM;
  }

  /**
   * Generates the default buttons for the confirmation dialog. The default buttons are 'Confirm' and 'Cancel'.
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
        cssClass: 'alert-button-cancel',
      },
      {
        text: translations['DIALOGS.YES'],
        role: PopupResponse.CONFIRM,
        cssClass: 'alert-button-confirm',
      },
    ];
  }
}
