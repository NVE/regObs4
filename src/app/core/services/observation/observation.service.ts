import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { RegObsObservation } from '../../models/regobs-observation.model';
import { nSQL } from 'nano-sql';
import { Observer } from 'nano-sql/lib/observable';
import { ApiService } from '../api/api.service';
import { HelperService } from '../helpers/helper.service';
import { RowCount } from '../../models/row-count.model';
import { Subject, Observable } from 'rxjs';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import 'moment-timezone';
import { Storage } from '@ionic/storage';
import * as Rx from 'rxjs';
import { NanoSql } from '../../../../nanosql';
import { debounceTime, take } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { User } from '../../models/user.model';
import { LoggedInUser } from '../login/logged-in-user.model';
import { UserSettingService } from '../user-setting/user-setting.service';

const REGISTRATION_LAST_UPDATED = 'registration_last_updated';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  observations: Array<RegObsObservation>;
  private _isLoading: Subject<boolean>;

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private storage: Storage,
    private loginService: LoginService,
    private userSettingService: UserSettingService,
  ) {
    this._isLoading = new Subject<boolean>();
  }

  private exludeLoggedInUser(user: LoggedInUser, reg: RegObsObservation) {
    return (user.isLoggedIn ? (reg.NickName !== user.user.Nick) : true);
  }

  async updateObservations() {
    try {
      const user = await this.loginService.getLoggedInUser();
      const currentGeoHazard = await this.userSettingService.currentGeoHazardObservable$.pipe(take(1)).toPromise();

      for (const geoHazard of this.getPriority(currentGeoHazard)) {
        await this.updateObservationsForGeoHazard(geoHazard, user);
      }
      // TODO: Implement last update service and skip items recently updated
      await this.storage.ready();
      console.log('[INFO] Updating last updated');
      this.storage.set(REGISTRATION_LAST_UPDATED, moment().toISOString());
      this._isLoading.next(false);
    } catch (err) {
      console.error('[ERROR] Could not update observations!', err);
    }
  }

  private getPriority(currentGeoHazard: GeoHazard) {
    if (currentGeoHazard === GeoHazard.Snow) {
      return [GeoHazard.Snow, GeoHazard.Ice, GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Ice) {
      return [GeoHazard.Ice, GeoHazard.Snow, GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Water) {
      return [GeoHazard.Water, GeoHazard.Dirt, GeoHazard.Snow, GeoHazard.Ice];
    } else if (currentGeoHazard === GeoHazard.Dirt) {
      return [GeoHazard.Dirt, GeoHazard.Water, GeoHazard.Snow, GeoHazard.Ice];
    }
  }

  private async updateObservationsForGeoHazard(geoHazard: GeoHazard, user: LoggedInUser) {
    console.log(`[INFO][ObervationService] Updating observations for geoHazard: ${geoHazard}`);
    const daysBack = await this.getDaysBackToFetchForGeoHazard(geoHazard);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    const searchResult = await this.apiService.search({
      FromDate: fromDate.toDate(),
      SelectedGeoHazards: [geoHazard],
      NumberOfRecords: settings.observations.maxObservationsToFetch,
    });
    console.log(`[INFO] Got ${searchResult.Results.length} new observations for geoHazard  ${geoHazard}`);
    await nSQL(NanoSql.TABLES.REGISTRATION.name).loadJS(NanoSql.TABLES.REGISTRATION.name, searchResult.Results);

    // Deleting items no longer in updated result
    await this.deleteObservationNoLongerInResult(user, fromDate, searchResult.Results);
    // Delete old items
    await this.deleteOldObservations(geoHazard, user);
  }

  private async getDaysBackToFetchForGeoHazard(geoHazard: GeoHazard): Promise<number> {
    const userSettings = await this.userSettingService.getUserSettings();
    if (userSettings.currentGeoHazard === geoHazard) {
      // Returning max days back for current geoHazard
      return settings.observations.maxDaysBack[GeoHazard[geoHazard]];
    } else {
      // Returning default days back for other geoHazards
      return this.helperService.getObservationsDaysBack(geoHazard, userSettings);
    }
  }

  private deleteObservationNoLongerInResult(user: LoggedInUser, fromDate: moment.Moment, items: RegObsObservation[]) {
    return nSQL(NanoSql.TABLES.REGISTRATION.name).query('delete')
      .where((reg: RegObsObservation) => {
        return moment(reg.DtObsTime).isSameOrAfter(fromDate)
          && !items.find((item) => item.RegId === reg.RegId)
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  private async deleteOldObservations(geoHazard: GeoHazard, user: LoggedInUser) {
    const daysBack = await this.getDaysBackToFetchForGeoHazard(geoHazard);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return nSQL(NanoSql.TABLES.REGISTRATION.name).query('delete')
      .where((reg: RegObsObservation) => {
        return moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom)
          && reg.GeoHazardTid === geoHazard
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  getObservationsAsObservable(geoHazard?: GeoHazard, fromDate?: Date, user?: string): Rx.Observable<RegObsObservation[]> {
    return nSQL().observable<RegObsObservation[]>(() => {
      return nSQL(NanoSql.TABLES.REGISTRATION.name).query('select').where((reg: RegObsObservation) => {
        return geoHazard ? reg.GeoHazardTid === geoHazard : true &&
          fromDate ? moment.tz(reg.DtObsTime, settings.observations.timeZone).isAfter(fromDate) : true &&
            user ? reg.NickName === user : true;
      }).emit();
    }).toRxJS().pipe(debounceTime(500));
  }

  getObserableCount(): Observer<RowCount[]> {
    return nSQL().observable<RowCount[]>(() => {
      return nSQL(NanoSql.TABLES.REGISTRATION.name).query('select', ['COUNT(*) as count']).emit();
    }).debounce(500);
  }

  async getLastUpdated(): Promise<Date> {
    await this.storage.ready();
    const storageValue: string = await this.storage.get(REGISTRATION_LAST_UPDATED);
    if (storageValue) {
      return moment(storageValue).toDate();
    } else {
      return null;
    }
  }

  async reset() {
    await this.storage.ready();
    await this.storage.remove(REGISTRATION_LAST_UPDATED);
  }
}
