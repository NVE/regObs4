import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable, Subject, } from 'rxjs';
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
  private drafts: Subject<RegistrationDraft[]> = new BehaviorSubject([]);

  /**
   * A list of drafts that are saved locally
   * TODO: Skal kladder som er under innsending være med i denne? De er det nå
   */
   readonly drafts$: Observable<RegistrationDraft[]>;


   constructor(
      private appModeService: AppModeService,
      private logger: LoggingService,
      private databaseService: DatabaseService) {

     this.drafts$ = this.drafts.asObservable();

     combineLatest([this.appModeService.appMode$, this.databaseService.ready$])
       .subscribe(([appMode, ]) => {
         //TODO: this.saveTestdata(); //TODO: Remove
         this.reloadAndNotify(appMode);
       });
   }

   private async saveTestdata(): Promise<void> {
     // eslint-disable-next-line @typescript-eslint/no-var-requires
     const draft: RegistrationDraft = require('./287790-test-kladd.json');
     for (let i = 1; i <= 10; i++) {
       draft.uuid = uuidv4();
       this.logger.debug(`saving test draft with uuid = ${draft.uuid}`);
       await this.save(draft);
     }
   }

   private async reloadAndNotify(appMode: AppMode): Promise<void> {
     const drafts = await this.loadAllFromDatabase(appMode);
     this.drafts.next(drafts); //spread the word that drafts have changed
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
       draft: {
         GeoHazardTID: geoHazard,
         DtObsTime: undefined,
         ObsLocation: { Latitude: 0, Longitude: 0 },
         Attachments: []
       }
     };
     return draft;
   }

   /**
   * Save a registration on device
   * @param registration the registration to save
   */
   async save(registration: RegistrationDraft): Promise<void> {
     const start = performance.now();
     const appMode = await firstValueFrom(this.appModeService.appMode$);
     const drafts: RegistrationDraft[] = await this.loadAllFromDatabase(appMode);
     const index = drafts.findIndex((draft) => registration.uuid === draft.uuid);
     if (index === -1) {
       drafts.push(registration); //not saved before, so add it
     } else {
       drafts[index] = registration; //replace saved draft
     }
     await this.saveAllToDatabase(drafts, appMode);
     const finish = performance.now();
     this.logger.debug(`Draft ${registration.uuid} saved in ${(finish-start).toFixed()} ms. We now have ${drafts.length} drafts in environment ${appMode}`, DEBUG_TAG, registration);
     this.drafts.next(drafts); //spread the word that drafts have changed
   }


   /**
   * Load a registration from device
   * @param uuid registration uuid
   * @returns registration with given uuid or undefined if not found
   */
   async load(uuid: string): Promise<RegistrationDraft|undefined> {
     const start = performance.now();
     const drafts = await this.loadAll();
     if (drafts && drafts.length > 0) {
       const filteredDrafts = drafts.filter(f => f.uuid === uuid);
       this.logger.debug(`Draft ${uuid} loaded in ${performance.now()-start} ms`, DEBUG_TAG);
       return filteredDrafts[0];
     }
     this.logger.debug(`Draft ${uuid} not found in ${performance.now()-start} ms`, DEBUG_TAG);
     return undefined;
   }

   /**
    * @returns all drafts regardsless of geo hazard
    */
   async loadAll(): Promise<RegistrationDraft[]> {
     const start = performance.now();
     const appMode = await firstValueFrom(this.appModeService.appMode$);
     const drafts = await this.loadAllFromDatabase(appMode);
     this.logger.debug(`Drafts loaded in ${performance.now()-start} ms`, DEBUG_TAG);
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
     const drafts = await this.loadAllFromDatabase(appMode);
     if (drafts.length > 0) {
       const filteredDrafts = drafts.filter((draft) => draft.uuid !== uuid);
       this.saveAllToDatabase(filteredDrafts, appMode);
       this.drafts.next(filteredDrafts);
     } else {
       this.drafts.next([]);
     }
   }

   /**
    * @returns a key for all drafts for given app mode
    */
   private createKey(appMode: AppMode): string {
     return `drafts.${appMode}`;
   }

   /**
    * @returns all drafts for given geo hazard and app mode or empty list if not found
    */
   private async loadAllFromDatabase(appMode: AppMode): Promise<RegistrationDraft[]> {
     const key = this.createKey(appMode);
     const drafts = await this.databaseService.get(key) as RegistrationDraft[];
     if (drafts) {
       return drafts;
     }
     return [];
   }

   /**
    *  Save all drafts to database. Will overwrite earlier saved drafts
    */
   private async saveAllToDatabase(drafts: RegistrationDraft[], appMode: AppMode): Promise<void> {
     const key = this.createKey(appMode);
     await this.databaseService.set(key, drafts);
   }
}
