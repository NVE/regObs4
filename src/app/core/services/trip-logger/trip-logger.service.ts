import { Injectable } from '@angular/core';
import { nSQL, NanoSQLInstance } from 'nano-sql';
import { settings } from '../../../../settings';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';
import { Platform } from '@ionic/angular';
import { TripLogItem } from './trip-log-item.model';

const tableName = 'triplog';
const tableNameItems = 'triplogitem';

@Injectable({
  providedIn: 'root'
})
export class TripLoggerService {
  private currentTripLoggerId?: number;

  constructor() {
  }

  init() {
    nSQL(tableName)
      .model([
        { key: 'tripLogId', type: 'int', props: ['pk', 'ai'] },
        { key: 'start', type: 'date', props: ['idx'] },
        { key: 'end', type: 'date', props: ['idx'] },
      ]);
    nSQL(tableNameItems)
      .model([
        { key: 'id', type: 'int', props: ['pk', 'ai'] },
        { key: 'tripLogId', type: 'int', props: ['idx'] },
        { key: 'latitude', type: 'number' },
        { key: 'longitude', type: 'number' },
        { key: 'timestamp', type: 'date' },
      ]);
  }

  async createNewTrip(): Promise<number> {
    const result = await nSQL(tableName)
      .query('upsert', { start: new Date() })
      .exec();
    if (!(result.length > 0)) {
      throw new Error('Cound not create new trip log!');
    }
    const newPk: number = result[0].affectedRowPKS[0];
    this.currentTripLoggerId = newPk;
    return newPk;
  }

  saveTripLogItem(tripLogItem: TripLogItem) {
    if (!this.currentTripLoggerId) {
      throw Error('Trip logging not started! Please start new trip');
    }
    tripLogItem.tripLogId = this.currentTripLoggerId;
    return nSQL(tableNameItems)
      .query('upsert', tripLogItem)
      .exec();
  }

  async endTrip() {
    await nSQL(tableName)
      .query('upsert', { stop: new Date() })
      .where(['tripLogId', '=', this.currentTripLoggerId])
      .exec();
    this.currentTripLoggerId = null;
  }
}
