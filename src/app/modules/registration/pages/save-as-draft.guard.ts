import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverviewPage } from './overview/overview.page';
import { AlertController } from '@ionic/angular';
import { RegistrationService } from '../services/registration.service';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { ObsLocationPage } from './obs-location/obs-location.page';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SaveAsDraftRouteGuard implements CanDeactivate<OverviewPage | ObsLocationPage> {
    constructor(
        private alertController: AlertController,
        private registrationService: RegistrationService,
        private userSettingService: UserSettingService,
        private translateService: TranslateService) {
    }

    async canDeactivate(component: OverviewPage,
        _: ActivatedRouteSnapshot,
        __: RouterStateSnapshot,
        nextState?: RouterStateSnapshot) {
        if (nextState && nextState.url.indexOf('registration/') < 0 && component.registration) {
            const translations = await this.translateService.get([
                'REGISTRATION.SAVE_ALERT.HEADER',
                'REGISTRATION.SAVE_ALERT.MESSAGE',
                'REGISTRATION.SAVE_ALERT.NO',
                'REGISTRATION.SAVE_ALERT.YES',
            ]).toPromise();
            const alert = await this.alertController.create({
                header: translations['REGISTRATION.SAVE_ALERT.HEADER'],
                message: translations['REGISTRATION.SAVE_ALERT.MESSAGE'],
                buttons: [
                    {
                        text: translations['REGISTRATION.SAVE_ALERT.NO'],
                        role: 'cancel'
                    },
                    {
                        text: translations['REGISTRATION.SAVE_ALERT.YES'],
                    }
                ]
            });
            alert.present();
            const result = await alert.onDidDismiss();
            const save: boolean = result.role !== 'cancel';
            if (!save) {
                const userSettings = await this.userSettingService.getUserSettings();
                await this.registrationService.deleteRegistrationById(userSettings.appMode, component.registration.id);
            }
        }
        return true;
    }
}
