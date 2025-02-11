import { Injectable, Signal, inject, signal } from '@angular/core';
import cloneDeep from 'clone-deep';
import {
  combineLatest,
  filter,
  firstValueFrom,
  from,
  map,
  Observable,
  of,
  shareReplay,
  skipUntil,
  startWith,
  Subject,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import {
  getAllAttachmentsFromEditModel,
  hasAnyObservations,
  isObservationModelEmptyForRegistrationTid,
} from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RegistrationDraft } from './draft-model';
import { viewModelToEditModel } from './reg-to-draft';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { injectUuidFromRouteParameters } from './get-uuid';
import { InitDraft } from './init-draft.model';

const DEBUG_TAG = 'DraftRepositoryService';

/**
 * Takes care of your draft registrations and save them on your device.
 * Drafts saved in different app modes / environments are separate.
 * The service relates to current app mode all the time, so drafts saved in other app modes are not available
 * TODO: Error handling
 */
@Injectable({
  providedIn: 'root',
})
export class DraftRepositoryService {
  private logger = inject(LoggingService);
  private newAttachmentSerivice = inject(NewAttachmentService);
  private databaseService = inject(DatabaseService);
  private userSettingService = inject(UserSettingService);

  //used to spread the word about changes in drafts
  private shouldLoad: Subject<void> = new Subject();

  /**
   * A list of drafts that are saved locally. Drafts under sumbission are also included.
   */
  readonly drafts$: Observable<RegistrationDraft[]>;

  constructor() {
    this.drafts$ = combineLatest([
      this.userSettingService.appMode$,
      this.databaseService.ready$,
      this.shouldLoad.pipe(startWith(true)),
    ]).pipe(
      switchMap(([appMode]) => from(this.loadAllFromDatabase(appMode))),
      shareReplay(1),
      // As we use shareReplay(1) to avoid reading from the database more than needed,
      // clone the drafts before they are returned
      map((drafts) => cloneDeep(drafts))
    );
  }

  /**
   * Returns an observable with draft changes for a single draft.
   * Does not emit until the specified draft is available in the database.
   * If the draft is deleted after a subscription has been made, the observable completes.
   */
  getDraft$(uuid: string): Observable<RegistrationDraft> {
    const gotDraft = new Subject<boolean>();
    return this.drafts$.pipe(
      map((drafts) => drafts.find((draft) => draft.uuid === uuid)),
      tap((draft) => {
        if (draft != null) {
          gotDraft.next(true);
        }
      }),
      skipUntil(gotDraft),
      takeWhile((draft) => draft != null)
    );
  }

  /**
   * Tries to read uuid from route parameters and returns a signal with draft changes for that draft.
   * Signal will be undefined until the specified draft is available.
   */
  getDraftSignal(): Signal<RegistrationDraft | undefined>;
  /**
   * Returns a signal with draft changes for the specified draft.
   * Signal will be undefined until the specified draft is available.
   */
  getDraftSignal(uuid: string): Signal<RegistrationDraft | undefined>;
  /**
   * When uuid signal has a value, it reads and returns draft changes.
   * Signal will be undefined until the specified draft is available.
   */
  getDraftSignal(uuid: Signal<string | undefined | null>): Signal<RegistrationDraft | undefined>;
  getDraftSignal(uuid?: string | Signal<string | undefined | null>): Signal<RegistrationDraft | undefined> {
    let uuid$: Observable<string>;
    if (uuid == null) {
      // Try to read from route parameters
      uuid$ = of(injectUuidFromRouteParameters());
    } else if (typeof uuid == 'string') {
      uuid$ = of(uuid);
    } else {
      uuid$ = toObservable(uuid).pipe(filter((uuid) => uuid != null));
    }

    return toSignal(
      uuid$.pipe(
        switchMap((uuid) => this.getDraft$(uuid)),
        tap((draft) => this.logger.debug('getDraftSignal update', DEBUG_TAG, { uuid: draft.uuid }))
      )
    );
  }

