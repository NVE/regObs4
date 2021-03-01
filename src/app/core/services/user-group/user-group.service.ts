import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { NanoSql } from '../../../../nanosql';
import { AppMode } from '../../models/app-mode.enum';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import {
  ObserverGroupDto,
  ObserverResponseDto
} from '../../../modules/regobs-api/models';
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
    private accountApiService: RegobsApi.AccountService,
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
        loggedInUser.user
      );
    }
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    appMode: AppMode,
    user: ObserverResponseDto
  ) {
    const dataLoadId = this.getDataLoadId(appMode, user);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const lastUpdateLimit = moment().subtract(1, 'hour');
    if (
      !dataLoad.lastUpdated ||
      moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
    ) {
      await this.updateUserGroupsForUser(appMode, user);
    }
  }

  async updateUserGroupsForUser(appMode: AppMode, user: ObserverResponseDto) {
    const dataLoadId = this.getDataLoadId(appMode, user);
    await this.dataLoadService.startLoading(dataLoadId);
    const result = await this.accountApiService
      .AccountGetObserverGroups(user.Guid)
      .toPromise();
    this.regobsAuthService.saveUserGroups(appMode, user, result);
    await this.dataLoadService.loadingCompleted(dataLoadId, result.length);
  }

  private getDataLoadId(appMode: AppMode, user: ObserverResponseDto) {
    return `${NanoSql.TABLES.OBSERVER_GROUPS.name}_${appMode}_${user.Guid}`;
  }

  getUserGroupsAsObservable(): Observable<ObserverGroupDto[]> {
    return combineLatest([
      this.regobsAuthService.loggedInUser$,
      this.userSettingService.appMode$
    ]).pipe(
      switchMap(([loggedInUser, appMode]) =>
        loggedInUser.isLoggedIn
          ? from(this.getUserGroupsFromDb(appMode, loggedInUser.user))
          : from(Promise.resolve([]))
      )
    );
  }

  getUserGroups(): Promise<ObserverGroupDto[]> {
    return this.getUserGroupsAsObservable().pipe(take(1)).toPromise();
  }

  private async getUserGroupsFromDb(
    appMode: AppMode,
    user: ObserverResponseDto
  ): Promise<ObserverGroupDto[]> {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('select')
      .where((x) => x.userId === user.Guid)
      .exec();
  }
}
