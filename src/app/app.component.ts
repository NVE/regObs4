import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserSettingService } from './core/services/user-setting.service';
import { BackgroundFetchService } from './core/services/background-fetch/background-fetch.service';
import { nSQL } from '../../node_modules/nano-sql';
import { settings } from '../settings';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';

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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.addLangs(['no']);
    this.translate.setDefaultLang('no');
    this.platform.ready().then(async () => {
      try {
        await this.connectDb();

        const userSettings = await this.userSettings.getUserSettings();
        this.translate.use(userSettings.language);
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.backgroundFetchService.init();
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  async connectDb() {
    return nSQL('regObsObservation') //  "users" is our table name.
      .model([ // Declare data model
        { key: 'RegId', type: 'number', props: ['pk'] },
        { key: 'Latitude', type: 'number' },
        { key: 'Longitude', type: 'number' },
      ])
      .config({
        id: 'regobsObservatons',
        mode: getMode()
      })
      .connect();
  }
}
