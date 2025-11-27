import { Platform } from '@ionic/angular/standalone';
import { StorageBackend, Requestor } from '@openid/appauth';
import { AuthService, Browser } from 'ionic-appauth';
import { inject } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../settings';
import { AppMode } from 'src/app/modules/common-core/models';
import { RegobsAuthServiceOverride } from '../services/regobs-auth-service-override';
import { LoggingService } from '../../shared/services/logging/logging.service';

export const AUTH_CALLBACK_PATH = 'auth/callback';
const DEBUG_TAG = 'AuthFactory';

export const authFactory = (): AuthService => {
  const platform = inject(Platform);
  const requestor = inject(Requestor);
  const browser = inject(Browser);
  const storage = inject(StorageBackend);
  const userSettingService = inject(UserSettingService);
  const logger = inject(LoggingService);

  const authService = new RegobsAuthServiceOverride(browser, storage, requestor);
  userSettingService.appMode$.subscribe((appMode: AppMode) => {
    authService.authConfig = settings.authConfig[appMode];
    if (!platform.is('hybrid')) {
      const url = `${window.location.origin}/${AUTH_CALLBACK_PATH}`;
      authService.authConfig.redirect_url = url;
      authService.authConfig.end_session_redirect_url = url;
    }
    if (appMode === AppMode.Test && window.location.href.startsWith(settings.previewEnvironment.urlPrefix)) {
      // vi er i en test-app bygd på bakgrunn av en PR i github
      // da bytter vi endepunktet for server_host i authConfig slik at vi kaller proxyen i stedet for B2C direkte
      // etter innlogging i B2C vil proxyen sende redirect fra B2C tilbake til oss
      const serverHostProxy = `${settings.services.regObs.apiUrl[AppMode.Test]}${settings.previewEnvironment.serverHostProxyPath}`;
      settings.authConfig[AppMode.Test].server_host = serverHostProxy;
      logger.debug(`Kaller B2C via proxy ved innlogging: ${settings.authConfig[AppMode.Test].server_host}`, DEBUG_TAG);
    }
  });
  return authService;
};
