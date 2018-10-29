import { OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { IRegistration } from '../models/registration.model';
import { RegistrationTid } from '../models/registrationTid.enum';
import { Subscription } from 'rxjs';

export abstract class BasePage implements OnInit, OnDestroy {

    registration: IRegistration;
    registrationService: RegistrationService;
    registrationTid: RegistrationTid;
    changeDetectorRef: ChangeDetectorRef;

    private subscription: Subscription;

    constructor(
        registrationTid: RegistrationTid,
        registrationService: RegistrationService,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        this.registrationTid = registrationTid;
        this.registrationService = registrationService;
        this.changeDetectorRef = changeDetectorRef;
    }

    async ngOnInit(): Promise<void> {
        this.registration = await this.registrationService.getCurrentRegistration();
        if (!this.registration) {
            this.registration = await this.registrationService.createNewRegistration();
        }
        this.createDefaultProps();
        if (this.onInit) {
            await Promise.resolve(this.onInit());
        }

        this.subscription = this.registrationService.registrationForCurrentGeoHazard$.subscribe((val) => {
            this.registration = val;
            this.createDefaultProps();
            this.changeDetectorRef.detectChanges();
        });
    }

    private createDefaultProps() {
        const propName = this.getPropertyName();
        if (!this.registration[propName]) { // Init to new object if null
            this.registration[propName] = this.getDefaultValue();
        }
        if (!this.registration.Picture) {
            this.registration.Picture = [];
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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
        return this.registrationService.getRegistationProperty(this.registration, this.registrationTid);
    }

    getPropertyName() {
        return this.registrationService.getPropertyName(this.registrationTid);
    }

    getType() {
        return this.registrationService.getType(this.registrationTid);
    }

    getDefaultValue() {
        if (this.getType() === 'array') {
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
        return this.registrationService.getImages(this.registration, this.registrationTid);
    }

    hasImages() {
        return this.getImages().length > 0;
    }

    isEmpty() {
        return this.registrationService.isEmpty(this.registration, this.registrationTid);
    }

}
