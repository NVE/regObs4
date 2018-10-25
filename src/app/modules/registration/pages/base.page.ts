import { OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { IRegistration } from '../models/registration.model';
import { RegistationTid } from '../models/registrationTid.enum';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';

export abstract class BasePage implements OnInit {

    registration: IRegistration;
    registrationService: RegistrationService;
    registrationTid: RegistationTid;

    constructor(
        registrationTid: RegistationTid,
        registrationService: RegistrationService,
    ) {
        this.registrationTid = registrationTid;
        this.registrationService = registrationService;
    }

    async ngOnInit(): Promise<void> {
        this.registration = await this.registrationService.getCurrentRegistration();
        if (!this.registration) {
            this.registration = await this.registrationService.createNewRegistration();
        }
        const propName = this.getPropertyName();
        if (!this.registration[propName]) { // Init to new object if null
            this.registration[propName] = this.getDefaultValue();
        }
        if (!this.registration.Picture) {
            this.registration.Picture = [];
        }
        if (this.onInit) {
            await Promise.resolve(this.onInit());
        }
    }

    onInit?(): void | Promise<any>;

    onBeforeLeave?(): void | Promise<any>;

    onReset?(): void;

    hasChanged() {
        return true;
    }

    async ionViewWillLeave() {
        if (this.onBeforeLeave) {
            await Promise.resolve(this.onBeforeLeave());
        }
        this.registrationService.saveRegistration(this.registration);
    }

    async reset() {
        if (this.registrationTid) {
            this.registration[this.getPropertyName()] = this.getDefaultValue();
            this.resetImages();
        }
        if (this.onReset) {
            this.onReset();
        }
    }

    getRegistationProperty() {
        if (this.registration && this.registrationTid) {
            return this.registration[this.getPropertyName()];
        }
        return null;
    }

    getPropertyName() {
        return RegistationTid[this.registrationTid];
    }

    getType() {
        return typeof this.getRegistationProperty();
    }

    getDefaultValue() {
        if (this.getType() === typeof Array) {
            return [];
        } else {
            return {};
        }
    }

    resetImages() {
        if (this.registrationTid && this.registration.Picture && this.registration.Picture.length > 0) {
            this.registration.Picture = this.registration.Picture.filter((p) => p.RegistrationTID !== this.registrationTid);
        }
    }

    getImages() {
        return this.registration ?
            (this.registration.Picture || []).filter((p) => p.RegistrationTID === this.registrationTid) : [];
    }

    hasImages() {
        return this.getImages().length > 0;
    }

    isEmpty() {
        if (this.registrationTid && this.registration) {
            const isRegistrationEmpty = IsEmptyHelper.isEmpty(this.getRegistationProperty());
            return isRegistrationEmpty && !this.hasImages();
        }
        return true;
    }

}
