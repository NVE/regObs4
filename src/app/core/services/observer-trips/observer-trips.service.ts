import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from '@turf/turf';
import { BehaviorSubject, combineLatest, distinctUntilChanged, firstValueFrom, from, map, mapTo, Observable, ReplaySubject, skipWhile, switchMap } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';

const msOneWeek = 604800000;
const dataKey = 'REGOBS_OBSTRIPS_GEOJSON';
const toggleKey = 'REGOBS_OBSTRIPS_ON';
const dataModifiedKey = 'REGOBS_OBSTRIPS_CHANGED_DATE';

const shouldUpdate = (mTime: number) => {
  const msSinceUpdate = Date.now() - mTime;
  return msSinceUpdate > msOneWeek;
};

const DEBUG_TAG = 'ObserverTrips';

@Injectable({
  providedIn: 'root'
})
export class ObserverTripsService {

  geojson: Observable<FeatureCollection | null>;
  canShow = new ReplaySubject(1);
  toggleOn = new BehaviorSubject(false);

  constructor(
    private tripService: TripService,
    private logger: LoggingService,
    private dbService: DatabaseService,
    authService: RegobsAuthService
  ) {
    this.geojson = combineLatest([
      authService.loggedInUser$,
      this.toggleOn.pipe(distinctUntilChanged())
    ]).pipe(
      skipWhile(([o,]) => !o.isLoggedIn),
      switchMap(([o,]) => o.isLoggedIn ? from(this.getData()) : from(this.clear()).pipe(mapTo(null))),
      map((geojson) => this.toggleOn.value ? geojson : null)
    );
    this.checkOn();
  }

  async toggle() {
    const toggled = !this.toggleOn.value;
    await this.dbService.set(toggleKey, toggled);
    this.toggleOn.next(toggled);
  }

  private async checkOn() {
    this.logger.debug('Checking on/off', DEBUG_TAG);
    const toggledOn = !!await this.dbService.get<boolean>(toggleKey);
    this.toggleOn.next(toggledOn);
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