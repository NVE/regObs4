import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureCollection } from '@turf/turf';
import { firstValueFrom } from 'rxjs';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';

const msOneWeek = 604800000;
const dataKey = 'REGOBS_OBSTRIPS_GEOJSON';
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
  constructor(
    private tripService: TripService,
    private logger: LoggingService,
    private dbService: DatabaseService
  ) {}

  async read() {
    this.logger.debug('Reading data from storage', DEBUG_TAG, dataKey);
    return this.dbService.get<FeatureCollection>(dataKey);
  }

  async readLastModified() {
    this.logger.debug('Reading mtime from storage', DEBUG_TAG, dataModifiedKey);
    return this.dbService.get<number>(dataModifiedKey);
  }

  private async save(data: FeatureCollection) {
    this.logger.debug('Saving data', DEBUG_TAG);
    await this.dbService.set(dataKey, data);
    await this.dbService.set(dataModifiedKey, Date.now());
  }

  async getData(): Promise<FeatureCollection | null> {
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