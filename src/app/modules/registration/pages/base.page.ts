import { Directive } from '@angular/core';
import { from, of } from 'rxjs';
import { BasePageService } from './base-page-service';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil, map, switchMap, tap, skip } from 'rxjs/operators';
import { NgDestoryBase } from '../../../core/helpers/observable-helper';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

/**
 * Base page for a registration form, eg. danger sign
 */
@Directive()
export abstract class BasePage extends NgDestoryBase {
  draft: RegistrationDraft;
  basePageService: BasePageService;
  registrationTid: RegistrationTid;
  activatedRoute: ActivatedRoute;

  constructor(
    registrationTid: RegistrationTid,
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute
  ) {
    super();
    this.basePageService = basePageService;
    this.activatedRoute = activatedRoute;
    this.registrationTid = registrationTid;
  }

  ionViewDidEnter() {
    const id = this.activatedRoute.snapshot.params['id'];

    const draft$ = this.basePageService.DraftService.getDraft$(id);

    // The first time we get a registration object, run some additional logic
    draft$.pipe(
      take(1),
      map((draft) => {
        // Seems like this class is also used by the set datetime page,
        // where we don't have a registrationTid
        if (this.registrationTid != null) {
          return this.basePageService.createDefaultProps(draft, this.registrationTid);
        }
        return draft;
      }),
      tap((reg) => {
        this.draft = reg;
      }),
      switchMap(() => this.createInitObservable()),
    ).subscribe();

    // Update registration data eg. when navigating back from subforms
    draft$
      .pipe(
        skip(1),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((draft) => {
        this.draft = draft;
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
    const isEmpty = await this.isEmpty();
    if (!isEmpty && !valid) {
      return this.basePageService.confirmLeave(
        this.draft,
        this.registrationTid,
        () => (this.onReset ? this.onReset() : null)
      );
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
    await this.save();
  }

  save() {
    return this.basePageService.DraftService.save({ ...this.draft, syncStatus: SyncStatus.Draft });
  }

  getSaveFunc() {
    return () => this.save();
  }

  isEmpty(): Promise<boolean> {
    return this.basePageService.DraftService.isDraftEmptyForRegistrationType(this.draft, this.registrationTid);
  }

  reset() {
    return this.basePageService.confirmReset(
      this.draft,
      this.registrationTid,
      () => (this.onReset ? this.onReset() : null)
    );
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
}
