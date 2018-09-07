import { Component } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from './core/services/user-setting.service';
import { ObservationService } from './core/services/observation/observation.service';
import { TripLoggerService } from './core/services/trip-logger/trip-logger.service';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';
import { nSQL } from 'nano-sql';
import { settings } from '../settings';
import { WarningService } from './core/services/warning/warning.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { BackgroundFetch } from '@ionic-native/background-fetch/ngx';

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
    private tripLoggerService: TripLoggerService,
    private navController: NavController,
    private warningService: WarningService,
    private events: Events,
    private deeplinks: Deeplinks,
    private backgroundFetch: BackgroundFetch,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['no']);
    this.translate.setDefaultLang('no');
    this.platform.ready().then(async () => {
      try {
        this.initDeepLinks();
        await this.initNanoSqlDatabase();
        const userSettings = await this.userSettings.getUserSettings();
        this.translate.use(userSettings.language);
        this.statusBar.styleBlackTranslucent();
        this.statusBar.overlaysWebView(this.platform.is('ios'));
        if (!userSettings.completedStartWizard) {
          this.navController.navigateRoot('start-wizard', false);
        }
        this.splashScreen.hide();
        this.initBackroundUpdates();
      } catch (err) {
        // TODO: Log error
        console.log(err);
      }
    }).catch((err) => {
      // TODO: Log error
      console.log(err);
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
    await this.observationService.updateObservations();
    await this.warningService.updateAvalancheWarnings();
  }

  async initNanoSqlDatabase() {
    nSQL().config({
      id: settings.db.nanoSql.dbName,
      mode: getMode()
    });
    this.observationService.init();
    this.tripLoggerService.init();
    this.warningService.init();
    await nSQL().connect();
    this.events.publish('nanoSql: connected');
  }

  async initBackroundUpdates() {
    const config = {
      stopOnTerminate: false, // Set true to cease background-fetch from operating after user "closes" the app. Defaults to true.
      startOnBoot: true,
    };

    this.backgroundFetch.configure(config).then(async () => {
      await this.updateResources();
      this.backgroundFetch.finish();
    }).catch((e) => {
      if (e === settings.cordovaNotAvailable) {
        console.log('[INFO] Cordova not available, running backround update job in interval');
        setInterval(async () => {
          await this.updateResources();
        }, 2 * 60 * 1000); // Update frequency for observations on web implementation
      }
    });

    await this.updateResources(); // Update resources on startup
  }
}
