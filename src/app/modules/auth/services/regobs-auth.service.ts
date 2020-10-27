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
import { Location } from '@angular/common';
import { AppAuthError, AuthorizationServiceConfiguration, Requestor, TokenError, TokenErrorJson, TokenRequest, TokenResponse, TokenResponseJson } from '@openid/appauth';

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
    private requestor: Requestor,
  ) {
    this.setupDetectPasswordReset();
    this._loggedInUser$ = this.getLoggedInUser$().pipe(shareReplay(1));
    this.observer = this.authService.addActionListener((action) => this.onSignInCallback(action));
  }

  private setupDetectPasswordReset() {
    (<any>this.authService).tokenHandler.performTokenRequest = (configuration: AuthorizationServiceConfiguration, request: TokenRequest):
      Promise<TokenResponse> => {
      const tokenResponse = this.requestor.xhr<TokenResponseJson | TokenErrorJson>({
        url: configuration.tokenEndpoint,
        method: 'POST',
        dataType: 'json',  // adding implicit dataType
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: (<any>this.authService).tokenHandler.utils.stringify(request.toStringMap())
      });

      return tokenResponse.then((response) => {
        if ((<any>this.authService).tokenHandler.isTokenResponse(response)) {
          return new TokenResponse(response as TokenResponseJson);
        } else {
          const tokenError = response as TokenErrorJson;
          return Promise.reject<TokenResponse>(
            new AppAuthError(tokenError.error, new TokenError(tokenError)));
        }
      }, (error) => {
        let tokenErrorJson: TokenErrorJson = error.error;
        if (!tokenErrorJson.error_description) {
          tokenErrorJson = JSON.parse(<any>tokenErrorJson);
        }
        // HACK to detect change password
        if (tokenErrorJson && tokenErrorJson.error_description
          && tokenErrorJson.error_description.indexOf('AADB2C90090') >= 0) {
          return this.signIn(false).then(
            () =>
              new AppAuthError(tokenErrorJson.error, new TokenError(tokenErrorJson)) as any
          );
        }

        return Promise.reject<TokenResponse>(
          new AppAuthError(tokenErrorJson.error, new TokenError(tokenErrorJson)));
      });
    };
  }

  public authorizationCallback(url: string) {
    try {
      this.authService.authorizationCallback(url);
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not call authorizationCallback');
    }
  }

  public async signIn(setReturnUrl = true) {
    const currentLang = await this.userSettingService.language$.pipe(take(1)).toPromise();
    if (setReturnUrl) {
      localStorage.setItem(RETURN_URL_KEY, this.router.url);
    }
    try {
      await this.authService.signIn({
        'ui_locales': this.getSupportedLoginLocales(currentLang)
      });
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could signIn');
    }
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
    await this.authService.signOut();
  }

  public async getAndSaveObserver(idToken: string) {
    try {
      const result = await this.getObserverFromApi(idToken);
      if (!result) {
        this.logger.log('Could not get observer after sign in success', null, LogLevel.Warning, DEBUG_TAG, idToken);
        await this.showErrorMessage(500, '');
        return;
      }
      const resultWithNick = await this.checkAndSetNickIfNickIsNull(result, idToken);
      const claims = this.parseJwt(idToken);
      const appMode = await this.userSettingService.appMode$.pipe(take(1)).toPromise();
      await this.saveLoggedInUserToDb(appMode, claims.email, true, resultWithNick);
    } catch (err) {
      await this.showErrorMessage(err.status, err.message);
    }
  }

  private async checkAndSetNickIfNickIsNull(user: ObserverResponseDto, idToken: string): Promise<ObserverResponseDto> {
    if (user && user.Nick != null && user.Nick != '') {
      return user;
    }
    try {
      const nick = await this.showSetNickDialog();
      await this.callApiUpdateNick(nick, idToken);
      return { ...user, Nick: nick };
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not save nick');
      return user;
    }
  }

  private async callApiUpdateNick(nick: string, idToken: string): Promise<void> {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    const updateObserverUrl = settings.authConfig[userSettings.appMode].updateObserverUrl;
    const apiKey: any = await this.httpClient.get('/assets/apikey.json').toPromise();
    if (!apiKey) {
      throw new Error('apiKey.json not found in assets folder!');
    }
    const headers = new HttpHeaders({
      regObs_apptoken: apiKey.apiKey,
      ApiJsonVersion: settings.services.regObs.apiJsonVersion,
      Authorization: `Bearer ${idToken}`,
    });
    return this.httpClient.put<void>(updateObserverUrl, { Nick: nick }, { headers }).toPromise();
  }

  private async showSetNickDialog(): Promise<string> {
    const headerTextKey = 'SET_NICK_ALERT.INPUT_TEXT';
    const messageTextKey = 'SET_NICK_ALERT.HELP_TEXT';
    const okTextKey = 'DIALOGS.OK';
    const translations = await this.translateService.get([headerTextKey, messageTextKey, okTextKey]).toPromise();
    const alert = await this.alertController.create({
      header: translations[headerTextKey],
      message: translations[messageTextKey],
      backdropDismiss: false,
      inputs: [
        {
          name: 'nick',
          type: 'text',
          max: 24,
        },
      ],
      buttons: [
        {
          text: translations[okTextKey],
          handler: (data: { nick: string }) => {
            return data && data.nick != null && data.nick != '';
          }
        }
      ]
    });
    alert.present();

    const result = ((await alert.onDidDismiss()) as { data: { values: { nick: string } } });
    return result?.data?.values?.nick;
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
      localStorage.removeItem(RETURN_URL_KEY);
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
    if (langKey === LangKey.nb || langKey === LangKey.nn) {
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

  async saveUserGroups(appMode: AppMode, user: ObserverResponseDto, observerGroups: ObserverGroupDto[]): Promise<void> {
    const userGroups = (observerGroups || []).map((val) => {
      return { key: `${user.Guid}_${val.Id}`, userId: user.Guid, Id: val.Id, Name: val.Name };
    });
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode);
    await nSQL(instanceName).loadJS(userGroups);
    await this.deleteUserGroupsNoLongerInResult(appMode, userGroups.map((ug) => ug.key));
  }

  private async deleteUserGroupsNoLongerInResult(appMode: AppMode, ids: string[]) {
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('delete').where((dbGroup: { key: string, userId: string, Id: number, Name: string }) =>
        ids.indexOf(dbGroup.key) < 0
      ).exec();
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
