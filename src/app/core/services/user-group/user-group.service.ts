import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { NanoSql } from '../../../../nanosql';
import { AppMode } from 'src/app/modules/common-core/models';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { ObserverGroupDto } from 'src/app/modules/common-regobs-api/models';
import { AccountService as RegobsApiAccountService } from 'src/app/modules/common-regobs-api/services';
import moment from 'moment';
import { from, combineLatest, Observable, lastValueFrom, firstValueFrom } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';
import { nSQL } from '@nano-sql/core';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
  constructor(
    private regobsAuthService: RegobsAuthService,
    private userSettingService: UserSettingService,
    private accountApiService: RegobsApiAccountService,
    private dataLoadService: DataLoadService
  ) {}

  async updateUserGroups() {
    const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
    if (loggedInUser.isLoggedIn) {
      const appMode = await firstValueFrom(this.userSettingService.appMode$);
      await this.checkLastUpdatedAndUpdateDataIfNeeded(appMode, loggedInUser.email);
    }
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(appMode: AppMode, email: string) {
    const dataLoadId = this.getDataLoadId(appMode, email);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const lastUpdateLimit = moment().subtract(1, 'hour');
    if (!dataLoad.lastUpdated || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateUserGroupsForUser(appMode, email);
    }
  }

  async updateUserGroupsForUser(appMode: AppMode, email: string) {
    const dataLoadId = this.getDataLoadId(appMode, email);
    await this.dataLoadService.startLoading(dataLoadId);
    const result = await lastValueFrom(this.accountApiService.AccountGetObserverGroups());
    this.saveUserGroups(appMode, email, result);
    await this.dataLoadService.loadingCompleted(dataLoadId, result.length);
  }

  async saveUserGroups(appMode: AppMode, email: string, observerGroups: ObserverGroupDto[]): Promise<void> {
    const userGroups = (observerGroups || []).map((val) => {
      return {
        key: `${email}_${val.Id}`,
        userId: email,
        Id: val.Id,
        Name: val.Name
      };
    });
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode);
    await nSQL(instanceName).loadJS(userGroups);
    await this.deleteUserGroupsNoLongerInResult(
      appMode,
      userGroups.map((ug) => ug.key)
    );
  }

  private async deleteUserGroupsNoLongerInResult(appMode: AppMode, ids: string[]) {
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('delete')
      .where((dbGroup: { key: string; userId: string; Id: number; Name: string }) => ids.indexOf(dbGroup.key) < 0)
      .exec();
  }

  private getDataLoadId(appMode: AppMode, email: string) {
    return `${NanoSql.TABLES.OBSERVER_GROUPS.name}_${appMode}_${email}`;
  }

  getUserGroupsAsObservable(): Observable<ObserverGroupDto[]> {
    return combineLatest([this.regobsAuthService.loggedInUser$, this.userSettingService.appMode$]).pipe(
      switchMap(([loggedInUser, appMode]) =>
        loggedInUser.isLoggedIn ? from(this.getUserGroupsFromDb(appMode, loggedInUser.email)) : from(Promise.resolve([]))
      )
    );
  }

  getUserGroups(): Promise<ObserverGroupDto[]> {
    return this.getUserGroupsAsObservable().pipe(take(1)).toPromise();
  }

  private async getUserGroupsFromDb(appMode: AppMode, email: string): Promise<ObserverGroupDto[]> {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('select')
      .where((x) => x.userId === email)
      .exec();
  }
}
