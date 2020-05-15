import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { OfflineImageService } from './core/services/offline-image/offline-image.service';
import { SwipeBackService } from './core/services/swipe-back/swipe-back.service';
import { Observable } from 'rxjs';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { DbHelperService } from './core/services/db-helper/db-helper.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ShortcutService } from './core/services/shortcut/shortcut.service';
import { isAndroidOrIos } from './core/helpers/ionic/platform-helper';

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
    private navController: NavController,
    private deeplinks: Deeplinks,
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

  initializeApp() {
    this.platform.ready().then(async () => {
      if (isAndroidOrIos(this.platform)) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      this.initDeepLinks();
      await this.dbHelperService.init();
      await this.userSettings.userSettingsReadyAsync();
      this.loggingService.configureLogging(this.userSettings.currentSettings.appMode);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#99044962');
      this.statusBar.overlaysWebView(false);
      // this.keyboard.hideFormAccessoryBar(false);
      this.offlineImageService.cleanupOldItems();
      this.dataMarshallService.init();
      this.shortcutService.init();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 200); // https://forum.ionicframework.com/t/android-splashscreen-fade-animation-on-hide-not-working/120130/2
    });
  }

  initDeepLinks() {
    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.deeplinks.route({
        '/registration/new/:geoHazard': 'New registration',
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        this.loggingService.debug('Successfully matched route', DEBUG_TAG, match);
        this.navController.navigateForward(match.$link.path);
      }, nomatch => this.loggingService.debug('Got a deeplink that didn\'t match', DEBUG_TAG, nomatch));
    }
  }
}
