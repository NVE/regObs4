import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppProviders } from './app.providers';
import { IonicStorageModule } from '@ionic/storage';
import { settings } from '../settings';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SupportTilesMenuComponent } from './components/side-menu/support-tiles-menu/support-tiles-menu.component';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PopoverMenuComponent,
    SideMenuComponent,
    SupportTilesMenuComponent],
  entryComponents: [PopoverMenuComponent],
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
    IonicStorageModule.forRoot({
      name: settings.db.simpleStorage.dbName,
      driverOrder: ['sqlite', 'indexeddb', 'websql'],
    }),
    AngularSvgIconModule,
  ],
  providers: AppProviders.getProviders(),
  bootstrap: [AppComponent],
  exports: [PopoverMenuComponent],
})
export class AppModule { }
