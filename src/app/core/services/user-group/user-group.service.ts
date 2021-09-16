import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { NanoSql } from '../../../../nanosql';
import { AppMode } from '@varsom-regobs-common/core';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import {
  ObserverGroupDto,
  AccountService as RegobsApiAccountService
} from '@varsom-regobs-common/regobs-api';
import moment from 'moment';
import { from, combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';

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
      const appMode = await this.userSettingService.appMode$
        .pipe(take(1))
        .toPromise();
      await this.checkLastUpdatedAndUpdateDataIfNeeded(
        appMode,
        loggedInUser.email
      );
    }
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    appMode: AppMode,
    email: string
  ) {
    const dataLoadId = this.getDataLoadId(appMode, email);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const lastUpdateLimit = moment().subtract(1, 'hour');
    if (
      !dataLoad.lastUpdated ||
      moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
    ) {
      await this.updateUserGroupsForUser(appMode, email);
    }
  }

  async updateUserGroupsForUser(appMode: AppMode, email: string) {
    const dataLoadId = this.getDataLoadId(appMode, email);
    await this.dataLoadService.startLoading(dataLoadId);
    const result = await this.accountApiService
      .AccountGetObserverGroups()
      .toPromise();
    this.regobsAuthService.saveUserGroups(appMode, email, result);
    await this.dataLoadService.loadingCompleted(dataLoadId, result.length);
  }

  private getDataLoadId(appMode: AppMode, email: string) {
    return `${NanoSql.TABLES.OBSERVER_GROUPS.name}_${appMode}_${email}`;
  }

  getUserGroupsAsObservable(): Observable<ObserverGroupDto[]> {
    return combineLatest([
      this.regobsAuthService.loggedInUser$,
      this.userSettingService.appMode$
    ]).pipe(
      switchMap(([loggedInUser, appMode]) =>
        loggedInUser.isLoggedIn
          ? from(this.getUserGroupsFromDb(appMode, loggedInUser.email))
          : from(Promise.resolve([]))
      )
    );
  }

  getUserGroups(): Promise<ObserverGroupDto[]> {
    return this.getUserGroupsAsObservable().pipe(take(1)).toPromise();
  }

  private async getUserGroupsFromDb(
    appMode: AppMode,
    email: string
  ): Promise<ObserverGroupDto[]> {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('select')
      .where((x) => x.userId === email)
      .exec();
  }
}
