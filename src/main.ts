/* eslint-disable no-console */
import { enableProdMode, importProvidersFrom, NgZone } from '@angular/core';
import { environment } from './environments/environment';
import { NanoSql } from './nanosql';
import '@angular/compiler';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_PROVIDERS } from './app/app.providers';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideIonicAngular, IonicRouteStrategy, Platform, isPlatform } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { settings } from 'src/settings';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AnalyticsModule } from './app/modules/analytics/analytics.module';
import { RegobsApiModuleWithConfig } from './app/modules/common-regobs-api';
import { RegistrationModule as CommonRegistrationModule } from './app/modules/common-registration/registration.module';
import { AppComponent } from './app/app.component';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { routes } from './app/app.routes';
import { Requestor, StorageBackend } from '@openid/appauth';
import { storageFactory } from './app/modules/auth/factories/storage-factory';
import { httpFactory } from './app/modules/auth/factories/http-factory';
import { AuthService, Browser, DefaultBrowser } from 'ionic-appauth';
import { CapacitorBrowser } from 'ionic-appauth/lib/capacitor';
import { authFactory } from './app/modules/auth/factories/auth-factory';
import { UserSettingService } from './app/core/services/user-setting/user-setting.service';

if (environment.production) {
  enableProdMode();
}

function startApp() {
  console.log('starting app');
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular({}),

      // Auth related - kan evt flyttes til egen fil eller i APP_PROVIDERS
      {
        provide: StorageBackend,
        useFactory: storageFactory,
        deps: [Platform],
      },
      {
        provide: Requestor,
        useFactory: httpFactory,
        deps: [Platform, HttpClient],
      },
      {
        provide: Browser,
        useClass: isPlatform('hybrid') ? CapacitorBrowser : DefaultBrowser,
      },
      {
        provide: AuthService,
        useFactory: authFactory,
        deps: [Platform, NgZone, Requestor, Browser, StorageBackend, UserSettingService],
      },

      importProvidersFrom(
        BrowserModule,
        FormsModule,
        IonicStorageModule.forRoot({
          driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB],
          storeName: settings.db.nanoSql.dbName,
        }),
        TranslateModule.forRoot(),
        MarkdownModule.forRoot(),
        AngularSvgIconModule.forRoot(),
        LeafletModule,
        AnalyticsModule.forRoot(),
        RegobsApiModuleWithConfig.forRoot(),
        CommonRegistrationModule.forRoot()
      ),

      // Prøvde å legge til withPreloading(PreloadAllModules) men da kræsjet applikasjonen
      // TODO: Prøv igjen etter vi har rydda opp, fjerna alle moduler.
      provideRouter(routes),

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
