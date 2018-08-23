import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
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
import { StartWizardPage } from './pages/start-wizard/start-wizard.page';

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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['no']);
    this.translate.setDefaultLang('no');
    this.platform.ready().then(async () => {
      try {
        await this.initNanoSqlDatabase();
        const userSettings = await this.userSettings.getUserSettings();
        this.translate.use(userSettings.language);
        this.statusBar.styleBlackTranslucent();
        if (!userSettings.completedStartWizard) {
          this.navController.goRoot('start-wizard', false);
        }
        this.splashScreen.hide();
        this.backgroundFetchService.init();
        await this.observationService.updateObservations(); // Update observations on app start
        // after that observations is updated every 15 minutes in background fetch service
      } catch (err) {
        // TODO: Log error
        console.log(err);
      }
    }).catch((err) => {
      // TODO: Log error
      console.log(err);
    });
  }

  initNanoSqlDatabase() {
    nSQL().config({
      id: settings.db.nanoSql.dbName,
      mode: getMode()
    });
    this.observationService.init();
    this.tripLoggerService.init();
    return nSQL().connect();
  }
}
