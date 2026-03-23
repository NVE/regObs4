import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular/standalone';
import { firstValueFrom, Subject, Subscription } from 'rxjs';
import { settings } from '../../../../settings';
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
  private warningService = inject(WarningService);
  private userSettingService = inject(UserSettingService);
  private regobsAuthService = inject(RegobsAuthService);
  private platform = inject(Platform);
  private tripLoggerService = inject(TripLoggerService);
  private loggingService = inject(LoggingService);
  private router = inject(Router);

  foregroundUpdateInterval?: number;
  private cancelUpdateObservationsSubject: Subject<boolean>;
  private subscriptions: Subscription[] = [];

  get observableCancelSubject(): Subject<boolean> {
    return this.cancelUpdateObservationsSubject;
  }

  get cancelObservationsPromise(): Promise<boolean> {
    return firstValueFrom(this.cancelUpdateObservationsSubject.asObservable());
  }

  constructor() {
    this.cancelUpdateObservationsSubject = new Subject<boolean>();
  }

  init(): void {
    this.subscriptions.push(
      this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(() => {
        this.loggingService.debug('AppMode, Language or CurrentGeoHazard has changed. Update warnings.', DEBUG_TAG);
        this.warningService.updateWarnings();
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
    this.foregroundUpdateInterval = window.setInterval(() => {
      this.backgroundFetchUpdate();
    }, settings.foregroundUpdateIntervalMs);
    this.backgroundFetchUpdate(); // Update on resume
  }

  stopForegroundUpdate(): void {
    clearTimeout(this.foregroundUpdateInterval);
  }

  backgroundFetchUpdate(useTimeout = false): Promise<void> {
    return (async () => {
      const cancelTimer = useTimeout
        ? CancelPromiseTimer.createCancelPromiseTimer(settings.backgroundFetchTimeout)
        : undefined;
      // Use max 20 seconds to backround update, else app will crash (after 30 seconds)

      await this.warningService.updateWarnings(cancelTimer);
      await this.tripLoggerService.cleanupOldLegacyTrip();
      this.loggingService.debug('Background update completed', DEBUG_TAG);
    })();
  }
}
