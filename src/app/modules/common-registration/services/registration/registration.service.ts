import { Injectable, Inject } from '@angular/core';
import { Observable, from, Subscription, of, concat, forkJoin, timer, merge, combineLatest } from 'rxjs';
import { GeoHazard, AppMode, LoggerService, AppModeService, uuidv4, ObservableHelperService } from '@varsom-regobs-common/core';
import { switchMap, shareReplay, map, tap, catchError, mergeMap, toArray, take, filter, withLatestFrom, distinctUntilChanged, concatMap } from 'rxjs/operators';
import { IRegistration } from '../../models/registration.interface';
import { OfflineDbService, TABLE_NAMES } from '../offline-db/offline-db.service';
import { SyncStatus } from '../../models/sync-status.enum';
import { ItemSyncCompleteStatus } from '../../models/item-sync-complete-status.interface';
import { ItemSyncCallbackService } from '../item-sync-callback/item-sync-callback.service';
import moment from 'moment';
import { RegistrationTid } from '../../models/registration-tid.enum';
import { Summary, AttachmentViewModel, RegistrationViewModel, RegistrationEditModel } from '@varsom-regobs-common/regobs-api';
import { getAllAttachments, getPropertyName, getRegistrationTidsForGeoHazard, hasAnyObservations, isArrayType, isObservationEmptyForRegistrationTid, isObservationModelEmptyForRegistrationTid } from '../../registration.helpers';
import { ProgressService } from '../progress/progress.service';
import { InternetConnectivity } from 'ngx-connectivity';
import { KdvService } from '../kdv/kdv.service';
import cloneDeep from 'clone-deep';
import { IRegistrationType } from '../../models/registration-type.interface';
import { FallbackSummaryProvider } from '../summary-providers/fallback-provider';
import { RxRegistrationCollection, RxRegistrationDocument } from '../../db/RxDB';
import { NewAttachmentService } from '../add-new-attachment/new-attachment.service';
import deepEqual from 'fast-deep-equal';
import { AttachmentUploadEditModel, ExistingOrNewAttachment } from '../../registration.models';
import { ExistingAttachmentType, NewAttachmentType } from '../../models/attachment-upload-edit.interface';
import { FOR_ROOT_OPTIONS_TOKEN, IRegistrationModuleOptions } from '../../module.options';

