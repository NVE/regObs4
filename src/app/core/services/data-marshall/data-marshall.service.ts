import { Injectable, NgZone } from '@angular/core';
import { WarningService } from '../warning/warning.service';
import { ObservationService } from '../observation/observation.service';
import { KdvService } from '../kdv/kdv.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { UserSettingService } from '../user-setting/user-setting.service';
import { pairwise, distinctUntilChanged, map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserSetting } from '../../models/user-settings.model';
import * as Sentry from 'sentry-cordova';
import { environment } from '../../../../environments/environment';
import { settings } from '../../../../settings';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataMarshallService {

  constructor(
    private ngZone: NgZone,
    private warningService: WarningService,
    private observationService: ObservationService,
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private platform: Platform,
    private localNotifications: LocalNotifications,
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
            environment: appMode,
            enabled: environment.production
          });
      });
    // No need to unsubscribe this observables when the service is singleton. It get destroyed when app exits.
  }

  backgroundFetchUpdate() {
    return this.ngZone.runOutsideAngular(async () => {
      const cancelTimer = (this.platform.is('cordova') && this.platform.is('ios'))
        ? CancelPromiseTimer.createCancelPromiseTimer(20 * 1000) : null;
      // Use max 20 seconds to backround update, else app will crash (after 30 seconds)
      const observationsUpdated = await this.observationService.updateObservations(cancelTimer);
      if (observationsUpdated > 0 && this.platform.is('cordova') && (this.platform.is('ios') || this.platform.is('android'))) {
        this.localNotifications.schedule({ text: `${observationsUpdated} observations saved` });
      }
      await this.warningService.updateWarnings(cancelTimer);
      await this.kdvService.updateKdvElements(cancelTimer);
      console.log('[INFO] DataMarshall Background Update Completed');
    });
  }

  private hasAppModeLanguageOrCurrentGeoHazardChanged(oldVal: UserSetting, newVal: UserSetting) {
    if (oldVal && newVal) {
      if (oldVal.appMode !== newVal.appMode) {
        return true;
      }
      if (oldVal.language !== newVal.language) {
        return true;
      }
      if (oldVal.currentGeoHazard !== newVal.currentGeoHazard) {
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
