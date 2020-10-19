import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { nSQL } from '@nano-sql/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions, AuthObserver, AuthService, IAuthAction } from 'ionic-appauth';
import { from, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { NanoSql } from '../../../../nanosql';
import { settings } from '../../../../settings';
import { NSqlFullUpdateObservable } from '../../../core/helpers/nano-sql/NSqlFullUpdateObservable';
import { AppMode } from '../../../core/models/app-mode.enum';
import { LangKey } from '../../../core/models/langKey';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoggedInUser } from '../../login/models/logged-in-user.model';
import { ObserverGroupDto, ObserverResponseDto } from '../../regobs-api/models';
import { LogLevel } from '../../shared/services/logging/log-level.model';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { Location } from '@angular/common'

const DEBUG_TAG = 'RegobsAuthService';
export const RETURN_URL_KEY = 'authreturnurl';

@Injectable({
  providedIn: 'root'
})
export class RegobsAuthService {


  private _loggedInUser$: Observable<LoggedInUser>;
  private observer: AuthObserver;

  get loggedInUser$() {
    return this._loggedInUser$;
  }


  constructor(
    private authService: AuthService,
    private userSettingService: UserSettingService,
    private httpClient: HttpClient,
    private logger: LoggingService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private location: Location,
  ) {
    this._loggedInUser$ = this.getLoggedInUser$().pipe(shareReplay(1));
    this.observer = this.authService.addActionListener((action) => this.onSignInCallback(action));
  }

  public async signIn() {
    const currentLang = await this.userSettingService.language$.pipe(take(1)).toPromise();
    localStorage.setItem(RETURN_URL_KEY, this.router.url);
    return this.authService.signIn({
      'ui_locales': this.getSupportedLoginLocales(currentLang)
    });
  }

  public async logout() {
    await this.userSettingService.appMode$.pipe(take(1),
      switchMap((appMode) => from(NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode).query('upsert',
        {
          id: 'user',
          email: null,
          isLoggedIn: false,
          user: null,
        }).exec()))).toPromise();
  }

  public async getAndSaveObserver(idToken: string) {
    try {
      const result = await this.getObserverFromApi(idToken);
      if (!result) {
        this.logger.log('Could not get observer after sign in success', null, LogLevel.Warning, DEBUG_TAG, idToken);
        await this.showErrorMessage(500, '');
        return;
      }
      const claims = this.parseJwt(idToken);
      const appMode = await this.userSettingService.appMode$.pipe(take(1)).toPromise();
      await this.saveLoggedInUserToDb(appMode, claims.email, true, result);
    } catch (err) {
      await this.showErrorMessage(err.status, err.message);
    }
  }

  public getLoggedInUserAsPromise() {
    return this.loggedInUser$.pipe(take(1)).toPromise();
  }

  public async onSignInCallback(action: IAuthAction): Promise<void> {
    if (action.action === AuthActions.SignInSuccess) {
      await this.getAndSaveObserver(action.tokenResponse?.idToken);
    }
    const returnUrl = localStorage.getItem(RETURN_URL_KEY);
    if (returnUrl) {
      this.location.replaceState(this.router.serializeUrl(this.router.createUrlTree([''])));
      this.navCtrl.navigateForward(returnUrl);
    } else {
      this.navCtrl.navigateRoot('');
    }
  }

  private getLoggedInUser$(): Observable<LoggedInUser> {
    return this.userSettingService.appMode$.pipe(switchMap((appMode) => this.getLoggedInUserForAppMode$(appMode)));
  }

  private getLoggedInUserForAppMode$(appMode: AppMode): Observable<LoggedInUser> {
    return new NSqlFullUpdateObservable<LoggedInUser[]>
      (NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode).query('select')
        .listen()).pipe(
          map(([loggedInUser]) => loggedInUser || { isLoggedIn: false })
        );
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

  private async getObserverFromApi(idToken: string): Promise<ObserverResponseDto> {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    const getObserverUrl = settings.authConfig[userSettings.appMode].getObserverUrl;
    const apiKey: any = await this.httpClient.get('/assets/apikey.json').toPromise();
    if (!apiKey) {
      throw new Error('apiKey.json not found in assets folder!');
    }
    const headers = new HttpHeaders({
      regObs_apptoken: apiKey.apiKey,
      ApiJsonVersion: settings.services.regObs.apiJsonVersion,
      Authorization: `Bearer ${idToken}`,
    });
    return this.httpClient.get<ObserverResponseDto>(getObserverUrl, { headers }).toPromise();
  }

  private getSupportedLoginLocales(langKey: LangKey) {
    if (langKey === LangKey.nb) {
      return 'nb-NO';
    }
    return 'en';
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
    await nSQL(instanceName).loadJS(userGroups);
    await this.deleteUserGroupsNoLongerInResult(appMode, userGroups.map((ug) => ug.key));
  }

  private async deleteUserGroupsNoLongerInResult(appMode: AppMode, ids: string[]) {
    const deleteResult = await NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('delete').where((dbGroup: { key: string, userId: string, Id: number, Name: string }) =>
        ids.indexOf(dbGroup.key) < 0
      ).exec();
  }

  private parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
}
