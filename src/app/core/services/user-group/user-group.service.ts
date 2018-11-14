import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { NanoSql } from '../../../../nanosql';
import { AppMode } from '../../models/app-mode.enum';
import { settings } from '../../../../settings';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { ObserverGroupDto, ObserverResponseDto } from '../../../modules/regobs-api/models';
import { nSQL } from 'nano-sql';
import * as moment from 'moment';
import { from, combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(
    private loginService: LoginService,
    private userSettingService: UserSettingService,
    private accountApiService: RegobsApi.AccountService,
    private dataLoadService: DataLoadService,
  ) { }

  async updateUserGroups() {
    const userSetting = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (loggedInUser.isLoggedIn) {
      await this.checkLastUpdatedAndUpdateDataIfNeeded(userSetting.appMode, loggedInUser.user);
    }
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(appMode: AppMode, user: ObserverResponseDto) {
    const dataLoadId = this.getDataLoadId(appMode, user);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const lastUpdateLimit = moment().subtract(settings.kdvElements.daysBeforeUpdate, 'day');
    if (!dataLoad.lastUpdated
      || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateUserGroupsForUser(appMode, user);
    } else {
      console.log(`[INFO][UserGroupService] No need to update user groups. Last updated is:`, dataLoad.lastUpdated);
    }
  }

  async updateUserGroupsForUser(appMode: AppMode, user: ObserverResponseDto) {
    const dataLoadId = this.getDataLoadId(appMode, user);
    await this.dataLoadService.startLoading(dataLoadId);
    this.accountApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    // TODO: get observer groups from api...
    const result = await this.accountApiService.AccountGetObserverGroups(user.Guid).toPromise();
    const userGroups = (result || []).map((val) => {
      return { key: `${user.Guid}_${val.Id}`, userId: user.Guid, ...result };
    });
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode);
    await nSQL(instanceName).loadJS(instanceName, userGroups);
    await this.dataLoadService.loadingCompleted(dataLoadId, userGroups.length);
  }

  private getDataLoadId(appMode: AppMode, user: ObserverResponseDto) {
    return `${NanoSql.TABLES.OBSERVER_GROUPS.name}_${appMode}_${user.Guid}`;
  }

  getUserGroupsAsObservable(): Observable<ObserverGroupDto[]> {
    return combineLatest(this.loginService.loggedInUser$, this.userSettingService.userSettingObservable$).pipe(
      switchMap(([loggedInUser, userSetting]) =>
        loggedInUser.isLoggedIn ? from(this.getUserGroupsFromDb(userSetting.appMode, loggedInUser.user)) : from([])));
  }

  getUserGroups(): Promise<ObserverGroupDto[]> {
    return this.getUserGroupsAsObservable().pipe(take(1)).toPromise();
  }

  private async getUserGroupsFromDb(appMode: AppMode, user: ObserverResponseDto): Promise<ObserverGroupDto[]> {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode).query('select')
      .where((x) => x.userId === user.Guid).exec();
  }

}
