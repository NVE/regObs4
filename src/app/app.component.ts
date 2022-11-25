import { Component, HostListener, Injector } from '@angular/core';
import { isPlatform, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { OfflineImageService } from './core/services/offline-image/offline-image.service';
import { SwipeBackService } from './core/services/swipe-back/swipe-back.service';
import { Observable, from, forkJoin, of } from 'rxjs';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { DbHelperService } from './core/services/db-helper/db-helper.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ShortcutService } from './core/services/shortcut/shortcut.service';
import { isAndroidOrIos } from './core/helpers/ionic/platform-helper';
import { switchMap, take, concatMap, catchError } from 'rxjs/operators';
import { UserSetting } from './core/models/user-settings.model';
import { FileLoggingService } from './modules/shared/services/logging/file-logging.service';
import { AuthService } from 'ionic-appauth';
import { DraftToRegistrationService } from './core/services/draft/draft-to-registration.service';
import { BreakpointService } from './core/services/breakpoint.service';
import { Keyboard } from '@capacitor/keyboard';
import { SqliteService } from './core/services/sqlite/sqlite.service';

const DEBUG_TAG = 'AppComponent';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  swipeBackEnabled$: Observable<boolean>;
  isDesktop: boolean;

  constructor(
    private platform: Platform,
    private userSettings: UserSettingService,
    private dataMarshallService: DataMarshallService,
    private offlineImageService: OfflineImageService,
    private swipeBackService: SwipeBackService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService,
    private screenOrientation: ScreenOrientation,
    private shortcutService: ShortcutService,
    private fileLoggingService: FileLoggingService,
    private auth: AuthService,
    private draftToRegService: DraftToRegistrationService,
    private breakpointService: BreakpointService,
    private injector: Injector
  ) {
    this.swipeBackEnabled$ = this.swipeBackService.swipeBackEnabled$;
    this.initializeApp();
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  initializeApp(): void {
    if (this.platform.is('ios')) {
      Keyboard.setAccessoryBarVisible({ isVisible: true });
    }

    this.platform.ready().then(() => {
      this.breakpointService.onResize(this.platform.width());
    });

    from(this.fileLoggingService.init({}))
      .pipe(switchMap(() => this.getUserSettings().pipe(this.initServices())))
      .subscribe({
        next: () => {
          this.loggingService.debug('Init complete. Hide splash screen', DEBUG_TAG);
          this.afterAppInitialized();
        },
        error: (err) => {
          this.loggingService.error(err, DEBUG_TAG, 'Error when init app.');
          this.afterAppInitialized();
        },
      });
  }

  private afterAppInitialized() {
    SplashScreen.hide();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.breakpointService.onResize(event.target.innerWidth);
  }

  private lockScreenOrientation() {
    if (isAndroidOrIos(this.platform)) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  private initServices(): (src: Observable<unknown>) => Observable<unknown> {
    return (src: Observable<UserSetting>) =>
      src.pipe(
        concatMap((userSettings) => {
          const observables = [
            of(this.lockScreenOrientation()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not lock lockScreenOrientation'))
            ),
            from(this.dbHelperService.init()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init db'))
            ),
            of(this.loggingService.configureLogging(userSettings.appMode)).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not configure logging'))
            ),
            from(this.offlineImageService.cleanupOldItems()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not cleanup old items'))
            ),
            of(this.shortcutService.init()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init shortcutService'))
            ),
            from(this.auth.init()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init auth service'))
            ),
            of(this.dataMarshallService.init()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init dataMarshallService'))
            ),
            of(this.draftToRegService.createSubscriptions()).pipe(
              catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not start draftToRegService'))
            ),
          ];

          if (isPlatform('hybrid')) {
            const sqliteService = this.injector.get<SqliteService>(SqliteService);
            observables.push(of(sqliteService.init()));
          }

          return forkJoin(observables);
        })
      );
  }

  private getUserSettings() {
    return from(this.platform.ready()).pipe(switchMap(() => this.userSettings.userSetting$.pipe(take(1))));
  }
}
