import { Platform } from '@ionic/angular';
import { StorageBackend, Requestor } from '@openid/appauth';
import { AuthService, Browser } from 'ionic-appauth';
import { NgZone } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../settings';
import { AppMode } from 'src/app/modules/common-core/models';
import { RegobsAuthServiceOverride } from '../services/regobs-auth-service-override';

export const AUTH_CALLBACK_PATH = 'auth/callback';

export const authFactory = (
  platform: Platform,
  ngZone: NgZone,
  requestor: Requestor,
  browser: Browser,
  storage: StorageBackend,
  userSettingService: UserSettingService
): AuthService => {
  const authService = new RegobsAuthServiceOverride(browser, storage, requestor);
  userSettingService.appMode$.subscribe((appMode: AppMode) => {
    authService.authConfig = settings.authConfig[appMode];
    if (!platform.is('hybrid')) {
      const url = `${window.location.origin}/${AUTH_CALLBACK_PATH}`;
      authService.authConfig.redirect_url = url;
      authService.authConfig.end_session_redirect_url = url;
    }
  });
  return authService;
};
