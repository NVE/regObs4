import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
@Injectable({
  providedIn: 'root',
})
@Injectable()
export class EmailComposerService {
  constructor(
    private emailComposer: EmailComposer,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {}
  async canSendEmail(): Promise<boolean> {
    const platform = Capacitor.getPlatform();
    let canSend;
    if (platform === 'ios') {
      canSend = await this.emailComposer
        .hasAccount()
        .then((isValid: boolean) => isValid);
    }
    if (platform === 'android') {
      canSend = await this.emailComposer.isAvailable();
    }
    if (!canSend) {
      const toastMessage = await firstValueFrom(
        this.translateService.get(['MENU.NO_EMAIL_APP'])
      );
      const toast = await this.toastController.create({
        message: toastMessage['MENU.NO_EMAIL_APP'],
        mode: 'md',
        duration: 5000,
        cssClass: 'toast',
      });
      toast.present();
    }
    return canSend;
  }
}
