import { Component } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from './core/services/user-setting.service';
import { BackgroundFetchService } from './core/services/background-fetch/background-fetch.service';
import { ObservationService } from './core/services/observation/observation.service';
import { TripLoggerService } from './core/services/trip-logger/trip-logger.service';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';
import { nSQL } from 'nano-sql';
import { settings } from '../settings';
import { WarningService } from './core/services/warning/warning.service';
import { ViewObservationPage } from './pages/view-observation/view-observation.page';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

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
    private backgroundFetchService: BackgroundFetchService,
    private observationService: ObservationService,
    private tripLoggerService: TripLoggerService,
    private navController: NavController,
    private warningService: WarningService,
    private events: Events,
    private deeplinks: Deeplinks,
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
        await this.updateResources();
        this.backgroundFetchService.init();
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
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
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
}
