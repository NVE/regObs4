import { Injectable, NgZone } from '@angular/core';
import { WarningService } from '../warning/warning.service';
import { ObservationService } from '../observation/observation.service';
import { KdvService } from '../kdv/kdv.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { UserSettingService } from '../user-setting/user-setting.service';
import { pairwise, distinctUntilChanged, map } from 'rxjs/operators';
import { LoginService } from '../../../modules/login/services/login.service';
import { UserSetting } from '../../models/user-settings.model';
import * as Sentry from 'sentry-cordova';
import { environment } from '../../../../environments/environment';
import { settings } from '../../../../settings';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { RegistrationService } from '../../../modules/registration/services/registration.service';
import { HelpTextService } from '../../../modules/registration/services/help-text/help-text.service';
import { AppMode } from '../../models/app-mode.enum';
import { TripLoggerService } from '../trip-logger/trip-logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataMarshallService {

  foregroundUpdateInterval: NodeJS.Timeout;

  constructor(
    private ngZone: NgZone,
    private warningService: WarningService,
    private observationService: ObservationService,
    private kdvService: KdvService,
    private helpTextService: HelpTextService,
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private registrationService: RegistrationService,
    private tripLoggerService: TripLoggerService,
  ) {
    this.userSettingService.userSettingObservable$.pipe(
      pairwise())
      .subscribe(async ([prev, next]) => {
        if (this.hasUserSettingsChangedToRequireReloadOfObservations(prev, next)) {
          console.log('[INFO][ObervationService] App settings changed. Need to refresh observations.');
          const loggedInUser = await this.loginService.getLoggedInUser();
          this.observationService.updateObservationsForGeoHazard(
            next.currentGeoHazard,
            loggedInUser,
            next);
        }
        if (this.hasAppModeLanguageOrCurrentGeoHazardChanged(prev, next)) {
          console.log('[INFO][ObervationService] App settings changed. Need to refresh warnings.');
          this.warningService.updateWarnings();
        }
        if (this.hasAppModeOrLanguageChanged(prev, next)) {
          this.kdvService.updateKdvElements();
          this.helpTextService.updateHelpTexts();
        }
      });

    this.loginService.loggedInUser$.subscribe((user) => {
      if (user.email) {
        Sentry.configureScope((scope) => {
          scope.setUser({ email: user.email });
        });
      }
    });
    this.userSettingService.userSettingObservable$.
      pipe(map((userSetting) => userSetting.appMode), distinctUntilChanged()).subscribe((appMode) => {
        Sentry.init(
          {
            dsn: settings.sentryDsn,
            environment: appMode === AppMode.Prod ? 'regObs' : (appMode === AppMode.Demo ? 'demo regObs' : 'test regObs'),
            enabled: environment.production
          });
      });

    this.platform.ready().then(() => {
      this.platform.pause.subscribe(() => {
        console.log('[INFO] App paused. Stop foreground updates.');
        this.stopForegroundUpdate();
      });
      this.platform.resume.subscribe(() => {
        console.log('[INFO] App resumed. Start foreground updates.');
        this.startForegroundUpdate();
      });
      this.startForegroundUpdate();
    });
    // No need to unsubscribe this observables when the service is singleton. It get destroyed when app exits.
  }

  startForegroundUpdate() {
    this.foregroundUpdateInterval = setInterval(() => {
      this.backgroundFetchUpdate();
    }, settings.foregroundUpdateIntervalMs);
    this.backgroundFetchUpdate(); // Update on resume
  }

  stopForegroundUpdate() {
    clearTimeout(this.foregroundUpdateInterval);
  }

  backgroundFetchUpdate(useTimeout = false, showNotification = false) {
    return this.ngZone.runOutsideAngular(async () => {
      const cancelTimer = useTimeout
        ? CancelPromiseTimer.createCancelPromiseTimer(settings.backgroundFetchTimeout) : null;
      // Use max 20 seconds to backround update, else app will crash (after 30 seconds)
      await this.registrationService.syncRegistrations(cancelTimer);
      const observationsUpdated = await this.observationService.updateObservations(cancelTimer);
      if (showNotification && observationsUpdated > 0
        && this.platform.is('cordova') && (this.platform.is('ios') || this.platform.is('android'))) {
        this.localNotifications.schedule({ text: `${observationsUpdated} observations saved` });
      }
      await this.warningService.updateWarnings(cancelTimer);
      await this.kdvService.updateKdvElements(cancelTimer);
      await this.helpTextService.updateHelpTexts(cancelTimer);
      await this.tripLoggerService.cleanupOldLegacyTrip();
      console.log('[INFO] DataMarshall Background Update Completed');
    });
  }

  private hasAppModeLanguageOrCurrentGeoHazardChanged(oldVal: UserSetting, newVal: UserSetting) {
    if (oldVal && newVal) {
      const appModeChange = this.hasAppModeOrLanguageChanged(oldVal, newVal);
      if (appModeChange) {
        return true;
      }
      if (oldVal.currentGeoHazard !== newVal.currentGeoHazard) {
        return true;
      }
      return false;
    }
  }

  private hasAppModeOrLanguageChanged(oldVal: UserSetting, newVal: UserSetting) {
    if (oldVal && newVal) {
      if (oldVal.appMode !== newVal.appMode) {
        return true;
      }
      if (oldVal.language !== newVal.language) {
        return true;
      }
      return false;
    }
  }

  private hasUserSettingsChangedToRequireReloadOfObservations(oldVal: UserSetting, newVal: UserSetting) {
    if (oldVal && newVal) {
      if (this.hasAppModeLanguageOrCurrentGeoHazardChanged(oldVal, newVal)) {
        return true;
      }
      const prevDaysBack = this.observationService.getObservationsDaysBack(oldVal, newVal.currentGeoHazard);
      const nextDaysBack = this.observationService.getObservationsDaysBack(newVal, newVal.currentGeoHazard);
      if (nextDaysBack > prevDaysBack) {
        return true; // We need to update more days back
      }
    }
    return false;
  }
}
