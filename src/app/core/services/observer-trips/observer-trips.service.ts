import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from '@turf/turf';
import { defer, distinctUntilChanged, distinctUntilKeyChanged, firstValueFrom, from, map, mapTo, Observable, of, ReplaySubject, shareReplay, skipWhile, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';

const msOneWeek = 604800000;
export const dataKey = 'REGOBS_OBSTRIPS_GEOJSON';
export const toggledOnKey = 'REGOBS_OBSTRIPS_ON';
export const dataModifiedKey = 'REGOBS_OBSTRIPS_CHANGED_DATE';
export const isAuthorizedKey = 'REGOBS_OBSTRIPS_AUTHORIZED';

const shouldUpdate = (mTime: number) => {
  const msSinceUpdate = Date.now() - mTime;
  return msSinceUpdate > msOneWeek;
};

const DEBUG_TAG = 'ObserverTrips';

enum AuthorizedState {
  Authorized,
  NotAuthorized,
  Unknown
}

/**
 * Provides geojson data for observer trips, and a toggle mechanism that can be used to show/hide data.
 * If data is toggled off, geojson will be null.
 * If user does not have access (401 is returned from API), geojson will be null.
 * If user logs out, cached geojson data will be deleted and geojson will be null.
 */
@Injectable({
  providedIn: 'root'
})
export class ObserverTripsService {

  geojson$: Observable<FeatureCollection | null>;

  toggledOn = new ReplaySubject<boolean>(1);
  private authorizedState = new Subject<AuthorizedState>();
  isAuthorized: Observable<boolean> = this.authorizedState.pipe(
    map(state => state === AuthorizedState.Authorized),
    distinctUntilChanged(),
    tap((isAuthorized) => this.logger.debug('Authorized', DEBUG_TAG, isAuthorized))
  )

  constructor(
    private tripService: TripService,
    private logger: LoggingService,
    private dbService: DatabaseService,
    authService: RegobsAuthService
  ) {
    let hasInitializedStateFromDb = false;

    const getGeojsonWhenToggledOnAndAuthorized$ = this.toggledOn.pipe(
      withLatestFrom(this.authorizedState),
      switchMap(([toggledOn, authorized]) => {
        this.logger.debug('Toggle / auth state', DEBUG_TAG, { toggledOn, authorized });
        if (authorized === AuthorizedState.NotAuthorized) {
          return of(null);
        } else if (authorized === AuthorizedState.Unknown) {
          return defer(() => from(this.fetchData()));
        } else if (!toggledOn) {
          return of(null);
        } else {
          return defer(() => from(this.getData()));
        }
      }),
    );

    this.geojson$ = authService.loggedInUser$.pipe(
      distinctUntilKeyChanged('isLoggedIn'),
      // Allow multiple subscribers
      shareReplay(1),
      // Do not do anything until we have a logged in user
      skipWhile(user => !user.isLoggedIn),
      // First time user has logged in, initialize state from DB
      tap(() => {
        if (!hasInitializedStateFromDb) {
          this.readStateFromDb();
          hasInitializedStateFromDb = true;
        }
      }),
      switchMap(user => user.isLoggedIn ?
        // User is logged in, read data from database or fetch new data
        getGeojsonWhenToggledOnAndAuthorized$ :
        // If user logs out, clear data and return null
        defer(() => from(this.clear())).pipe(mapTo(null))
      )
    );
  }

  async toggle() {
    const toggled = !await firstValueFrom(this.toggledOn);
    await this.dbService.set(toggledOnKey, toggled);
    this.toggledOn.next(toggled);
  }

  private async readStateFromDb(): Promise<void> {
    // State to read from DB
    let authorizedState = AuthorizedState.Unknown;
    const toggledOnState = (await this.readFromDb<boolean>(toggledOnKey)) === true;
    const isAuthorizedDb = await this.readFromDb<boolean>(isAuthorizedKey);
    if (isAuthorizedDb === false) {
      authorizedState = AuthorizedState.NotAuthorized;
    } else if (isAuthorizedDb === true) {
      authorizedState = AuthorizedState.Authorized;
    }

    this.logger.debug('Read state from db', DEBUG_TAG, { authorizedState, toggledOnState });
    this.authorizedState.next(authorizedState);
    this.toggledOn.next(toggledOnState);
  }

  private async readFromDb<T>(key: string): Promise<T | null> {
    let value: T | null;
    try {
      value = await this.dbService.get<T>(key);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, `Failed to read ${key} from DB`);
      value = null;
    }
    return value;
  }

  private async clear() {
    this.logger.debug('Removing data', DEBUG_TAG);
    await this.dbService.remove(dataKey);
    await this.dbService.remove(dataModifiedKey);
    await this.dbService.remove(isAuthorizedKey);
    this.authorizedState.next(AuthorizedState.Unknown);
  }

  private readGeojsonFromDb(): Promise<FeatureCollection | null> {
    this.logger.debug('Reading geojson from db', DEBUG_TAG);
    return this.dbService.get<FeatureCollection>(dataKey);
  }

  private async getData(): Promise<FeatureCollection | null> {
    const lastModified = await this.readFromDb<number>(dataModifiedKey) || 0;

    // Either try to update data if data is not fresh enough, or try to read data from database if fresh enough.
    // Try the opposite as a fallback if first priority fails.
    if (shouldUpdate(lastModified)) {
      this.logger.debug('Has outdated geojson, will try to update', DEBUG_TAG);
      let geojson: FeatureCollection | null;
      try {
        geojson = await this.fetchData();
      } catch (error) {
        geojson = null;
      }
      if (geojson == null) {
        geojson = await this.readGeojsonFromDb();
      }
      return geojson;
    } else {
      try {
        return await this.readGeojsonFromDb();
      } catch (error) {
        return this.fetchData();
      }
    }
  }

  private async fetchData(): Promise<FeatureCollection | null> {
    this.logger.debug('Fetching', DEBUG_TAG);

    let data: FeatureCollection;
    try {
      data = await firstValueFrom(this.tripService.TripGet());
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.logger.debug('User does not have access to observertrips', DEBUG_TAG);
          this.authorizedState.next(AuthorizedState.NotAuthorized);
          await this.dbService.set(isAuthorizedKey, false);  // Persist so we know on next startup
          return null;
        }
      }

      this.logger.error(error, DEBUG_TAG, 'Could not fetch observertrips');
      return null;
    }

    if (data == null || data.features == null) {
      this.logger.error(new Error('Got invalid obstur data'), DEBUG_TAG);
      return null;
    }

    this.logger.debug('Got observer trips response', DEBUG_TAG);
    await this.dbService.set(dataKey, data);
    await this.dbService.set(dataModifiedKey, Date.now());
    await this.dbService.set(isAuthorizedKey, true);
    this.authorizedState.next(AuthorizedState.Authorized);
    return data;
  }
}