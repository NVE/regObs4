import { OnInit, OnDestroy } from '@angular/core';
import { RegistrationTid } from '../models/registrationTid.enum';
import { Subscription } from 'rxjs';
import { BasePageService } from './base-page-service';
import { IRegistration } from '../models/registration.model';
import { ActivatedRoute } from '@angular/router';

export abstract class BasePage implements OnInit, OnDestroy {

    registration: IRegistration;
    basePageService: BasePageService;
    registrationTid: RegistrationTid;
    activatedRoute: ActivatedRoute;

    private subscription: Subscription;

    constructor(
        registrationTid: RegistrationTid,
        basePageService: BasePageService,
        activatedRoute: ActivatedRoute,
    ) {
        this.basePageService = basePageService;
        this.activatedRoute = activatedRoute;
        this.registrationTid = registrationTid;
    }

    async ngOnInit(): Promise<void> {
        const id = this.activatedRoute.snapshot.params['id'];
        this.subscription = this.basePageService.RegistrationService
            .getSavedRegistrationByIdObservable(id).subscribe((val) => {
                if (val) {
                    this.basePageService.Zone.run(async () => {
                        this.registration = val;
                        if (this.registrationTid) {
                            this.basePageService.createDefaultProps(this.registration, this.registrationTid);
                        }
                        if (this.onInit) {
                            await Promise.resolve(this.onInit());
                        }
                    });
                }
            });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onInit?(): void | Promise<any>;

    onBeforeLeave?(): void | Promise<any>;

    onReset?(): void;

    isValid?(): boolean | Promise<boolean>;

    async canLeave() {
        const valid = await Promise.resolve(this.isValid ? this.isValid() : true);
        if (!this.isEmpty() && !valid) {
            return this.basePageService.confirmLeave(this.registration, this.registrationTid,
                () => this.onReset ? this.onReset() : null);
        }
        return true;
    }

    async ionViewDidLeave() {
        if (this.onBeforeLeave) {
            await Promise.resolve(this.onBeforeLeave());
        }
        this.basePageService.RegistrationService.saveRegistration(this.registration);
    }

    isEmpty() {
        return this.basePageService.RegistrationService.isEmpty(this.registration, this.registrationTid);
    }

    reset() {
        return this.basePageService.confirmReset(this.registration, this.registrationTid, () => this.onReset ? this.onReset() : null);
    }

    getResolvedUrl(): string {
        return '/' + this.activatedRoute.snapshot.pathFromRoot
            .map(v => v.url.map(segment => segment.toString()).join('/'))
            .filter((path) => !!path)
            .join('/');
    }

    // getConfiguredUrl(): string {
    //     return '/' + this.activatedRoute.snapshot.pathFromRoot
    //         .filter(v => v.routeConfig)
    //         .map(v => v.routeConfig.path)
    //         .join('/');
    // }

}
