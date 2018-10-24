import { OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { IRegistration } from '../models/registration.model';

export abstract class BasePage implements OnInit {

    registration: IRegistration;
    registrationService: RegistrationService;

    constructor(
        registrationService: RegistrationService,
    ) {
        this.registrationService = registrationService;
    }

    async ngOnInit(): Promise<void> {
        this.registration = await this.registrationService.getCurrentRegistration();
        if (!this.registration) {
            this.registration = await this.registrationService.createNewRegistration();
        }
        this.onInit();
    }

    abstract onInit();

    hasChanged() {
        return true;
    }

}
