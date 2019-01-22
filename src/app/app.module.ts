import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { APP_PROVIDERS } from './app.providers';
import { IonicStorageModule } from '@ionic/storage';
import { settings } from '../settings';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SupportTilesMenuComponent } from './components/side-menu/support-tiles-menu/support-tiles-menu.component';
import { FormsModule } from '@angular/forms';
import './core/helpers/nano-sql/nanoObserverToRxjs';
import './core/helpers/ionic/platform-helper';
import { UserLoginComponent } from './components/side-menu/user-login/user-login.component';
import { SharedModule } from './modules/shared/shared.module';
import { ObservationsDaysBackComponent } from './components/side-menu/observations-days-back/observations-days-back.component';
import { RegistrationModule } from './modules/registration/registration.module';
import { RegobsApiModule } from './modules/regobs-api/regobs-api.module';
import { LegalTermsModalPageModule } from './pages/modal-pages/legal-terms-modal/legal-terms-modal.module';
import { MarkdownModule } from 'ngx-markdown';
import { UpdateObservationsComponent } from './components/side-menu/update-observations/update-observations.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    SupportTilesMenuComponent,
    UserLoginComponent,
    ObservationsDaysBackComponent,
    UpdateObservationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LeafletModule.forRoot(),
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
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent],
})
export class AppModule { }
