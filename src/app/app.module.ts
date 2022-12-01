import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_PROVIDERS } from './app.providers';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { LegalTermsModalPageModule } from './pages/modal-pages/legal-terms-modal/legal-terms-modal.module';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuModule } from './modules/side-menu/side-menu.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { GpsDebugModule } from './modules/gps-debug/gps-debug.module';
import { MapModule } from './modules/map/map.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RegistrationModule as CommonRegistrationModule } from './modules/common-registration/registration.module';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { settings } from 'src/settings';
import { RegobsApiModuleWithConfig } from './modules/common-regobs-api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
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
    CommonRegistrationModule.forRoot(),
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent],
})
export class AppModule {}
