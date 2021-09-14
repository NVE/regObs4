import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable, combineLatest, from, of, BehaviorSubject } from 'rxjs';
import { LanguageService, LoggerService, AppMode, LangKey, AppModeService } from '@varsom-regobs-common/core';
import { map, switchMap, shareReplay, catchError, concatMap, take } from 'rxjs/operators';
import { OfflineSyncMeta } from '../../models/offline-sync-meta.interface';
import moment from 'moment';
import { OfflineDbService } from '../offline-db/offline-db.service';
import { RxKdvCollection } from '../../db/RxDB';
import { RxDocument } from 'rxdb';

export const API_SYNCE_OFFLINE_BASE_SERVICE_OPTIONS_CONFIG = new InjectionToken<ApiSyncOfflineBaseServiceOptions>('ApiSyncOfflineBaseServiceOptions.config');
export interface ApiSyncOfflineBaseServiceOptions {
  useLangKeyAsDbKey: boolean;
  validSeconds: number;
  offlineTableKey?: string | number;
}

@Injectable()
export abstract class ApiSyncOfflineBaseService<T>  {

  public readonly data$: Observable<T>;
  private isUpdatingSubject = new BehaviorSubject<boolean>(false);

  get isUpdating$(): Observable<boolean> {
    return this.isUpdatingSubject.asObservable();
  }

  constructor(
    @Inject(API_SYNCE_OFFLINE_BASE_SERVICE_OPTIONS_CONFIG) protected options: ApiSyncOfflineBaseServiceOptions,
    protected offlineDbService: OfflineDbService,
    protected languageService: LanguageService,
    protected appModeService: AppModeService,
    protected logger: LoggerService) {
    this.data$ = this.getDataObservable().pipe(shareReplay(1));
  }

  public abstract getUpdatedData(appMode: AppMode, langKey: LangKey): Observable<T>;
  public abstract getFallbackData(appMode: AppMode, langKey: LangKey): Observable<T>;
  public abstract getTableName(appMode: AppMode): string;

  /** Force update offline data */
  public update(): void {
    this.isUpdatingSubject.next(true);
    combineLatest([this.languageService.language$, this.appModeService.appMode$]).pipe(
      switchMap(([langKey, appMode]) => this.getUpdatedDataAndSaveResultIfSuccess(appMode, langKey)),
      take(1)).subscribe(() => {
      this.isUpdatingSubject.next(false);
    });
  }

  /**
   * Check if data is to old to use (cache time has expired)
   * @param metaData cached offline data
   */
  protected isValid(metaData: RxDocument<OfflineSyncMeta<T>>): boolean {
    const valid = metaData && (metaData.lastUpdated > this.getInvalidTime().unix());
    this.logger.debug(`Offline data is ${valid ? 'valid -> returning offline data' : 'not valid -> Fetch new data'}`, metaData);
    return valid;
  }

  /**
   * Get limit for when data is invalid (cache time)
   */
  protected getInvalidTime(): moment.Moment {
    return moment().subtract(this.options.validSeconds, 'seconds');
  }

  /**
   * Get data observable
   */
  private getDataObservable(): Observable<T> {
    return combineLatest([this.languageService.language$, this.appModeService.appMode$]).pipe(
      switchMap(([langKey, appMode]) =>
        this.getOfflineDataAndReturnIfDataIsUpToDate(appMode, langKey)
          .pipe(take(1), switchMap((updatedData) =>
            updatedData != null ? of(updatedData) : this.getUpdatedDataAndSaveResultIfSuccessOrFallbackToAssetsFolder(appMode, langKey)))));
  }

  /**
   * Get data from offline storage and return if valid. If not, return null
   * @param appMode App mode
   * @param langKey Language
   */
  private getOfflineDataAndReturnIfDataIsUpToDate(appMode: AppMode, langKey: LangKey): Observable<T> {
    return this.getOfflineData(appMode, langKey).pipe(map((offlineMeta) => {
      // Check if offline data is newer than 24 hours
      if(this.isValid(offlineMeta)) {
        return offlineMeta.data;
      }
      return null;
    }));
  }

  /**
   * Get new data and save to offline storage if success. If update of data fails, fall back to old offline storage data or assets in worst case
   * @param appMode App Mode
   * @param langKey Language
   */
  private getUpdatedDataAndSaveResultIfSuccessOrFallbackToAssetsFolder(appMode: AppMode, langKey: LangKey) {
    return this.getUpdatedDataAndSaveResultIfSuccess(appMode, langKey).pipe(
      catchError((err) => {
        this.logger.warn('Could not get kvd elements from API. Fallback to offline storage', err);
        return this.getOfflineDataOrFallbackToAssets(appMode, langKey);
      }));
  }

  /**
   * Get updated data and save result to offline storage if successful
   */
  private getUpdatedDataAndSaveResultIfSuccess(appMode: AppMode, langKey: LangKey) {
    return this.getUpdatedData(appMode, langKey).pipe(
      switchMap((data) => this.saveDataToOfflineDb(appMode, langKey, data).pipe(catchError((err) => {
        this.logger.error('Could not save data to offline storage', err);
        return of(data);
      }), map(() => data))));
  }

  /**
   * Save data to offline db
   * @param appMode App mode
   * @param langKey Language
   * @param data Data to save
   */
  private saveDataToOfflineDb(appMode: AppMode, langKey: LangKey, data: T) {
    const meta: OfflineSyncMeta<T> = {
      id: this.getOfflineStorageDbKey(langKey),
      lastUpdated: moment().unix(),
      data
    };
    return from(this.getDbCollection(appMode).atomicUpsert(meta));
  }

  /**
   * Get offline db collection
   * @param appMode App mode
   */
  private getDbCollection(appMode: AppMode): RxKdvCollection {
    const collection = this.offlineDbService.db[this.getTableName(appMode)];
    return collection as RxKdvCollection;
  }

  /**
   * Get data from offline db
   * @param appMode App mode
   * @param langKey Language
   */
  private getOfflineData(appMode: AppMode, langKey: LangKey): Observable<RxDocument<OfflineSyncMeta<T>>> {
    const collection =  this.getDbCollection(appMode);
    const key = this.getOfflineStorageDbKey(langKey);
    return collection.findByIds$([key]).pipe(map((val) => val.has(key) ? val.get(key) : null)) as Observable<RxDocument<OfflineSyncMeta<T>>>;
  }

  /**
   * Get primary key for storing offline data
   * @param langKey Language
   */
  private getOfflineStorageDbKey(langKey: LangKey) {
    return  this.options.useLangKeyAsDbKey ? `${langKey}` : `${this.options.offlineTableKey}`;
  }

  /**
   * Get offline data or fallback to something if no offline data
   * @param appMode App mode
   * @param langKey Language
   */
  private getOfflineDataOrFallbackToAssets(appMode: AppMode, langKey: LangKey) {
    return this.getOfflineData(appMode, langKey).pipe(
      concatMap((val) => {
        if(!val) {
          this.logger.warn('No kdv elements found in offline storage. Get fallback data');
          return this.getFallbackData(appMode, langKey);
        }
        return of(val.data);
      }));
  }
}
