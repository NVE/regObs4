import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
import { BackgroundGeolocationService } from './core/services/background-geolocation/background-geolocation.service';

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
    private backroundGeolocationService: BackgroundGeolocationService,
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
