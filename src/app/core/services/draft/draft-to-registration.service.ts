import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { combineLatest, concatMap, filter, firstValueFrom, from, interval, Observable, startWith, Subject, switchMap, withLatestFrom } from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AddUpdateDeleteRegistrationService } from '../add-update-delete-registration/add-updade-delete-registration.service';
import { NetworkStatusService } from '../network-status/network-status.service';
import { UploadAttachmentError } from '../upload-attachments/upload-attachments.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RegistrationDraft, RegistrationDraftErrorCode } from './draft-model';
import { DraftRepositoryService } from './draft-repository.service';

const DEBUG_TAG = 'DraftToRegistrationService';


@Injectable({
  providedIn: 'root'
})
export class DraftToRegistrationService {
  private initialized = false;

  get newRegistrations$(): Observable<RegistrationViewModel> {
    return this.newRegistrations.asObservable();
  }

  private newRegistrations = new Subject<RegistrationViewModel>();
  private registrationsUploading: string[] = [];

  constructor(
    private platform: Platform,
    private draftService: DraftRepositoryService,
    private addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private userSettings: UserSettingService,
    private loggerService: LoggingService,
    private networkStatus: NetworkStatusService
  ) {}

  public createSubscriptions() {
    if (this.initialized) {
      throw new Error('Already initialized');
    }
    this.startUploadingRegistrations();
    this.removeNetworkErrorsOnDraftsOnNetworkConnected();
    this.initialized = true;
  }

  private startUploadingRegistrations() {
    // Listen for drafts ready to submit to regobs api, and network status
    combineLatest([
      this.draftService.drafts$,
      this.networkStatus.connected$
    ]).pipe(
      // No need to try sending registrations if we are offline
      filter(([, isConnected]) => isConnected === true),
      // Change this stream from a stream 'draft[]' to a stream of 'draft'
      // This makes the filtering below a bit easier
      switchMap(([drafts,]) => from(drafts)),
      // Only upload drafts with status sync
      filter(draft => draft.syncStatus === SyncStatus.Sync),
      // Do not try to send registrations with errors
      filter(draft => draft.error == null),
      // Only start one upload at a time
      filter(draft => !this.registrationsUploading.includes(draft.uuid))
    )
      .subscribe(draftToSubmit => this.addOrUpdateRegistration(draftToSubmit));
  }

  private removeNetworkErrorsOnDraftsOnNetworkConnected() {
    combineLatest([
      this.networkStatus.connected$,
      interval(5 * 60 * 1000).pipe(startWith(true)),
      this.platform.resume.pipe(startWith(true))
    ]).pipe(
      filter(([isConnected,]) => isConnected === true),
      withLatestFrom(this.draftService.drafts$),
      switchMap(([,drafts]) => from(drafts)),
      filter(draft => draft.error?.code === RegistrationDraftErrorCode.NoNetworkOrTimedOut),
      concatMap(draft => from(this.retryDraftThatFailedWithNetworkError(draft)))
    )
      .subscribe();
  }

  private async addOrUpdateRegistration(draft: RegistrationDraft) {
    // Save this draft uuid to an in memory list so that we can keep track of what we are currently uploading
    this.registrationsUploading.push(draft.uuid);

    const langKey = await firstValueFrom(this.userSettings.language$);
    this.loggerService.debug(`Sending registration ${draft.uuid} to regobs api`, DEBUG_TAG);

    try {
      let result: RegistrationViewModel;

      if (draft.regId) {
        // We can add ignore version check functionality here later
        result = await this.addUpdateDeleteRegistrationService.update(draft, langKey);
      } else {
        result = await this.addUpdateDeleteRegistrationService.add(draft, langKey);
      }

      await this.draftService.delete(draft.uuid);
      this.newRegistrations.next(result);
    } catch (error) {
      const { message, code } = this.handleError(error);
      this.loggerService.error(error, DEBUG_TAG, message);
      await this.draftService.save({ ...draft, error: { code, message, timestamp: Date.now() } });
    }

    // Stop tracking that we are uploading this registration
    const i = this.registrationsUploading.indexOf(draft.uuid);
    this.registrationsUploading.splice(i, 1);
  }

  private async retryDraftThatFailedWithNetworkError(draft: RegistrationDraft) {
    if (!(draft.error.code === RegistrationDraftErrorCode.NoNetworkOrTimedOut)) {
      throw new Error('Draft without network error received');
    }

    const { error, ...draftWithoutError } = draft;
    this.loggerService.debug('Removing network error from draft', DEBUG_TAG, { error, draftId: draft.uuid });
    await this.draftService.save(draftWithoutError);
  }

  private handleError(error: Error): {code: RegistrationDraftErrorCode; message: string} {
    let code: RegistrationDraftErrorCode;
    let message: string;

    if (error instanceof UploadAttachmentError) {
      // Handle attachment errors
      // We can do a lot more here, we know which attachments failed etc.
      code = RegistrationDraftErrorCode.AttachmentError;
      message = error.message;
    } else if (error instanceof HttpErrorResponse) {
      // Handle Http Errors
      if (error.status === 0) {
        code = RegistrationDraftErrorCode.NoNetworkOrTimedOut,
        message = error.message || 'Response failed with status code 0, probably no network?';
      } else if (error.status === HttpStatusCode.BadRequest) {
        code = RegistrationDraftErrorCode.RegistrationError;
        message = error.message || `Response failed with ${error.status} - ${error.statusText}`;
      } else if (error.status === HttpStatusCode.Conflict) {
        code = RegistrationDraftErrorCode.ConflictError;
        message = error.message || `Registration conflict ${error.status} - ${error.statusText}`;
      } else if (error.status > HttpStatusCode.BadRequest) {
        code = RegistrationDraftErrorCode.ServerError;
        message = error.message || `Response failed with ${error.status} - ${error.statusText}`;
      } else {
        code = RegistrationDraftErrorCode.Unknown;
        message = error.message || `Got an unknown http error: ${error.status} - ${error.statusText}`;
      }
    } else {
      // Handle unknown errors
      code = RegistrationDraftErrorCode.Unknown;
      message = error.message || 'An unknown error occured while uploading the registration';
    }

    return { code, message };
  }
}
