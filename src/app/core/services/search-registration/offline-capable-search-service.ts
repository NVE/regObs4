import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import moment from 'moment';
import {
  Observable,
  firstValueFrom,
  combineLatest,
  switchMap,
  startWith,
  map,
  tap,
  Subject,
  timeout,
  catchError,
  TimeoutError,
  of,
  debounceTime,
  takeUntil,
  BehaviorSubject,
  timer,
  EMPTY,
  exhaustMap,
  take,
  withLatestFrom,
  filter,
  shareReplay,
  throwError,
  defaultIfEmpty,
  from,
  defer,
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
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { AddUpdateDeleteRegistrationService } from '../add-update-delete-registration/add-update-delete-registration.service';
import { NetworkStatusService } from '../network-status/network-status.service';
import { SqliteService } from '../sqlite/sqlite.service';
import { UserSettingService } from '../user-setting/user-setting.service';

type SyncRequest = Subject<void>;
type CurrentSyncInfo = { appMode: AppMode; langKey: LangKey };

const DEBUG_TAG = 'OfflineCapableSearchService';
const SYNC_DEBOUNCE_MS = 500;
const SYNC_INTERVAL = 120000;

const OUT_OF_SYNC_MS = 259_200_000; // ms = 3 days
const SYNC_TIMEOUT = 10_000; // 10 seconds

/**
 * Search for observations in the offline database instead of searching online through the Regobs API.
 * Tries to sync offline observations with the regobs api every time it gets a search request, and on an interval.
 */
@Injectable()
export class OfflineCapableSearchService extends SearchService {
  /**
   * En liste med sync-forespørsler.
   * En forespørsel / SyncRequest er i seg selv en subject for å kunne gi beskjed tilbake til den som har bedt om
   * syncing om at syncingen er ferdig, feilet osv.
   */
  private readonly syncRequests = new BehaviorSubject<SyncRequest[]>([]);
  private readonly lastSyncTime$: Observable<number>;
  private readonly syncFinishedSuccessfully = new Subject<void>();

  // Some syncing is more imprtant than other, and should be awaited.
  // When AppMode or Language changes or user requests a refresh,
  // this property is replaced with a new observable that emits when
  // the sync is complete.
  // If a sync is periodic, the app already has fresh data, so the sync can
  // just be done in the background. For periodic syncs, this property is not
  // replaced.
  // See waitForImpartantSyncToFinishOrTimeout()
  private importantSync$: Observable<void> = of(null);

  constructor(
    config: RegobsApiConfiguration,
    http: HttpClient,
    private logger: LoggingService,
    private sqlite: SqliteService,
    private network: NetworkStatusService,
    private userSettings: UserSettingService,
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private updateObsService: UpdateObservationsService
  ) {
    super(config, http);

    this.updateObsService.offlineMode = true;
    this.sqlite.hasCrashed$.pipe(take(1)).subscribe(() => {
      this.updateObsService.offlineMode = false;
    });

    this.lastSyncTime$ = combineLatest([
      this.userSettings.appMode$,
      this.userSettings.language$,
      this.syncFinishedSuccessfully.pipe(startWith(true)),
    ]).pipe(
      takeUntil(this.sqlite.hasCrashed$),
      switchMap(([appMode, langKey]) => this.readLastSyncTime(appMode, langKey)),
      shareReplay(1)
    );

    // Update the last fetched time shown in filter menu whenever last fetched in offline db changes
    this.lastSyncTime$
      .pipe(
        takeUntil(this.sqlite.hasCrashed$),
        map((lastFetchedMs) => {
          if (lastFetchedMs == 0) return null;
          else return new Date(lastFetchedMs);
        })
      )
      .subscribe((d) => this.updateObsService.setOfflineObservationsLastFetched(d));

    // Whenever appMode or language changes, or user force a refresh - trigger a new sync
    combineLatest([this.userSettings.appMode$, this.userSettings.language$, this.updateObsService.refreshRequested$])
      .pipe(takeUntil(this.sqlite.hasCrashed$))
      .subscribe(() => {
        this.lastSyncTime$;
        const syncRequest = this.triggerSync();
        this.importantSync$ = syncRequest;
      });

    // Save submitted or changed registrations to database
    combineLatest([this.userSettings.appMode$, addUpdateDeleteRegistrationService.changedRegistrations$])
      .pipe(takeUntil(this.sqlite.hasCrashed$))
      .subscribe(([appMode, { reg, langKey }]) => {
        this.sqlite.insertRegistrations([reg], appMode, langKey);
      });

    combineLatest([this.userSettings.appMode$, addUpdateDeleteRegistrationService.deletedRegistrationIds$])
      .pipe(takeUntil(this.sqlite.hasCrashed$))
      .subscribe(([appMode, regId]) => {
        this.sqlite.deleteRegistrations([regId], appMode);
      });

    // Sync of updated observations are triggered from this observable
    combineLatest([
      this.syncRequests.pipe(
        filter((syncRequests) => syncRequests.length > 0),
        tap(() => this.logger.debug('Sync requests changed', DEBUG_TAG, { n: this.syncRequests.value.length }))
      ),
      network.connected$,
    ])
      .pipe(
        takeUntil(this.sqlite.hasCrashed$),

        // Many things can trigger a sync. Use a debounce time to only start a sync when things has calmed down.
        debounceTime(SYNC_DEBOUNCE_MS),

        // Include sync interval here so it is reset when a sync is triggered from a user action etc.
        // EMPTY exits the pipe if we have no network
        switchMap(([, hasNetwork]) => (hasNetwork ? this.startSyncInterval() : EMPTY)),

        withLatestFrom(this.userSettings.appMode$, this.userSettings.language$),

        // Start syncing, use exhaustMap to do one sync at a time, and let it finish / fail before starting the next one.
        exhaustMap(([, appMode, langKey]) => this.startSyncing({ appMode, langKey }))
      )
      .subscribe();
  }

  SearchCount(criteria: SearchCriteriaRequestDto): Observable<SearchCountResponseDto> {
    this.logger.debug('SearchCount triggered', DEBUG_TAG, { criteria });
    return from(this.initOfflineSearch()).pipe(
      switchMap((appMode) => this.sqlite.getRegistrationCount(criteria, appMode)),
      map((count) => ({ TotalMatches: count })),
      tap(() => this.logger.debug('Used offline query for Count', DEBUG_TAG, { criteria })),
      catchError((error) => {
        this.logBeforeOnlineFallback(error, 'SearchCount', criteria);
        return super.SearchCount(criteria);
      })
    );
  }

  SearchAtAGlance(criteria: SearchCriteriaRequestDto): Observable<AtAGlanceViewModel[]> {
    this.logger.debug('SearchAtAGlance triggered', DEBUG_TAG, { criteria });
    return from(this.initOfflineSearch()).pipe(
      switchMap((appMode) => this.selectRegistrationsFromDb(criteria, appMode)),
      map((registrations) => registrations.map((reg) => toAtAGlanceViewModel(reg))),
      tap(() => this.logger.debug('Used offline query for AtAGlance', DEBUG_TAG, { criteria })),
      catchError((error) => {
        this.logBeforeOnlineFallback(error, 'SearchAtAGlance', criteria);
        return super.SearchAtAGlance(criteria);
      })
    );
  }

  SearchSearch(criteria: SearchCriteriaRequestDto): Observable<RegistrationViewModel[]> {
    this.logger.debug('SearchSearch triggered', DEBUG_TAG, { criteria });
    return from(this.initOfflineSearch()).pipe(
      switchMap((appMode) => this.selectRegistrationsFromDb(criteria, appMode)),
      tap(() => this.logger.debug('Used offline query for Search', DEBUG_TAG, { criteria })),
      catchError((error) => {
        this.logBeforeOnlineFallback(error, 'SearchSearch', criteria);
        return super.SearchSearch(criteria);
      })
    );
  }

  private logBeforeOnlineFallback(error: Error, methodName: keyof SearchService, criteria: SearchCriteriaRequestDto) {
    let logLevel: LogLevel;
    if (error && error instanceof TimeoutError) {
      logLevel = LogLevel.Warning;
    } else {
      logLevel = LogLevel.Error;
    }
    this.logger.log(`Handling error with online fallback for ${methodName}`, error, logLevel, DEBUG_TAG, { criteria });
  }

  private async initOfflineSearch(): Promise<AppMode> {
    if (this.sqlite.hasCrashed) {
      throw new Error('Db has crashed');
    }

    await this.waitForImportantSyncToFinishOrTimeout();
    const appMode = await firstValueFrom(this.userSettings.appMode$);
    return appMode;
  }

  private async waitForImportantSyncToFinishOrTimeout(): Promise<void> {
    const isConnected = await firstValueFrom(this.network.connected$);
    // If we are not connected, do not wait for syncing to finish
    if (!isConnected) {
      return;
    }

    await firstValueFrom(
      this.importantSync$.pipe(
        // If this.importantSync$ observable already is completed when we subscribe,
        // it is considered "empty" and would not continue without defaultIfEmpty.
        defaultIfEmpty(null),
        timeout(SYNC_TIMEOUT)
      )
    );
  }

  private startSyncInterval() {
    return timer(0, SYNC_INTERVAL).pipe(
      tap((i) => {
        if (i > 0) {
          this.logger.debug(`Sync triggered from interval of ${SYNC_INTERVAL} ms`, DEBUG_TAG);
        }
      })
    );
  }

  private async readLastSyncTime(appMode: AppMode, langKey: LangKey) {
    let lastSyncMs: number;
    try {
      lastSyncMs = await this.sqlite.readRegistrationsSyncTime(appMode, langKey);
    } catch (error) {
      this.logger.log(`Failed to read last sync ms`, error, LogLevel.Warning, DEBUG_TAG);
    }
    return lastSyncMs || 0;
  }

  /**
   * Hjelpemetode for å hente opp til 500 observasjoner av gangen fra apiet i forbindelse med syncing fra web til
   * offline-database.
   * Dette metoden er ikke relatert til pagingen i listevisningen eller mine observasjoner.
   */
  private async *pagedSearch(criteria: SearchCriteriaRequestDto, count: number) {
    let nFetched = 0;

    const pageCriteria = {
      NumberOfRecords: 500,
      Offset: 0,
      ...criteria,
    };

    const sendRequest = () => {
      this.logger.debug('Fetching paged search', DEBUG_TAG, { pageCriteria });
      return firstValueFrom(super.SearchSearch(pageCriteria));
    };

    let request = sendRequest();
    let syncNotFinished = nFetched < count;
    while (syncNotFinished) {
      const registrations = await request;
      nFetched += registrations.length;
      pageCriteria.Offset = nFetched;

      if (registrations.length === 0) {
        this.logger.debug('Got no registrations, finishing paged search', DEBUG_TAG, { pageCriteria, count, nFetched });
        return;
      }

      syncNotFinished = nFetched < count;
      if (syncNotFinished) {
        request = sendRequest();
      }

      yield registrations;
    }
  }

  private async getSyncSearchCriteria(LangKey: LangKey): Promise<SearchCriteriaRequestDto> {
    const twoWeeksAgo = moment().subtract(14, 'days');
    const twoWeeksAgoMs = twoWeeksAgo.valueOf();
    const lastSyncMs = await firstValueFrom(this.lastSyncTime$);
    const fromTime = lastSyncMs < twoWeeksAgoMs ? twoWeeksAgoMs : lastSyncMs;

    return {
      FromDtChangeTime: moment(fromTime).format(),
      FromDtObsTime: twoWeeksAgo.format(),
      LangKey,
    };
  }

  private async fetchAndInsertRegistrations({ appMode, langKey }: CurrentSyncInfo) {
    const criteria = await this.getSyncSearchCriteria(langKey);
    this.logger.debug(`Sync criteria`, DEBUG_TAG, { criteria });
    const { TotalMatches: count } = await firstValueFrom(super.SearchCount(criteria));

    if (count > 0) {
      for await (const registrations of this.pagedSearch(criteria, count)) {
        this.logger.debug(`Sync: Inserting ${registrations.length} registrations`, DEBUG_TAG);
        await this.sqlite.insertRegistrations(registrations, appMode, langKey);
      }
    } else {
      this.logger.debug(`Sync: No new registrations to fetch`, DEBUG_TAG, { count, criteria });
    }
  }

  private async removeDeletedRegistrations({ appMode, langKey }: CurrentSyncInfo) {
    const twoWeeksAgo = moment().subtract(14, 'days').format();
    const criteria: SearchCriteriaRequestDto = {
      FromDtChangeTime: twoWeeksAgo,
      FromDtObsTime: twoWeeksAgo,
      LangKey: langKey,
    };
    const [{ TotalMatches: apiCount }, appCount] = await Promise.all([
      firstValueFrom(super.SearchCount(criteria)),
      this.sqlite.getRegistrationCount(criteria, appMode),
    ]);

    if (appCount > apiCount) {
      const registrationsWithoutDeleted = await firstValueFrom(super.SearchGetRegIdsFromDeletedRegistrations(criteria));
      this.logger.debug(`Sync: Deleting registrations: ${registrationsWithoutDeleted}`, DEBUG_TAG);
      await this.sqlite.deleteRegistrations(registrationsWithoutDeleted, appMode);
    } else {
      this.logger.debug('Sync: No need to delete registrations', DEBUG_TAG, { appCount, apiCount, appMode, langKey });
    }
  }

  private async startSyncing(syncInfo: CurrentSyncInfo) {
    this.logger.debug(`Sync starting`, DEBUG_TAG, { syncInfo });
    try {
      await this.sync(syncInfo);
      this.syncFinishedSuccessfully.next();
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Sync failed', { syncInfo });
    }
  }

  private async updateSyncTime({ appMode, langKey }: CurrentSyncInfo, newSyncTimeMs: number) {
    await this.sqlite.updateRegistrationsSyncTime(newSyncTimeMs, appMode, langKey);
  }

  private async sync(syncInfo: CurrentSyncInfo) {
    const syncRequests = [...this.syncRequests.value];
    this.syncRequests.next([]);

    try {
      // Save new sync time before requesting new registrations,
      // so we can fetch registrations added while we request registrations later
      const newSyncTimeMs = moment().valueOf();
      this.logger.debug('New sync time', DEBUG_TAG, { newSyncTimeMs });
      await this.fetchAndInsertRegistrations(syncInfo);
      await this.updateSyncTime(syncInfo, newSyncTimeMs);
      await this.removeDeletedRegistrations(syncInfo);

      for (const syncReq of syncRequests) {
        syncReq.next();
        syncReq.complete();
      }
    } catch (error) {
      for (const syncReq of syncRequests) {
        syncReq.error(error);
      }
      throw error; // Picked up and logged by startSync
    }
  }

  private async checkIfOutOfSync(appMode: AppMode) {
    const langKey = await firstValueFrom(this.userSettings.language$);
    // Read last sync time directly from db, to avoid getting a cached value from lastSyncTime$
    // lastSyncTime$ can give us a wrong cached value if we change language or appMode without network coverage,
    // then a new db query will be executed imediately without waiting for a new sync to complete.
    const syncTime = await this.readLastSyncTime(appMode, langKey);
    if (isOutOfSync(syncTime)) {
      // Let user know that offline db is out of sync
      // By throwing an error here, we force an online request in catchError,
      // or if online request also fails, the user gets a "Could not fetch observations" message
      throw new Error('Out of sync');
    }
  }

  private async selectRegistrationsFromDb(criteria: SearchCriteriaRequestDto, appMode: AppMode) {
    await this.checkIfOutOfSync(appMode);
    const registrations = await this.sqlite.selectRegistrations(criteria, appMode);
    this.logger.debug('DB result', DEBUG_TAG, { n: registrations.length });
    return registrations;
  }

  private triggerSync() {
    const syncRequest = new Subject<void>();
    const syncRequests = this.syncRequests.value;
    this.syncRequests.next([...syncRequests, syncRequest]);
    return syncRequest;
  }
}

function registrationToFormNames(reg: RegistrationViewModel) {
  const registrationNames = (reg.Summaries || []).map((s) => s.RegistrationName);
  const uniqueRegistrationNames = new Set(registrationNames);
  return [...uniqueRegistrationNames];
}

function toAtAGlanceViewModel(reg: RegistrationViewModel): AtAGlanceViewModel {
  return {
    CompetenceLevelTID: reg.Observer?.CompetenceLevelTID,
    DtObsTime: reg.DtObsTime,
    AttachmentsCount: reg.Attachments?.length || 0,
    FirstAttachmentId: reg.Attachments?.length ? reg.Attachments[0].AttachmentId : null,
    FirstAttachmentUrl: reg.Attachments?.length ? reg.Attachments[0].UrlFormats.Thumbnail : null,
    FormNames: registrationToFormNames(reg),
    GeoHazardTID: reg.GeoHazardTID,
    Latitude: reg.ObsLocation?.Latitude,
    Longitude: reg.ObsLocation?.Longitude,
    NickName: reg.Observer?.NickName,
    RegId: reg.RegId,
    Title: reg.ObsLocation?.Title,
  };
}

function isOutOfSync(syncTime: number) {
  const now = moment().valueOf();
  return now - syncTime > OUT_OF_SYNC_MS;
}
