import { Injectable, NgZone } from '@angular/core';
import { WarningService } from '../warning/warning.service';
import { ObservationService } from '../observation/observation.service';
import { KdvService } from '../kdv/kdv.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { UserSettingService } from '../user-setting/user-setting.service';
import { pairwise, distinctUntilChanged, map } from 'rxjs/operators';
import { LoginService } from '../../../modules/login/services/login.service';
import { UserSetting } from '../../models/user-settings.model';
import { settings } from '../../../../settings';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { RegistrationService } from '../../../modules/registration/services/registration.service';
import { HelpTextService } from '../../../modules/registration/services/help-text/help-text.service';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'DataMarshallService';

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
    private loggingService: LoggingService,
  ) {
    this.userSettingService.userSettingObservable$.pipe(
      pairwise())
      .subscribe(async ([prev, next]) => {
        if (this.hasUserSettingsChangedToRequireReloadOfObservations(prev, next)) {
          this.loggingService.debug('App settings changed. Need to refresh observations', DEBUG_TAG);
          const loggedInUser = await this.loginService.getLoggedInUser();
          this.observationService.updateObservationsForGeoHazard(
            next.currentGeoHazard,
            loggedInUser,
            next);
        }
        if (this.hasAppModeLanguageOrCurrentGeoHazardChanged(prev, next)) {
          this.loggingService.debug('AppMode, Language or CurrentGeoHazardChanged changed. Need to refresh warnings.', DEBUG_TAG);
          this.warningService.updateWarnings();
        }
        if (this.hasAppModeOrLanguageChanged(prev, next)) {
          this.kdvService.updateKdvElements();
          this.helpTextService.updateHelpTexts();
        }
      });

    this.loginService.loggedInUser$.subscribe((user) => this.loggingService.setUser(user));
    this.userSettingService.userSettingObservable$.
      pipe(map((userSetting) => userSetting.appMode), distinctUntilChanged())
      .subscribe((appMode) => this.loggingService.configureLogging(appMode));

    this.platform.ready().then(() => {
      this.platform.pause.subscribe(() => {
        this.loggingService.debug('App paused. Stop foreground updates.', DEBUG_TAG);
        this.stopForegroundUpdate();
      });
      this.platform.resume.subscribe(() => {
        this.loggingService.debug('App resumed. Start foreground updates.', DEBUG_TAG);
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
      this.loggingService.debug('Background update completed', DEBUG_TAG);
    });
  }

  private hasAppModeLanguageOrCurrentGeoHazardChanged(oldVal: UserSetting, newVal: UserSetting) {
    if (oldVal && newVal) {
      const appModeChange = this.hasAppModeOrLanguageChanged(oldVal, newVal);
      if (appModeChange) {
        return true;
      }
      if (oldVal.currentGeoHazard.join(',') !== newVal.currentGeoHazard.join(',')) {
        return true;
      }
    }
    return false;
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
