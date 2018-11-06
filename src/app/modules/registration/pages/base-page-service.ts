import { Injectable, ApplicationRef, NgZone } from '@angular/core';
import { RegistrationTid } from '../models/registrationTid.enum';
import { RegistrationService } from '../services/registration.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IRegistration } from '../models/registration.model';

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

    async createOnLeaveAlert(registration: IRegistration, registrationTid: RegistrationTid, onReset?: () => void) {
        const translations = await this.translateService
            .get(['DIALOGS.CANCEL', 'DIALOGS.YES', 'REGISTRATION.REQUIRED_FIELDS_MISSING']).toPromise();
        const alert = await this.alertController.create({
            message: translations['REGISTRATION.REQUIRED_FIELDS_MISSING'],
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
        this.ngZone.run(() => {
            if (registrationTid) {
                registration[this.registrationService.getPropertyName(registrationTid)] = this.getDefaultValue(registrationTid);
                this.resetImages(registration, registrationTid);
            }
            if (onReset) {
                onReset();
            }
        });
    }

    createDefaultProps(registration: IRegistration, registrationTid: RegistrationTid) {
        const propName = this.registrationService.getPropertyName(registrationTid);
        if (!registration[propName]) { // Init to new object if null
            registration[propName] = this.getDefaultValue(registrationTid);
        }
        if (!registration.Picture) {
            registration.Picture = [];
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
        if (registration.Picture && registration.Picture.length > 0) {
            registration.Picture = registration.Picture.filter((p) => p.RegistrationTID !== registrationTid);
        }
    }

    hasImages(registration: IRegistration, registrationTid: RegistrationTid) {
        return this.registrationService.getImages(registration, registrationTid).length > 0;
    }
    applyRegId(registration: IRegistration, url: string) {
        return `${url}/${registration.Id}`;
    }
}
