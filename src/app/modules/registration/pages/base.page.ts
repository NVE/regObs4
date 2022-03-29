import { Directive } from '@angular/core';
import { from, of } from 'rxjs';
import { BasePageService } from './base-page-service';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil, map, switchMap, tap, skip } from 'rxjs/operators';
import { NgDestoryBase } from '../../../core/helpers/observable-helper';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { createEmptyRegistration } from '../../common-registration/registration.helpers';

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

    const draft$ = this.basePageService.draftRepository.getDraft$(id);

    // The first time we get a registration object, run some additional logic
    draft$.pipe(
      take(1),
      map((draft) => {
        // Seems like this class is also used by the set datetime page,
        // where we don't have a registrationTid
        if (this.registrationTid != null) {
          return createEmptyRegistration(draft, this.registrationTid);
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

  /**
   * Implement this to initialize the registration
   */
  onInit?(): void | Promise<unknown>;

  /**
   * Implement this to cleanup when the page closes
   */
  onBeforeLeave?(): void | Promise<unknown>;

  /**
   * Implement this to do form validation
   */
  isValid?(): boolean | Promise<boolean>;

  // NOTE: Remember to add canDeactivate: [CanDeactivateRouteGuard] in page module
  async canLeave(): Promise<boolean> {
    // Check if implementation page has implemented custom isValid logic
    const valid = await Promise.resolve(this.isValid ? this.isValid() : true);
    // Only return alert if page is not empty and invalid
    const isEmpty = await this.isEmpty();
    if (!isEmpty && !valid) {
      const pleaseLeave = await this.basePageService.confirmLeave();
      if (pleaseLeave) {
        await this.delete();
      } else {
        return false; //user wants to stay
      }
    }
    return true;
  }

  private createInitObservable() {
    if (this.onInit) {
      return from(Promise.resolve(this.onInit()));
    }
    return of({});
  }

  /**
   * Save automatically when you leave the page. Will also run onBeforeLeave() hook if you have any
   */
  async ionViewWillLeave() {
    if (this.onBeforeLeave) {
      await Promise.resolve(this.onBeforeLeave());
    }
    await this.save();
  }

  save() {
    return this.basePageService.draftRepository.save({ ...this.draft, syncStatus: SyncStatus.Draft });
  }

  getSaveFunc() {
    return () => this.save();
  }

  async isEmpty(registrationType = this.registrationTid): Promise<boolean> {
    return this.basePageService.draftRepository.isDraftEmptyForRegistrationType(this.draft, registrationType);
  }

  /**
   * Reset the registration if the user confirms
   */
  async reset() {
    const pleaseReset = await this.basePageService.confirmDelete();
    if (pleaseReset) {
      await this.delete();

      // Create a new empty form / registration
      this.draft = createEmptyRegistration(this.draft, this.registrationTid);
    }
  }

  /**
   * Delete the registration behind the form and save the draft.
   * You may override this if your form contains other data.
   */
  protected async delete() {
    this.draft = await this.basePageService.delete(this.draft, [this.registrationTid]);
  }
}
