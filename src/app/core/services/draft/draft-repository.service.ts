import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, firstValueFrom, Observable, Subject, } from 'rxjs';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { AppModeService } from 'src/app/modules/common-core/services';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationDraft } from './draft-model';

/**
 * Takes care of your draft registrations and save them on your device.
 * TODO: Error handling
 */
 @Injectable({
   providedIn: 'root'
 })
export class DraftRepositoryService {

  //TODO: Midlertidig lagring i minnet for testing
  private repository: Map<string, string> = new Map();

  //used to spread the word about changes in drafts
  private drafts: Subject<RegistrationDraft[]> = new BehaviorSubject([]);

  /**
   * A list of drafts that are saved locally
   * TODO: Skal kladder som er under innsending være med i denne? De er det nå
   */
   readonly drafts$: Observable<RegistrationDraft[]>;


   constructor(private appModeService: AppModeService) {

     this.drafts$ = this.drafts.asObservable();
     this.appModeService.appMode$.subscribe((appMode) => this.reloadAndNotify(appMode));
   }

   private async reloadAndNotify(appMode: AppMode): Promise<void> {
     const drafts = await this.loadAll(appMode);
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
         DtChangeTime: moment().unix().toString(),
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
     const appMode = await firstValueFrom(this.appModeService.appMode$);
     const drafts: RegistrationDraft[] = await this.loadAll(appMode);
     const index = drafts.findIndex((draft) => registration.uuid === draft.uuid);
     if (index === -1) {
       drafts.push(registration); //not saved before, so add it
     } else {
       drafts[index] = registration; //replace saved draft
     }
     this.saveAll(drafts, appMode);
     this.drafts.next(drafts); //spread the word that drafts have changed
   }


   /**
   * Load a registration from device
   * @param uuid registration uuid
   * @returns registration with given id or undefined if not found
   */
   async load(uuid: string): Promise<RegistrationDraft|undefined> {
     const appMode = await firstValueFrom(this.appModeService.appMode$);
     const drafts: RegistrationDraft[] = await this.loadAll(appMode);
     const filteredDrafts = drafts.filter(f => f.uuid === uuid);
     return filteredDrafts[0];
   }

   /**
   * Delete a registration from your device
   * The registration will NOT be deleted from server if you have submitted it
   * Nothing will happen if we don't find it.
   * @param uuid uuid of the registration you want to delete
   */
   async delete(uuid: string): Promise<void> {
     const appMode = await firstValueFrom(this.appModeService.appMode$);
     const drafts: RegistrationDraft[] = await this.loadAll(appMode);
     const filteredDrafts = drafts.filter((draft) => draft.uuid !== uuid);
     this.saveAll(filteredDrafts, appMode);
     this.drafts.next(filteredDrafts);
   }

   /**
    * @returns a key for all drafts for given app mode
    */
   private createKey(appMode: AppMode): string {
     return `regobs.drafts.${appMode}`;
   }

   /**
    * @returns all drafts for given geo hazard and app mode
    */
   private async loadAll(appMode: AppMode): Promise<RegistrationDraft[]> {
     const key = this.createKey(appMode);
     const drafts: RegistrationDraft[] = JSON.parse(this.repository.get(key));
     return drafts;
   }

   /**
    *  Save all drafts to database. Will overwrite earlier saved drafts
    */
   private async saveAll(drafts: RegistrationDraft[], appMode: AppMode): Promise<void> {
     const key = this.createKey(appMode);
     this.repository.set(key, JSON.stringify(drafts));
   }
}
