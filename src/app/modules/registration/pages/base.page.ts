import { Directive } from '@angular/core';
import { from, of } from 'rxjs';
import { BasePageService } from './base-page-service';
import { IRegistration, RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil, map, switchMap, tap, skip } from 'rxjs/operators';
import { NgDestoryBase } from '../../../core/helpers/observable-helper';

@Directive()
export abstract class BasePage extends NgDestoryBase {
  registration: IRegistration;
  basePageService: BasePageService;
  registrationTid: RegistrationTid;
  activatedRoute: ActivatedRoute;

  constructor(registrationTid: RegistrationTid, basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super();
    this.basePageService = basePageService;
    this.activatedRoute = activatedRoute;
    this.registrationTid = registrationTid;
  }

  ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.params['id'];

    // The first time we get a registration object, run some additional logic
    this.basePageService.CommonRegistrationService.getRegistrationByIdShared$(id)
      .pipe(
        take(1),
        map((reg) => {
          // Seems like this class is also used by the top level summary view,
          // where we don't have a registrationTid.
          if (this.registrationTid != null) {
            this.basePageService.createDefaultProps(reg, this.registrationTid);
          }
          return reg;
        }),
        tap((reg) => {
          this.registration = reg;
        }),
        switchMap(() => this.createInitObservable()),
      )
      .subscribe();

    // Update registration data eg. when navigating back from subforms
    this.basePageService.CommonRegistrationService.getRegistrationByIdShared$(id)
      .pipe(
        skip(1),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((reg) => {
        this.registration = reg;
      });
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
    const isEmpty = await Promise.resolve(this.isEmpty());
    if (!isEmpty && !valid) {
      return this.basePageService.confirmLeave(this.registration, this.registrationTid, () => (this.onReset ? this.onReset() : null));
    }
    return true;
  }

  private createInitObservable() {
    if (this.onInit) {
      return from(Promise.resolve(this.onInit()));
    }
    return of({});
  }

  async ionViewWillLeave() {
    if (this.onBeforeLeave) {
      await Promise.resolve(this.onBeforeLeave());
    }
    await this.save(true);
  }

  save(clean = false) {
    this.registration.syncStatus = SyncStatus.Draft;
    return this.basePageService.RegistrationService.saveRegistrationAsync(this.registration, clean);
  }

  getSaveFunc() {
    return () => this.save();
  }

  async isEmpty(): Promise<boolean> {
    return !(await this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(
      this.registration,
      this.registrationTid
    )
      .pipe(take(1))
      .toPromise());
  }

  reset() {
    return this.basePageService.confirmReset(this.registration, this.registrationTid, () => (this.onReset ? this.onReset() : null));
  }

  getResolvedUrl(): string {
    return (
      '/' +
      this.activatedRoute.snapshot.pathFromRoot
        .map((v) => v.url.map((segment) => segment.toString()).join('/'))
        .filter((path) => !!path)
        .join('/')
    );
  }

  // getConfiguredUrl(): string {
  //     return '/' + this.activatedRoute.snapshot.pathFromRoot
  //         .filter(v => v.routeConfig)
  //         .map(v => v.routeConfig.path)
  //         .join('/');
  // }
}
