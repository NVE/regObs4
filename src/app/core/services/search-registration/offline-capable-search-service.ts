import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import {
  Observable,
  firstValueFrom,
  combineLatest,
  distinctUntilChanged,
  switchMap,
  startWith,
  map,
  tap,
  Subject,
  timeout,
  catchError,
  TimeoutError,
  of,
  concatMap,
  debounceTime,
  filter,
  takeUntil,
  BehaviorSubject,
  timer,
} from 'rxjs';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import {
  AtAGlanceViewModel,
  RegistrationViewModel,
  RegobsApiConfiguration,
  SearchCountResponseDto,
  SearchCriteriaRequestDto,
  SearchService,
} from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { NetworkStatusService } from '../network-status/network-status.service';
import { SqliteService } from '../sqlite/sqlite.service';
import { UserSettingService } from '../user-setting/user-setting.service';

type SyncRequestResult = 'success' | 'error';
type SyncRequest = Subject<SyncRequestResult>[];

const DEBUG_TAG = 'OfflineCapableSearchService';
const SYNC_DEBOUNCE_MS = 500;
const SYNC_TIMEOUT_MS = 5000; // Includes the debounce time
const SYNC_INTERVAL = 120000;

let _syncId = 0;
const createSyncId = (appMode: AppMode, lang: LangKey) => {
  _syncId = _syncId + 1;
  return `${_syncId}_${appMode}_${lang}`;
};

/**
 * Will search for observations in the offline database instead of searching online through the Regobs API
 */
@Injectable()
export class OfflineCapableSearchService extends SearchService {
  /**
   * En liste med sync-forespørsler.
   * En forespørsel / SyncRequest er i seg selv en subject for å kunne gi beskjed tilbake til den som har bedt om
   * syncing om at syncingen er ferdig, feilet osv.
   */
  private syncRequests = new BehaviorSubject<SyncRequest>([]);

  constructor(
    config: RegobsApiConfiguration,
    http: HttpClient,
    private logger: LoggingService,
    private sqlite: SqliteService,
    private network: NetworkStatusService,
    private userSettings: UserSettingService
  ) {
    super(config, http);

    combineLatest([
      this.userSettings.appMode$.pipe(tap(() => this.logger.debug('AppMode changed', DEBUG_TAG))),

      this.userSettings.language$.pipe(tap(() => this.logger.debug('Language change', DEBUG_TAG))),

      this.network.connected$.pipe(
        tap((hasNetwork) => this.logger.debug('Network status changed', DEBUG_TAG, { hasNetwork }))
      ),

      this.syncRequests.pipe(
        tap(() => this.logger.debug('Sync requests changed', DEBUG_TAG, { n: this.syncRequests.value.length })),
        filter((syncRequests) => syncRequests.length > 0)
      ),
    ])
      .pipe(
        filter(([, , isConnected]) => isConnected),
        debounceTime(SYNC_DEBOUNCE_MS),
        // Include timer here so it is reset when a sync is triggered from a user action etc..
        switchMap(([appMode, lang]) =>
          timer(0, SYNC_INTERVAL).pipe(
            tap((i) => {
              if (i > 0) {
                this.logger.debug(`Sync triggered from interval of ${SYNC_INTERVAL} ms`, DEBUG_TAG);
              }
            }),
            map(() => ({ appMode, lang }))
          )
        ),
        concatMap(({ appMode, lang }) => this.sync(appMode, lang))
      )
      .subscribe();
  }