const SYNC_TIMER_TRIGGER_MS = 60 * 1000; // try to trigger sync every 60 seconds if nothing has changed to network conditions
const SYNC_BUFFER_MS = 3 * 1000; // Wait at least 3 seconds before next sync attempt

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  public readonly registrationStorage$: Observable<IRegistration[]>;
  private _registrationSyncSubscription: Subscription;

  constructor(
    private offlineDbService: OfflineDbService,
    private loggerService: LoggerService,
    private progressService: ProgressService,
    private kdvService: KdvService,
    private internetConnectivity: InternetConnectivity,
    private appModeService: AppModeService,
    private observableHelperService: ObservableHelperService,
    private newAttachmentService: NewAttachmentService,
    @Inject('OfflineRegistrationSyncService') private offlineRegistrationSyncService: ItemSyncCallbackService<IRegistration>,
    // @Inject(SUMMARY_PROVIDER_TOKEN) private summaryProviders: ISummaryProvider[],
    private fallbackSummaryProvider: FallbackSummaryProvider,
    @Inject(FOR_ROOT_OPTIONS_TOKEN) private options: IRegistrationModuleOptions
  ) {
    this.registrationStorage$ = this.getRegistrationObservable().pipe(tap((reg) => {
      this.loggerService.debug('Registrations changed', reg);
    }), shareReplay(1));
    this.initAutoSync();
  }

  public saveAndSync(reg: IRegistration, changedRegistrationTid: RegistrationTid = undefined, ignoreVersionCheck = false): Observable<boolean> {
    reg.changedRegistrationTid = changedRegistrationTid;
    reg.syncStatus = SyncStatus.Sync;
    return this.saveRegistration(reg, ignoreVersionCheck);
  }

  public saveRegistration(reg: IRegistration, ignoreVersionCheck = false, updateChangedTimestamp = true): Observable<boolean> {
    if (updateChangedTimestamp) {
      reg.changed = moment().unix();
    }
    if(reg.syncStatus === SyncStatus.Sync) {
      return this.saveAndSyncSingleRegistration(reg, ignoreVersionCheck);
    }else{
      return this.saveRegistrationToOfflineStorage(reg).pipe(map(() => true));
    }
  }

  private saveAndSyncSingleRegistration(reg: IRegistration, ignoreVersionCheck: boolean) {
    // Hvorfor kalles unsubscribe på denne?
    if (this._registrationSyncSubscription) {
      this._registrationSyncSubscription.unsubscribe();
    }
    return this.saveRegistrationToOfflineStorage(reg).pipe(switchMap(() => this.syncSingleRegistration(reg, ignoreVersionCheck)), tap(() => {
      this.loggerService.debug('Single registration synced. Start autosync.');
      this.initAutoSync();
    }));
  }

  private saveRegistrationToOfflineStorage(reg: IRegistration): Observable<RxRegistrationDocument> {
    return this.getRegistrationDbCollectionForAppMode().pipe(take(1),
      switchMap((collection) => from(collection.atomicUpsert(reg)).pipe((switchMap((doc) =>
        this.getRegistrationObservable().pipe(take(1), map(() => doc)))))
      ));
  }

  private updateDocInOfflineStorage(doc: RxRegistrationDocument, reg: IRegistration): Promise<RxRegistrationDocument> {
    // We update doc instead of atomicUpdate, because when we use atomicUpdate attachments get lost...
    return doc.atomicUpdate((oldData) => {
      oldData.changed = reg.changed;
      oldData.syncStatus = reg.syncStatus;
      oldData.lastSync = reg.lastSync;
      oldData.syncError = reg.syncError;
      oldData.syncStatusCode = reg.syncStatusCode;
      oldData.request = reg.request;
      oldData.response = reg.response;
      oldData.changedRegistrationTid = reg.changedRegistrationTid;
      return oldData;
    });
  }

  public deleteRegistration(id: string): Observable<boolean> {
    return this.getRegistrationOfflineDocumentById(id).pipe(
      take(1),
      switchMap((doc) => doc ? this.offlineRegistrationSyncService.deleteItem(doc.toJSON()).pipe(map(() => doc)) : of(undefined)),
      switchMap((doc: RxRegistrationDocument) => doc ? from(doc.remove()) : of(false))
    );
  }

  public deleteRegistrationFromOfflineStorage(id: string): Observable<unknown> {
    return this.getRegistrationOfflineDocumentById(id).pipe(
      take(1),
      switchMap((doc) => doc ? from(doc.remove()) : of(false))
    );
  }

  /**
   * Shared change feed on getRegistrationById. Might have some delay when saving.
   */
  public getRegistrationByIdShared$(id: string): Observable<IRegistration> {
    return this.registrationStorage$.pipe(map((registrations) => registrations.find((r) => r.id === id)));
  }

  public async getRegistrationById(id: string): Promise<IRegistration> {
    const collection = await this.getRegistrationDbCollectionForAppMode().pipe(take(1)).toPromise();
    const resultMap = await collection.findByIds([id]);
    return resultMap.get(id)?.toJSON();
  }

  public async cancelSync(): Promise<void> {
    await this.progressService.resetSyncProgress();
    if (this._registrationSyncSubscription) {
      this._registrationSyncSubscription.unsubscribe();
    }
    this.initAutoSync();
  }

  public initAutoSync(): void {
    if (this.options.autoSync) {
      this._registrationSyncSubscription = this.getAutoSyncObservable().subscribe();
    }
  }

  public getFirstDraftForGeoHazard(geoHazard: GeoHazard, draftsOnly = true): Promise<IRegistration> {
    return this.getDraftsForGeoHazardObservable(geoHazard, draftsOnly)
      .pipe(map((rows) => rows.sort((a, b) => b.changed - a.changed)[0]), take(1)).toPromise();
  }

  public getDraftsForGeoHazardObservable(geoHazard: GeoHazard, draftsOnly = true): Observable<IRegistration[]> {
    return this.registrationStorage$.pipe(map((records) =>
      records.filter((reg) =>
        reg.request.GeoHazardTID === geoHazard
        && (draftsOnly ? reg.syncStatus === SyncStatus.Draft : true)
        //All items in registration storage is "drafts"/not complete until deleted from storage (when done)
      )));
  }

  public getAllRegistrations$(geoHazard?: GeoHazard): Observable<IRegistration[]> {
    return this.getRegistrationDbCollectionForAppMode().pipe(
      switchMap((collection) => collection.find().$),
      map((docs) => docs.map((d) => d.toJSON())),
      map((regs) => regs.filter((r) => geoHazard ? r.geoHazard === geoHazard : true)));
  }

  public deleteAllRegistrationsFromOfflineStorage$(geoHazard?: GeoHazard): Observable<unknown> {
    return this.getAllRegistrations$(geoHazard).pipe(
      switchMap((regs) => regs.length > 0 ? forkJoin(regs.map((reg) => this.deleteRegistrationFromOfflineStorage(reg.id))) : of({})));
  }

  public deleteAllRegistrationsFromOfflineStorage(geoHazard?: GeoHazard): void {
    this.deleteAllRegistrationsFromOfflineStorage$(geoHazard).pipe(take(1)).subscribe();
  }

  public deleteForm(regId: string, registrationTid: RegistrationTid, index: number): Observable<unknown> {
    return this.getRegistrationByIdShared$(regId).pipe(
      take(1),
      map((reg) => {
        const regToEdit = cloneDeep(reg);
        this.makeExistingRegistrationEditable(regToEdit);
        if(isArrayType(registrationTid) && regToEdit.request[getPropertyName(registrationTid)].length > index ) {
          (regToEdit.request[getPropertyName(registrationTid)] as Array<unknown>).splice(index, 1);
          // Deletes images if no forms left in array
          if((regToEdit.request[getPropertyName(registrationTid)] as Array<unknown>).length === 0) {
            this.deleteExistingAttachmentsForRegistrationType(regToEdit, registrationTid);
          }
        }else if(!isArrayType(registrationTid)){
          delete regToEdit.request[getPropertyName(registrationTid)];
          this.deleteExistingAttachmentsForRegistrationType(regToEdit, registrationTid);
        }
        return regToEdit;
      }),
      switchMap((reg) => this.saveAndSync(reg, registrationTid))
    );
  }

  private deleteExistingAttachmentsForRegistrationType(reg: IRegistration, registrationTid: RegistrationTid): IRegistration {
    if(reg && reg.request && reg.request.Attachments) {
      reg.request.Attachments = reg.request.Attachments.filter((a) => a.RegistrationTID !== registrationTid);
    }
    return reg;
  }

  public createNewEmptyDraft(geoHazard: GeoHazard): IRegistration {
    const id = uuidv4();
    const draft: IRegistration = {
      id,
      geoHazard,
      changed: moment().unix(),
      syncStatus: SyncStatus.Draft,
      request: {
        GeoHazardTID: geoHazard,
        DtObsTime: undefined,
        ObsLocation: {
        },
        Attachments: []
      },
    };
    return draft;
  }

  public editExisingRegistration(registrationViewModel: RegistrationViewModel): IRegistration {
    const reg = this.createNewEmptyDraft(registrationViewModel.GeoHazardTID);
    reg.id = registrationViewModel.ExternalReferenceId || reg.id; // Keep the same id as reference id
    reg.request = cloneDeep(registrationViewModel);
    reg.response = cloneDeep(registrationViewModel);
    reg.syncStatus = SyncStatus.InSync;
    return reg;
  }

  public makeExistingRegistrationEditable(reg: IRegistration): void {
    if (reg && reg.syncStatus === SyncStatus.InSync) {
      reg.request = cloneDeep(reg.response);
    }
  }

  public syncRegistrations(): Observable<IRegistration[]> {
    return this.getRegistrationsToSyncObservable().pipe(take(1), this.resetProgressAndSyncItems());
  }

  public syncSingleRegistration(reg: IRegistration, ignoreVersionCheck: boolean): Observable<boolean> {
    if (!reg) {
      return of(false);
    }
    return of([reg]).pipe(
      this.resetProgressAndSyncItems(ignoreVersionCheck),
      map((result) => result.length > 0 && !result[0].syncError)
    );
  }

  private getAutoSyncObservable() {
    return this.getAutosyncChangeTrigger().pipe(
      tap((source) => this.loggerService.debug(`Auto sync triggered. Source: ${source}`)),
      switchMap(() => this.offlineDbService.waitForLeadership()),
      tap(() => this.loggerService.debug('Current tab is in leadership, so this tab is used for sync items')),
      switchMap(() => this.getRegistrationsToSyncObservable()),
      this.filterWhenProgressIsAllreadyRunning(),
      this.resetProgressAndSyncItems()
    );
  }

  private getAutosyncChangeTrigger() {
    const networkOrTimerTrigger$ = merge(
      this.getNetworkOnlineObservable().pipe(map(() => 'network status online trigger')),
      timer(SYNC_TIMER_TRIGGER_MS, SYNC_TIMER_TRIGGER_MS).pipe(map(() => 'timer trigger')));
    return this.getRegistrationsToSyncObservable(false).pipe(
      map((records) => records.length > 0),
      filter((hasRecords) => hasRecords),
      switchMap(() => networkOrTimerTrigger$));
  }

  private resetProgressAndSyncItems(ignoreVersionCheck = false): (src: Observable<IRegistration[]>) => Observable<IRegistration[]> {
    return (src: Observable<IRegistration[]>) =>
      src.pipe(
        // Reset sync status
        concatMap((records) => from(
          this.progressService.resetSyncProgress(records.map((r) => r.id))
        ).pipe(map(() => records))),

        // Innsending skjer langt inni her
        this.flattenRegistrationsToSync(ignoreVersionCheck),

        tap((row) => this.progressService.setSyncProgress(row.item.id, row.error)),
        this.updateRowAndReturnItem(),
        toArray(),
        catchError((error) => {
          this.loggerService.warn('Could not sync registrations', error);
          return of([]);
        }),
        tap(() => this.progressService.resetSyncProgress()));
  }

  /***
   * Check if registration has any data or attachments for registrationTid
   */
  public hasAnyDataToShowInRegistrationTypes(reg: IRegistration, registrationTid: RegistrationTid): Observable<boolean> {
    const model = this.getRegistrationEditOrViewModel(reg);
    return of(isObservationModelEmptyForRegistrationTid(model, registrationTid)).pipe((switchMap((isEmpty) => {
      if(!isEmpty) {
        return of(true);
      }
      return this.hasAnyAttachmentsForRegistrationTid$(reg, registrationTid).pipe(take(1));
    })));
  }

  private getRegistrationEditOrViewModel(reg: IRegistration): RegistrationEditModel | RegistrationViewModel {
    if(reg.syncStatus === SyncStatus.InSync && reg.response) {
      return reg.response;
    }
    return reg.request;
  }

  hasAnyAttachmentsForRegistrationTid$(reg: IRegistration, registrationTid: RegistrationTid): Observable<boolean>{
    return this.getAllAttachmentsForRegistrationTid$(reg.id, registrationTid).
      pipe(map((attachments) => attachments.length > 0));
  }

  hasAnyAttachmentsForRegistrationTid(reg: IRegistration, registrationTid: RegistrationTid): Promise<boolean> {
    return this.hasAnyAttachmentsForRegistrationTid$(reg, registrationTid).pipe(take(1)).toPromise();
  }

  getRegistrationTypesWithAnyData(reg: IRegistration): Observable<IRegistrationType[]> {
    return this.getRegistrationTypesForGeoHazard(reg.geoHazard).pipe(
      switchMap((regTypes) => regTypes.length > 0 ? forkJoin(regTypes.map((regType) => this.hasAnyDataToShowInRegistrationTypes(reg, regType.registrationTid)
        .pipe(map((anyData) => ({  anyData, regType }))))) : of([])),
      map((result) => result.filter((r) => r.anyData).map((r) => r.regType)));
  }

  public getSummaryForRegistrationTidById$(id: string, registrationTid: RegistrationTid): Observable<Summary[]> {
    return this.getRegistrationByIdShared$(id).pipe(switchMap((reg) => this.getSummaryForRegistrationTid(reg, registrationTid)));
  }

  /**
   * Converts a registration draft to summary as the same model as generated from the API
   * @param reg Registration draft
   * @param registrationTid Registration tid
   */
  public getDraftSummary(reg: IRegistration, registrationTid: RegistrationTid, addIfEmpty = true): Observable<Summary[]> {
    if (!isObservationEmptyForRegistrationTid(reg, registrationTid)) {
      // const provider = this.summaryProviders.find((p) => p.registrationTid === registrationTid);
      // if (provider) {
      //   return provider.generateSummary(reg);
      // }
      // TODO: Implement all providers to get summaries generated client side before synchronized to API...
      return this.fallbackSummaryProvider.generateSummary(reg, registrationTid).pipe(tap((genericSummary) =>
        this.loggerService.debug('Generic fallback summary', genericSummary)));
    }
    return addIfEmpty ? this.generateEmptySummary(registrationTid).pipe(map((s) => [s])) : of([]);
  }

  public getSummaryForRegistrationTid(reg: IRegistration, registrationTid: RegistrationTid, addIfEmpty = true): Observable<Summary[]> {
    if(reg.changedRegistrationTid === registrationTid && reg.syncStatus !== SyncStatus.InSync) {
      return this.getDraftSummary(reg, registrationTid, addIfEmpty);
    }
    return this.getResponseSummaryForRegistrationTid(reg, registrationTid, addIfEmpty);
  }

  public getRegistrationName(registrationTid: RegistrationTid): Observable<string> {
    return this.kdvService.getKdvRepositoryByKeyObservable('RegistrationKDV').pipe(
      map((kdvElements) => kdvElements.find((kdv) => kdv.Id === registrationTid)), map((val) => val ? val.Name : ''));
  }

  private getResponseSummaryForRegistrationTid(reg: IRegistration, registrationTid: RegistrationTid, addIfEmpty = true): Observable<Summary[]> {
    if (reg && reg.response && reg.response.Summaries && reg.response.Summaries.length > 0) {
      const summary = reg.response.Summaries.filter(x => x.RegistrationTID === registrationTid);
      if (summary) {
        return of(summary);
      }
    }
    return addIfEmpty ? this.generateEmptySummary(registrationTid).pipe(map((s) => [s])) : of([]);
  }

  private generateEmptySummary(registrationTid: RegistrationTid): Observable<Summary> {
    return this.getRegistrationName(registrationTid).pipe(map((registrationName) => ({
      RegistrationTID: registrationTid,
      RegistrationName: registrationName,
      Summaries: []
    })));
  }

  public getRegistrationTypesForGeoHazard(geoHazard: GeoHazard): Observable<IRegistrationType[]> {
    const registrationTidsForGeoHazard = getRegistrationTidsForGeoHazard(geoHazard);

    const flatViewrepository$ = this.kdvService.getViewRepositoryByKeyObservable('RegistrationTypesV')
      .pipe(
        map((val) => this.parseViewRepositoryType(val[`${geoHazard}`])),
        map((result) => this.flattenRegistrationTypes(result)),
        map((result) => result.filter((val) => registrationTidsForGeoHazard.indexOf(val.registrationTid) >= 0))
      );

    return of(registrationTidsForGeoHazard).pipe(switchMap((registrationTids) =>
      flatViewrepository$.pipe(
        map((vr) => registrationTids.map((registrationTid) => vr.find((v) => v.registrationTid === registrationTid)),
          filter((result) => !!result)
        ))));
  }

  private flattenRegistrationTypes(types: IRegistrationType[]) {
    const arr = types.map((t) => (t.subTypes && t.subTypes.length > 0) ? t.subTypes : [t]);
    return arr.reduce((a, b) => a.concat(b), []);
  }

  private parseViewRepositoryType(val: unknown[]): IRegistrationType[] {
    if (!val) {
      return [];
    }
    return val.map((v) => {
      const result: IRegistrationType = {
        registrationTid: v['Id'],
        name: v['Name'],
        sortOrder: v['SortOrder'],
        subTypes: this.parseViewRepositoryType(v['SubTypes']),
      };
      return result;
    });
  }

  public saveRollbackState$(id: string): Observable<unknown> {
    return combineLatest([this.getRegistrationDbCollectionForAppMode(), this.getRegistrationById(id)]).pipe(
      take(1),
      tap(([collection, reg]) => {
        if(!collection) {
          this.loggerService.warn('No db collection found for appMode when saveRollbackState');
        }
        if(!reg) {
          this.loggerService.warn('No registration found by id when saveRollbackState: ', id);
        }
      }),
      switchMap(([collection, reg]) =>
        (reg && collection) ? from(collection.upsertLocal(`undo_state_${id}`, { reg })) : of({})
      ));
  }

  public saveRollbackState(id: string): void {
    this.saveRollbackState$(id).subscribe(() => null, (err) => {
      this.loggerService.warn('Could not save rollback state', err);
    });
  }

  /**
   * Rollback registration to last known undo state (as observable)
   */
  public rollbackChanges$(id: string): Observable<boolean>  {
    return this.getRegistrationDbCollectionForAppMode().pipe(
      tap((collection) => {
        if(!collection) {
          this.loggerService.warn('No db collection found for appMode when saveRollbackState');
        }
      }),
      switchMap((collection) => collection ? from(collection.getLocal(`undo_state_${id}`)).pipe(map((doc) => doc ?  doc.get('reg') : undefined)): of(undefined)),
      switchMap((reg: IRegistration) => reg ?
        this.saveRegistrationToOfflineStorage(reg).pipe(
          switchMap(() => this.newAttachmentService.removeAttachmentsForRegistration$(id)),
          map(() => true))
        : of(false)));
  }

  /**
   * Rollback registration to last known undo state
   */
  public rollbackChanges(id: string): void {
    this.rollbackChanges$(id).subscribe();
  }

  public hasRegistrationAnyAttachment$(id: string): Observable<boolean> {
    return this.getAllAttachmentsForRegistration$(id).pipe(map((result) => result.length > 0));
  }

  public getAllAttachmentsForRegistration$(id: string): Observable<ExistingOrNewAttachment[]> {
    return combineLatest([
      this.getRegistrationByIdShared$(id).pipe(map((reg) => getAllAttachments(reg))),
      this.newAttachmentService.getUploadedAttachments(id)])
      .pipe(
        map(([existingAttachments, newAttachments]) => [
          ...existingAttachments.map((a) => ({ type: 'existing' as ExistingAttachmentType, attachment: a })),
          ...newAttachments.map((a) => ({ type: 'new' as NewAttachmentType, attachment: a }))
        ]));
  }

  public getExistingAttachmentsForRegistrationTid$(id: string, registrationTid: RegistrationTid): Observable<AttachmentViewModel[]> {
    return this.getRegistrationByIdShared$(id).pipe(map((reg) => getAllAttachments(reg, registrationTid)));
  }

  public getNewAttachmentsForRegistrationTid$(id: string, registrationTid: RegistrationTid): Observable<AttachmentUploadEditModel[]> {
    return this.newAttachmentService.getUploadedAttachments(id).pipe(
      map((attachments: AttachmentUploadEditModel[]) => attachments.filter((a) => a.RegistrationTID === registrationTid)));
  }

  public getAllAttachmentsForRegistrationTid$(id: string, registrationTid: RegistrationTid): Observable<ExistingOrNewAttachment[]> {
    return combineLatest([
      this.getExistingAttachmentsForRegistrationTid$(id, registrationTid),
      this.getNewAttachmentsForRegistrationTid$(id, registrationTid)])
      .pipe(
        map(([existingAttachments, newAttachments]) => [
          ...existingAttachments.map((a) => ({ type: 'existing' as ExistingAttachmentType, attachment: a })),
          ...newAttachments.map((a) => ({ type: 'new' as NewAttachmentType, attachment: a }))
        ]));
  }

  private getRegistrationOfflineDocumentById(id: string): Observable<RxRegistrationDocument> {
    return this.getRegistrationDbCollectionForAppMode().pipe(
      switchMap((dbCollection) => dbCollection.findByIds$([id])),
      map((result) => result.get(id)));
  }

  private getRegistrationObservable(): Observable<IRegistration[]> {
    return this.getRegistrationDbCollectionForAppMode().pipe(
      switchMap((dbCollection) => dbCollection.find().$.pipe(map((docs) => docs.map((doc) => doc.toJSON())))),
      distinctUntilChanged((a, b) => deepEqual(a, b)));
  }

  private getRegistrationsDbCollection(appMode: AppMode): RxRegistrationCollection {
    return this.offlineDbService.getDbCollection<RxRegistrationCollection>(appMode, TABLE_NAMES.REGISTRATION);
  }

  private getRegistrationDbCollectionForAppMode(): Observable<RxRegistrationCollection> {
    return this.appModeService.appMode$.pipe(map((appMode) => this.getRegistrationsDbCollection(appMode)));
  }

  private getNetworkOnlineObservable(): Observable<boolean> {
    return this.internetConnectivity.isOnline$.pipe(
      distinctUntilChanged(),
      filter((online) => online),
      tap(() => this.loggerService.debug('App is now online!'))
    );
  }

  private filterWhenProgressIsAllreadyRunning() {
    return (src: Observable<IRegistration[]>) =>
      src.pipe(withLatestFrom(this.progressService.registrationSyncProgress$),
        filter(([, syncProgress]) => !syncProgress.inProgress),
        map(([records]) => records));
  }

  private getRegistrationsToSyncObservable(includeThrottle = false) {
    return this.registrationStorage$.pipe(
      switchMap((records) =>
        records.length > 0 ?
          from(Promise.all(records.map((reg) => this.shouldSync(reg, includeThrottle).then((shouldSync) => ({ reg, shouldSync })))))
          // forkJoin(records.map((reg) => this.shouldSync(reg, includeThrottle).pipe(map((shouldSync) => ({ reg, shouldSync })))))
          : of([])
      ),
      map((result) => result.filter((result) => result.shouldSync).map((result) => result.reg)));
  }

  public async isEmpty(reg: IRegistration): Promise<boolean> {
    const isNotEmpty = await this.isNotEmpty(reg);
    return !isNotEmpty;
  }

  private isNotEmpty(reg: IRegistration): Promise<boolean> {
    const notEmpty = hasAnyObservations(reg);
    if (notEmpty) {
      return Promise.resolve(true);
    }
    return this.hasRegistrationAnyAttachment$(reg.id).pipe(take(1)).toPromise();
  }

  private async shouldSync(reg: IRegistration, includeThrottle = false): Promise<boolean> {
    if (reg.syncStatus === SyncStatus.Sync) {
      if (includeThrottle && this.shouldThrottle(reg)) {
        return false;
      }
      if (reg.response && reg.response.RegId > 0) {
        return true; // Edit existing registration should sync even if empty (deleted observation)
      }
      return await this.isNotEmpty(reg);
    }
    return false;
  }

  private shouldThrottle(reg: IRegistration) {
    if (!reg.lastSync) {
      return false;
    }
    if (reg.changed > reg.lastSync) {
      return false;
    }
    const msToNextSync = this.getMsUntilNextSync(reg.lastSync, SYNC_BUFFER_MS);
    if (msToNextSync > 0) {
      this.loggerService.debug(`Should throttle: ${msToNextSync / 1000}`, reg);
      return true;
    }
    return false;
  }

  private getMsUntilNextSync(lastSyncTimeUnixTimestamp: number, timeout: number) {
    const msSinceLastSync = (moment().unix() - lastSyncTimeUnixTimestamp) * 1000;
    return timeout - msSinceLastSync;
  }

  private flattenRegistrationsToSync(ignoreVersionCheck: boolean) {
    return (src: Observable<IRegistration[]>) =>
      src.pipe(mergeMap((rows) =>
        concat(rows.map((row) => (this.syncRecord(row, ignoreVersionCheck)))),
      ), mergeMap((r) => r));
  }

  private syncRecord(item: IRegistration, ignoreVersionCheck: boolean): Observable<ItemSyncCompleteStatus<IRegistration>> {
    return this.offlineRegistrationSyncService.syncItem(item, ignoreVersionCheck).pipe(
      catchError((err) => of(({ item, success: false, error: err }))),
      tap((result) => this.loggerService.log('Record sync complete', result)));
  }

  private mapItemSyncCompleteStatusToRegistration(): (src: Observable<ItemSyncCompleteStatus<IRegistration>>) =>
  Observable<IRegistration>  {
    return (src: Observable<ItemSyncCompleteStatus<IRegistration>>) =>
      src.pipe(map((r: ItemSyncCompleteStatus<IRegistration>) => ({
        ...r.item,
        lastSync: moment().unix(),
        syncStatus: r.success ? SyncStatus.InSync : (r.statusCode === 0 ? SyncStatus.Sync : SyncStatus.Draft),
        request: r.success ? cloneDeep(r.item.response) : cloneDeep(r.item.request),
        syncStatusCode: r.statusCode,
        syncError: r.error,
      })));
  }

  private updateRowAndReturnItem(): (src: Observable<ItemSyncCompleteStatus<IRegistration>>) =>
    Observable<IRegistration> {
    return (src: Observable<ItemSyncCompleteStatus<IRegistration>>) =>
      src.pipe(this.mapItemSyncCompleteStatusToRegistration(),
        switchMap((item: IRegistration) =>
          this.saveRegistrationToOfflineStorage(item)
            .pipe(catchError((err) => {
              this.loggerService.error('Could not update record in offline storage', err);
              return of([]);
            }), map(() => item)))
      );
  }
}
