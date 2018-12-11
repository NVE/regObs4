import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { TripLogItem } from './trip-log-item.model';
import { Observer } from 'nano-sql/lib/observable';
import * as moment from 'moment';
import { TripLogState } from './trip-log-state.enum';
import { TripLogActivity } from './trip-log-activity.model';
import { NanoSql } from '../../../../nanosql';
import { Observable, from } from 'rxjs';
import { TripService } from '../../../modules/regobs-api/services';
import { CreateTripDto } from '../../../modules/regobs-api/models';
import { settings } from '../../../../settings';
import { switchMap, take, map } from 'rxjs/operators';
import { UserSettingService } from '../user-setting/user-setting.service';
import { ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LegacyTrip } from './legacy-trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripLoggerService {

  get isTripRunning$() {
    return this.getLegacyTripAsObservable().pipe(map((val) => !!val));
  }

  constructor(
    private tripService: TripService,
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private toastController: ToastController) {
  }

  saveTripLogItem(item: TripLogItem) {
    return nSQL(NanoSql.TABLES.TRIP_LOG.name)
      .query('upsert', item)
      .exec();
  }

  getTripLogAsObservable(): Observable<TripLogItem[]> {
    return nSQL().observable<TripLogItem[]>(() => {
      return nSQL(NanoSql.TABLES.TRIP_LOG.name).query('select').emit();
    }).toRxJS();
  }

  updateState(state: TripLogState) {
    return nSQL(NanoSql.TABLES.TRIP_LOG_ACTIVITY.name)
      .query('upsert', { state, timestamp: moment().unix() })
      .exec();
  }

  getTripLogStateAsObservable(): Observable<TripLogActivity> {
    return nSQL().observable<TripLogActivity>(() => {
      return nSQL(NanoSql.TABLES.TRIP_LOG_ACTIVITY.name).query('select').orderBy({ id: 'desc' }).limit(1).emit();
    }).map((x) => x[0]).toRxJS();
  }

  getTripLogActivityAsObservable(): Observable<TripLogActivity[]> {
    return nSQL().observable<TripLogActivity[]>(() => {
      return nSQL(NanoSql.TABLES.TRIP_LOG_ACTIVITY.name).query('select').emit();
    }).toRxJS();
  }

  getLegacyTripAsObservable(): Observable<LegacyTrip> {
    return nSQL().observable<LegacyTrip>(() => {
      return nSQL(NanoSql.TABLES.LEGACY_TRIP_LOG.name).query('select').emit();
    }).map((x) => x[0]).toRxJS();
  }

  startLegacyTrip(tripDto: CreateTripDto) {
    const legacyTrip: LegacyTrip = { id: 'legacytrip', timestamp: moment().unix(), request: tripDto };
    return from(this.setTripServiceRootUrl())
      .pipe(
        switchMap(() => this.tripService.TripPost(tripDto)),
        switchMap(() => from(nSQL(NanoSql.TABLES.LEGACY_TRIP_LOG.name)
          .query('upsert', legacyTrip).exec())
        ),
        switchMap(() => this.infoMessage(true))
      );
  }

  private async setTripServiceRootUrl() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.tripService.rootUrl = settings.services.regObs.apiUrl[userSetting.appMode];
  }

  stopLegacyTrip(showConfirm = true) {
    if (showConfirm) {
      return this.confirmStopTrip();
    } else {
      return this.callStopLegacyTripApiAndDeleteFromDb();
    }
  }

  async showTripErrorMessage(start: boolean) {
    const translations = await this.translateService.get(
      ['ALERT.DEFAULT_HEADER', 'ALERT.OK', 'TRIP.ERROR', 'END_ERROR']).toPromise();
    const alert = await this.alertController.create({
      header: translations['ALERT.DEFAULT_HEADER'],
      message: start ? translations['TRIP.ERROR'] : translations['TRIP.END_ERROR'],
      buttons: [translations['ALERT.OK']]
    });
    return alert.present();
  }

  private async confirmStopTrip() {
    const translations = await this.translateService
      .get(['TRIP.STOP_TRIP', 'REGISTRATION.DELETE_CONFIRM', 'ALERT.OK', 'ALERT.CANCEL']).toPromise();
    const alert = await this.alertController.create({
      header: translations['TRIP.STOP_TRIP'] + '?',
      message: translations['REGISTRATION.DELETE_CONFIRM'],
      buttons: [
        {
          text: translations['ALERT.CANCEL'],
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: translations['ALERT.OK'],
          handler: () => this.callStopLegacyTripApiAndDeleteFromDb(),
        }
      ]
    });
    await alert.present();
  }

  private async callStopLegacyTripApiAndDeleteFromDb() {
    await this.setTripServiceRootUrl();
    const currentTrip = await this.getLegacyTripAsObservable().pipe(take(1)).toPromise();
    if (currentTrip) {
      try {
        await this.tripService.TripPut({ DeviceGuid: currentTrip.request.DeviceGuid }).toPromise();
        await this.deleteLegacyTripsFromDb();
        await this.infoMessage(false).toPromise();
      } catch (error) {
        console.warn('[WARNING][TripLoggerService] Could not stop trip!', error);
        this.showTripErrorMessage(false);
      }
    }
  }

  private deleteLegacyTripsFromDb() {
    return nSQL(NanoSql.TABLES.LEGACY_TRIP_LOG.name).query('delete').exec();
  }

  async cleanupOldLegacyTrip() {
    const limit = moment().startOf('day').unix();
    const currentTrip = await this.getLegacyTripAsObservable().pipe(take(1)).toPromise();
    if (currentTrip && (currentTrip.timestamp < limit)) {
      await this.deleteLegacyTripsFromDb();
    }
  }

  private infoMessage(started: boolean) {
    const key = started ? 'TRIP.STARTED' : 'TRIP.STOPPED';
    return this.translateService.get(key).pipe(switchMap((message) =>
      from(this.presentToast(message))));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      mode: 'md',
      duration: 2000
    });
    return toast.present();
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