  /**
   * @returns true if draft does not contain any data
   */
  async isDraftEmpty(draft: RegistrationDraft) {
    if (draft.registration.Attachments && draft.registration.Attachments.length > 0) {
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
    let isEmpty = isObservationModelEmptyForRegistrationTid(draft.registration, registrationTid);

    if (isEmpty) {
      isEmpty = !(await this.hasAttachments(draft, registrationTid));
    }

    return isEmpty;
  }

  /**
   * @returns true if given draft has any attachments (new local or already uploaded) for given registration type
   */
  async hasAttachments(draft: RegistrationDraft, registrationTid: RegistrationTid): Promise<boolean> {
    const existingAttachments = getAllAttachmentsFromEditModel(draft.registration, registrationTid);
    let hasAttachments = existingAttachments.length > 0;

    if (!hasAttachments) {
      const newAttachments = await firstValueFrom(
        this.newAttachmentSerivice.getAttachments(draft.uuid, { registrationTid })
      );
      hasAttachments = newAttachments.length > 0;
    }

    return hasAttachments;
  }

  /**
   * Create a new empty registration
   * @param geoHazard the geo hazard you have observed
   * @returns the registration
   */
  async create(geoHazard: GeoHazard): Promise<InitDraft> {
    const simpleMode = await this.useSimpleMode(geoHazard);
    const draft: InitDraft = {
      uuid: uuidv4(),
      syncStatus: SyncStatus.Draft,
      simpleMode,
      registration: {
        GeoHazardTID: geoHazard,
      },
    };
    return draft;
  }

  /**
   * @returns true if user prefer simple mode for snow registrations
   */
  private async useSimpleMode(geoHazard: GeoHazard): Promise<boolean> {
    if (geoHazard === GeoHazard.Snow) {
      const userSetting = await firstValueFrom(this.userSettingService.userSetting$);
      return !userSetting.preferCompleteSnowObservations;
    }
    return false;
  }

  /**
   * Create and save a draft from a registration already sent to server
   * @param viewModel the registration you like to edit
   */
  async saveAsDraft(viewModel: RegistrationViewModel) {
    const regId = this.throwIfMissingRegId(viewModel.RegId);
    const uuid = this.throwIfMissingUuid(viewModel.ExternalReferenceId);
    await this.cloneAndSave(viewModel, uuid, regId);
  }

  /**
   * Create and save a copy of a registration already sent to server
   * The copy will have a new uuid and no regId
   * @param draft the registration you like to copy
   */
  async copyDraftAndSave(draft: RegistrationDraft) {
    this.throwIfMissingRegId(draft.regId);
    const uuid = uuidv4();
    await this.cloneAndSave(draft.registration as RegistrationViewModel, uuid);
    return uuid;
  }

  private async cloneAndSave(viewModel: RegistrationViewModel, uuid: string, regId?: number) {
    const registration = cloneDeep(viewModelToEditModel(viewModel));

    const draft: RegistrationDraft = {
      uuid: uuid,
      regId: regId,
      syncStatus: SyncStatus.Draft,
      registration: registration,
      simpleMode: false,
    };
    await this.save(draft);
  }

  private throwIfMissingUuid(uuid?: string): string {
    if (!uuid) {
      throw new Error('Missing uuid / ExternalReferenceId.');
    }
    return uuid;
  }

  private throwIfMissingRegId(regId?: number): number {
    if (!regId) {
      throw new Error('Missing RegId. Are you sure this registration has been saved in Regobs earlier?');
    }
    return regId;
  }

  /**
   * Save a registration on device
   * @param draft the registration to save
   */
  async save(draft: RegistrationDraft): Promise<void> {
    this.throwIfMissingUuid(draft.uuid);

    const start = Date.now();

    const appMode = await firstValueFrom(this.userSettingService.appMode$);
    const key = this.createKey(draft.uuid, appMode);

    const updatedDraft: RegistrationDraft = {
      ...draft,
      lastSavedTime: Date.now(),
    };
    await this.databaseService.set(key, updatedDraft);

    this.logger.debug(
      `Draft ${draft.uuid} saved in ${this.millisSince(start)} ms
      in environment ${appMode}`,
      DEBUG_TAG,
      { draft }
    );
    this.shouldLoad.next();
  }

  /**
   * Load the current draft from device. Needs uuid specified in url.
   * @returns registration current draft or undefined if not found
   */
  async load(): Promise<RegistrationDraft>;
  /**
   * Load a registration from device
   * @param uuid registration uuid
   * @returns registration with given uuid or undefined if not found
   */
  async load(uuid: string): Promise<RegistrationDraft>;
  /**
   * Load a registration from device
   * @param uuid signal of registration uuid
   * @returns registration when signal has uuid
   */
  async load(uuid: Signal<string | undefined | null>): Promise<RegistrationDraft>;
  /**
   * Load a registration from device
   * @param uuid May be undefined, uuid string or uuid signal
   * @returns registration when signal has uuid
   */
  async load(uuid?: Signal<string | undefined | null> | string): Promise<RegistrationDraft>;
  async load(uuid?: Signal<string | undefined | null> | string | undefined): Promise<RegistrationDraft> {
    if (!uuid) {
      const urlParamUuid = injectUuidFromRouteParameters();
      return this.loadByString(urlParamUuid);
    } else if (typeof uuid === 'string') {
      return this.loadByString(uuid);
    } else {
      return this.loadBySignal(uuid);
    }
  }

  private async loadBySignal(uuid: Signal<string | undefined | null>): Promise<RegistrationDraft> {
    return firstValueFrom(
      toObservable(uuid).pipe(
        filter((uuid) => uuid != null),
        switchMap((uuid) => this.getDraft$(uuid)),
        tap((draft) => this.logger.debug('Draft loaded by signal', DEBUG_TAG, { uuid: draft.uuid }))
      )
    );
  }

  private async loadByString(uuid: string): Promise<RegistrationDraft> {
    if (!uuid) {
      throw new Error('uuid required');
    }

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
    this.logger.debug(`Deleting draft`, DEBUG_TAG, { uuid });
    this.throwIfMissingUuid(uuid);
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
    this.throwIfMissingUuid(uuid);
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
    const keysForAppMode = keys.filter((k) => k.startsWith(keyPrefix));
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
