import { Injectable, NgZone } from '@angular/core';
import { WarningService } from '../warning/warning.service';
import { ObservationService } from '../observation/observation.service';
import { KdvService } from '../kdv/kdv.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { UserSettingService } from '../user-setting/user-setting.service';
import { LoginService } from '../../../modules/login/services/login.service';
import { settings } from '../../../../settings';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { RegistrationService } from '../../../modules/registration/services/registration.service';
import { HelpTextService } from '../../../modules/registration/services/help-text/help-text.service';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { Subject } from 'rxjs';
import { map, switchMap, distinctUntilChanged, pairwise, filter, take } from 'rxjs/operators';

const DEBUG_TAG = 'DataMarshallService';

@Injectable({
  providedIn: 'root'
})
export class DataMarshallService {

  foregroundUpdateInterval: NodeJS.Timeout;
  private cancelUpdateObservationsSubject: Subject<boolean>;

  get observableCancelSubject() {
    return this.cancelUpdateObservationsSubject;
  }

  get cancelObservationsPromise() {
    return this.cancelUpdateObservationsSubject.asObservable().pipe(take(1)).toPromise();
  }

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
    this.cancelUpdateObservationsSubject = new Subject<boolean>();

    this.hasDaysBackChangedToLargerValue().subscribe(() => {
      this.loggingService.debug('DaysBack has changed to a larger value. Update observations.', DEBUG_TAG);
      this.updateObservations();
    });

    this.userSettingService.appModeAndLanguage$.subscribe(() => {
      this.kdvService.updateKdvElements();
      this.helpTextService.updateHelpTexts();
      this.loggingService.debug('AppMode or Language has changed. Update kdv elements and help texts.', DEBUG_TAG);
    });
    this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(() => {
      this.loggingService.debug('AppMode, Language or CurrentGeoHazard has changed. Update observations and warnings.', DEBUG_TAG);
      this.updateObservations();
      this.warningService.updateWarnings();
    });
    this.loginService.loggedInUser$.subscribe((user) => this.loggingService.setUser(user));
    this.userSettingService.appMode$.subscribe((appMode) => this.loggingService.configureLogging(appMode));

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

  cancelUpdateObservations() {
    this.cancelUpdateObservationsSubject.next(true);
  }

  updateObservations() {
    this.observationService.updateObservations(this.cancelObservationsPromise);
  }

  /**
   * Emits only when days back has changed to a larger value for current geoHazard
   */
  private hasDaysBackChangedToLargerValue() {
    return this.userSettingService.currentGeoHazardObservable$.pipe(
      switchMap((currentGeoHazard) => this.userSettingService.daysBack$.pipe(
        map((val) => val.find((x) => x.geoHazard === currentGeoHazard[0]).daysBack),
        distinctUntilChanged(),
        pairwise(),
        filter(([prev, next]) => next > prev),
      )));
  }

  startForegroundUpdate() {
    if (this.foregroundUpdateInterval) {
      this.stopForegroundUpdate();
    }
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
      const cancelPromiseForObservations = cancelTimer ?
        Promise.race([this.cancelObservationsPromise, cancelTimer]) : this.cancelObservationsPromise;
      const observationsUpdated = await this.observationService.updateObservations(cancelPromiseForObservations);
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
}
