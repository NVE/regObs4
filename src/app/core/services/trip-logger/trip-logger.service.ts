import { Injectable } from '@angular/core';
import { nSQL, NanoSQLInstance } from 'nano-sql';
import { TripLogItem } from './trip-log-item.model';

const tableName = 'triplog';
const tableNameItems = 'triplogitem';

@Injectable({
  providedIn: 'root'
})
export class TripLoggerService {
  constructor() {
  }

  init() {
    nSQL(tableName)
      .model([
        { key: 'id', type: 'int', props: ['pk', 'ai'] },
        { key: 'latitude', type: 'number' },
        { key: 'longitude', type: 'number' },
        { key: 'timestamp', type: 'date' },
        { key: 'altitude', type: 'number' },
        { key: 'speed', type: 'number' },
        { key: 'accuracy', type: 'number' },
        { key: 'heading', type: 'number' },
      ]);
  }

  saveTripLogItem(item: TripLogItem) {
    return nSQL(tableName)
      .query('upsert', item)
      .exec();
  }

  // async endTrip() {
  //   await nSQL(tableName)
  //     .query('upsert', { stop: new Date() })
  //     .where(['tripLogId', '=', this.currentTripLoggerId])
  //     .exec();
  //   this.currentTripLoggerId = null;
  // }
}
