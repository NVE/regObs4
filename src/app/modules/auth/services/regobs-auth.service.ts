import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { nSQL } from '@nano-sql/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions, AuthService, IAuthAction } from 'ionic-appauth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { NanoSql } from '../../../../nanosql';
import { settings } from '../../../../settings';
import { AppMode } from '../../../core/models/app-mode.enum';
import { LangKey } from '../../../core/models/langKey';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoggedInUser } from '../../login/models/logged-in-user.model';
import { ObserverGroupDto, ObserverResponseDto } from '../../regobs-api/models';
import { LogLevel } from '../../shared/services/logging/log-level.model';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { Location } from '@angular/common';
import {
  AppAuthError,
  AuthorizationServiceConfiguration,
  BaseTokenRequestHandler,
  Requestor,
  StorageBackend,
  TokenError,
  TokenErrorJson,
  TokenRequest,
  TokenResponse,
  TokenResponseJson
} from '@openid/appauth';

const DEBUG_TAG = 'RegobsAuthService';
export const RETURN_URL_KEY = 'authreturnurl';
const TOKEN_RESPONSE_KEY = 'token_response';

@Injectable({
  providedIn: 'root'
})
export class RegobsAuthService {
  private _loggedInUserSubject: BehaviorSubject<LoggedInUser> = new BehaviorSubject(
    { isLoggedIn: false }
  );
  private _isLoggingInSubject = new BehaviorSubject<boolean>(false);

  get loggedInUser$(): Observable<LoggedInUser> {
    return this._loggedInUserSubject.asObservable();
  }

  get isLoggingIn$(): Observable<boolean> {
    return this._isLoggingInSubject.asObservable();
  }

