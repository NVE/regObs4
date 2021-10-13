import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_PROVIDERS } from './app.providers';
import { settings } from '../settings';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { RegobsApiModule } from './modules/regobs-api/regobs-api.module';
import { LegalTermsModalPageModule } from './pages/modal-pages/legal-terms-modal/legal-terms-modal.module';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuModule } from './modules/side-menu/side-menu.module';
import { GpsDebugModule } from './modules/gps-debug/gps-debug.module';
import { MapModule } from './modules/map/map.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot(),
    MarkdownModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    SharedModule,
    MapModule,
    LeafletModule,
    RegistrationModule,
    RegobsApiModule,
    LegalTermsModalPageModule,
    SideMenuModule,
    GpsDebugModule,
  ],
  providers: APP_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {}
