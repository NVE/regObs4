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

// Override Capacitor Browser to avoid the 'no active window to close' error
// export class CapacitorBrowserThatSwallowsNoActiveWindowToCloseErrors extends CapacitorBrowser {
//   closeWindow(): void | Promise<void> {
//     try {
//       super.closeWindow();
//     } catch (error) {
//       if (error?.message?.toLowerCase().indexOf('no active window to close') > -1) {
//         // eslint-disable-next-line no-console
//         console.warn(`Catched error from ionic-appauth: "${error.message}"`);
//       } else {
//         throw error;
//       }
//     }
//   }
// }


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
