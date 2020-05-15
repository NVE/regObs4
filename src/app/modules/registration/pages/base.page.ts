import { OnInit } from '@angular/core';
import { RegistrationTid } from '../models/registrationTid.enum';
import { from, of } from 'rxjs';
import { BasePageService } from './base-page-service';
import { IRegistration } from '../models/registration.model';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { NgDestoryBase } from '../../../core/helpers/observable-helper';

export abstract class BasePage extends NgDestoryBase implements OnInit {

  registration: IRegistration;
  basePageService: BasePageService;
  registrationTid: RegistrationTid;
  activatedRoute: ActivatedRoute;


  constructor(
    registrationTid: RegistrationTid,
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super();
    this.basePageService = basePageService;
    this.activatedRoute = activatedRoute;
    this.registrationTid = registrationTid;
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.basePageService.RegistrationService.getSavedRegistrationByIdObservable(id).pipe(
      take(1), map((reg) => {
        this.basePageService.createDefaultProps(reg, this.registrationTid);
        return reg;
      }), tap((reg) => {
        this.registration = reg;
      }), switchMap(() => this.createInitObservable()), takeUntil(this.ngDestroy$)
    ).subscribe();
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
