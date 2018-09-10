import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { TripLogItem } from './trip-log-item.model';
import { Observer } from 'nano-sql/lib/observable';

const tableName = 'triplog';

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

  getTripLogAsObservable(): Observer<TripLogItem[]> {
    return nSQL().observable<TripLogItem[]>(() => {
      return nSQL(tableName).query('select').emit();
    });
  }

  // getTripLogSummaryAsObservable(): Observer<TripLogSummary> {
  //   return nSQL().observable<TripLogItem[]>(() => {
  //     return nSQL(tableName).query('select').emit();
  //   }).map((tripLog) => ({
  //       started: moment(tripLog[0].timestamp)
  //    }));
  // }

  // async endTrip() {
  //   await nSQL(tableName)
  //     .query('upsert', { stop: new Date() })
  //     .where(['tripLogId', '=', this.currentTripLoggerId])
  //     .exec();
  //   this.currentTripLoggerId = null;
  // }
}
