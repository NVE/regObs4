import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BehaviorSubject, filter, firstValueFrom, Observable, ReplaySubject, share, Subject, tap } from 'rxjs';
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
 * Henter posisjon fra GPS
 */
@Injectable({
  providedIn: 'root',
})
export abstract class GeoPositionService {
  protected currentPosition: Subject<Position> = new ReplaySubject(1);
  protected currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);
  protected gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);

  get log$(): Observable<GeoPositionLog> {
    return this.gpsPositionLog.asObservable();
  }

  /**
   * A stream of device positions. You will get last known position immediately if position data is supported.
   */
  get currentPosition$(): Observable<Position> {
    return this.currentPosition.pipe(
      tap((pos) =>
        //TODO: Fjern når vi fullfører PR
        this.logger.debug(
          `Dispatched position: ${pos?.coords?.latitude}, ${pos?.coords?.longitude}, timestamp: ${pos?.timestamp}. Subscribers: ${this.currentPosition.observers?.length}`,
          DEBUG_TAG
        )
      ),
      filter((pos) => this.isValidPosition(pos)),
      share()
    );
  }

  constructor(
    private toastController: ToastController,
    protected translateService: TranslateService,
    protected platform: Platform,
    protected logger: LoggingService
  ) {}

  /**
   * Check if device position data is supported and allowed.
   * In native mode, we will ask for permission if permission is not allowed in beforehand.
   * In web mode, if position is supported and allowed, a position is also sent to currentPosition$
   * If permission was denied, a notification toast is shown.
   * @returns true if we are allowed to fetch position data from the device
   */
  abstract requestPositionData(): Promise<boolean>;

  /**
   * @returns last known position
   * @see https://github.com/ionic-team/capacitor/issues/1279
   */
  getSingleCurrentPosition(): Promise<Position> {
    // this.currentPosition always returns a value.
    return firstValueFrom<Position>(this.currentPosition);
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
