import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_PROVIDERS } from './app.providers';
import { IonicStorageModule } from '@ionic/storage';
import { settings } from '../settings';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import './core/helpers/ionic/platform-helper';
import { SharedModule } from './modules/shared/shared.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { RegobsApiModule } from './modules/regobs-api/regobs-api.module';
import { LegalTermsModalPageModule } from './pages/modal-pages/legal-terms-modal/legal-terms-modal.module';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuModule } from './modules/side-menu/side-menu.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { GpsDebugModule } from './modules/gps-debug/gps-debug.module';
import { CustomTranslateLoader } from './custom-translate.loader';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    }),
    MarkdownModule.forRoot(),
    IonicStorageModule.forRoot({
      name: settings.db.simpleStorage.dbName,
      driverOrder: ['sqlite', 'indexeddb', 'websql'],
    }),
    AngularSvgIconModule,
    SharedModule,
    RegistrationModule,
    RegobsApiModule,
    LegalTermsModalPageModule,
    SideMenuModule,
    GpsDebugModule,
    AnalyticsModule.forRoot(),
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent],
})
export class AppModule {
}
