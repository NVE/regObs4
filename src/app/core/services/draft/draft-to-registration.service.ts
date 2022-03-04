import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, from, Subscription, switchMap, tap } from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AddUpdateDeleteRegistrationService } from '../add-update-delete-registration/add-updade-delete-registration.service';
import { UploadAttachmentError } from '../upload-attachments/upload-attachments.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RegistrationDraft } from './draft-model';
import { DraftRepositoryService } from './draft-repository.service';

const DEBUG_TAG = 'DraftToRegistrationService';

// TODO: Vi må vel ha en slags SyncStatus Error, og en slags automatisk prøv igjen håndtering, i tillfelle man ikke har nett?

// TODO: Hva skjer om man skifter app miljø osv? Eller hvis en draft har status "sync" og man ikke er logget inn?

// TODO: Nå vil den prøve å sende inn registreringer på nytt hver gang det kommer noe til drafts$, den bør vel bare sende inn én gang med mindre noe endres

@Injectable({
  providedIn: 'root'
})
export class DraftToRegistrationService {

  private uploadRegistrationsSubscription: Subscription;
  private registrationsUploading: string[] = [];

  constructor(
    private draftService: DraftRepositoryService,
    private addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private userSettings: UserSettingService,
    private loggerService: LoggingService,
  ) {}

  public startUploadingRegistrations() {
    if (this.uploadRegistrationsSubscription) return;

    // Listen for drafts ready to submit to regobs api
    this.uploadRegistrationsSubscription = this.draftService.drafts$.pipe(
      tap((drafts) => this.loggerService.debug('drafts updated', DEBUG_TAG, drafts)),
      // Change this stream from a stream 'draft[]' to a stream of 'draft'
      // This makes the filtering below a bit easier
      switchMap(drafts => from(drafts)),
      // Only upload drafts with status sync
      filter(draft => draft.syncStatus === SyncStatus.Sync),
      // Only start one upload at a time
      filter(draft => !this.registrationsUploading.includes(draft.uuid))
    )
      .subscribe(draftToSubmit => this.addOrUpdateRegistration(draftToSubmit));
  }

  private async addOrUpdateRegistration(draft: RegistrationDraft) {
    // Save this draft uuid to an in memory list so that we can keep track of what we are currently uploading
    this.registrationsUploading.push(draft.uuid);

    const langKey = await firstValueFrom(this.userSettings.language$);

    this.loggerService.debug(`Sending registration ${draft.uuid} to regobs api`, DEBUG_TAG);

    let result: RegistrationViewModel;

    try {
      if (draft.regId) {
        // TODO: Ignore version check ?
        result = await this.addUpdateDeleteRegistrationService.update(draft, langKey);
      } else {
        result = await this.addUpdateDeleteRegistrationService.add(draft, langKey);
      }
    } catch (error) {
      if (error instanceof UploadAttachmentError) {
        // TODO: Handle upload attachment error
        this.loggerService.error(error, DEBUG_TAG, 'Could not upload attachments');
      } else if (error instanceof HttpErrorResponse) {
        // TODO: Handle other http errors, missing network ?
        this.loggerService.error(error, DEBUG_TAG, 'Could not add or update registration');
      } else {
        // TODO: Handle other errors
        this.loggerService.error(error, DEBUG_TAG, 'Could not add or update registration');
      }
    }

    if (result?.RegId) {
      await this.draftService.delete(draft.uuid);
    } else {
      // TODO: Trenger vi håndtere rare responser fra apier?
    }

    // Stop tracking that we are uploading this registration
    const i = this.registrationsUploading.indexOf(draft.uuid);
    this.registrationsUploading.splice(i, 1);
  }
}
