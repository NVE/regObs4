import { Injectable } from '@angular/core';
import cloneDeep from 'clone-deep';
import { BehaviorSubject, combineLatest, firstValueFrom, from, map, Observable, shareReplay, skipUntil, Subject, switchMap, takeWhile, tap, } from 'rxjs';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { getAllAttachmentsFromEditModel, hasAnyObservations, isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
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
        shareReplay(1),
        // As we use shareReplay(1) to avoid reading from the database more than needed,
        // clone the drafts before they are returned
        map(drafts => cloneDeep(drafts))
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

  /**
   * @returns true if draft does not contain any data
   */
  async isDraftEmpty(draft: RegistrationDraft) {
    if (draft.registration.Attachments?.length > 0) {
      return false; //we have image metadata for an already uploaded image
    }
    if (hasAnyObservations(draft)) {
      return false; //at least one form contain data
    }
    const attachments = await firstValueFrom(this.newAttachmentSerivice.getAttachments(draft.uuid));
    return attachments.length === 0; //no new images added
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
      const existingAttachments = getAllAttachmentsFromEditModel(draft.registration, registrationTid);
      isEmpty = existingAttachments.length === 0;
    }

    if (isEmpty) {
      const newAttachments = await firstValueFrom(
        this.newAttachmentSerivice.getAttachments(draft.uuid, { registrationTid })
      );
      isEmpty = newAttachments.length === 0;
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
   * Create and save a draft from a registration already sent to server
   * @param viewModel the registration you like to edit
   */
  async saveAsDraft(viewModel: RegistrationViewModel) {
    this.throwIfMissingRegId(viewModel.RegId);
    await this.cloneAndSave(viewModel, viewModel.ExternalReferenceId, viewModel.RegId);
  }

  /**
   * Create and save a copy of a registration already sent to server
   * The copy will have a new uuid and no regId
   * @param draft the registration you like to copy
   * @param uuid a unique GUID
   */
  async copyDraftAndSave(draft: RegistrationDraft, uuid: string) {
    this.throwIfMissingRegId(draft.regId);
    await this.cloneAndSave(draft.registration, uuid, null);
  }

  /**
   * Create and save a copy of a registration already sent to server
   * The copy will have a new uuid and no regId
   * @param viewModel the registration you like to copy
   * @param uuid a unique GUID
   */
  async copyViewModelAndSave(viewModel: RegistrationViewModel, uuid: string) {
    this.throwIfMissingRegId(viewModel.RegId);
    await this.cloneAndSave(viewModel, uuid, null);
  }

  private async cloneAndSave(viewModel: RegistrationViewModel, uuid: string, regId: number) {
    const registration = cloneDeep(viewModelToEditModel(viewModel));

    const draft: RegistrationDraft = {
      uuid: uuid,
      regId: regId,
      syncStatus: SyncStatus.Draft,
      registration: registration
    };
    await this.save(draft);
  }

  private throwIfMissingRegId(regId: number) {
    if (!regId) {
      throw new Error('Missing RegId. Are you sure this registration has been saved in Regobs earlier?');
    }
  }

  /**
  * Save a registration on device
  * @param draft the registration to save
  */
  async save(draft: RegistrationDraft): Promise<void> {
    const start = Date.now();

    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    const key = this.createKey(draft.uuid, appMode);

    const updatedDraft: RegistrationDraft = {
      ...draft,
      lastSavedTime: Date.now()
    };
    await this.databaseService.set(key, updatedDraft);

    this.logger.debug(`Draft ${draft.uuid} saved in ${this.millisSince(start)} ms 
      in environment ${appMode}`, DEBUG_TAG, draft);
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
    const draft = await this.databaseService.get<RegistrationDraft>(key);
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
      const draft = await this.databaseService.get<RegistrationDraft>(key);
      drafts.push(draft);
    }
    this.logger.debug(`${drafts.length} drafts loaded in ${this.millisSince(start)} ms`, DEBUG_TAG);
    return drafts;
  }

  private millisSince(start: number): string {
    return (Date.now() - start).toFixed();
  }
}
