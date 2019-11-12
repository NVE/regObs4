import { Injectable, ApplicationRef, NgZone } from '@angular/core';
import { RegistrationTid } from '../models/registrationTid.enum';
import { RegistrationService } from '../services/registration.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IRegistration } from '../models/registration.model';
import { timingSafeEqual } from 'crypto';

@Injectable({
    providedIn: 'root'
})
export class BasePageService {

    get Zone() {
        return this.ngZone;
    }

    get RegistrationService() {
        return this.registrationService;
    }

    get AlertController() {
        return this.alertController;
    }

    get TranslateService() {
        return this.translateService;
    }

    constructor(
        private registrationService: RegistrationService,
        private ngZone: NgZone,
        private alertController: AlertController,
        private translateService: TranslateService) {
    }

    async confirmLeave(registration: IRegistration, registrationTid: RegistrationTid, onReset?: () => void) {
        const leaveText = await this.translateService
            .get('REGISTRATION.REQUIRED_FIELDS_MISSING').toPromise();
        return this.createResetDialog(leaveText, registration, registrationTid, onReset);
    }

    async confirmReset(registration: IRegistration, registrationTid: RegistrationTid, onReset?: () => void) {
        const leaveText = await this.translateService
            .get('REGISTRATION.CONFIRM_RESET').toPromise();
        return this.createResetDialog(leaveText, registration, registrationTid, onReset);
    }

    private async createResetDialog(message: string, registration: IRegistration, registrationTid: RegistrationTid, onReset?: () => void) {
        const translations = await this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']).toPromise();
        const alert = await this.alertController.create({
            message,
            buttons: [
                {
                    text: translations['DIALOGS.CANCEL'],
                    role: 'cancel',
                },
                {
                    text: translations['DIALOGS.YES'],
                },
            ]
        });
        await alert.present();
        const result = await alert.onDidDismiss();
        const reset: boolean = result.role !== 'cancel';
        if (reset) {
            await this.reset(registration, registrationTid, onReset);
        }
        return reset;
    }

    async reset(registration: IRegistration, registrationTid: RegistrationTid, onReset?: () => void) {
        this.Zone.run(() => {
            if (registrationTid) {
                registration.request[this.registrationService.getPropertyName(registrationTid)]
                    = this.getDefaultValue(registrationTid);
                this.resetImages(registration, registrationTid);
            }
            if (onReset) {
                onReset();
            }
        });
        await this.registrationService.saveRegistration(registration);
    }

    createDefaultProps(registration: IRegistration, registrationTid: RegistrationTid) {
        const propName = this.registrationService.getPropertyName(registrationTid);
        if (!registration.request[propName]) { // Init to new object if null
            registration.request[propName] = this.getDefaultValue(registrationTid);
        }
        if (!registration.request.Picture) {
            registration.request.Picture = [];
        }

    }

    getDefaultValue(registrationTid: RegistrationTid) {
        if (this.registrationService.getType(registrationTid) === 'array') {
            return [];
        } else {
            return {};
        }
    }

    resetImages(registration: IRegistration, registrationTid: RegistrationTid) {
        if (registration.request.Picture && registration.request.Picture.length > 0) {
            registration.request.Picture = registration.request.Picture.filter((p) => p.RegistrationTID !== registrationTid);
        }
    }

    hasImages(registration: IRegistration, registrationTid: RegistrationTid) {
        return this.registrationService.getImages(registration, registrationTid).length > 0;
    }
}
