import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
import { switchMap, take, concatMap, delay, catchError } from 'rxjs/operators';
import { UserSetting } from './core/models/user-settings.model';

const DEBUG_TAG = 'AppComponent';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  swipeBackEnabled$: Observable<boolean>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userSettings: UserSettingService,
    private dataMarshallService: DataMarshallService,
    private offlineImageService: OfflineImageService,
    private swipeBackService: SwipeBackService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService,
    private screenOrientation: ScreenOrientation,
    private shortcutService: ShortcutService,
  ) {
    this.swipeBackEnabled$ = this.swipeBackService.swipeBackEnabled$;
    this.initializeApp();
  }

  initializeApp(): void {
    this.getUserSettings()
      .pipe(this.initServices(), delay(200))
      .subscribe(() => this.splashScreen.hide());
  }

  private lockScreenOrientation() {
    if (isAndroidOrIos(this.platform)) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  private initServices(): (src: Observable<unknown>) => Observable<unknown> {
    return (src: Observable<UserSetting>) => src.pipe(concatMap((userSettings) => forkJoin([
      of(this.lockScreenOrientation()).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not lock lockScreenOrientation'))),
      from(this.dbHelperService.init()).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init db'))),
      of(this.loggingService.configureLogging(userSettings.appMode)).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not configure loggine'))),
      of(this.statusBar.styleLightContent()).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not set styleLightContent'))),
      of(this.statusBar.backgroundColorByHexString('#99044962')).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not set backgroundColorByHexString'))),
      of(this.statusBar.overlaysWebView(false)).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not set overlaysWebView'))),
      of(this.offlineImageService.cleanupOldItems()).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not cleanup old items'))),
      of(this.dataMarshallService.init()).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init dataMarshallService'))),
      of(this.shortcutService.init()).pipe(catchError((err) => this.loggingService.error(err, DEBUG_TAG, 'Could not init shortcutService'))),
    ])));
  }

  private getUserSettings() {
    return from(this.platform.ready()).pipe(switchMap(() => this.userSettings.userSetting$.pipe(take(1))));
  }
}
