import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions, AuthService } from 'ionic-appauth';
import { BehaviorSubject, firstValueFrom, from, lastValueFrom, Observable, of, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, skip, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { LangKey } from 'src/app/modules/common-core/models';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoggedInUser } from '../../login/models/logged-in-user.model';
import { MyPageData, ObserverResponseDto } from 'src/app/modules/common-regobs-api/models';
import { AccountService } from 'src/app/modules/common-regobs-api/services';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { Location } from '@angular/common';
import { nowInSeconds, StorageBackend } from '@openid/appauth';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { NetworkStatusService } from 'src/app/core/services/network-status/network-status.service';

const DEBUG_TAG = 'RegobsAuthService';
export const RETURN_URL_KEY = 'authreturnurl';
export const TOKEN_RESPONSE_KEY = 'token_response';
export const TOKEN_RESPONSE_FULL_KEY = 'token_response_full';

@Injectable({
  providedIn: 'root',
})
export class RegobsAuthService {
  private _isLoggingInSubject = new BehaviorSubject<boolean>(false);
  private myPageDataSubject = new ReplaySubject<MyPageData>();

  public readonly loggedInUser$: Observable<LoggedInUser>;
  private readonly initComplete$: Observable<boolean>;
  readonly myPageData$: Observable<MyPageData>;

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
    private platform: Platform,
    private accountApi: AccountService,
    private networkStatusService: NetworkStatusService
  ) {
    this.initComplete$ = this.authService.initComplete$.pipe(
      filter((isComplete) => isComplete),
      shareReplay(1)
    );

    this.loggedInUser$ = this.createLoggedInUser$();

    const events$ = this.initComplete$.pipe(switchMap(() => this.authService.events$));

    events$
      .pipe(filter((action) => action.action === AuthActions.SignInFailed && action.error !== 'Handle Not Available'))
      .subscribe((action) => this.showErrorMessage(500, action.error));

    events$
      .pipe(filter((action) => action.action === AuthActions.RefreshFailed && action.error === 'AADB2C90090'))
      .subscribe(() => this.signIn(false)); // Hack to detect user is coming from reset password flow. Route user back to login.

    events$.pipe(filter((action) => action.action === AuthActions.SignInSuccess)).subscribe(async () => {
      await this.redirectToReturnUrl();
      await this.checkAndSetNickIfNickIsNull();
    });

    this.userSettingService.appMode$.pipe(skip(1)).subscribe(() => {
      this.logout(); // When user change app mode, just logout and force user to login again for the new environment.
    });

    // TODO: This could be saved in offline storage if we want to presist
    // myPage data and the user start app when offline and want to edit registration
    this.myPageData$ = this.loggedInUser$.pipe(
      switchMap((loggedInUser) => {
        if (loggedInUser.isLoggedIn) {
          return this.accountApi.AccountGetMyPageData();
        } else {
          return of(undefined);
        }
      }),
      shareReplay(1)
    );

    this.initRefreshTokenOnStartup();
  }

  private createLoggedInUser$(): Observable<LoggedInUser> {
    const tokenWithClaims$ = this.createTokenWithClaims$();
    return this.initComplete$.pipe(
      switchMap(() => tokenWithClaims$),
      tap((tokenResponseWithClaims) => {
        const tokenResponse = tokenResponseWithClaims.tokenResponse;
        const issuedAt = tokenResponseWithClaims.tokenResponse?.issuedAt;
        const issuedAtNice = issuedAt ? new Date(issuedAt * 1000) : undefined;
        const gotToken = tokenResponse?.idToken ? 'OK' : 'NO TOKEN';
        this.logger.debug(`Token: ${gotToken}, issued at: ${issuedAtNice}`, DEBUG_TAG);
      }),
      map((tokenResponseWithClaims) => ({
        isLoggedIn: tokenResponseWithClaims?.tokenResponse != null,
        token: tokenResponseWithClaims?.tokenResponse?.idToken,
        tokenIssuedAt: tokenResponseWithClaims?.tokenResponse?.issuedAt,
        email: tokenResponseWithClaims?.claims?.email,
      })),
      shareReplay(1)
    );
  }

  private createTokenWithClaims$() {
    return this.initComplete$.pipe(
      switchMap(() =>
        this.authService.token$.pipe(
          map((tokenResponse) => ({
            tokenResponse,
            claims: tokenResponse?.idToken ? this.parseJwt(tokenResponse.idToken) : undefined,
          }))
        )
      )
    );
  }

  private initRefreshTokenOnStartup() {
    this.initComplete$
      .pipe(
        tap(this.logger.debug('Authorization initialized. Will try to refresh token when we come online', DEBUG_TAG)),
        switchMap(() => this.networkStatusService.connected$.pipe(filter((connected) => connected === true))),
        withLatestFrom(this.loggedInUser$)
      )
      .subscribe(([, user]) => {
        if (user?.token && this.isTokenOlderThan(user?.tokenIssuedAt, 300)) {
          //token is older than 5 minutes and we have network, so refresh
          this.logger.debug('We are online. Refresh token...', DEBUG_TAG);
          this.refreshToken();
        }
      });
  }

  isTokenOlderThan(tokenIssuedAt: number, ageInSeconds: number): boolean {
    return tokenIssuedAt && tokenIssuedAt < nowInSeconds() - ageInSeconds;
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
      const url = this.router.url;
      this.logger.debug(`SignIn: ReturnUrl = '${url}'`, DEBUG_TAG);
      localStorage.setItem(RETURN_URL_KEY, url);
    }
    try {
      await this.authService.signIn({
        ui_locales: this.getSupportedLoginLocales(currentLang),
        prompt: 'login', // Force login screen
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
      const user = await lastValueFrom(this.accountService.AccountGetObserver());
      if (user && user.Nick != null && user.Nick != '') {
        return;
      }
      const nick = await this.showSetNickDialog();
      await lastValueFrom(this.accountService.AccountUpdateObserver({ Nick: nick }));
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Could not save nick');
    }
  }

  private async showSetNickDialog(): Promise<string> {
    const headerTextKey = 'SET_NICK_ALERT.INPUT_TEXT';
    const messageTextKey = 'SET_NICK_ALERT.HELP_TEXT';
    const okTextKey = 'DIALOGS.OK';
    const translations = await lastValueFrom(this.translateService.get([headerTextKey, messageTextKey, okTextKey]));
    const alert = await this.alertController.create({
      header: translations[headerTextKey],
      message: translations[messageTextKey],
      backdropDismiss: false,
      inputs: [
        {
          name: 'nick',
          type: 'text',
          max: 24,
          placeholder: translations[headerTextKey],
        },
      ],
      buttons: [
        {
          text: translations[okTextKey],
          handler: (data: { nick: string }) => {
            return data && data.nick != null && data.nick != '';
          },
        },
      ],
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
      this.logger.debug(`redirectToReturnUrl: returnUrl from localStorage = '${returnUrl}'`, DEBUG_TAG);
      if (returnUrl) {
        localStorage.removeItem(RETURN_URL_KEY);
        this.location.replaceState(this.router.serializeUrl(this.router.createUrlTree([''])));
        // Use replaceUrl to remove /auth/callback from history
        await this.navCtrl.navigateForward(returnUrl, { replaceUrl: true });
      } else {
        await this.navCtrl.navigateRoot('', { replaceUrl: true });
      }
    }
  }

  private async showErrorMessage(status: number, messageFromServer: string) {
    this.logger.debug(`SignInFailed: Status = ${status}, message = ${messageFromServer}`, DEBUG_TAG);
    let messageKeyPostFix = 'UNKNOWN_ERROR';

    if (status === 401) {
      messageKeyPostFix = 'UNAUTHORIZED';
    } else if (status <= 0 || messageFromServer === 'Unable To Obtain Server Configuration') {
      messageKeyPostFix = 'SERVICE_UNAVAILABLE';
    }
    const messageKey = `LOGIN.${messageKeyPostFix}`;
    const extraMessage = messageKeyPostFix === 'UNKNOWN_ERROR' ? ` ${messageFromServer}` : '';
    const translations = await lastValueFrom(
      this.translateService.get(['ALERT.DEFAULT_HEADER', 'ALERT.OK', messageKey])
    );
    const alert = await this.alertController.create({
      header: translations['ALERT.DEFAULT_HEADER'],
      message: `${translations[messageKey]}${extraMessage}`,
      buttons: [translations['ALERT.OK']],
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
