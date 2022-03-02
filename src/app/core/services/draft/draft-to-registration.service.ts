import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, from, of, Subscription, switchMap, tap } from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { ProgressService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AddUpdateDeleteRegistrationService } from '../add-update-delete-registration/add-updade-delete-registration.service';
import { UploadAttachmentError } from '../upload-attachments/upload-attachments.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RegistrationDraft } from './draft-model';
import { DraftRepositoryService } from './draft-repository.service';

const DEBUG_TAG = 'DraftToRegistrationService';

// TODO: Where to delete attachments after successfull upload? Right now they are not deleted

// TODO: Vi må vel ha en slags SyncStatus Error, og en slags automatisk prøv igjen håndtering, i tillfelle man ikke har nett?

// TODO: Hva skjer om man skifter app miljø osv? Eller hvis en draft har status "sync" og man ikke er logget inn?

// TODO: Nå vil den prøve å sende inn registreringer på nytt hver gang det kommer noe til drafts$, den bør vel bare sende inn én gang med mindre noe endres

@Injectable({
  providedIn: 'root'
})
export class DraftToRegistrationService {

  sub: Subscription;

  constructor(
    private draftService: DraftRepositoryService,
    private addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private userSettings: UserSettingService,
    private loggerService: LoggingService,
    private progressService: ProgressService
  ) {}

  public startUploadingRegistrations() {
    if (this.sub) return;

    // Listen for drafts ready to submit to regobs api
    this.sub = this.draftService.drafts$.pipe(
      tap((drafts) => this.loggerService.debug('drafts updated', DEBUG_TAG, drafts)),
      switchMap(drafts => from(drafts)),
      filter(draft => draft.syncStatus === SyncStatus.Sync),
    )
      .subscribe(draftToSubmit => this.addOrUpdateRegistration(draftToSubmit));
  }

  private async addOrUpdateRegistration(draft: RegistrationDraft) {
    const langKey = await firstValueFrom(this.userSettings.language$);

    this.loggerService.debug(`Sending registration ${draft.uuid} to regobs api`, DEBUG_TAG);

    // TODO: Dette apiet er snodig, hva skjer egentlig når man setter sync progress?
    await this.progressService.setSyncProgress(draft.uuid);

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

    // TODO: Er dette riktig? Usikker på hva den egentlig gjør.
    await this.progressService.resetSyncProgress();
  }
}
