import { Injectable, NgZone } from '@angular/core';
import { WarningService } from '../warning/warning.service';
import { ObservationService } from '../observation/observation.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { UserSettingService } from '../user-setting/user-setting.service';
import { settings } from '../../../../settings';
import { Platform } from '@ionic/angular';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { Subject, Subscription } from 'rxjs';
import {
  map,
  switchMap,
  distinctUntilChanged,
  pairwise,
  filter,
  take
} from 'rxjs/operators';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { AnalyticService } from '../../../modules/analytics/services/analytic.service';
import { LangKey, GeoHazard } from 'src/app/modules/common-core/models';
import { AppCustomDimension } from '../../../modules/analytics/enums/app-custom-dimension.enum';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';
import { Router } from '@angular/router';
const DEBUG_TAG = 'DataMarshallService';

@Injectable({
  providedIn: 'root'
})
export class DataMarshallService implements OnReset {
  foregroundUpdateInterval: NodeJS.Timeout;
  private cancelUpdateObservationsSubject: Subject<boolean>;
  private subscriptions: Subscription[] = [];

  get observableCancelSubject(): Subject<boolean> {
    return this.cancelUpdateObservationsSubject;
  }

  get cancelObservationsPromise(): Promise<boolean> {
    return this.cancelUpdateObservationsSubject
      .asObservable()
      .pipe(take(1))
      .toPromise();
  }

  constructor(
    private ngZone: NgZone,
    private warningService: WarningService,
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private regobsAuthService: RegobsAuthService,
    private platform: Platform,
    private tripLoggerService: TripLoggerService,
    private loggingService: LoggingService,
    private analyticService: AnalyticService,
    private router: Router
  ) {
    this.cancelUpdateObservationsSubject = new Subject<boolean>();
  }

  init(): void {
    this.ngZone.runOutsideAngular(() => {
      this.subscriptions.push(
        this.hasDaysBackChangedToLargerValue().subscribe(() => {
          this.loggingService.debug(
            'DaysBack has changed to a larger value. Update observations.',
            DEBUG_TAG
          );
          this.updateObservations();
        })
      );

      this.subscriptions.push(
        this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(
          ([appMode, langKey, geoHazards]) => {
            this.loggingService.debug(
              'AppMode, Language or CurrentGeoHazard has changed. Update observations and warnings.',
              DEBUG_TAG
            );
            this.analyticService.trackDimension(
              AppCustomDimension.language,
              LangKey[langKey]
            );
            this.analyticService.trackDimension(
              AppCustomDimension.appMode,
              appMode
            );
            this.analyticService.trackDimension(
              AppCustomDimension.geoHazard,
              geoHazards.map((gh) => GeoHazard[gh]).join(',')
            );
            this.updateObservations();
            this.warningService.updateWarnings();
          }
        )
      );
      this.subscriptions.push(
        this.userSettingService.userSetting$
          .pipe(
            map((userSetting) => userSetting.consentForSendingAnalytics),
            distinctUntilChanged()
          )
          .subscribe((consent) => {
            if (consent) {
              this.analyticService.enable();
              this.loggingService.enable();
              this.analyticService.trackDimension(
                AppCustomDimension.enabledAnalytics,
                consent
              );
            } else {
              this.analyticService.trackDimension(
                AppCustomDimension.enabledAnalytics,
                consent
              );
              this.analyticService.disable();
              this.loggingService.disable();
            }
          })
      );
      this.subscriptions.push(
        this.userSettingService.showMapCenter$.subscribe((showMapCenter) => {
          this.analyticService.trackDimension(
            AppCustomDimension.showMapCenter,
            showMapCenter.toString()
          );
        })
      );
      this.subscriptions.push(
        this.userSettingService.userSetting$
          .pipe(
            map((userSetting) => userSetting.topoMap),
            distinctUntilChanged()
          )
          .subscribe((topoMap) => {
            this.analyticService.trackDimension(
              AppCustomDimension.topoMap,
              topoMap
            );
          })
      );
      this.subscriptions.push(
        this.userSettingService.supportTiles$
          .pipe(
            map((st) =>
              st
                .filter((x) => x.enabled)
                .map((x) => x.name)
                .join(',')
            ),
            distinctUntilChanged()
          )
          .subscribe((supportMap) => {
            this.analyticService.trackDimension(
              AppCustomDimension.supportMap,
              supportMap
            );
          })
      );
      this.subscriptions.push(
        this.regobsAuthService.loggedInUser$.subscribe((user) =>
          this.loggingService.setUser(user)
        )
      );
      this.subscriptions.push(
        this.userSettingService.appMode$.subscribe((appMode) =>
          this.loggingService.configureLogging(appMode)
        )
      );

      this.subscriptions.push(
        this.platform.pause.subscribe(() => {
          this.loggingService.debug(
            'App paused. Stop foreground updates.',
            DEBUG_TAG
          );
          this.stopForegroundUpdate();
        })
      );
      this.subscriptions.push(
        this.platform.resume.subscribe(() => {
          this.loggingService.debug(
            `App resumed. Start foreground updates. Current route is '${this.router.url}'`,
            DEBUG_TAG
          );
          this.startForegroundUpdate();
        })
      );
    });
    // this.startForegroundUpdate();
    // No need to unsubscribe this observables when the service is singleton. It get destroyed when app exits.
  }

  appOnReset(): void {
    this.loggingService.debug('App reset. Unsubscribe all.', DEBUG_TAG);
    this.unsubscribeAll();
  }

  appOnResetComplete(): void {
    this.init(); // Re-Init service after reset has completed
  }

  private unsubscribeAll() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }

  cancelUpdateObservations(): void {
    this.cancelUpdateObservationsSubject.next(true);
  }

  updateObservations(): void {
    this.observationService.updateObservations(this.cancelObservationsPromise);
  }

  /**
   * Emits only when days back has changed to a larger value for current geoHazard
   */
  private hasDaysBackChangedToLargerValue() {
    return this.userSettingService.currentGeoHazard$.pipe(
      switchMap((currentGeoHazard) =>
        this.userSettingService.daysBack$.pipe(
          map(
            (val) =>
              val.find((x) => x.geoHazard === currentGeoHazard[0]).daysBack
          ),
          distinctUntilChanged(),
          pairwise(),
          filter(([prev, next]) => next > prev)
        )
      )
    );
  }

  startForegroundUpdate(): void {
    if (this.foregroundUpdateInterval) {
      this.stopForegroundUpdate();
    }
    this.foregroundUpdateInterval = setInterval(() => {
      this.backgroundFetchUpdate();
    }, settings.foregroundUpdateIntervalMs);
    this.backgroundFetchUpdate(); // Update on resume
  }

  stopForegroundUpdate(): void {
    clearTimeout(this.foregroundUpdateInterval);
  }

  backgroundFetchUpdate(useTimeout = false): Promise<void> {
    return this.ngZone.runOutsideAngular(async () => {
      const cancelTimer = useTimeout
        ? CancelPromiseTimer.createCancelPromiseTimer(
          settings.backgroundFetchTimeout
        )
        : null;
      // Use max 20 seconds to backround update, else app will crash (after 30 seconds)

      const cancelPromiseForObservations = cancelTimer
        ? Promise.race([this.cancelObservationsPromise, cancelTimer])
        : this.cancelObservationsPromise;
      await this.observationService.updateObservations(
        cancelPromiseForObservations
      );
      await this.warningService.updateWarnings(cancelTimer);
      await this.tripLoggerService.cleanupOldLegacyTrip();
      this.loggingService.debug('Background update completed', DEBUG_TAG);
    });
  }
}
