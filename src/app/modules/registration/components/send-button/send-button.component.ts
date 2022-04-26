import { Component, OnInit, Input, NgZone, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { firstValueFrom, Subject } from 'rxjs';
import { SmartChanges } from 'src/app/core/helpers/simple-changes.helper';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DraftToRegistrationService } from 'src/app/core/services/draft/draft-to-registration.service';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'SendButtonComponent';
const DELETE_OBS_TIMEOUT_MS = 5000;

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendButtonComponent implements OnInit, OnDestroy, OnChanges {
  @Input() draft: RegistrationDraft;

  isEmpty = true;

  get isDisabled(): boolean {
    return this.isEmpty || this.isSending || this.isLoggingIn;
  }

  isSending = false;
  isLoggingIn = false;

  private ngDestroy$ = new Subject<void>();

  constructor(
    private draftService: DraftRepositoryService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private navController: NavController,
    private regobsAuthService: RegobsAuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private draftToRegistrationService: DraftToRegistrationService,
    private addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.isSending = false;
    this.isLoggingIn = false;
    this.regobsAuthService.isLoggingIn$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.isLoggingIn = val;
          this.cdr.detectChanges();
        });
      });
  }

  ngOnChanges(changes: SimpleChanges & SmartChanges<this>): void {
    if (changes.draft?.currentValue) {
      this.draftService.isDraftEmpty(changes.draft.currentValue).then((isEmpty) => {
        this.isEmpty = isEmpty;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  async send(): Promise<void> {
    if (!this.isSending) {
      this.isSending = true;
      this.cdr.detectChanges();
      try {
        // Redirect user to log in if not authenticated
        const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
        if (!loggedInUser.isLoggedIn) {
          this.regobsAuthService.signIn();
          return;
        }

        this.draftToRegistrationService.markDraftAsReadyToSubmit(this.draft);
        this.navigateToMyObservations();
      } finally {
        this.isSending = false;
        this.cdr.detectChanges();
      }
    }
  }

  async requestDeleteDraft(): Promise<void> {
    const translations = await firstValueFrom(this.translateService
      .get([
        'REGISTRATION.DELETE.DRAFT.HEADER',
        'REGISTRATION.DELETE.DRAFT.MESSAGE_NEW',
        'REGISTRATION.DELETE.DRAFT.MESSAGE_EDIT',
        'DIALOGS.YES',
        'DIALOGS.NO'
      ]));
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.DELETE.DRAFT.HEADER'],
      message:
      this.draft.regId
        ? translations['REGISTRATION.DELETE.DRAFT.MESSAGE_EDIT']
        : translations['REGISTRATION.DELETE.DRAFT.MESSAGE_NEW'],
      buttons: [
        {
          text: translations['DIALOGS.NO'],
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: translations['DIALOGS.YES'],
          handler: () => {
            this.deleteDraft();
          }
        }
      ]
    });
    await alert.present();
  }

  async requestDeleteFromRegobs(): Promise<void> {
    const translations = await firstValueFrom(this.translateService
      .get([
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.HEADER',
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.MESSAGE',
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.BUTTON',
        'DIALOGS.CANCEL'
      ]));
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.HEADER'],
      message: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.MESSAGE'],
      buttons: [
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.BUTTON'],
          handler: () => {
            this.deleteFromRegobs();
          }
        }
      ]
    });
    await alert.present();
  }

  private async deleteDraft(): Promise<void> {
    await this.draftService.delete(this.draft.uuid);
    this.navigateToMyObservations();
  }

  private async deleteFromRegobs(): Promise<void> {
    try {
      this.addUpdateDeleteRegistrationService.delete(this.draft.regId, DELETE_OBS_TIMEOUT_MS);
    } catch (err) {
      this.handleDeleteFromRegobsFailed(err);
      return;
    }
    this.draftService.delete(this.draft.uuid);
    this.navigateToMyObservations();
  }

  private async handleDeleteFromRegobsFailed(err: Error) {
    this.deleteDraft();
    const translations = await firstValueFrom(this.translateService
      .get([
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.HEADER',
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.MESSAGE'
      ]));
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.HEADER'],
      message: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.MESSAGE']
    });
    this.logger.debug(`Delete of registration with regID ${this.draft.regId} failed`, DEBUG_TAG, err);
    await alert.present();
  }

  private navigateToMyObservations(): void {
    this.navController.navigateRoot('my-observations');
  }
}
