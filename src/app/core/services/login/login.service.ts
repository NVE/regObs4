import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import { Observable, combineLatest } from 'rxjs';
import { LoggedInUser } from './logged-in-user.model';
import { NanoSql } from '../../../../nanosql';
import { map, take, switchMap, shareReplay } from 'rxjs/operators';
import { nSQL } from 'nano-sql';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppMode } from '../../models/app-mode.enum';
import { ObserverResponseDto, ObserverGroupDto } from '../../../modules/regobs-api/models';
import * as Sentry from 'sentry-cordova';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loggedInUserObservable: Observable<LoggedInUser>;

  get loggedInUser$() {
    return this._loggedInUserObservable;
  }

  constructor(
    private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private alertController: AlertController,
    private translateService: TranslateService,
  ) {
    this._loggedInUserObservable = this.userSettingService.userSettingObservable$.pipe(switchMap((userSetting) =>
      combineLatest(this.getLoggedUserInAsObservable(userSetting.appMode))
    ), map(([loggedInUser]) => loggedInUser), shareReplay(1));
  }

  async login(email: string, password: string) {
    const userSettings = await this.userSettingService.getUserSettings();
    const baseUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const apiKey: any = await this.httpClient.get('/assets/apikey.json').toPromise();
    if (!apiKey) {
      throw new Error('apiKey.json not found in assets folder!');
    }
    const headers = new HttpHeaders({
      regObs_apptoken: apiKey.apiKey,
      ApiJsonVersion: settings.services.regObs.apiJsonVersion,
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    try {
      const result = await this.httpClient.get<ObserverResponseDto>(`${baseUrl}/Account/Login`, { headers }).toPromise();
      await this.saveLoggedInUserToDb(userSettings.appMode, email, true, result);
      return true;
    } catch (err) {
      await this.showErrorMessage(err.status, err.message);
      return false;
    }
  }

  async logout() {
    const userSettings = await this.userSettingService.getUserSettings();
    const existingUser = await this.getLoggedInUser();
    return NanoSql.getInstance(NanoSql.TABLES.USER.name, userSettings.appMode).query('upsert',
      {
        id: 'user',
        email: existingUser ? existingUser.email : null, // Keep email saved for easy autocomplete and error messages
        isLoggedIn: false,
        user: null,
      }).exec();
  }

  private async showErrorMessage(status: number, message: string) {
    const text = status === 401 ? 'UNAUTHORIZED' : (status <= 0 ? 'SERVICE_UNAVAILABLE' : 'UNKNOWN_ERROR');
    const messageText = `LOGIN.${text}`;
    const extraMessage = text === 'UNKNOWN_ERROR' ? ` ${message}` : '';
    const translations = await this.translateService.get(['ALERT.DEFAULT_HEADER', 'ALERT.OK', messageText]).toPromise();
    const alert = await this.alertController.create({
      header: translations['ALERT.DEFAULT_HEADER'],
      message: `${translations[messageText]}${extraMessage}`,
      buttons: [translations['ALERT.OK']]
    });
    await alert.present();
  }

  private async saveLoggedInUserToDb(appMode: AppMode, email: string, isLoggedIn: boolean, user: ObserverResponseDto) {
    await NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode).query('upsert',
      {
        id: 'user',
        email,
        isLoggedIn,
        user
      }).exec();
    await this.saveUserGroups(appMode, user, user.ObserverGroup);
  }

  async saveUserGroups(appMode: AppMode, user: ObserverResponseDto, observerGroups: ObserverGroupDto[]) {
    const userGroups = (observerGroups || []).map((val) => {
      return { key: `${user.Guid}_${val.Id}`, userId: user.Guid, Id: val.Id, Name: val.Name };
    });
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode);
    await nSQL().loadJS(instanceName, userGroups, true);
    await this.deleteUserGroupsNoLongerInResult(appMode, userGroups.map((ug) => ug.key));
  }

  private async deleteUserGroupsNoLongerInResult(appMode: AppMode, ids: string[]) {
    const deleteResult = await NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('delete').where((dbGroup: { key: string, userId: string, Id: number, Name: string }) =>
        ids.indexOf(dbGroup.key) < 0
      ).exec();
    console.log('[INFO][LoginService] Deleted groups no longer in result: ', deleteResult);
  }

  async getLoggedInUser(showLoginModal = false): Promise<LoggedInUser> {
    // TODO: Implement loginmodal if not logged in...
    return this._loggedInUserObservable.pipe(take(1)).toPromise();
  }

  getLoggedUserInAsObservable(appMode: AppMode): Observable<LoggedInUser> {
    return nSQL().observable<LoggedInUser[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode).query('select').emit();
    }).toRxJS().pipe(
      map(([loggedInUser]) => loggedInUser || { isLoggedIn: false })
    );
  }
}
