import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, switchMap, take } from 'rxjs/operators';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { settings } from '../../../../settings';
import { AppCustomDimension } from '../../../modules/analytics/enums/app-custom-dimension.enum';
import { AnalyticService } from '../../../modules/analytics/services/analytic.service';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { CancelPromiseTimer } from '../../helpers/cancel-promise-timer';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { WarningService } from '../warning/warning.service';
const DEBUG_TAG = 'DataMarshallService';

@Injectable({
  providedIn: 'root',
})
export class DataMarshallService implements OnReset {
  foregroundUpdateInterval: NodeJS.Timeout;
  private cancelUpdateObservationsSubject: Subject<boolean>;
  private subscriptions: Subscription[] = [];

  get observableCancelSubject(): Subject<boolean> {
    return this.cancelUpdateObservationsSubject;
  }

  get cancelObservationsPromise(): Promise<boolean> {
    return this.cancelUpdateObservationsSubject.asObservable().pipe(take(1)).toPromise();
  }

  constructor(
    private ngZone: NgZone,
    private warningService: WarningService,
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
        this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(([appMode, langKey, geoHazards]) => {
          this.loggingService.debug('AppMode, Language or CurrentGeoHazard has changed. Update warnings.', DEBUG_TAG);
          this.analyticService.trackDimension(AppCustomDimension.language, LangKey[langKey]);
          this.analyticService.trackDimension(AppCustomDimension.appMode, appMode);
          this.analyticService.trackDimension(
            AppCustomDimension.geoHazard,
            geoHazards.map((gh) => GeoHazard[gh]).join(',')
          );
          this.warningService.updateWarnings();
        })
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
              this.analyticService.trackDimension(AppCustomDimension.enabledAnalytics, consent);
            } else {
              this.analyticService.trackDimension(AppCustomDimension.enabledAnalytics, consent);
              this.analyticService.disable();
              this.loggingService.disable();
            }
          })
      );
      this.subscriptions.push(
        this.userSettingService.showMapCenter$.subscribe((showMapCenter) => {
          this.analyticService.trackDimension(AppCustomDimension.showMapCenter, showMapCenter.toString());
        })
      );
      this.subscriptions.push(
        this.userSettingService.userSetting$
          .pipe(
            map((userSetting) => userSetting.topoMap),
            distinctUntilChanged()
          )
          .subscribe((topoMap) => {
            this.analyticService.trackDimension(AppCustomDimension.topoMap, topoMap);
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
            this.analyticService.trackDimension(AppCustomDimension.supportMap, supportMap);
          })
      );
      this.subscriptions.push(
        this.regobsAuthService.loggedInUser$.subscribe((user) => this.loggingService.setUser(user))
      );
      this.subscriptions.push(
        this.userSettingService.appMode$.subscribe((appMode) => this.loggingService.configureLogging(appMode))
      );

      this.subscriptions.push(
        this.platform.pause.subscribe(() => {
          this.loggingService.debug('App paused. Stop foreground updates.', DEBUG_TAG);
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
        ? CancelPromiseTimer.createCancelPromiseTimer(settings.backgroundFetchTimeout)
        : null;
      // Use max 20 seconds to backround update, else app will crash (after 30 seconds)

      await this.warningService.updateWarnings(cancelTimer);
      await this.tripLoggerService.cleanupOldLegacyTrip();
      this.loggingService.debug('Background update completed', DEBUG_TAG);
    });
  }
}
