import { inject, Injectable } from '@angular/core';
import { Observable, combineLatest, from, of, BehaviorSubject } from 'rxjs';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { map, switchMap, shareReplay, catchError, concatMap, take, timeout } from 'rxjs/operators';
import { OfflineSyncMeta } from '../../models/offline-sync-meta.interface';
import moment from 'moment';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { getCacheAge } from '../cache-age';
import { DatabaseService } from 'src/app/core/services/database/database.service';

export interface ApiSyncOfflineBaseServiceOptions {
  useLangKeyAsDbKey: boolean;
  validSeconds: number;
  offlineTableKey?: string | number;
}

@Injectable()
export abstract class ApiSyncOfflineBaseService<T> {
  protected databaseService = inject(DatabaseService);
  protected logger = inject(LoggingService);
  protected userSettingService = inject(UserSettingService);

  public readonly data$: Observable<T>;
  private isUpdatingSubject = new BehaviorSubject<boolean>(false);

  get isUpdating$(): Observable<boolean> {
    return this.isUpdatingSubject.asObservable();
  }

  protected options: ApiSyncOfflineBaseServiceOptions = {
    validSeconds: getCacheAge(),
    useLangKeyAsDbKey: true,
  };

  // As we can use cached data anyway, use a short timeout here to avoid blank screen issues if fetching new data takes
  // a long time
  protected FETCH_NEW_DATA_TIMEOUT = 2000;

  constructor() {
    this.data$ = this.getDataObservable().pipe(shareReplay(1));
  }

  protected abstract getUpdatedData(appMode: AppMode, langKey: LangKey): Observable<T>;
  protected abstract getFallbackData(appMode: AppMode, langKey: LangKey): Observable<T>;
  protected abstract getOfflineDatabaseKey(appMode: AppMode, langKey: LangKey): string;
  protected abstract getDebugTag(): string;

  /** Force update offline data */
  public update(): void {
    this.isUpdatingSubject.next(true);
    combineLatest([this.userSettingService.language$, this.userSettingService.appMode$])
      .pipe(
        switchMap(([langKey, appMode]) => this.getUpdatedDataAndSaveResultIfSuccess(appMode, langKey)),
        take(1)
      )
      .subscribe(() => {
        this.isUpdatingSubject.next(false);
      });
  }

  /**
   * Check if data is to old to use (cache time has expired)
   * @param metaData cached offline data
   */
  protected isValid(metaData: OfflineSyncMeta<T>): boolean {
    const valid = metaData && metaData.lastUpdated > this.getInvalidTime().unix();
    this.logger.debug(
      `Offline data is ${valid ? 'valid -> returning offline data' : 'not valid -> Fetch new data'}`,
      this.getDebugTag(),
      metaData
    );
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
    return combineLatest([this.userSettingService.language$, this.userSettingService.appMode$]).pipe(
      switchMap(([langKey, appMode]) => {
        try {
          return from(this.getOfflineDataAndReturnIfDataIsUpToDate(appMode, langKey)).pipe(
            take(1),
            switchMap((updatedData) =>
              updatedData != null
                ? of(updatedData)
                : this.getUpdatedDataAndSaveResultIfSuccessOrFallbackToAssetsFolder(appMode, langKey)
            ),
            // This handles errors inside the observable stream
            catchError((err) => {
              this.logger.error(err, this.getDebugTag(), 'Error in getDataObservable');
              return this.getFallbackDataWithLogging(appMode, langKey);
            })
          );
        } catch (error) {
          // This handles errors thrown before the observable from getOfflineDataAndReturnIfDataIsUpToDate
          // has been created properly
          this.logger.error(error, this.getDebugTag(), 'Error in getDataObservable init');
          return this.getFallbackDataWithLogging(appMode, langKey);
        }
      })
    );
  }

  /**
   * Get data from offline storage and return if valid. If not, return null
   * @param appMode App mode
   * @param langKey Language
   */
  private async getOfflineDataAndReturnIfDataIsUpToDate(appMode: AppMode, langKey: LangKey): Promise<T | null> {
    const offlineDataWithMetadata = await this.getOfflineData(appMode, langKey);
    // Check if offline data is newer than 24 hours
    if (this.isValid(offlineDataWithMetadata)) {
      return offlineDataWithMetadata.data;
    }
    return null;
  }

