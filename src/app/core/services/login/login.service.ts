import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import { Observable, combineLatest } from 'rxjs';
import { LoggedInUser } from './logged-in-user.model';
import { User } from '../../models/user.model';
import { NanoSql } from '../../../../nanosql';
import { map, take, switchMap, shareReplay } from 'rxjs/operators';
import { nSQL } from 'nano-sql';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppMode } from '../../models/app-mode.enum';

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
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password)
    });
    try {
      const result = await this.httpClient.post<User>(`${baseUrl}/Account/Login`, {}, { headers }).toPromise();
      await this.saveLoggedInUserToDb(userSettings.appMode, email, true, result);
    } catch (err) {
      await this.showErrorMessage(err.status, err.message);
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

  private saveLoggedInUserToDb(appMode: AppMode, email: string, isLoggedIn: boolean, user: User) {
    return NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode).query('upsert',
      {
        id: 'user',
        email,
        isLoggedIn,
        user
      }).exec();
  }

  async getLoggedInUser(): Promise<LoggedInUser> {
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
