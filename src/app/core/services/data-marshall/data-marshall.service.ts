import { Injectable, NgZone } from '@angular/core';
import { WarningService } from '../warning/warning.service';
import { ObservationService } from '../observation/observation.service';
import { KdvService } from '../kdv/kdv.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { UserSettingService } from '../user-setting/user-setting.service';
import { LoginService } from '../../../modules/login/services/login.service';
import { settings } from '../../../../settings';
import { Platform } from '@ionic/angular';
import { RegistrationService } from '../../../modules/registration/services/registration.service';
import { HelpTextService } from '../../../modules/registration/services/help-text/help-text.service';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { Subject, Subscription } from 'rxjs';
import { map, switchMap, distinctUntilChanged, pairwise, filter, take, debounceTime } from 'rxjs/operators';
import { OfflineMapService } from '../offline-map/offline-map.service';

const DEBUG_TAG = 'DataMarshallService';

@Injectable({
  providedIn: 'root'
})
export class DataMarshallService {

  foregroundUpdateInterval: NodeJS.Timeout;
  private cancelUpdateObservationsSubject: Subject<boolean>;
  private subscriptions: Subscription[] = [];

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
    private registrationService: RegistrationService,
    private tripLoggerService: TripLoggerService,
    private loggingService: LoggingService,
    private offlineMapService: OfflineMapService,
  ) {
    this.cancelUpdateObservationsSubject = new Subject<boolean>();
  }

  init() {
    this.ngZone.runOutsideAngular(() => {
      this.subscriptions.push(this.hasDaysBackChangedToLargerValue().subscribe(() => {
        this.loggingService.debug('DaysBack has changed to a larger value. Update observations.', DEBUG_TAG);
        this.updateObservations();
      }));

      this.subscriptions.push(this.userSettingService.appModeAndLanguage$.subscribe(() => {
        this.kdvService.updateKdvElements();
        this.helpTextService.updateHelpTexts();
        this.loggingService.debug('AppMode or Language has changed. Update kdv elements and help texts.', DEBUG_TAG);
      }));
      this.subscriptions.push(this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(() => {
        this.loggingService.debug('AppMode, Language or CurrentGeoHazard has changed. Update observations and warnings.', DEBUG_TAG);
        this.updateObservations();
        this.warningService.updateWarnings();
      }));
      this.subscriptions.push(this.loginService.loggedInUser$.subscribe((user) => this.loggingService.setUser(user)));
      this.subscriptions.push(this.userSettingService.appMode$.subscribe((appMode) => this.loggingService.configureLogging(appMode)));

      this.subscriptions.push(this.offlineMapService.getFullTilesCacheAsObservable().subscribe((val) => {
        this.offlineMapService.updateTilesCacheSizeTable(val.count, val.size);
      }));
      this.subscriptions.push(this.userSettingService.userSettingObservable$.pipe(map((val) => val.tilesCacheSize),
        distinctUntilChanged(), debounceTime(1000)).subscribe((val) => {
          this.loggingService.debug(`Tiles cahce size changed to ${val}`, DEBUG_TAG);
          this.offlineMapService.cleanupTilesCache(val);
        }));
      this.subscriptions.push(this.platform.pause.subscribe(() => {
        this.loggingService.debug('App paused. Stop foreground updates.', DEBUG_TAG);
        this.stopForegroundUpdate();
      }));
      this.subscriptions.push(this.platform.resume.subscribe(() => {
        this.loggingService.debug('App resumed. Start foreground updates.', DEBUG_TAG);
        this.startForegroundUpdate();
      }));
    });
    // this.startForegroundUpdate();
    // No need to unsubscribe this observables when the service is singleton. It get destroyed when app exits.
  }

  unsubscribeAll() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
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
      await this.warningService.updateWarnings(cancelTimer);
      await this.kdvService.updateKdvElements(cancelTimer);
      await this.helpTextService.updateHelpTexts(cancelTimer);
      await this.tripLoggerService.cleanupOldLegacyTrip();
      this.loggingService.debug('Background update completed', DEBUG_TAG);
    });
  }
}