  /**
   * Get new data and save to offline storage if success. If update of data fails, fall back to old offline storage data or assets in worst case
   * @param appMode App Mode
   * @param langKey Language
   */
  private getUpdatedDataAndSaveResultIfSuccessOrFallbackToAssetsFolder(
    appMode: AppMode,
    langKey: LangKey
  ): Observable<T> {
    return from(this.getUpdatedDataAndSaveResultIfSuccess(appMode, langKey)).pipe(
      catchError((err) => {
        this.logger.log(
          'Could not get data from API. Fallback to offline storage',
          err,
          LogLevel.Warning,
          this.getDebugTag(),
          { error: err, appMode, langKey }
        );
        return this.getOfflineDataOrFallbackToAssets(appMode, langKey);
      })
    );
  }

  /**
   * Get updated data and save result to offline storage if successful
   */
  private getUpdatedDataAndSaveResultIfSuccess(appMode: AppMode, langKey: LangKey) {
    return this.getUpdatedData(appMode, langKey).pipe(
      timeout(this.FETCH_NEW_DATA_TIMEOUT),
      switchMap((data) =>
        from(this.saveDataToOfflineDb(appMode, langKey, data)).pipe(
          catchError((err) => {
            this.logger.error(err, this.getDebugTag(), 'Could not save data to offline storage');
            return of(data);
          }),
          map(() => data)
        )
      )
    );
  }

  /**
   * Save data to offline db
   * @param appMode App mode
   * @param langKey Language
   * @param data Data to save
   */
  private async saveDataToOfflineDb(appMode: AppMode, langKey: LangKey, data: T) {
    const start = Date.now();
    const meta: OfflineSyncMeta<T> = {
      id: this.getOfflineStorageDbKey(langKey),
      lastUpdated: moment().unix(),
      data,
    };
    const key = this.getOfflineDatabaseKey(appMode, langKey);
    await this.databaseService.set(key, meta);
    this.logger.debug(`Offline data for key '${key}' saved in ${this.millisSince(start)} ms`, this.getDebugTag());
  }

  /**
   * Get data from offline db
   * @param appMode App mode
   * @param langKey Language
   */
  private async getOfflineData(appMode: AppMode, langKey: LangKey): Promise<OfflineSyncMeta<T>> {
    const start = Date.now();
    const key = this.getOfflineDatabaseKey(appMode, langKey);
    const data = await this.databaseService.get<OfflineSyncMeta<T>>(key);
    this.logger.debug(`Offline data for key '${key}' loaded in ${this.millisSince(start)} ms`, this.getDebugTag());
    return data;
  }

  /**
   * Get primary key for storing offline data
   * @param langKey Language
   */
  private getOfflineStorageDbKey(langKey: LangKey): string {
    return this.options.useLangKeyAsDbKey ? `${langKey}` : `${this.options.offlineTableKey}`;
  }

  /**
   * Just a wrapper around this.getFallbackData with logging.
   * this.getFallbackData is abstract and must be implemented by the child class.
   */
  private getFallbackDataWithLogging(appMode: AppMode, langKey: LangKey): Observable<T> {
    this.logger.debug('Get fallback data', this.getDebugTag());
    return this.getFallbackData(appMode, langKey);
  }

  /**
   * Get offline data or fallback to something if no offline data
   * @param appMode App mode
   * @param langKey Language
   */
  private getOfflineDataOrFallbackToAssets(appMode: AppMode, langKey: LangKey): Observable<T> {
    return from(this.getOfflineData(appMode, langKey)).pipe(
      concatMap((offlineDataWithMetaData) => {
        if (!offlineDataWithMetaData) {
          this.logger.log(
            'No data found in offline storage. Get fallback data',
            null,
            LogLevel.Warning,
            this.getDebugTag()
          );
          return this.getFallbackDataWithLogging(appMode, langKey);
        }
        return of(offlineDataWithMetaData.data);
      })
    );
  }

  private millisSince(start: number): string {
    return (Date.now() - start).toFixed();
  }
}
