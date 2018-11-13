import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { TripLogItem } from './trip-log-item.model';
import { Observer } from 'nano-sql/lib/observable';
import * as moment from 'moment';
import { TripLogState } from './trip-log-state.enum';
import { TripLogActivity } from './trip-log-activity.model';
import { NanoSql } from '../../../../nanosql';

@Injectable({
  providedIn: 'root'
})
export class TripLoggerService {
  constructor() {
  }

  saveTripLogItem(item: TripLogItem) {
    return nSQL(NanoSql.TABLES.TRIP_LOG.name)
      .query('upsert', item)
      .exec();
  }

  getTripLogAsObservable(): Observer<TripLogItem[]> {
    return nSQL().observable<TripLogItem[]>(() => {
      return nSQL(NanoSql.TABLES.TRIP_LOG.name).query('select').emit();
    });
  }

  updateState(state: TripLogState) {
    return nSQL(NanoSql.TABLES.TRIP_LOG_ACTIVITY.name)
      .query('upsert', { state, timestamp: moment().unix() })
      .exec();
  }

  getTripLogStateAsObservable(): Observer<TripLogActivity> {
    return nSQL().observable<TripLogActivity>(() => {
      return nSQL(NanoSql.TABLES.TRIP_LOG_ACTIVITY.name).query('select').orderBy({ id: 'desc' }).limit(1).emit();
    }).map((x) => x[0]);
  }

  getTripLogActivityAsObservable(): Observer<TripLogActivity[]> {
    return nSQL().observable<TripLogActivity[]>(() => {
      return nSQL(NanoSql.TABLES.TRIP_LOG_ACTIVITY.name).query('select').emit();
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
