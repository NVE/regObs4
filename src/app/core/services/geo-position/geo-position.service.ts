import { Injectable, OnDestroy } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BehaviorSubject, filter, firstValueFrom, Observable, of, ReplaySubject, share, Subject, tap } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoPositionErrorCode } from './geo-position-error.enum';
import { GeoPositionLog, PositionError } from './geo-position-log.interface';

const DEBUG_TAG = 'GeoPositionService';

const POSITION_OPTIONS_DEFAULT: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20 * 1000, // 20 sec
  maximumAge: Infinity, // Start with latest cached value
};

/**
 * Henter posisjon fra GPS og himmelretning fra kompasset på Android eller iOS.
 * TODO: Skille ut kompasskode i egen service(r)
 * TODO: Test også på Android 12, som har litt annen måte å spørre om tilgang til posisjonsdata på
 * TODO: Tar for lang tid å få posisjon på nytt på kartsida etter vi har vært på en annen side. Gjelder Android, ikke web
 */
@Injectable({
  providedIn: 'root',
})
export abstract class GeoPositionService implements OnDestroy {
  protected currentPosition: Subject<Position> = new Subject();
  protected currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);
  protected gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);
  protected isWatching = false;

  /**
   * A stream of position data.
   * On web, the observable will complete after the first position is returned, so you need to re-subscribe.
   * If position data is not available an error will be thrown.
   */

  get currentHeading$(): Observable<number> {
    return this.currentHeading.pipe(filter((cp) => cp !== null));
  }

  get log$(): Observable<GeoPositionLog> {
    return this.gpsPositionLog.asObservable();
  }

  get currentPosition$(): Observable<Position> {
    if (!this.isWatching) {
      this.loggingService.debug('Running startWatchingPosition', DEBUG_TAG);
      this.startWatchingPosition();
    }
    return this.currentPosition.pipe(
      tap((pos) =>
        this.loggingService.debug(
          `Dispatched position: ${pos?.coords?.latitude}, ${pos?.coords?.longitude}, timestamp: ${pos?.timestamp}. Subscribers: ${this.currentPosition.observers?.length}`,
          DEBUG_TAG
        )
      ),
      filter((pos) => this.isValidPosition(pos)),
      share({
        // I denne funksjonen som vi gir til share kan vi sette opp teardown-logikk.
        // refCount har med antall subscribers å gjøre.
        resetOnRefCountZero: () => {
          this.loggingService.debug('No more subscribers so stopWatchingPosition...', DEBUG_TAG);
          this.stopWatchingPosition();
          this.isWatching = false;
          return of(false);
        },
      })
    );
  }

  constructor(
    private deviceOrientation: DeviceOrientation,
    private toastController: ToastController,
    protected translateService: TranslateService,
    protected platform: Platform,
    protected loggingService: LoggingService
  ) {}

  ngOnDestroy(): void {
    this.stopWatchingPosition();
  }

  /**
   * @returns last known position
   * @see https://github.com/ionic-team/capacitor/issues/1279
   */
  getSingleCurrentPosition(): Promise<Position> {
    // this.currentPosition always returns a value.
    return firstValueFrom<Position>(this.currentPosition);
  }

  abstract checkPermissionsAndAsk(): Promise<boolean>;

  protected abstract startWatchingPosition(): Promise<void>;

  protected stopWatchingPosition() {
    //You may override this if you need to clean up something
  }

  protected isValidPosition(pos: Position): boolean {
    return (
      pos !== undefined &&
      pos !== null &&
      pos.coords !== undefined &&
      pos.coords !== null &&
      pos.coords.latitude >= -90 &&
      pos.coords.latitude <= 90 &&
      pos.coords.longitude >= -180 &&
      pos.coords.longitude <= 180
    );
  }

  protected getPositionOptions(): PositionOptions {
    return POSITION_OPTIONS_DEFAULT;
  }

  protected showPermissionDeniedToast() {
    const errorMessage = this.translateService.instant('GEOLOCATION.POSITION_ERROR.PermissionDenied');
    this.createToast(errorMessage);
  }

  protected async createToast(message?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000,
    });
    await toast.present();
  }

  protected async geolocationError(error: PositionError) {
    let key: string;
    switch (error.code) {
      case GeoPositionErrorCode.PermissionDenied:
        key = 'PermissionDenied';
        break;
      case GeoPositionErrorCode.Timeout:
        key = 'Timeout';
        break;
      default:
        key = 'PositionUnavailable';
    }
    if (key) {
      const errorMessage: string = this.translateService.instant(`GEOLOCATION.POSITION_ERROR.${key}`);
      this.gpsPositionLog.next(this.createPositionError(errorMessage, error.code));
      this.createToast(errorMessage);
    }
  }

  protected createPositionError(
    message: string,
    code: GeoPositionErrorCode = GeoPositionErrorCode.Unknown,
    highAccuracyEnabled = true
  ): GeoPositionLog {
    return {
      timestamp: moment().unix(),
      status: 'PositionError',
      pos: undefined,
      highAccuracyEnabled,
      err: {
        code,
        message,
      },
    };
  }
}
