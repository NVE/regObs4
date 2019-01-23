import { Component, NgZone } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { BackgroundFetch } from '@ionic-native/background-fetch/ngx';
import { NanoSql } from '../nanosql';
import { LangKey } from './core/models/langKey';
import { OfflineMapService } from './core/services/offline-map/offline-map.service';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { OfflineImageService } from './core/services/offline-image/offline-image.service';
import { SwipeBackService } from './core/services/swipe-back/swipe-back.service';
import { Observable } from 'rxjs';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { AnalyticService } from './core/services/analytic/analytic.service';

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
    private translate: TranslateService,
    private userSettings: UserSettingService,
    private navController: NavController,
    private deeplinks: Deeplinks,
    private backgroundFetch: BackgroundFetch,
    private zone: NgZone,
    private dataMarshallService: DataMarshallService,
    private offlineMapService: OfflineMapService,
    private offlineImageService: OfflineImageService,
    private keyboard: Keyboard,
    private swipeBackService: SwipeBackService,
    private loggingService: LoggingService,
    private analyticService: AnalyticService,
  ) {
    this.swipeBackEnabled$ = this.swipeBackService.swipeBackEnabled$;
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['no', 'en']);
    this.translate.setDefaultLang('no');
    this.platform.ready().then(async () => {
      // await this.initDeepLinks(); //TODO: Comment in when edit registration is possible
      await this.initNanoSqlDatabase();
      const userSettings = await this.userSettings.getUserSettings();
      this.loggingService.configureLogging(userSettings.appMode);
      this.analyticService.init();
      this.translate.use(LangKey[userSettings.language]);
      this.statusBar.styleBlackTranslucent();
      this.statusBar.overlaysWebView(this.platform.is('ios'));
      this.keyboard.hideFormAccessoryBar(false);
      this.offlineMapService.cleanupTilesCache(userSettings.tilesCacheSize);
      this.offlineImageService.cleanupOldItems();

      this.initBackroundUpdates();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 200); // https://forum.ionicframework.com/t/android-splashscreen-fade-animation-on-hide-not-working/120130/2
    });
  }

  initDeepLinks() {
    this.deeplinks.route({
      '/Registration/:id': 'view-observation',
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      this.navController.navigateForward(`view-observation/${match.$args.id}`);
    });
  }

  async initNanoSqlDatabase() {
    return this.zone.runOutsideAngular(async () => {
      await NanoSql.init();
    });
  }

  initBackroundUpdates() {
    if (this.platform.is('cordova') && (this.platform.is('ios') || this.platform.is('android'))) {
      // Be aware. If startOnBoot=true, stopOnTerminate must be false and forceReload must be true.
      // We don't want to force our app to always be running.
      // So for Android the app must be running for background fetch to be running.
      // To be able to fetch without forceReload, we must enable headless java code!
      // TODO: Write headless java code?
      // https://github.com/transistorsoft/cordova-plugin-background-fetch
      const config = {
        minimumFetchInterval: 15, // <-- default is 15
        stopOnTerminate: true,    // <-- Android only (when forceReload is false, this needs to be true)
        startOnBoot: false,       // <-- Android only (when forceReload is false, this needs to be false)
        forceReload: false        // <-- Android only. We don't want to force our app to always be running.
      };
      // ALSO NOTE: Could not get Ionic Native Background fetch to work, so using ((any)window).BackgroundFetch
      // (direct use of cordova plugin) instead. To test Android:
      // Open command window with log: adb logcat -s TSBackgroundFetch
      // Force run in another command window: adb shell cmd jobscheduler run -f no.nve.regobs 999
      // Run chrome://inspect to view console.logs from update
      (<any>window).BackgroundFetch.configure(() => {
        this.dataMarshallService.backgroundFetchUpdate(this.platform.is('cordova') && this.platform.is('ios'), false)
          .then(() => (<any>window).BackgroundFetch.finish());
      }, (error: Error) => {
        this.loggingService.error(error, 'BackroundFetchInit', 'Could not run background fetch!');
      }, config);
    }
  }
}
