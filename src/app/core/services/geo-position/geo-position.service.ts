import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  ReplaySubject,
  of,
  Observable,
  Subscription,
  combineLatest,
  merge,
  fromEvent,
  firstValueFrom,
} from 'rxjs';
import { filter, map, distinctUntilChanged, startWith } from 'rxjs/operators';
import { CallbackID, ClearWatchOptions, Geolocation, Position, WatchPositionCallback } from '@capacitor/geolocation';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { ToastController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { GeoPositionLog, PositionError } from './geo-position-log.interface';
import { GeoPositionErrorCode } from './geo-position-error.enum';
import moment from 'moment';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Capacitor } from '@capacitor/core';

const DEBUG_TAG = 'GeoPositionService';

const POSITION_OPTIONS_DEFAULT: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20 * 1000, // 20 sec
  maximumAge: Infinity, // Start with latest cached value
};

const POSITION_OPTIONS_ANDROID: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 1000, //get notified with new position data at least each 1 sec
  maximumAge: 0, //we do not accept cached positions, ask for GPS position immediately
};

/**
 * Henter posisjon fra GPS og himmelretning fra kompasset
 */
@Injectable({
  providedIn: 'root',
})
export class GeoPositionService implements OnDestroy {
  private highAccuracyEnabled = new BehaviorSubject(true);
  private gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);
  private currentPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  private currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);

  private readonly trackingComponents = new BehaviorSubject<string[]>([]);

  // Subscriptions
  private watchPositionCallbackId: CallbackID = null;
  private watchPositionRequestTime: number = null;
  private watchPositionFirstCallbackReceived = false;
  private headingSubscription: Subscription;

  get currentPosition$(): Observable<Position> {
    return this.currentPosition.pipe(filter((cp) => cp !== null));
  }

  get currentHeading$(): Observable<number> {
    return this.currentHeading.pipe(filter((cp) => cp !== null));
  }

  get log$(): Observable<GeoPositionLog> {
    return this.gpsPositionLog.asObservable();
  }

  get geoLocationSupported(): boolean {
    const locationSupport = !!(navigator && navigator.geolocation && navigator.geolocation.watchPosition);
    return locationSupport;
  }

  constructor(
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private loggingService: LoggingService,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {
    this.startGeolocationTrackingSubscription();
  }

  ngOnDestroy(): void {
    this.stopSubscriptions();
  }

  /**
   * @returns last known position
   * @see https://github.com/ionic-team/capacitor/issues/1279
   */
  getSingleCurrentPosition(): Promise<Position> {
    // this.currentPosition always returns a value.
    return firstValueFrom<Position>(this.currentPosition);
  }

  private startGeolocationTrackingSubscription() {
    const anyComponentsTracking = this.trackingComponents.pipe(
      map((val) => val.length > 0),
      distinctUntilChanged()
    );
    combineLatest([this.getPlatformIsActiveObservable(), anyComponentsTracking])
      .pipe(
        map(([platformIsActive, anyComponentsTracking]) => (platformIsActive && anyComponentsTracking ? true : false))
      )
      .subscribe((activate) => {
        if (activate) {
          this.startSubscriptions();
        } else {
          this.stopSubscriptions();
        }
      });
  }

  private getPlatformIsActiveObservable() {
    if (isAndroidOrIos(this.platform)) {
      return merge(this.platform.resume.pipe(map(() => true)), this.platform.pause.pipe(map(() => false))).pipe(
        startWith(true)
      );
    }
    return of(true);
  }

  private createPositionError(
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

  getTimestamp(geopos: Position) {
    if (geopos && geopos.timestamp > 0) {
      if (this.platform.is('hybrid') && this.platform.is('ios')) {
        return geopos.timestamp / 1000;
      }
      return geopos.timestamp;
    }
    return moment().unix();
  }

  private createGpsPositionLogElement(pos: Position): GeoPositionLog {
    const log: GeoPositionLog = {
      timestamp: this.getTimestamp(pos),
      status: (pos.coords === undefined ? 'PositionError' : 'PositionUpdate') as 'PositionError' | 'PositionUpdate',
      pos,
      highAccuracyEnabled: true,
      err: pos.coords === undefined ? (pos as unknown as PositionError) : undefined,
    };
    return log;
  }

  private addStatusToGpsPositionLog(status: 'StartGpsTracking' | 'StopGpsTracking') {
    this.gpsPositionLog.next({
      timestamp: moment().unix(),
      status,
      highAccuracyEnabled: this.highAccuracyEnabled.value,
    });
  }

  public async choosePositionMethod(nameForTrackingComponent: string): Promise<void> {
    if (isAndroidOrIos(this.platform)) {
      this.startTrackingComponent(nameForTrackingComponent, true);
    } else {
      try {
        this.requestPositionFromBrowser();
      } catch (err) {
        this.gpsPositionLog.next(this.createPositionError('PermissionDenied', GeoPositionErrorCode.PermissionDenied));
      }
    }
  }

  public async requestPositionFromBrowser(): Promise<void> {
    if (!this.geoLocationSupported) {
      const errorMessage: string = this.translateService.instant('GEOLOCATION.POSITION_ERROR.UNSUPPORTED');
      this.gpsPositionLog.next(this.createPositionError(errorMessage));
      this.createToast(errorMessage);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (pos && pos.coords) {
            this.currentPosition.next(pos);
          } else {
            const errorMessage: string = this.translateService.instant('GEOLOCATION.POSITION_ERROR.INVALID');
            this.gpsPositionLog.next(this.createPositionError('Empty position data or no coords'));
            this.createToast(errorMessage);
          }
        },
        (err) => {
          this.geolocationError(err);
        },
        POSITION_OPTIONS_DEFAULT
      );
    }
  }

  private async createToast(message?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000,
    });
    await toast.present();
  }

  private async geolocationError(error: PositionError) {
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

  public async startTrackingComponent(name: string, forcePermissionDialog = false): Promise<void> {
    if (forcePermissionDialog) {
      this.loggingService.debug(`startTrackingComponent: name = ${name}. Check permissions...`, DEBUG_TAG);
      let permission = await this.checkIfPermissionIsGranted();
      if (!permission) {
        permission = await this.askForPermission();
        if (!permission) {
          this.gpsPositionLog.next(
            this.createPositionError('Permission denied', GeoPositionErrorCode.PermissionDenied)
          );
          return;
        } else if (Capacitor.getPlatform() === 'ios') {
          // I Android vil appen bli pauset når vi kjører askForPermission(),
          // så startWatchingPosition() vil bli kjørt når appen aktiveres igjen.
          // I iOS vil ikke appen bli pauset, så vi må kjøre startWatchingPosition() manuelt
          this.startWatchingPosition();
        }
      }
      this.loggingService.debug(`startTrackingComponent: name = ${name}. Permissions ok = ${permission}`, DEBUG_TAG);
    }
    this.trackingComponents.next([...this.getTrackingComponentsExcludeByName(name), name]);
  }

  public stopTrackingComponent(name: string) {
    this.trackingComponents.next([...this.getTrackingComponentsExcludeByName(name)]);
  }

  private getTrackingComponentsExcludeByName(name: string) {
    return this.trackingComponents.value.filter((x) => x !== name);
  }

  private async startSubscriptions() {
    let permissionGranted = false;
    try {
      // Will ask for permission if permission status = 'prompt'
      const permissions = await this.checkPermissions();
      if (permissions && permissions === 'granted') {
        permissionGranted = true;
      } else if (permissions && permissions === 'prompt') {
        permissionGranted = await this.askForPermission();
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Error asking for location permissions: ${err.message}`);
    }

    if (!permissionGranted) {
      this.loggingService.debug('We cannot watch postion or heading due to lacking permissions', DEBUG_TAG);
      return false;
    }
    this.startWatchingPosition();
    this.startWatchingHeading();
  }

  private stopSubscriptions() {
    this.stopWatchingHeading();
    this.stopWatchingPosition();
  }

  private stopWatchingPosition() {
    if (this.watchPositionCallbackId !== null) {
      this.loggingService.debug(
        `Stop current GPS position watch subscription with callback ID: ${this.watchPositionCallbackId}`,
        DEBUG_TAG
      );
      this.addStatusToGpsPositionLog('StopGpsTracking');
      const options: ClearWatchOptions = { id: this.watchPositionCallbackId };
      Geolocation.clearWatch(options);
      this.watchPositionCallbackId = null;
      this.watchPositionRequestTime = null;
      this.watchPositionFirstCallbackReceived = false;
    }
  }

  private async startWatchingPosition(): Promise<void> {
    const watchPositionCallback: WatchPositionCallback = (position: Position, err: any) => {
      if (err) {
        this.loggingService.log('Error when watchPosition', err, LogLevel.Warning, DEBUG_TAG, err);
        this.gpsPositionLog.next(this.createPositionError('Unknown error'));
      }
      if (position !== null) {
        if (this.watchPositionFirstCallbackReceived === false) {
          this.watchPositionFirstCallbackReceived = true;
          const secondsSinceStartWatch = (Date.now() - this.watchPositionRequestTime) / 1000;
          this.loggingService.debug(
            'First callback received. ' +
              `Timestamp: ${new Date(position.timestamp).toLocaleTimeString()}, ` +
              `Delay since request: ${secondsSinceStartWatch}s`,
            DEBUG_TAG,
            { accuracy: position.coords.accuracy }
          );
        }
        this.gpsPositionLog.next(this.createGpsPositionLogElement(position));
        if (this.isValidPosition(position)) {
          this.currentPosition.next(position);
        }
      }
    };
    this.addStatusToGpsPositionLog('StartGpsTracking');
    this.stopWatchingPosition(); //we need to stop current watch of position if any
    this.watchPositionRequestTime = Date.now();
    this.watchPositionCallbackId = await Geolocation.watchPosition(this.getPositionOptions(), watchPositionCallback);
    this.loggingService.debug(
      `Start GPS position subscription with callback ID: ${this.watchPositionCallbackId}`,
      DEBUG_TAG,
      this.getPositionOptions()
    );
  }

  private getPositionOptions(): PositionOptions {
    if (this.platform.is('android')) {
      return POSITION_OPTIONS_ANDROID;
    }
    return POSITION_OPTIONS_DEFAULT;
  }

  private isValidPosition(pos: Position): boolean {
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

  private isValidHeading(heading: number) {
    return heading >= 0 && heading <= 360;
  }

  // Checks permission state for "fine location" (GPS)
  // Return 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'
  private async checkPermissions(): Promise<string> {
    try {
      const permissions = await Geolocation.checkPermissions();
      this.loggingService.debug('Geolocation permissions', DEBUG_TAG, permissions);
      return permissions?.location;
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Error when checking location permissions: ${err.message}`);
    }
    return null;
  }

  private async checkIfPermissionIsGranted(): Promise<boolean> {
    try {
      const permissions = await this.checkPermissions();
      return permissions && permissions === 'granted';
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Error asking for location permissions: ${err.message}`);
    }
    return false;
  }

  private async askForPermission(): Promise<boolean> {
    try {
      const permissions = await Geolocation.requestPermissions();
      this.loggingService.debug('Geolocation permissions after request', DEBUG_TAG, permissions);
      if (permissions?.location === 'denied') {
        this.showPermissionDeniedToast();
        return false;
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Error when requesting location permissions: ${err.message}`);
      this.showPermissionDeniedToast();
      return false;
    }
    return true;
  }

  protected showPermissionDeniedToast() {
    const errorMessage = this.translateService.instant('GEOLOCATION.POSITION_ERROR.PermissionDenied');
    this.createToast(errorMessage);
  }

  private startWatchingHeading() {
    if (this.headingSubscription && !this.headingSubscription.closed) {
      this.headingSubscription.unsubscribe();
    }
    // NOTE! Because of issues with show heading with W3C Devece Orientation API in iOS 13, the depricated
    // plugin cordova-plugin-device-orientation is used instead on ios
    // https://github.com/apache/cordova-plugin-device-orientation/issues/52
    this.headingSubscription = (this.isIos() ? this.getHeadingNative() : this.getWebHeadingObservable()).subscribe(
      (heading: number) => this.validateAndSetHeading(heading)
    );
  }

  private isIos(): boolean {
    return this.platform.is('hybrid') && this.platform.is('ios');
  }

  private getHeadingNative() {
    return this.deviceOrientation
      .watchHeading({ filter: 1 }) //get notified only if heading changes > 1 degree
      .pipe(map((val) => val?.magneticHeading));
  }

  private getWebHeadingObservable() {
    return merge(fromEvent(<any>window, 'deviceorientationabsolute'), fromEvent(<any>window, 'deviceorientation')).pipe(
      map((event: DeviceOrientationEvent) => {
        const appleHeading = (<any>event).webkitCompassHeading;
        const heading: number = appleHeading || this.getAbsoluteHeading(event);
        return heading;
      })
    );
  }

  private getAbsoluteHeading(event: DeviceOrientationEvent) {
    return event.alpha !== undefined && event.absolute ? 360 - event.alpha : undefined;
  }

  private validateAndSetHeading(heading: number) {
    if (this.isValidHeading(heading)) {
      this.currentHeading.next(heading);
    }
  }

  private stopWatchingHeading() {
    if (this.headingSubscription && !this.headingSubscription.closed) {
      this.headingSubscription.unsubscribe();
    }
  }
}
