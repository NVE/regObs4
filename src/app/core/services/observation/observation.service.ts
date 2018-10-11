import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { RegObsObservation } from '../../models/regobs-observation.model';
import { nSQL } from 'nano-sql';
import { ApiService } from '../api/api.service';
import { HelperService } from '../helpers/helper.service';
import { RowCount } from '../../models/row-count.model';
import { Observable } from 'rxjs';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import 'moment-timezone';
import { Storage } from '@ionic/storage';
import * as Rx from 'rxjs';
import { NanoSql } from '../../../../nanosql';
import { debounceTime, take, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { LoggedInUser } from '../login/logged-in-user.model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';

const REGISTRATION_LAST_UPDATED = 'registration_last_updated';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  observations: Array<RegObsObservation>;

  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private storage: Storage,
    private loginService: LoginService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
  ) {
  }

  private exludeLoggedInUser(user: LoggedInUser, reg: RegObsObservation) {
    return (user.isLoggedIn ? (reg.NickName !== user.user.Nick) : true);
  }

  async updateObservations() {
    const user = await this.loginService.getLoggedInUser();
    const currentGeoHazard = await this.userSettingService.currentGeoHazardObservable$.pipe(take(1)).toPromise();
    for (const geoHazard of this.getPriority(currentGeoHazard)) {
      await this.checkLastUpdatedAndUpdateDataIfNeeded(geoHazard, user);
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

  private getDataLoadId(geoHazard) {
    return `${NanoSql.TABLES.REGISTRATION.name}_${geoHazard}`;
  }

  getAllDataLoadIds() {
    const geoHazards = Object.keys(GeoHazard)
      .filter(key => !isNaN(Number(GeoHazard[key])))
      .map((key) => GeoHazard[key]);
    return geoHazards.map((val) => this.getDataLoadId(val));
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(geoHazard: GeoHazard, user: LoggedInUser) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(geoHazard));
    const lastUpdateLimit = moment().subtract(10, 'minutes');
    if (!dataLoad.lastUpdated || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateObservationsForGeoHazard(geoHazard, user);
    } else {
      console.log(`[INFO][ObervationService] No need to update ${geoHazard}. Last updated is:`, dataLoad.lastUpdated);
    }
  }

  getLastUpdatedForCurrentGeoHazardAsObservable() {
    return this.userSettingService.currentGeoHazardObservable$.pipe(switchMap((currentGeoHazard) =>
      Rx.combineLatest(this.dataLoadService.getStateAsObservable(this.getDataLoadId(currentGeoHazard)))
    ), map((val) => val[0].lastUpdated));
  }

  async updateObservationsForCurrentGeoHazard() {
    const currentGeoHazard = await this.userSettingService.currentGeoHazardObservable$.pipe(take(1)).toPromise();
    const loggedInUser = await this.loginService.getLoggedInUser();
    return this.updateObservationsForGeoHazard(currentGeoHazard, loggedInUser);
  }

  private async updateObservationsForGeoHazard(geoHazard: GeoHazard, user: LoggedInUser) {
    console.log(`[INFO][ObervationService] Updating observations for geoHazard: ${geoHazard}`);
    const dataLoadId = this.getDataLoadId(geoHazard);
    await this.dataLoadService.startLoading(dataLoadId);

    const daysBack = await this.getDaysBackToFetchForGeoHazard(geoHazard);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    // TODO: Implement cancel? Maybe use observable and unsubscribe when cancel observable in data load table?
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

    await this.dataLoadService.loadingCompleted(dataLoadId, searchResult.Results.length,
      fromDate.toDate(), new Date());
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
          fromDate ? moment(reg.DtObsTime).isAfter(fromDate) : true &&
            user ? reg.NickName === user : true;
      }).emit();
    }).toRxJS().pipe(debounceTime(500));
  }

  getObserableCount(): Observable<number> {
    return nSQL().observable<number>(() => {
      return nSQL(NanoSql.TABLES.REGISTRATION.name).query('select', ['COUNT(*) as count']).emit();
    }).debounce(100).toRxJS().pipe(map((val: RowCount[]) => val[0].count), distinctUntilChanged());
  }
}
