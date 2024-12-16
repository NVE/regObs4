/* eslint-disable no-console */
import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { NanoSql } from './nanosql';
import '@angular/compiler';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_PROVIDERS } from './app/app.providers';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { settings } from 'src/settings';
import { AppRoutingModule } from './app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from './app/modules/shared/shared.module';
import { MapModule } from './app/modules/map/map.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RegistrationModule } from './app/modules/registration/registration.module';
import { LegalTermsModalPageModule } from './app/pages/modal-pages/legal-terms-modal/legal-terms-modal.module';
import { SideMenuModule } from './app/modules/side-menu/side-menu.module';
import { GpsDebugModule } from './app/modules/gps-debug/gps-debug.module';
import { AnalyticsModule } from './app/modules/analytics/analytics.module';
import { RegobsApiModuleWithConfig } from './app/modules/common-regobs-api';
import { RegistrationModule as CommonRegistrationModule } from './app/modules/common-registration/registration.module';
import { AppComponent } from './app/app.component';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

if (environment.production) {
  enableProdMode();
}

function startApp() {
  console.log('starting app');
  bootstrapApplication(AppComponent, {
    providers: [
      provideIonicAngular({}),
      importProvidersFrom(
        BrowserModule,
        FormsModule,
        IonicStorageModule.forRoot({
          driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB],
          storeName: settings.db.nanoSql.dbName,
        }),
        AppRoutingModule,
        TranslateModule.forRoot(),
        MarkdownModule.forRoot(),
        AngularSvgIconModule.forRoot(),
        SharedModule,
        MapModule,
        LeafletModule,
        RegistrationModule,
        LegalTermsModalPageModule,
        SideMenuModule,
        GpsDebugModule,
        AnalyticsModule.forRoot(),
        RegobsApiModuleWithConfig.forRoot(),
        CommonRegistrationModule.forRoot()
      ),
      provideHttpClient(withInterceptorsFromDi()),
      ...APP_PROVIDERS,
      provideAnimations(),
    ],
  }).catch((err) => console.log(err));
}

document.addEventListener(typeof cordova !== 'undefined' ? 'deviceready' : 'DOMContentLoaded', async () => {
  console.log('Init NanoSql database');
  try {
    await NanoSql.init();
    startApp();
  } catch (err) {
    console.error('Error init NanoSql database', err);
    startApp(); // Try to start app anyway
  }
});