  get tokenHandler(): BaseTokenRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (<any>this.authService).tokenHandler;
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
    private storageBackend: StorageBackend
  ) {
    this.setupCustomTokenRequestHandler();
    this.authService.addActionListener((action) =>
      this.onSignInCallback(action)
    );
    this.userSettingService.appMode$.subscribe(async (appMode) => {
      const loggedInUser = await this.getLoggedInUserForAppMode(appMode);
      this._loggedInUserSubject.next(loggedInUser);
    });
  }

  private customTokenRequestHandler(
    configuration: AuthorizationServiceConfiguration,
    request: TokenRequest
  ): Promise<TokenResponse> {
    const data = this.tokenHandler.utils.stringify(request.toStringMap());
    const postData = {
      url: configuration.tokenEndpoint,
      method: 'POST',
      dataType: 'json', // adding implicit dataType
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data
    };
    const tokenResponse = this.requestor.xhr<
      TokenResponseJson | TokenErrorJson
    >(postData);

    return tokenResponse.then(
      (response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((<any>this.authService).tokenHandler.isTokenResponse(response)) {
          return new TokenResponse(response as TokenResponseJson);
        } else {
          this.logger.error(
            new Error('Invalid tokenResponse'),
            DEBUG_TAG,
            `Token request: ${JSON.stringify(postData)} Auth response: ${
              response ? JSON.stringify(response) : ''
            }`
          );
          const tokenError = response as TokenErrorJson;
          return Promise.reject<TokenResponse>(
            new AppAuthError(
              tokenError?.error || 'Unknown error',
              new TokenError(tokenError || { error: 'invalid_request' })
            )
          );
        }
      },
      (error) => {
        let message = undefined;
        if (error.error && error.error.error_description) {
          // HttpError response containes detailed error message response
          const tokenErrorJson: TokenErrorJson = error?.error;
          // HACK to detect change password
          if (
            tokenErrorJson &&
            tokenErrorJson.error_description &&
            tokenErrorJson.error_description.indexOf('AADB2C90090') >= 0
          ) {
            return this.signIn(false).then(() => undefined);
          }
          message = tokenErrorJson.error_description;
          this.logger.error(
            error,
            DEBUG_TAG,
            `Error getting tokenResponse, Response message: ${message}`
          );
        }
        if (message === undefined && error instanceof HttpErrorResponse) {
          this.logger.error(
            error,
            DEBUG_TAG,
            `Error getting tokenResponse, http status code ${error.status}. Message: ${error.message}`
          );
          if (error.status === 0) {
            message = this.translateService.instant(
              'LOGIN.SERVICE_UNAVAILABLE'
            );
          } else {
            message = error.message;
          }
        }

        this.logger.log(
          `Token request was: ${JSON.stringify(postData)}`,
          null,
          LogLevel.Warning,
          DEBUG_TAG
        );

        // Clear session storage token and show error message. User has to retry login.
        this.storageBackend.removeItem(TOKEN_RESPONSE_KEY);
        return this.showErrorMessage(500, message).then(() => {
          throw new AppAuthError(
            message,
            new TokenError(error?.error || { error: 'invalid_request' })
          );
        });
      }
    );
  }

  private setupCustomTokenRequestHandler() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tokenHandler.performTokenRequest = (config, request) =>
      this.customTokenRequestHandler(config, request);
  }

  public authorizationCallback(url: string): void {
    try {
      this.authService.authorizationCallback(url);
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not call authorizationCallback');
    }
  }

  public async signIn(setReturnUrl = true): Promise<void> {
    const currentLang = await this.userSettingService.language$
      .pipe(take(1))
      .toPromise();
    if (setReturnUrl) {
      localStorage.setItem(RETURN_URL_KEY, this.router.url);
    }
    try {
      await this.authService.signIn({
        ui_locales: this.getSupportedLoginLocales(currentLang),
        prompt: 'login' // Force login screen
      });
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not signIn');
    }
  }

  public async logout(): Promise<void> {
    this._loggedInUserSubject.next({ isLoggedIn: false });
    await this.userSettingService.appMode$
      .pipe(
        take(1),
        switchMap((appMode) =>
          from(
            NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode)
              .query('upsert', {
                id: 'user',
                email: null,
                isLoggedIn: false,
                user: null
              })
              .exec()
          )
        )
      )
      .toPromise();
    this.authService.endSessionCallback();
  }

  public async getAndSaveObserver(idToken: string): Promise<void> {
    try {
      this._isLoggingInSubject.next(true);
      const result = await this.getObserverFromApi(idToken);
      if (!result) {
        this.logger.log(
          'Could not get observer after sign in success',
          null,
          LogLevel.Warning,
          DEBUG_TAG,
          idToken
        );
        await this.showErrorMessage(500, '');
        return;
      }
      const resultWithNick = await this.checkAndSetNickIfNickIsNull(
        result,
        idToken
      );
      const claims = this.parseJwt(idToken);
      this._loggedInUserSubject.next({
        email: claims.email,
        isLoggedIn: true,
        user: resultWithNick
      });
      setTimeout(
        () => this.saveLoggedInUserToDb(claims.email, true, resultWithNick),
        20
      );
    } catch (err) {
      await this.showErrorMessage(err.status, err.message);
    } finally {
      this._isLoggingInSubject.next(false);
    }
  }

  private async checkAndSetNickIfNickIsNull(
    user: ObserverResponseDto,
    idToken: string
  ): Promise<ObserverResponseDto> {
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

  private async callApiUpdateNick(
    nick: string,
    idToken: string
  ): Promise<void> {
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    const updateObserverUrl =
      settings.authConfig[userSettings.appMode].updateObserverUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiKey: any = await this.httpClient
      .get('/assets/apikey.json')
      .toPromise();
    if (!apiKey) {
      throw new Error('apikey.json not found in assets folder!');
    }
    const headers = new HttpHeaders({
      regObs_apptoken: apiKey.apiKey,
      ApiJsonVersion: settings.services.regObs.apiJsonVersion,
      Authorization: `Bearer ${idToken}`
    });
    return this.httpClient
      .put<void>(updateObserverUrl, { Nick: nick }, { headers })
      .toPromise();
  }

  private async showSetNickDialog(): Promise<string> {
    const headerTextKey = 'SET_NICK_ALERT.INPUT_TEXT';
    const messageTextKey = 'SET_NICK_ALERT.HELP_TEXT';
    const okTextKey = 'DIALOGS.OK';
    const translations = await this.translateService
      .get([headerTextKey, messageTextKey, okTextKey])
      .toPromise();
    const alert = await this.alertController.create({
      header: translations[headerTextKey],
      message: translations[messageTextKey],
      backdropDismiss: false,
      inputs: [
        {
          name: 'nick',
          type: 'text',
          max: 24
        }
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

    const result = (await alert.onDidDismiss()) as {
      data: { values: { nick: string } };
    };
    return result?.data?.values?.nick;
  }

  public getLoggedInUserAsPromise(): Promise<LoggedInUser> {
    return this.loggedInUser$.pipe(take(1)).toPromise();
  }

  public async onSignInCallback(action: IAuthAction): Promise<void> {
    if (action.tokenResponse?.idToken) {
      await this.getAndSaveObserver(action.tokenResponse?.idToken);
    } else if (
      action.action === AuthActions.SignInFailed &&
      action.error !== 'Handle Not Available'
    ) {
      await this.showErrorMessage(500, action.error);
    }
    this.redirectToReturnUrl();
  }

  private redirectToReturnUrl() {
    if (this.location.path().indexOf('auth/callback') >= 0) {
      const returnUrl = localStorage.getItem(RETURN_URL_KEY);
      if (returnUrl) {
        localStorage.removeItem(RETURN_URL_KEY);
        this.location.replaceState(
          this.router.serializeUrl(this.router.createUrlTree(['']))
        );
        this.navCtrl.navigateForward(returnUrl);
      } else {
        this.navCtrl.navigateRoot('');
      }
    }
  }

  private async getLoggedInUserForAppMode(
    appMode: AppMode
  ): Promise<LoggedInUser> {
    const result = await (NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode)
      .query('select')
      .exec() as Promise<LoggedInUser[]>);
    return result[0] || { isLoggedIn: false };
  }

  private async showErrorMessage(status: number, message: string) {
    const text =
      status === 401
        ? 'UNAUTHORIZED'
        : status <= 0
          ? 'SERVICE_UNAVAILABLE'
          : 'UNKNOWN_ERROR';
    const messageText = `LOGIN.${text}`;
    const extraMessage = text === 'UNKNOWN_ERROR' ? ` ${message}` : '';
    const translations = await this.translateService
      .get(['ALERT.DEFAULT_HEADER', 'ALERT.OK', messageText])
      .toPromise();
    const alert = await this.alertController.create({
      header: translations['ALERT.DEFAULT_HEADER'],
      message: `${translations[messageText]}${extraMessage}`,
      buttons: [translations['ALERT.OK']]
    });
    await alert.present();
  }

  private async getObserverFromApi(
    idToken: string
  ): Promise<ObserverResponseDto> {
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    const getObserverUrl =
      settings.authConfig[userSettings.appMode].getObserverUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiKey: any = await this.httpClient
      .get('/assets/apikey.json')
      .toPromise();
    if (!apiKey) {
      throw new Error('apiKey.json not found in assets folder!');
    }
    const headers = new HttpHeaders({
      regObs_apptoken: apiKey.apiKey,
      ApiJsonVersion: settings.services.regObs.apiJsonVersion,
      Authorization: `Bearer ${idToken}`
    });
    return this.httpClient
      .get<ObserverResponseDto>(getObserverUrl, { headers })
      .toPromise();
  }

  private getSupportedLoginLocales(langKey: LangKey) {
    if (langKey === LangKey.nb || langKey === LangKey.nn) {
      return 'nb-NO';
    }
    return 'en';
  }

  private saveLoggedInUserToDb(
    email: string,
    isLoggedIn: boolean,
    user: ObserverResponseDto
  ): void {
    this.userSettingService.appMode$
      .pipe(
        take(1),
        switchMap((appMode) =>
          from(
            NanoSql.getInstance(NanoSql.TABLES.USER.name, appMode)
              .query('upsert', {
                id: 'user',
                email,
                isLoggedIn,
                user
              })
              .exec()
          ).pipe(
            switchMap(() =>
              from(this.saveUserGroups(appMode, user, user.ObserverGroup))
            )
          )
        )
      )
      .subscribe(
        () => {
          this.logger.debug('User saved to db', DEBUG_TAG);
        },
        (err) => {
          this.logger.error(
            err,
            DEBUG_TAG,
            'Could not save logged in user to db'
          );
        }
      );
  }

  async saveUserGroups(
    appMode: AppMode,
    user: ObserverResponseDto,
    observerGroups: ObserverGroupDto[]
  ): Promise<void> {
    const userGroups = (observerGroups || []).map((val) => {
      return {
        key: `${user.Guid}_${val.Id}`,
        userId: user.Guid,
        Id: val.Id,
        Name: val.Name
      };
    });
    const instanceName = NanoSql.getInstanceName(
      NanoSql.TABLES.OBSERVER_GROUPS.name,
      appMode
    );
    await nSQL(instanceName).loadJS(userGroups);
    await this.deleteUserGroupsNoLongerInResult(
      appMode,
      userGroups.map((ug) => ug.key)
    );
  }

  private async deleteUserGroupsNoLongerInResult(
    appMode: AppMode,
    ids: string[]
  ) {
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVER_GROUPS.name, appMode)
      .query('delete')
      .where(
        (dbGroup: { key: string; userId: string; Id: number; Name: string }) =>
          ids.indexOf(dbGroup.key) < 0
      )
      .exec();
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
