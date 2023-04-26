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
const OUT_OF_SYNC_MS = 1000 * 60 * 15; // 15 minutes
// Sync timeouts includes the debounce time
const SYNC_TIMEOUT_MS_HAS_FRESH_DATA = 3000;
const SYNC_TIMEOUT_MS_NO_FRESH_DATA = 300000; // 5 minutes

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
  private syncRequests = new BehaviorSubject<SyncRequest[]>([]);
  private lastSyncTime$: Observable<number>;
  private syncFinishedSuccessfully = new Subject<void>();

  constructor(
    config: RegobsApiConfiguration,
    http: HttpClient,
    private logger: LoggingService,
    private sqlite: SqliteService,
    network: NetworkStatusService,
    private userSettings: UserSettingService,
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService,
    private updateObsService: UpdateObservationsService
  ) {
    super(config, http);

    this.lastSyncTime$ = combineLatest([
      this.userSettings.appMode$,
      this.userSettings.language$,
      this.syncFinishedSuccessfully.pipe(startWith(true)),
    ]).pipe(
      switchMap(([appMode, langKey]) => this.readLastSyncTime(appMode, langKey)),
      shareReplay(1)
    );

    // Update the last fetched time shown in filter menu whenever last fetched in offline db changes
    this.lastSyncTime$
      .pipe(
        map((lastFetchedMs) => {
          if (lastFetchedMs == 0) return null;
          else return new Date(lastFetchedMs);
        })
      )
      .subscribe((d) => this.updateObsService.setOfflineObservationsLastFetched(d));

    // Whenever appMode or language changes trigger a new sync
    combineLatest([this.userSettings.appMode$, this.userSettings.language$]).subscribe(() => {
      this.triggerSync();
    });

    // Save submitted or changed registrations to database
    combineLatest([this.userSettings.appMode$, addUpdateDeleteRegistrationService.changedRegistrations$]).subscribe(
      ([appMode, { reg, langKey }]) => {
        this.sqlite.insertRegistrations([reg], appMode, langKey);
      }
    );

    combineLatest([this.userSettings.appMode$, addUpdateDeleteRegistrationService.deletedRegistrationIds$]).subscribe(
      ([appMode, regId]) => {
        this.sqlite.deleteRegistrations([regId], appMode);
      }
    );

    // Sync of updated observations are triggered from this observable
    combineLatest([
      this.syncRequests.pipe(
        filter((syncRequests) => syncRequests.length > 0),
        tap(() => this.logger.debug('Sync requests changed', DEBUG_TAG, { n: this.syncRequests.value.length }))
      ),
      network.connected$,
    ])
      .pipe(
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
    return this.getDbChangesTriggeredBySync$().pipe(
      switchMap((appMode) => this.sqlite.getRegistrationCount(criteria, appMode)),
      map((count) => ({ TotalMatches: count }))
    );
  }

  SearchAtAGlance(criteria: SearchCriteriaRequestDto): Observable<AtAGlanceViewModel[]> {
    this.logger.debug('SearchAtAGlance triggered', DEBUG_TAG, { criteria });
    return this.getDbChangesTriggeredBySync$().pipe(
      switchMap((appMode) => this.selectRegistrationsFromDb(criteria, appMode)),
      map((registrations) => registrations.map((reg) => toAtAGlanceViewModel(reg)))
    );
  }

  SearchSearch(criteria: SearchCriteriaRequestDto): Observable<RegistrationViewModel[]> {
    this.logger.debug('SearchSearch triggered', DEBUG_TAG, { criteria });
    return this.getDbChangesTriggeredBySync$().pipe(
      switchMap((appMode) => this.selectRegistrationsFromDb(criteria, appMode))
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
      // TODO: Show error toast ?
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

  private async selectRegistrationsFromDb(criteria: SearchCriteriaRequestDto, appMode: AppMode) {
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

  /**
   * Emiter enten når en sync er ferdig, eller når appen har ventet x sekunder på at en sync skal bli ferdig.
   **/
  private syncRequestWithTimeout$() {
    return this.lastSyncTime$.pipe(
      take(1),
      map((lastSyncTimeMs) => {
        const hasFreshSync = hasFreshSyncTime(lastSyncTimeMs);
        // Bruk ulik timeout avhengig av hvor lenge det er siden forrige sync.
        // Hvis det er lang tid siden forrige sync bør vi også la appen få god tid til å hente nytt.
        // Hvis det er kort tid siden er det ikke så farlig å hente det aller nyeste, da venter vi bare kort tid.
        const syncTimeoutMs = hasFreshSync ? SYNC_TIMEOUT_MS_HAS_FRESH_DATA : SYNC_TIMEOUT_MS_NO_FRESH_DATA;
        return { lastSyncTimeMs, hasFreshSync, syncTimeoutMs };
      }),
      switchMap((args) =>
        this.triggerSync().pipe(
          map(() => 'success' as const),
          timeout(args.syncTimeoutMs),
          catchError((err) => this.handleSyncError(err, args))
        )
      )
    );
  }

  private getDbChangesTriggeredBySync$() {
    // Dette fungerer sånn at hvis man er midt i en sync vil observablen fortsette å emite hver gang vi har
    // endringer i databasen, helt til syncen har feilet pga timeout eller syncen er ferdig.
    return this.userSettings.appMode$.pipe(
      switchMap((selectedAppMode) =>
        this.sqlite.hasChanges$.pipe(
          filter((appModeWithChanges) => appModeWithChanges === selectedAppMode),
          startWith(selectedAppMode)
        )
      ),

      // If the sync successfully finished, wait 100 ms before emiting,
      // we want this.sqlite.hasChanges$ to emit one last time.
      // takeUntil(syncRequestWithTimeout).pipe(switchMap(res => res === 'success' ? timer(100) : of()))
      takeUntil(this.syncRequestWithTimeout$())
    );
  }

  private handleSyncError(
    err: Error,
    { hasFreshSync, syncTimeoutMs }: { hasFreshSync: boolean; syncTimeoutMs: number }
  ) {
    if (err instanceof TimeoutError && hasFreshSync) {
      // No worries, we have fresh data, just log and continue
      this.logger.debug(`Waited for sync to finish in ${syncTimeoutMs} ms`, DEBUG_TAG);
    } else if (err instanceof TimeoutError && !hasFreshSync) {
      // We do not have fresh data and sync did not complete within reasonable time
      this.logger.log(
        `Waited for sync to finish in ${syncTimeoutMs} ms, app does not have fresh data`,
        err,
        LogLevel.Warning,
        DEBUG_TAG
      );
    } else {
      this.logger.error(err, DEBUG_TAG, 'Unknown error happened while waiting for sync to finish');
    }

    return of('err' as const);
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

function hasFreshSyncTime(lastSyncTimeMs: number) {
  return !isOutOfSync(lastSyncTimeMs);
}

function isOutOfSync(syncTime: number) {
  const now = moment().valueOf();
  return now - syncTime > OUT_OF_SYNC_MS;
}
