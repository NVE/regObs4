import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { TripLogItem } from './trip-log-item.model';
import { Observer } from 'nano-sql/lib/observable';
import * as moment from 'moment';
import { TripLogState } from './trip-log-state.enum';
import { TripLogActivity } from './trip-log-activity.model';
import { timer } from 'rxjs';

const tableName = 'triplog';
const tripLogActivityTableName = 'triplogactivity';

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
        { key: 'timestamp', type: 'number' },
        { key: 'altitude', type: 'number' },
        { key: 'speed', type: 'number' },
        { key: 'accuracy', type: 'number' },
        { key: 'heading', type: 'number' },
      ])
      .table(tripLogActivityTableName)
      .model([
        { key: 'id', type: 'int', props: ['pk', 'ai'] },
        { key: 'state', type: 'string' },
        { key: 'timestamp', type: 'number' },
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

  updateState(state: TripLogState) {
    return nSQL(tripLogActivityTableName)
      .query('upsert', { state, timestamp: moment().unix() })
      .exec();
  }

  getTripLogStateAsObservable(): Observer<TripLogActivity> {
    return nSQL().observable<TripLogActivity>(() => {
      return nSQL(tripLogActivityTableName).query('select').orderBy({ id: 'desc' }).limit(1).emit();
    }).map((x) => x[0]);
  }

  getTripLogActivityAsObservable(): Observer<TripLogActivity[]> {
    return nSQL().observable<TripLogActivity[]>(() => {
      return nSQL(tripLogActivityTableName).query('select').emit();
    });
  }

  async drop() {
    await nSQL(tableName).query('drop').exec();
    await nSQL(tripLogActivityTableName).query('drop').exec();
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
