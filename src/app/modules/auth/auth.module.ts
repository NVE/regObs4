import { NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Requestor, StorageBackend } from '@openid/appauth';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService, Browser } from 'ionic-appauth';
import { authFactory } from './factories/auth-factory';
import { Platform } from '@ionic/angular';
import { httpFactory } from './factories/http-factory';
import { HttpClient } from '@angular/common/http';
import { storageFactory } from './factories/storage-factory';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { CapacitorBrowser } from 'ionic-appauth/lib/capacitor';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule],
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
      useClass: CapacitorBrowser
    },
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [
        Platform,
        NgZone,
        Requestor,
        Browser,
        StorageBackend,
        UserSettingService
      ]
    }
  ]
})
export class AuthModule {}
