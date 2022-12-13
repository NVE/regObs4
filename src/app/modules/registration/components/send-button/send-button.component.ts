import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs/operators';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { combineLatest, firstValueFrom, Observable, Subject } from 'rxjs';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { DraftToRegistrationService } from 'src/app/core/services/draft/draft-to-registration.service';
import { AddUpdateDeleteRegistrationService } from 'src/app/core/services/add-update-delete-registration/add-update-delete-registration.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../../../core/services/confirmation-modal/confirmation-modal.service';

const DEBUG_TAG = 'SendButtonComponent';
const DELETE_OBS_TIMEOUT_MS = 5000;

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendButtonComponent implements OnInit, OnChanges {
  @Input() draft: RegistrationDraft;

  isDisabled$: Observable<boolean>;
  private isSending = new Subject<boolean>();
  private hasChanges = new Subject<void>();

  constructor(
    private draftService: DraftRepositoryService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private navController: NavController,
    private regobsAuthService: RegobsAuthService,
    private draftToRegistrationService: DraftToRegistrationService,
    private addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private logger: LoggingService,
    private newAttachmentService: NewAttachmentService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    const isEmpty$ = combineLatest([
      this.newAttachmentService.getAttachments(this.draft.uuid).pipe(map((attachments) => attachments.length === 0)),
      this.hasChanges.pipe(
        startWith(null),
        switchMap(() => this.draftService.isDraftEmpty(this.draft))
      ),
    ]).pipe(map(([noAttachments, registrationEmpty]) => noAttachments && registrationEmpty));

    this.isDisabled$ = combineLatest([
      this.regobsAuthService.isLoggingIn$.pipe(startWith(false)),
      this.isSending.pipe(startWith(false)),
      isEmpty$,
    ]).pipe(map(([isLoggingIn, isSending, isEmpty]) => isLoggingIn || isSending || isEmpty));
  }

  ngOnChanges(): void {
    this.hasChanges.next();
  }

  async send(): Promise<void> {
    this.isSending.next(true);
    try {
      // Redirect user to log in if not authenticated
      if (!(await this.isLoggedIn())) {
        this.regobsAuthService.signIn();
        return;
      }

      this.draftToRegistrationService.markDraftAsReadyToSubmit(this.draft);
      this.navigateToMyObservations();
    } finally {
      this.isSending.next(false);
    }
  }

  async requestDeleteDraft(): Promise<boolean> {
    return await this.confirmationModalService.askForConfirmation({
      message: this.draft.regId ? 'REGISTRATION.DELETE.DRAFT.MESSAGE_EDIT' : 'REGISTRATION.DELETE.DRAFT.MESSAGE_NEW',
      header: 'REGISTRATION.DELETE.DRAFT.HEADER',
      buttons: [
        {
          text: 'DIALOGS.NO',
          role: PopupResponse.CANCEL,
        },
        {
          text: 'DIALOGS.YES',
          role: PopupResponse.CONFIRM,
          handler: () => {
            this.deleteDraft();
          },
        },
      ],
    });
  }

  async requestDeleteFromRegobs(): Promise<boolean> {
    return await this.confirmationModalService.askForConfirmation({
      message: 'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.MESSAGE',
      header: 'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.HEADER',
      buttons: [
        {
          text: 'DIALOGS.CANCEL',
          role: PopupResponse.CANCEL,
        },
        {
          text: 'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.BUTTON',
          role: PopupResponse.CONFIRM,
          handler: () => {
            this.deleteFromRegobs();
          },
        },
      ],
    });
  }

  private async deleteDraft(): Promise<void> {
    await this.draftService.delete(this.draft.uuid);
    this.navigateToMyObservations();
  }

  private async deleteFromRegobs(): Promise<void> {
    try {
      await this.addUpdateDeleteRegistrationService.delete(this.draft.regId, DELETE_OBS_TIMEOUT_MS);
    } catch (err) {
      this.handleDeleteFromRegobsFailed(err);
      return;
    }
    await this.draftService.delete(this.draft.uuid);
    this.navigateToMyObservations();
  }

  private async handleDeleteFromRegobsFailed(err: Error) {
    this.deleteDraft();
    const translations = await firstValueFrom(
      this.translateService.get([
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.HEADER',
        'REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.MESSAGE',
      ])
    );
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.HEADER'],
      message: translations['REGISTRATION.DELETE.SUBMITTED_REGISTRATION.FAILED.MESSAGE'],
    });
    this.logger.debug(`Delete of registration with regID ${this.draft.regId} failed`, DEBUG_TAG, err);
    await alert.present();
  }

  private async navigateToMyObservations(): Promise<void> {
    if (await this.isLoggedIn()) {
      this.navController.navigateRoot('my-observations');
    } else {
      this.navController.navigateRoot('/');
    }
  }

  private async isLoggedIn(): Promise<boolean> {
    const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
    return loggedInUser.isLoggedIn;
  }
}
