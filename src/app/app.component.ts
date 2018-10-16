import { Component, NgZone } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { ObservationService } from './core/services/observation/observation.service';
import { settings } from '../settings';
import { WarningService } from './core/services/warning/warning.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { BackgroundFetch } from '@ionic-native/background-fetch/ngx';
import { NanoSql } from '../nanosql';
import { LangKey } from './core/models/langKey';
import { Router } from '@angular/router';

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
    private observationService: ObservationService,
    private navController: NavController,
    private warningService: WarningService,
    private events: Events,
    private deeplinks: Deeplinks,
    private backgroundFetch: BackgroundFetch,
    private router: Router,
    private zone: NgZone,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['no', 'en']);
    this.translate.setDefaultLang('no');
    this.platform.ready()
      .then(() => this.initDeepLinks())
      .then(() => this.initNanoSqlDatabase())
      .then(() => this.userSettings.getUserSettings())
      .then((userSettings) => {
        this.translate.use(LangKey[userSettings.language]);
        this.statusBar.styleBlackTranslucent();
        this.statusBar.overlaysWebView(this.platform.is('ios'));
        if (!userSettings.completedStartWizard) {
          return this.router.navigate(['start-wizard'], { replaceUrl: true });
        } else {
          return Promise.resolve(true);
        }
      })
      .then(() => {
        this.initBackroundUpdates();
        setTimeout(() => {
          this.splashScreen.hide();
        }, 500); // Wait a bit to get the navigation and background sync more completed
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

  async updateResources() {
    // TODO: implement cancel function to pass in.
    // Set timer to 25 seconds and cancel if running longer.
    this.zone.runOutsideAngular(async () => {
      await this.warningService.updateWarnings();
      await this.observationService.updateObservations();
    });
  }

  async initNanoSqlDatabase() {
    await NanoSql.init();
    this.events.publish('nanoSql: connected');
  }

  // TODO: Move to data sync sevice
  initBackroundUpdates() {
    const config = {
      minimumFetchInterval: 15, // <-- default is 15
      stopOnTerminate: false,    // <-- Android only
      startOnBoot: false,       // <-- Android only
      forceReload: false        // <-- Android only
    };
    // Be aware. If startOnBoot=true, stopOnTerminate must be false and forceReload must be true.
    // We don't want to force our app to always be running.
    // So for Android the app must be running for background fetch to be running.
    // To be able to fetch without forceReload, we must enable headless java code!
    // TODO: Write headless java code?
    // https://github.com/transistorsoft/cordova-plugin-background-fetch

    this.backgroundFetch.configure(config).then(() => this.updateResources().then(() => this.backgroundFetch.finish()))
      .catch((error) => {
        if (error === settings.cordovaNotAvailable) {
          console.log('[INFO] Cordova not available, running backround update job in interval');
          setInterval(async () => {
            await this.updateResources();
          }, 2 * 60 * 1000); // Update frequency for observations on web implementation
        }
      });

    this.updateResources(); // Update resources on startup
  }
}
