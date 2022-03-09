import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { combineLatest, exhaustMap, filter, firstValueFrom, from, interval, map, Observable, startWith, Subject, throttleTime, withLatestFrom } from 'rxjs';
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


/**
 * Service that listens for new drafts ready to send to regobs api (drafts with SyncStatus.Sync), and asks
 * AddUpdateDeleteRegistrationService to send them. If an upload fails, it asks DraftService to save the draft with an
 * error property.
 */
@Injectable({
  providedIn: 'root'
})
export class DraftToRegistrationService {
  private initialized = false;

  /**
   * Emits new uploaded registrations.
   */
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
    ])
      .subscribe(([drafts, isConnected]) => {
        if (!isConnected) return;

        const draftsToSync = drafts
          .filter(d => d.syncStatus === SyncStatus.Sync)
          .filter(d => d.error == null)
          .filter(d => !this.registrationsUploading.includes(d.uuid));

        for (const draft of draftsToSync) {
          this.addOrUpdateRegistration(draft);
        }
      });
  }

  private removeNetworkErrorsOnDraftsOnNetworkConnected() {
    combineLatest([
      this.networkStatus.connected$,
      interval(5 * 60 * 1000).pipe(startWith(true)),
      this.platform.resume.pipe(startWith(true))
    ]).pipe(
      filter(([isConnected,]) => isConnected === true),
      // Only emit that we have a connection one time per 5 seconds, in case two or more emits at almost the same time
      throttleTime(5000),
      withLatestFrom(this.draftService.drafts$),
      // Pick drafts with network errors
      map(([,drafts]) => drafts.filter(d => d.error?.code === RegistrationDraftErrorCode.NoNetworkOrTimedOut)),
      // exhaustMap ignores new incoming drafts until we have successfully saved
      exhaustMap(drafts => from(this.retryDraftsFailedWithNetworkError(drafts)))
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

  private retryDraftsFailedWithNetworkError(drafts: RegistrationDraft[]): Promise<void[]> {
    const updateTasks = drafts.map(d => this.retryDraftThatFailedWithNetworkError(d));
    // Concurrently save updates and return the promise to allow it to be awaited
    return Promise.all(updateTasks);
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
