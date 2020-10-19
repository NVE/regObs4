import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Requestor, StorageBackend } from '@openid/appauth';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService, Browser } from 'ionic-appauth';
import { authFactory } from './factories/auth-factory';
import { browserFactory } from './factories/browser-factory';
import { Platform } from '@ionic/angular';
import { httpFactory } from './factories/http-factory';
import { HttpClient } from '@angular/common/http';
import { storageFactory } from './factories/storage-factory';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegobsAuthService } from './services/regobs-auth.service';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    {
      provide: StorageBackend,
      useFactory: storageFactory,
      deps: [Platform]
    },
    {
      provide: Requestor,
      useFactory: httpFactory,
      deps: [Platform, HttpClient]
    },
    {
      provide: Browser,
      useFactory: browserFactory,
      deps: [Platform, SafariViewController, InAppBrowser]
    },
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [Platform, NgZone, Requestor, Browser, StorageBackend, UserSettingService]
    }
  ]
})
export class AuthModule { }
