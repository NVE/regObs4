import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import { Observable } from 'rxjs';
import { LoggedInUser } from './logged-in-user.model';
import { User } from '../../models/user.model';
import { NanoSql } from '../../../../nanosql';
import { map, take } from 'rxjs/operators';
import { nSQL } from 'nano-sql';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private alertController: AlertController,
    private translateService: TranslateService,
  ) {

  }

  async login(email: string, password: string) {
    const userSettings = await this.userSettingService.getUserSettings();
    const baseUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password)
    });
    try {
      const result = await this.httpClient.post<User>(`${baseUrl}/Account/Login`, {}, { headers }).toPromise();
      await this.saveLoggedInUserToDb(email, true, result);
    } catch (err) {
      await this.showErrorMessage(err.status, err.message);
    }
  }

  async logout() {
    const existingUser = await this.getLoggedInUser();
    return nSQL(NanoSql.TABLES.USER.name).query('upsert',
      {
        ...existingUser, // Keep email saved for easy autocomplete and error messages
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

  private saveLoggedInUserToDb(email: string, isLoggedIn: boolean, user: User) {
    return nSQL(NanoSql.TABLES.USER.name).query('upsert',
      {
        id: 'user',
        email,
        isLoggedIn,
        user
      }).exec();
  }

  async getLoggedInUser(): Promise<LoggedInUser> {
    return this.getLoggedUserInAsObservable().pipe(take(1)).toPromise();
  }

  getLoggedUserInAsObservable(): Observable<LoggedInUser> {
    return nSQL().observable<LoggedInUser>(() => {
      return nSQL(NanoSql.TABLES.USER.name).query('select').emit();
    }).toRxJS().pipe(
      map((val: LoggedInUser[]) => val[0])
    );
  }
}
