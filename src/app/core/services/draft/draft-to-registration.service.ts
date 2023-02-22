import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  combineLatest,
  exhaustMap,
  filter,
  firstValueFrom,
  from,
  interval,
  map,
  startWith,
  throttleTime,
  withLatestFrom,
} from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AddUpdateDeleteRegistrationService } from '../add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from '../network-status/network-status.service';
import { UploadAttachmentError } from '../upload-attachments/upload-attachments.service';
import { RegistrationDraft, RegistrationDraftErrorCode } from './draft-model';
import { DraftRepositoryService } from './draft-repository.service';

const DEBUG_TAG = 'DraftToRegistrationService';

/**
 * Service that listens for new drafts ready to send to regobs api (drafts with SyncStatus.Sync), and asks
 * AddUpdateDeleteRegistrationService to send them. If an upload fails, it asks DraftService to save the draft with an
 * error property.
 */
@Injectable({
  providedIn: 'root',
})
export class DraftToRegistrationService {
  private initialized = false;

  /**
   * Used to track what registrations we are currently uploading,
   * as DraftService.drafts$ can emit the same draft multiple times
   */
  private registrationsUploading: string[] = [];

  constructor(
    private platform: Platform,
    private draftService: DraftRepositoryService,
    private addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
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

  /**
   * Initialize submitting of given draft
   * @param draft the draft to submit
   * @param ignoreVersionCheck set this to true to overwrite conflicting versions on server
   */
  async markDraftAsReadyToSubmit(draft: RegistrationDraft, ignoreVersionCheck = false): Promise<void> {
    const { error, ...draftToUpdate } = draft;
    if (error) {
      this.loggerService.debug('Draft had error, will remove error when saving to retry upload', DEBUG_TAG, {
        uuid: draftToUpdate.uuid,
        error,
      });
    }

    // Mark draft as ready to submit
    const syncStatus = ignoreVersionCheck ? SyncStatus.SyncAndIgnoreVersionCheck : SyncStatus.Sync;
    this.draftService.save({
      ...draftToUpdate,
      syncStatus: syncStatus,
    });
  }

  private startUploadingRegistrations() {
    // Listen for drafts ready to submit to regobs api, and network status
    this.draftService.drafts$.subscribe((drafts) => {
      const draftsToSync = drafts
        .filter((d) => d.syncStatus === SyncStatus.Sync || d.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck)
        .filter((d) => d.error == null)
        .filter((d) => !this.registrationsUploading.includes(d.uuid));

      for (const draft of draftsToSync) {
        this.addOrUpdateRegistrationWithTracker(draft);
      }
    });
  }

  private removeNetworkErrorsOnDraftsOnNetworkConnected() {
    combineLatest([
      this.networkStatus.connected$,
      interval(5 * 60 * 1000).pipe(startWith(true)),
      this.platform.resume.pipe(startWith(true)),
    ])
      .pipe(
        filter(([isConnected]) => isConnected === true),
        // Only emit that we have a connection one time per 5 seconds, in case two or more emits at almost the same time
        throttleTime(5000),
        withLatestFrom(this.draftService.drafts$),
        // Pick drafts with network errors
        map(([, drafts]) => drafts.filter((d) => d.error?.code === RegistrationDraftErrorCode.NoNetworkOrTimedOut)),
        // exhaustMap ignores new incoming drafts until we have successfully saved
        exhaustMap((drafts) => from(this.retryDraftsFailedWithNetworkError(drafts)))
      )
      .subscribe();
  }

  private async addOrUpdateRegistrationWithTracker(draft: RegistrationDraft) {
    // Save this draft uuid to an in memory list so that we can keep track of what we are currently uploading
    this.registrationsUploading.push(draft.uuid);
    try {
      await this.addOrUpdateRegistration(draft);
    } finally {
      // Stop tracking that we are uploading this registration
      const i = this.registrationsUploading.indexOf(draft.uuid);
      this.registrationsUploading.splice(i, 1);
    }
  }

  private async addOrUpdateRegistration(draft: RegistrationDraft) {
    // No need to upload if we do not have a connection.
    // We need to set the network error anyway so that we know we have tried to upload this.
    const connected = await firstValueFrom(this.networkStatus.connected$);
    if (!connected) {
      await this.setNetworkErrorOnDraft(draft);
      return;
    }

    this.loggerService.debug(`Sending registration ${draft.uuid} to regobs api`, DEBUG_TAG);

    try {
      if (draft.regId) {
        const ignoreVersionCheck = draft.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
        await this.addUpdateDeleteRegistrationService.update(draft, ignoreVersionCheck);
      } else {
        await this.addUpdateDeleteRegistrationService.add(draft);
      }

      await this.draftService.delete(draft.uuid);
    } catch (error) {
      const { message, code } = handleError(error);
      this.loggerService.error(error, DEBUG_TAG, message);
      await this.draftService.save({ ...draft, error: { code, message, timestamp: Date.now() } });
    }
  }

  private async setNetworkErrorOnDraft(draft: RegistrationDraft) {
    await this.draftService.save({
      ...draft,
      error: {
        code: RegistrationDraftErrorCode.NoNetworkOrTimedOut,
        timestamp: Date.now(),
      },
    });
  }

  private retryDraftsFailedWithNetworkError(drafts: RegistrationDraft[]): Promise<void[]> {
    const updateTasks = drafts.map((d) => this.retryDraftThatFailedWithNetworkError(d));
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
}

function handleError(error: Error): { code: RegistrationDraftErrorCode; message: string } {
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
      (code = RegistrationDraftErrorCode.NoNetworkOrTimedOut),
        (message = error.message || 'Response failed with status code 0, probably no network?');
    } else if (error.status === HttpStatusCode.BadRequest) {
      code = RegistrationDraftErrorCode.RegistrationError;
      // Regobs api returns additional info for bad requests.
      // Put this info into a readable error message.
      let messages = [];
      if (error.error?.Message) {
        messages.push(error.error.Message);
      }
      if (error.error?.ModelState) {
        messages = [...messages, ...Object.values(error.error.ModelState)];
      }
      if (messages.length > 0) {
        message = messages.join(' ');
      } else {
        message = error.message || `Response failed with ${error.status} - ${error.statusText}`;
      }
    } else if (error.status === HttpStatusCode.Conflict) {
      code = RegistrationDraftErrorCode.ConflictError;
      message = error.message || `Registration conflict ${error.status} - ${error.statusText}`;
    } else if (error.status === HttpStatusCode.Gone) {
      code = RegistrationDraftErrorCode.GoneError;
      message = error.message || `Registration is deleted in Regobs ${error.status} - ${error.statusText}`;
    } else if (error.status > HttpStatusCode.BadRequest) {
      code = RegistrationDraftErrorCode.ServerError;
      message = error.message || `Response failed with ${error.status} - ${error.statusText}`;
    } else {
      code = RegistrationDraftErrorCode.Unknown;
      message = error.message || `Got an unknown http error: ${error.status} - ${error.statusText}`;
    }
  } else if (error.message == 'No Token Defined!') {
    code = RegistrationDraftErrorCode.Unauthorized;
    message = error.message;
  } else {
    // Handle unknown errors
    code = RegistrationDraftErrorCode.Unknown;
    message = error.message || 'An unknown error occured while uploading the registration';
  }

  return { code, message };
}
