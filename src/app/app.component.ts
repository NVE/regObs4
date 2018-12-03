import { Component, NgZone } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';
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
import * as Sentry from 'sentry-cordova';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { environment } from '../environments/environment';
import { AppMode } from './core/models/app-mode.enum';
import { settings } from '../settings';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private userSettings: UserSettingService,
    private navController: NavController,
    private events: Events,
    private deeplinks: Deeplinks,
    private backgroundFetch: BackgroundFetch,
    private zone: NgZone,
    private dataMarshallService: DataMarshallService,
    private offlineMapService: OfflineMapService,
    private appVersion: AppVersion,
    private keyboard: Keyboard,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['no', 'en']);
    this.translate.setDefaultLang('no');
    this.platform.ready().then(async () => {
      // await this.initDeepLinks(); //TODO: Comment in when edit registration is possible
      await this.initNanoSqlDatabase();
      const userSettings = await this.userSettings.getUserSettings();
      await this.setSentryRelease(userSettings.appMode);
      this.translate.use(LangKey[userSettings.language]);
      this.statusBar.styleBlackTranslucent();
      this.statusBar.overlaysWebView(this.platform.is('ios'));
      this.keyboard.hideFormAccessoryBar(false);
      this.offlineMapService.cleanupTilesCache(userSettings.tilesCacheSize);

      this.initBackroundUpdates();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 500); // https://forum.ionicframework.com/t/android-splashscreen-fade-animation-on-hide-not-working/120130/2
    });
  }

  initDeepLinks() {
    this.deeplinks.route({
      '/Registration/:id': 'view-observation',
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
      this.navController.navigateForward(`view-observation/${match.$args.id}`);
    });
  }

  async initNanoSqlDatabase() {
    return this.zone.runOutsideAngular(async () => {
      await NanoSql.init();
      this.events.publish('nanoSql: connected');
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
      }, (error) => {
        console.log('[ERROR] Could not run background fetch!');
        // TODO: Log error
      }, config);
    }
  }

  async setSentryRelease(appMode: AppMode) {
    Sentry.init(
      {
        dsn: settings.sentryDsn,
        environment: appMode === AppMode.Prod ? 'regObs' : (appMode === AppMode.Demo ? 'demo regObs' : 'test regObs'),
        enabled: environment.production,
      });
    if (this.platform.is('cordova') && (this.platform.is('android') || this.platform.is('ios'))) {
      const appVersion = await this.appVersion.getVersionNumber();
      Sentry.setRelease(appVersion);
    }
  }
}
