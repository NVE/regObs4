import { Injectable } from '@angular/core';
import cloneDeep from 'clone-deep';
import { BehaviorSubject, combineLatest, firstValueFrom, from, map, Observable, shareReplay, skipUntil, Subject, switchMap, takeWhile, tap, } from 'rxjs';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { getAllAttachmentsFromViewModel, hasAnyObservations, isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { ExistingAttachmentType, ExistingOrNewAttachment, NewAttachmentType, RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RegistrationDraft } from './draft-model';
import { viewModelToEditModel } from './reg-to-draft';

const DEBUG_TAG = 'DraftRepositoryService';

/**
 * Takes care of your draft registrations and save them on your device.
 * Drafts saved in different app modes / environments are separate.
 * The service relates to current app mode all the time, so drafts saved in other app modes are not available
 * TODO: Error handling
 */
@Injectable({
  providedIn: 'root'
})
export class DraftRepositoryService {

  //used to spread the word about changes in drafts
  private shouldLoad: BehaviorSubject<void> = new BehaviorSubject(null);

  /**
   * A list of drafts that are saved locally. Drafts under sumbission are also included.
   */
  readonly drafts$: Observable<RegistrationDraft[]>;

  constructor(
    private logger: LoggingService,
    private newAttachmentSerivice: NewAttachmentService,
    private databaseService: DatabaseService,
    private userSettingService: UserSettingService,
  ) {
    this.drafts$ = combineLatest([
      this.userSettingService.appMode$,
      this.databaseService.ready$,
      this.shouldLoad
    ])
      .pipe(
        switchMap(([appMode]) => from(this.loadAllFromDatabase(appMode))),
        shareReplay(1)
      );
  }

  /**
   * Returns an observable with draft changes for a single draft.
   * Does not emit until the specified draft is available in the database.
   * If the draft is deleted after a subscription has been made, the observable completes.
   */
  getDraft$(uuid: string): Observable<RegistrationDraft | undefined> {
    const gotDraft = new Subject<boolean>();
    return this.drafts$.pipe(
      map(drafts => drafts.find(draft => draft.uuid === uuid)),
      tap((draft) => {
        if (draft != null) {
          gotDraft.next(true);
        }
      }),
      skipUntil(gotDraft),
      takeWhile(draft => draft != null)
    );
  }

  // TODO: Add test?
  async getAttachments(draft: RegistrationDraft, registrationTid: RegistrationTid): Promise<ExistingOrNewAttachment[]> {
    const existingAttachmentsForRegistrationType = getAllAttachmentsFromViewModel(
      draft.registration,
      registrationTid
    )
      .map(attachment => ({ type: 'existing' as ExistingAttachmentType, attachment }));

    const newAttachments = await firstValueFrom(this.newAttachmentSerivice.getAttachments(draft.uuid));
    const newAttachmentsForRegistrationType = newAttachments
      .filter(a => a.RegistrationTID === registrationTid)
      .map(attachment => ({ type: 'new' as NewAttachmentType, attachment }));

    return [
      ...existingAttachmentsForRegistrationType,
      ...newAttachmentsForRegistrationType
    ];
  }

  async isDraftEmpty(draft: RegistrationDraft) {
    if (hasAnyObservations(draft)) {
      return false;
    }

    const attachments = await firstValueFrom(this.newAttachmentSerivice.getAttachments(draft.uuid));
    return attachments.length === 0;
  }

  /**
   * Check if the given draft is empty for a registration type, given by the regitrationTid.
   * @example
   * // Check if a draft contains a snow cover observation:
   * isDraftEmptyForRegistrationType(draft, RegistrationTid.SnowCoverObs)
   */
  async isDraftEmptyForRegistrationType(draft: RegistrationDraft, registrationTid: RegistrationTid): Promise<boolean> {
    // TODO: Add test?
    if (registrationTid == null) {
      throw new Error('Not implemented');
    }
    let isEmpty = isObservationModelEmptyForRegistrationTid(
      draft.registration,
      registrationTid
    );

    if (isEmpty) {
      const attachments = await this.getAttachments(draft, registrationTid);
      isEmpty = attachments.length === 0;
    }

    return isEmpty;
  }

  /**
  * Create a new empty registration
  * @param geoHazard the geo hazard you have observed
  * @returns the registration
  */
  create(geoHazard: GeoHazard): RegistrationDraft {
    const draft: RegistrationDraft = {
      uuid: uuidv4(),
      syncStatus: SyncStatus.Draft,
      registration: {
        GeoHazardTID: geoHazard,
        DtObsTime: null,
        ObsLocation: { Latitude: 0, Longitude: 0 },
        Attachments: []
      }
    };
    return draft;
  }

  /**
   * Validate given draft
   * @return an error message or undefined if it went ok
   */
  validate(draft: RegistrationDraft): string | undefined {
    const messages: string[] = [];
    if (!draft) {
      messages.push('no draft');
    }
    if (!draft.uuid || draft.uuid === '' || draft.uuid.length === 0) {
      messages.push('missing uuid');
    }
    if (!draft.registration?.GeoHazardTID) {
      messages.push('missing GeoHazardTID');
    }
    //TODO: Vurdere om vi bør sjekke disse også og kanskje flere felter.
    //I så fall må vi skrive om noen tester som lagrer kladder uten DtObsTime og ObsLocation
    // if (!draft.registration?.DtObsTime) {
    //   messages.push('missing DtObsTime');
    // }
    // if (!draft.registration?.ObsLocation?.Latitude) {
    //   messages.push('missing ObsLocation.Latitude');
    // }
    // if (!draft.registration?.ObsLocation?.Longitude) {
    //   messages.push('missing ObsLocation.Longitude');
    // }
    if (messages.length > 0) {
      return messages.join(', ');
    }
    return undefined;
  }

  /**
  * Save a registration on device.
   * Create and save a draft from a registration already sent to server
   * @param registrationViewModel the registration you like to edit
   */
  async saveAsDraft(registrationViewModel: RegistrationViewModel) {
    if (!registrationViewModel.RegId) {
      throw new Error('Missing RegId. Are you sure this registration has been saved in Regobs earlier?');
    }

    const registration = cloneDeep(viewModelToEditModel(registrationViewModel));

    const draft: RegistrationDraft = {
      uuid: registrationViewModel.ExternalReferenceId,
      regId: registrationViewModel.RegId,
      syncStatus: SyncStatus.Draft,
      registration: registration
    };
    await this.save(draft);
  }

  /**
  * Save a registration on device
  * @param draft the registration to save
  * @see validate
  * @throws Error if validation fails
  */
  async save(draft: RegistrationDraft): Promise<void> {
    const start = Date.now();
    const errorMessages = this.validate(draft);
    if (errorMessages) {
      throw new Error(`Save of invalid draft failed. UUID: '${draft?.uuid}'. Cause: ${errorMessages}`);
    }
    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    const key = this.createKey(draft.uuid, appMode);

    const updatedDraft: RegistrationDraft = {
      ...draft,
      lastSavedTime: Date.now()
    };
    await this.databaseService.set(key, updatedDraft);

    this.logger.debug(
      `Draft ${draft.uuid} saved in ${this.millisSince(start)} ms in environment ${appMode}`,
      DEBUG_TAG,
      draft);
    this.shouldLoad.next();
  }


  /**
  * Load a registration from device
  * @param uuid registration uuid
  * @returns registration with given uuid or undefined if not found
  */
  async load(uuid: string): Promise<RegistrationDraft | undefined> {
    const start = Date.now();
    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    const key = this.createKey(uuid, appMode);
    const draft = await this.databaseService.get(key);
    this.logger.debug(`Draft ${uuid} loaded in ${this.millisSince(start)} ms`, DEBUG_TAG);
    return draft;
  }

  /**
   * @returns all drafts regardsless of geo hazard
   */
  async loadAll(): Promise<RegistrationDraft[]> {
    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    const drafts = await this.loadAllFromDatabase(appMode);
    return drafts;
  }

  /**
  * Delete a registration from your device
  * The registration will NOT be deleted from server if you have submitted it
  * Nothing will happen if we don't find it.
  * @param uuid uuid of the registration you want to delete
  */
  async delete(uuid: string): Promise<void> {
    await this.newAttachmentSerivice.removeAttachments(uuid);
    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    const key = this.createKey(uuid, appMode);
    await this.databaseService.remove(key);
    this.shouldLoad.next();
  }

  /**
   * @returns a key for all drafts for given app mode
   */
  private createKeyForAllDrafts(appMode: AppMode): string {
    return `drafts.${appMode}`;
  }

  /**
   * @returns a key for given draft uuid and given app mode
   */
  private createKey(uuid: string, appMode: AppMode): string {
    return `${this.createKeyForAllDrafts(appMode)}.${uuid}`;
  }


  /**
   * @returns all drafts for given geo hazard and app mode or empty list if not found
   */
  private async loadAllFromDatabase(appMode: AppMode): Promise<RegistrationDraft[]> {
    const start = Date.now();
    const drafts: RegistrationDraft[] = [];
    const keyPrefix = this.createKeyForAllDrafts(appMode);
    const keys = await this.databaseService.keys();
    const keysForAppMode = keys.filter(k => k.startsWith(keyPrefix));
    for (const key of keysForAppMode) {
      const draft = await this.databaseService.get(key);
      drafts.push(draft);
    }
    this.logger.debug(`${drafts.length} drafts loaded in ${this.millisSince(start)} ms`, DEBUG_TAG);
    return drafts;
  }

  private millisSince(start: number): string {
    return (Date.now() - start).toFixed();
  }
}
