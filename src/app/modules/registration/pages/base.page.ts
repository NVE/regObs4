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

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];
        this.subscription = this.basePageService.RegistrationService
            .getSavedRegistrationByIdObservable(id).subscribe(async (val) => {
                if (val) {
                    this.registration = val;
                    if (this.registrationTid) {
                        this.basePageService.createDefaultProps(this.registration, this.registrationTid);
                    }
                    if (this.onInit) {
                        await Promise.resolve(this.onInit());
                    }
                    this.basePageService.Zone.run(() => {
                        this.registration = this.registration;
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

    // NOTE: Remember to add canDeactivate: [CanDeactivateRouteGuard] in page module
    async canLeave() {
        // Check if implementation page has implemented custom isValid logic
        const valid = await Promise.resolve(this.isValid ? this.isValid() : true);
        // Only return alert if page is not empty and invalid
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
        this.save(true);
    }

    save(clean = false) {
        return this.basePageService.RegistrationService.saveRegistrationAsync(this.registration, clean);
    }

    getSaveFunc() {
        return () => this.save();
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
