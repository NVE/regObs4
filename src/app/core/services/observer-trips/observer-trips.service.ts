import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from '@turf/turf';
import { BehaviorSubject, combineLatest, distinctUntilChanged, distinctUntilKeyChanged, firstValueFrom, from, mapTo, Observable, of, ReplaySubject, skipWhile, switchMap, withLatestFrom } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';

const msOneWeek = 604800000;
const dataKey = 'REGOBS_OBSTRIPS_GEOJSON';
const toggleKey = 'REGOBS_OBSTRIPS_ON';
const dataModifiedKey = 'REGOBS_OBSTRIPS_CHANGED_DATE';
const isUnauthorizedKey = 'REGOBS_OBSTRIPS_UNAUTHORIZED';

const shouldUpdate = (mTime: number) => {
  const msSinceUpdate = Date.now() - mTime;
  return msSinceUpdate > msOneWeek;
};

const DEBUG_TAG = 'ObserverTrips';

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

  geojson: Observable<FeatureCollection | null>;
  canShow = new BehaviorSubject(false);
  toggleOn = new BehaviorSubject(false);

  // To avoid requesting the dataset each time an unauthorized user starts the app
  // we cache that the user is unauthorized.
  private isUnauthorized = new ReplaySubject(1);

  constructor(
    private tripService: TripService,
    private logger: LoggingService,
    private dbService: DatabaseService,
    authService: RegobsAuthService
  ) {
    this.geojson = combineLatest([
      authService.loggedInUser$.pipe(distinctUntilKeyChanged('isLoggedIn')),
      this.toggleOn.pipe(distinctUntilChanged()),
    ]).pipe(
      // Do not emit anything until we get a logged in user object,
      // no need to try fetching data before user has logged in.
      skipWhile(([user]) => !user.isLoggedIn),
      withLatestFrom(this.isUnauthorized),
      switchMap(([[user, isToggledOn], isUnauthorized]) => {
        if (isUnauthorized === true) {
          if (!user.isLoggedIn) {
            // User has been logged out and may now log in with a valid user, so remove unauthorized cache
            return from(this.removeUnauthorized());
          }
          return of(null);
        }

        if (isToggledOn === false && this.canShow.value === true) {
          return of(null);
        }

        // If user is logged in, try to read data from cache, or fetch data.
        if (user.isLoggedIn) {
          return from(this.getData());
        }

        // If user has logged out, clear data.
        return from(this.clear()).pipe(mapTo(null));
      }),
    );

    this.doInitChecks();
  }

  async toggle() {
    const toggled = !this.toggleOn.value;
    await this.dbService.set(toggleKey, toggled);
    this.toggleOn.next(toggled);
  }

  private async setUnauthorized() {
    this.logger.debug('Set unauthorized', DEBUG_TAG);
    await this.dbService.set(isUnauthorizedKey, true);
    this.isUnauthorized.next(true);
  }

  private async removeUnauthorized() {
    this.logger.debug('Remove unauthorized', DEBUG_TAG);
    await this.dbService.remove(isUnauthorizedKey);
    this.isUnauthorized.next(null);
  }

  private async checkToggle() {
    this.logger.debug('Checking on/off', DEBUG_TAG);
    const toggledOn = !!await this.dbService.get<boolean>(toggleKey);
    this.logger.debug('Toggled on?', DEBUG_TAG, toggledOn);
    this.toggleOn.next(toggledOn);
  }

  private async doInitChecks() {
    this.logger.debug('Checking unauthorized', DEBUG_TAG);
    const isUnauthorized = await this.dbService.get<boolean>(isUnauthorizedKey);
    if (isUnauthorized == null) {
      this.checkToggle();
    }
    this.logger.debug('isUnauthorized', DEBUG_TAG, isUnauthorized);
    this.isUnauthorized.next(isUnauthorized || null);
  }

  private async clear() {
    this.canShow.next(false);
    this.logger.debug('Removing data', DEBUG_TAG);
    await this.dbService.remove(dataKey);
    await this.dbService.remove(dataModifiedKey);
  }

  private async read() {
    this.logger.debug('Reading data from storage', DEBUG_TAG, dataKey);
    return this.dbService.get<FeatureCollection>(dataKey);
  }

  private async readLastModified() {
    this.logger.debug('Reading mtime from storage', DEBUG_TAG, dataModifiedKey);
    return this.dbService.get<number>(dataModifiedKey);
  }

  private async save(data: FeatureCollection) {
    this.logger.debug('Saving data', DEBUG_TAG);
    await this.dbService.set(dataKey, data);
    await this.dbService.set(dataModifiedKey, Date.now());
  }

  private async getData(): Promise<FeatureCollection | null> {
    let geojson = await this.read();
    const modifiedTime = await this.readLastModified();
    const couldReadGeojson = geojson != null;
    this.logger.debug('Read result', DEBUG_TAG, { couldReadGeojson, modifiedTime });

    let tryUpdate = true;
    if (couldReadGeojson && modifiedTime) {
      tryUpdate = shouldUpdate(modifiedTime);
    }

    this.logger.debug('Should update?', DEBUG_TAG, tryUpdate);
    if (tryUpdate) {
      const data = await this.fetchData();
      if (data != null) {
        geojson = data;
        await this.save(data);
      }
    }

    this.canShow.next(geojson != null);
    return geojson;
  }

  private async fetchData() {
    this.logger.debug('Fetching', DEBUG_TAG);

    let data: any;
    try {
      data = await firstValueFrom(this.tripService.TripGet());
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.logger.debug('User does not have access to observertrips', DEBUG_TAG);
          await this.setUnauthorized();
          return null;
        }
      }
      this.logger.error(error, DEBUG_TAG, 'Could not fetch observertrips');
      return null;
    }

    this.logger.debug('Got observer trips response', DEBUG_TAG);
    return data;
  }
}