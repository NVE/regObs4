import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
import { StatusBar, Style } from '@capacitor/status-bar';

const DEBUG_TAG = 'AppComponent';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  swipeBackEnabled$: Observable<boolean>;

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
    private fileLoggingService: FileLoggingService
  ) {
    this.swipeBackEnabled$ = this.swipeBackService.swipeBackEnabled$;
    this.initializeApp();
  }

  initializeApp(): void {
    from(this.fileLoggingService.init({})).pipe(switchMap(() =>
      this.getUserSettings()
        .pipe(this.initServices())))
      .subscribe(() => {
        this.loggingService.debug('Init complete. Hide splash screen', DEBUG_TAG);
        this.afterAppInitialized();
      }, (err) => {
        this.loggingService.error(err, DEBUG_TAG, 'Error when init app.');
        this.afterAppInitialized();
      });
  }

  afterAppInitialized() {
    SplashScreen.hide();
  }

  private lockScreenOrientation() {
    if (isAndroidOrIos(this.platform)) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  private initServices(): (src: Observable<unknown>) => Observable<unknown> {
    return (src: Observable<UserSetting>) =>
      src.pipe(
        concatMap((userSettings) =>
          forkJoin([
            of(this.lockScreenOrientation()).pipe(
              catchError((err) =>
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not lock lockScreenOrientation'
                )
              )
            ),
            from(this.dbHelperService.init()).pipe(
              catchError((err) =>
                this.loggingService.error(err, DEBUG_TAG, 'Could not init db')
              )
            ),
            of(this.loggingService.configureLogging(userSettings.appMode)).pipe(
              catchError((err) =>
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not configure logging'
                )
              )
            ),
            from(StatusBar.setStyle({ style: Style.Dark })).pipe(
              catchError((err) => {
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not set styleLightContent'
                );
                return of(void null);
              }
              )
            ),
            from(StatusBar.setBackgroundColor({ color: '#99044962'})).pipe(
              catchError((err) => {
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not set backgroundColorByHexString'
                );
                return of(void null);
              }
              )
            ),
            from(StatusBar.setOverlaysWebView({ overlay: false })).pipe(
              catchError((err) =>
              {
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not set overlaysWebView'
                );
                return of(void null);
              }
              )
            ),
            from(this.offlineImageService.cleanupOldItems()).pipe(
              catchError((err) =>
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not cleanup old items'
                )
              )
            ),
            of(this.shortcutService.init()).pipe(
              catchError((err) =>
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not init shortcutService'
                )
              )
            ),
            of( this.dataMarshallService.init()).pipe(
              catchError((err) =>
                this.loggingService.error(
                  err,
                  DEBUG_TAG,
                  'Could not init dataMarshallService'
                )
              )
            ),
          ])
        )
      );
  }

  private getUserSettings() {
    return from(this.platform.ready()).pipe(
      switchMap(() => this.userSettings.userSetting$.pipe(take(1)))
    );
  }
}