  private triggerForceSync() {
    const syncRequest = new Subject<SyncRequestResult>();
    const syncRequests = this.syncRequests.value;
    this.syncRequests.next([...syncRequests, syncRequest]);

    return syncRequest.pipe(
      timeout(SYNC_TIMEOUT_MS),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          this.logger.debug(`Waited for sync to finish in ${SYNC_TIMEOUT_MS} ms`, DEBUG_TAG);
        } else {
          this.logger.error(error, DEBUG_TAG, 'Unknown error happened while waiting for sync to finish');
        }

        const result: SyncRequestResult = 'error';
        return of(result);
      })
    );
  }

  private async *pagedSearch(criteria: SearchCriteriaRequestDto, count: number) {
    let nFetched = 0;
    let offset = 0;
    while (nFetched < count) {
      const pageCriteria = {
        NumberOfRecords: 500,
        Offset: offset,
        ...criteria,
      };

      this.logger.debug('Fetching paged search', DEBUG_TAG, { pageCriteria });
      const registrations = await firstValueFrom(super.SearchSearch(pageCriteria));

      if (registrations.length > 0) {
        yield registrations;
      } else {
        this.logger.debug('Got no registrations, finishing paged search', DEBUG_TAG, { pageCriteria, count, nFetched });
        return;
      }

      nFetched += registrations.length;
      offset = nFetched;
    }
  }

  private async getSyncTimeCriterias(
    appMode: AppMode,
    lang: LangKey,
    syncId: string
  ): Promise<Pick<SearchCriteriaRequestDto, 'FromDtChangeTime' | 'FromDtObsTime'>> {
    let lastSyncMs: number;
    try {
      lastSyncMs = await this.sqlite.readRegistrationsSyncTime(appMode, lang);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, `Sync ${syncId}: Failed to read last sync ms`);
      lastSyncMs = 0;
    }

    const twoWeeksAgo = moment().subtract(14, 'days');
    const twoWeeksAgoMs = twoWeeksAgo.valueOf();
    lastSyncMs = lastSyncMs < twoWeeksAgoMs ? twoWeeksAgoMs : lastSyncMs;
    this.logger.debug(`Sync ${syncId}: last time ms`, DEBUG_TAG, { lastSyncMs });

    return {
      FromDtChangeTime: moment(lastSyncMs).format(),
      FromDtObsTime: twoWeeksAgo.format(),
    };
  }

  private async fetchAndInsertRegistrations(
    criteria: SearchCriteriaRequestDto,
    appMode: AppMode,
    lang: LangKey,
    syncId: string
  ) {
    const { TotalMatches: count } = await firstValueFrom(super.SearchCount(criteria));
    if (count > 0) {
      for await (const registrations of this.pagedSearch(criteria, count)) {
        this.logger.debug(`Sync ${syncId}: Inserting ${registrations.length} registrations`, DEBUG_TAG);
        for (const reg of registrations) {
          await this.sqlite.insertRegistrations([reg], appMode, lang, syncId);
        }
      }
    } else {
      this.logger.debug(`Sync ${syncId}: No new registrations to fetch`, DEBUG_TAG, { count, criteria });
    }
  }

  private async sync(appMode: AppMode, lang: LangKey) {
    const syncId = createSyncId(appMode, lang);
    this.logger.debug(`Sync ${syncId}: Starting`, DEBUG_TAG, { appMode });

    const syncRequests = [...this.syncRequests.value];
    this.syncRequests.next([]);

    try {
      const syncTimeCriterias = await this.getSyncTimeCriterias(appMode, lang, syncId);

      // Save new sync time before requesting new registrations,
      // so we can fetch registrations added while we request registrations later
      const newSyncTimeMs = moment().valueOf();

      const criteria: SearchCriteriaRequestDto = {
        ...syncTimeCriterias,
        LangKey: lang,
      };

      this.logger.debug(`Sync ${syncId}: criteria`, DEBUG_TAG, { criteria });
      await this.fetchAndInsertRegistrations(criteria, appMode, lang, syncId);
      await this.sqlite.updateRegistrationsSyncTime(newSyncTimeMs, appMode, lang, syncId);
      this.logger.debug(`Sync ${syncId}: done`, DEBUG_TAG, { appMode, criteria, newSyncTimeMs, syncTimeCriterias });

      for (const syncReq of syncRequests) {
        syncReq.next('success');
      }
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, `Sync ${syncId}: failed`);
      for (const syncReq of syncRequests) {
        syncReq.next('error');
      }
    }
  }

  private async selectRegistrationsFromDb(criteria: SearchCriteriaRequestDto, appMode: AppMode) {
    const registrations = await this.sqlite.selectRegistrations(criteria, appMode);
    this.logger.debug('DB result', DEBUG_TAG, { n: registrations.length });
    return registrations;
  }

  private getSyncTriggeredObservable() {
    const hasSynced = this.triggerForceSync();
    return combineLatest([this.userSettings.appMode$, this.sqlite.hasChanges$.pipe(startWith(true))]).pipe(
      map(([appMode]) => appMode),
      takeUntil(hasSynced)
    );
  }

  SearchCount(criteria: SearchCriteriaRequestDto): Observable<SearchCountResponseDto> {
    this.logger.debug('SearchCount triggered', DEBUG_TAG, { criteria });
    return this.getSyncTriggeredObservable().pipe(
      switchMap((appMode) => this.sqlite.getRegistrationCount(criteria, appMode)),
      map((count) => ({ TotalMatches: count }))
    );
  }

  SearchAtAGlance(criteria: SearchCriteriaRequestDto): Observable<AtAGlanceViewModel[]> {
    this.logger.debug('SearchAtAGlance triggered', DEBUG_TAG, { criteria });
    return this.getSyncTriggeredObservable().pipe(
      switchMap((appMode) => this.selectRegistrationsFromDb(criteria, appMode)),
      map((registrations) =>
        registrations.map((reg) => ({
          CompetenceLevelTID: reg.Observer?.CompetenceLevelTID,
          DtObsTime: reg.DtObsTime,
          FirstAttachmentId: reg.Attachments?.length ? reg.Attachments[0].AttachmentId : null,
          FormNames: ['Ikke laget enda'],
          GeoHazardTID: reg.GeoHazardTID,
          Latitude: reg.ObsLocation?.Latitude,
          Longitude: reg.ObsLocation?.Longitude,
          NickName: reg.Observer?.NickName,
          RegId: reg.RegId,
          Title: reg.ObsLocation?.Title,
        }))
      )
    );
  }

  SearchSearch(criteria: SearchCriteriaRequestDto): Observable<RegistrationViewModel[]> {
    this.logger.debug('SearchSearch triggered', DEBUG_TAG, { criteria });
    return this.getSyncTriggeredObservable().pipe(
      switchMap((appMode) => this.selectRegistrationsFromDb(criteria, appMode)),
      distinctUntilChanged((prev, curr) => {
        if (prev.length !== curr.length) {
          return false;
        }
        for (let index = 0; index < prev.length; index++) {
          const { RegId: prevRegId } = prev[index];
          const { RegId: currRegId } = curr[index];
          if (prevRegId !== currRegId) {
            return false;
          }
        }

        return true;
      })
    );
  }
}
