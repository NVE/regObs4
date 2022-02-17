import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom, from, Observable, switchMap, } from 'rxjs';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { AppModeService } from 'src/app/modules/common-core/services';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';
import { RegistrationDraft } from './draft-model';

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
    private appModeService: AppModeService,
    private logger: LoggingService,
    private databaseService: DatabaseService) {

    //TODO: Vurdere å bruke share eller shareReplay på denne for å hindre at man må lese fra basen uten at noen ting er endret,
    this.drafts$ = combineLatest([this.appModeService.appMode$, this.databaseService.ready$, this.shouldLoad])
      .pipe(
        switchMap(([appMode]) => from(this.loadAllFromDatabase(appMode))),
      );
  }

  /**
  * Create a new empty registration
  * @param geoHazard the geo hazard you have observed
  * @returns the registration
  */
  async create(geoHazard: GeoHazard): Promise<RegistrationDraft> {
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
  * Save a registration on device
  * @param draft the registration to save
  */
  async save(draft: RegistrationDraft): Promise<void> {
    const start = Date.now();
    draft.lastSavedTime = start;
    const appMode = await firstValueFrom(this.appModeService.appMode$);
    const key = this.createKey(draft.uuid, appMode);
    await this.databaseService.set(key, draft);
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
    const appMode = await firstValueFrom(this.appModeService.appMode$);
    const key = this.createKey(uuid, appMode);
    const draft = await this.databaseService.get(key);
    this.logger.debug(`Draft ${uuid} loaded in ${this.millisSince(start)} ms`, DEBUG_TAG);
    return draft;
  }

  /**
   * @returns all drafts regardsless of geo hazard
   */
  async loadAll(): Promise<RegistrationDraft[]> {
    const appMode = await firstValueFrom(this.appModeService.appMode$);
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
    const appMode = await firstValueFrom(this.appModeService.appMode$);
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
