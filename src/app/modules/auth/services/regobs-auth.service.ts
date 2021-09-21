import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions, AuthService } from 'ionic-appauth';
import {
  BehaviorSubject,
  firstValueFrom,
  from,
  lastValueFrom,
  Observable
} from 'rxjs';
import { filter, map, shareReplay, skip, switchMap, tap } from 'rxjs/operators';
import { LangKey } from '@varsom-regobs-common/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoggedInUser } from '../../login/models/logged-in-user.model';
import {
  AccountService,
  ObserverResponseDto
} from '@varsom-regobs-common/regobs-api';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { Location } from '@angular/common';
import { StorageBackend } from '@openid/appauth';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';

const DEBUG_TAG = 'RegobsAuthService';
export const RETURN_URL_KEY = 'authreturnurl';
export const TOKEN_RESPONSE_KEY = 'token_response';
export const TOKEN_RESPONSE_FULL_KEY = 'token_response_full';

@Injectable({
  providedIn: 'root'
})
export class RegobsAuthService {
  private _isLoggingInSubject = new BehaviorSubject<boolean>(false);

  public readonly loggedInUser$: Observable<LoggedInUser>;
  private readonly initComplete$: Observable<boolean>;

  get isLoggingIn$(): Observable<boolean> {
    return this._isLoggingInSubject.asObservable();
  }

  constructor(
    private authService: AuthService,
    private userSettingService: UserSettingService,
    private logger: LoggingService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private location: Location,
    private accountService: AccountService,
    private storage: StorageBackend,
    private platform: Platform
  ) {
    this.initComplete$ = this.authService.initComplete$.pipe(
      filter((isComplete) => isComplete),
      shareReplay(1)
    );

    const tokenWithClaims$ = this.initComplete$.pipe(
      switchMap(() =>
        this.authService.token$.pipe(
          map((tokenResponse) => ({
            tokenResponse,
            claims: tokenResponse?.idToken
              ? this.parseJwt(tokenResponse.idToken)
              : undefined
          }))
        )
      )
    );

    this.loggedInUser$ = this.initComplete$.pipe(
      switchMap(() => tokenWithClaims$),
      tap((tokenResponseWithClaims) => {
        const tokenResponse = tokenResponseWithClaims.tokenResponse;
        const issuedAt = tokenResponseWithClaims.tokenResponse?.issuedAt;
        const issuedAtNice = issuedAt ? new Date(issuedAt * 1000) : undefined;
        const gotToken = tokenResponse?.idToken ? 'OK' : 'NO TOKEN';
        this.logger.debug(
          `Token: ${gotToken}, issued at: ${issuedAtNice}`,
          DEBUG_TAG
        );
      }),
      map((tokenResponseWithClaims) => ({
        isLoggedIn: tokenResponseWithClaims?.tokenResponse != null,
        token: tokenResponseWithClaims?.tokenResponse?.idToken,
        tokenIssuedAt: tokenResponseWithClaims?.tokenResponse?.issuedAt,
        email: tokenResponseWithClaims?.claims?.email
      })),
      shareReplay(1)
    );

    const events$ = this.initComplete$.pipe(
      switchMap(() => this.authService.events$)
    );

    events$
      .pipe(
        filter(
          (action) =>
            action.action === AuthActions.SignInFailed &&
            action.error !== 'Handle Not Available'
        )
      )
      .subscribe((action) => this.showErrorMessage(500, action.error));

    events$
      .pipe(
        filter(
          (action) =>
            action.action === AuthActions.RefreshFailed &&
            action.error === 'AADB2C90090'
        )
      )
      .subscribe(() => this.signIn(false)); // Hack to detect user is coming from reset password flow. Route user back to login.

    events$
      .pipe(filter((action) => action.action === AuthActions.SignInSuccess))
      .subscribe(async () => {
        await this.redirectToReturnUrl();
        await this.checkAndSetNickIfNickIsNull();
      });

    this.userSettingService.appMode$.pipe(skip(1)).subscribe(() => {
      this.logout(); // When user change app mode, just logout and force user to login again for the new environment.
    });

    this.initRefreshTokenOnStartup();
  }

  private initRefreshTokenOnStartup() {
    this.initComplete$
      .pipe(
        switchMap(() =>
          isAndroidOrIos(this.platform)
            ? this.platform.resume
            : from(this.platform.ready())
        )
      )
      .subscribe(() => {
        this.logger.debug('App resumed. Refresh token...', DEBUG_TAG);
        this.refreshToken();
      });
  }

  public refreshToken(): Promise<void> {
    return this.authService.refreshToken();
  }

  public authorizationCallback(url: string): void {
    try {
      this.authService.authorizationCallback(url);
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not call authorizationCallback');
    }
  }

  public async signIn(setReturnUrl = true): Promise<void> {
    const currentLang = await firstValueFrom(this.userSettingService.language$);
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
    await this.storage.removeItem(TOKEN_RESPONSE_KEY);
    this.authService.endSessionCallback();
  }

  private async checkAndSetNickIfNickIsNull(): Promise<ObserverResponseDto> {
    try {
      const user = await lastValueFrom(
        this.accountService.AccountGetObserver()
      );
      if (user && user.Nick != null && user.Nick != '') {
        return;
      }
      const nick = await this.showSetNickDialog();
      await lastValueFrom(
        this.accountService.AccountUpdateObserver({ Nick: nick })
      );
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not save nick');
    }
  }

  private async showSetNickDialog(): Promise<string> {
    const headerTextKey = 'SET_NICK_ALERT.INPUT_TEXT';
    const messageTextKey = 'SET_NICK_ALERT.HELP_TEXT';
    const okTextKey = 'DIALOGS.OK';
    const translations = await lastValueFrom(
      this.translateService.get([headerTextKey, messageTextKey, okTextKey])
    );
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
    return firstValueFrom(this.loggedInUser$);
  }

  private async redirectToReturnUrl(): Promise<void> {
    if (this.location.path().indexOf('auth/callback') >= 0) {
      const returnUrl = localStorage.getItem(RETURN_URL_KEY);
      if (returnUrl) {
        localStorage.removeItem(RETURN_URL_KEY);
        this.location.replaceState(
          this.router.serializeUrl(this.router.createUrlTree(['']))
        );
        await this.navCtrl.navigateForward(returnUrl);
      } else {
        await this.navCtrl.navigateRoot('');
      }
    }
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
    const translations = await lastValueFrom(
      this.translateService.get([
        'ALERT.DEFAULT_HEADER',
        'ALERT.OK',
        messageText
      ])
    );
    const alert = await this.alertController.create({
      header: translations['ALERT.DEFAULT_HEADER'],
      message: `${translations[messageText]}${extraMessage}`,
      buttons: [translations['ALERT.OK']]
    });
    await alert.present();
  }

  private getSupportedLoginLocales(langKey: LangKey) {
    if (langKey === LangKey.nb || langKey === LangKey.nn) {
      return 'nb-NO';
    }
    return 'en';
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
