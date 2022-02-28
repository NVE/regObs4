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
  firstValueFrom
} from 'rxjs';
import {
  filter,
  map,
  distinctUntilChanged,
  startWith
} from 'rxjs/operators';
import {
  CallbackID,
  ClearWatchOptions,
  Geolocation, Position, WatchPositionCallback,
} from '@capacitor/geolocation';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { GeoPositionLog, PositionError } from './geo-position-log.interface';
import { GeoPositionErrorCode } from './geo-position-error.enum';
import moment from 'moment';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';

const DEBUG_TAG = 'GeoPositionService';

/**
 * Henter posisjon fra GPS og himmelretning fra kompasset
 */
@Injectable({
  providedIn: 'root'
})
export class GeoPositionService implements OnDestroy {
  private highAccuracyEnabled = new BehaviorSubject(true);
  private gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);
  private currentPosition: BehaviorSubject<Position> = new BehaviorSubject(
    null
  );
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

  constructor(
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private loggingService: LoggingService,
    private alertController: AlertController,
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
        map(([platformIsActive, anyComponentsTracking]) =>
          platformIsActive && anyComponentsTracking ? true : false
        )
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
      return merge(
        this.platform.resume.pipe(map(() => true)),
        this.platform.pause.pipe(map(() => false))
      ).pipe(startWith(true));
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
        message
      }
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
      status: (pos.coords === undefined
        ? 'PositionError'
        : 'PositionUpdate') as 'PositionError' | 'PositionUpdate',
      pos,
      highAccuracyEnabled: true,
      err:
        pos.coords === undefined
          ? ((pos as unknown) as PositionError)
          : undefined
    };
    return log;
  }

  private addStatusToGpsPositionLog(status: 'StartGpsTracking' | 'StopGpsTracking') {
    this.gpsPositionLog.next({
      timestamp: moment().unix(),
      status,
      highAccuracyEnabled: this.highAccuracyEnabled.value
    });
  }

  public async startTrackingComponent(
    name: string,
    forcePermissionDialog = false
  ): Promise<void> {
    if (forcePermissionDialog) {
      this.loggingService.debug(`startTrackingComponent: name = ${name}. Check permissions...`, DEBUG_TAG);
      const valid = await this.checkPermissions();
      if (!valid) {
        this.gpsPositionLog.next(
          this.createPositionError(
            'Permission denied',
            GeoPositionErrorCode.PermissionDenied
          )
        );
        return;
      }
      this.loggingService.debug(`startTrackingComponent: name = ${name}. Permissions ok = ${valid}`, DEBUG_TAG);
    }
    this.trackingComponents.next([
      ...this.getTrackingComponentsExcludeByName(name),
      name
    ]);
  }

  public stopTrackingComponent(name: string) {
    this.trackingComponents.next([
      ...this.getTrackingComponentsExcludeByName(name)
    ]);
  }

  private getTrackingComponentsExcludeByName(name: string) {
    return this.trackingComponents.value.filter((x) => x !== name);
  }

  private startSubscriptions() {
    this.startWatchingPosition();
    this.startWatchingHeading();
  }

  private stopSubscriptions() {
    this.stopWatchingHeading();
    this.stopWatchingPosition();
  }

  private stopWatchingPosition() {
    if (this.watchPositionCallbackId !== null) {
      this.loggingService.debug(`Stop current GPS position watch subscription with callback ID: ${this.watchPositionCallbackId}`, DEBUG_TAG);
      this.addStatusToGpsPositionLog('StopGpsTracking');
      const options:  ClearWatchOptions = { id : this.watchPositionCallbackId };
      Geolocation.clearWatch(options);
      this.watchPositionCallbackId = null;
      this.watchPositionRequestTime = null;
      this.watchPositionFirstCallbackReceived = null;
    }
  }


  private async startWatchingPosition(): Promise<void> {
    const watchPositionCallback: WatchPositionCallback = (position: Position, err: any) => {
      if (err) {
        this.loggingService.log(
          'Error when watchPosition',
          err,
          LogLevel.Warning,
          DEBUG_TAG,
          err
        );
        this.gpsPositionLog.next(this.createPositionError('Unknown error'));
      }
      if (position !== null) {
        let delayInfo = '';
        if (this.watchPositionFirstCallbackReceived === false) {
          this.watchPositionFirstCallbackReceived = true;
          const secondsSinceStartWatch = (Date.now() - this.watchPositionRequestTime) / 1000;
          delayInfo = `. Delay since request: ${secondsSinceStartWatch}s`;
        }
        this.loggingService.debug(`Got position from device: Timestamp: ${new Date(position.timestamp).toLocaleTimeString()}, lat: ${position.coords?.latitude}, lon: ${position.coords?.longitude}${delayInfo}`, DEBUG_TAG);
        this.gpsPositionLog.next(this.createGpsPositionLogElement(position));
        if (this.isValidPosition(position)) {
          this.currentPosition.next(position);
        }
      }
    };
    this.addStatusToGpsPositionLog('StartGpsTracking');
    this.stopWatchingPosition(); //we need to stop current watch of position if any
    this.watchPositionRequestTime = Date.now();
    this.watchPositionCallbackId = await Geolocation.watchPosition(settings.gps.highAccuracyPositionOptions, watchPositionCallback);
    this.loggingService.debug(`Start GPS position subscription with callback ID: ${this.watchPositionCallbackId}, enableHighAccuracy = ${settings.gps.highAccuracyPositionOptions.enableHighAccuracy}, timeout = ${settings.gps.highAccuracyPositionOptions.timeout}, maximumAge = ${settings.gps.highAccuracyPositionOptions.maximumAge}`, DEBUG_TAG);
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


  private async checkPermissions(): Promise<boolean> {
    // https://www.devhybrid.com/ionic-4-requesting-user-permissions/
    try {
      const currentPermissions = await Geolocation.checkPermissions();
      this.loggingService.debug(`Geolocation permissions: (fine)location is ${currentPermissions?.location}, courseLocation is ${currentPermissions.coarseLocation}`, DEBUG_TAG);
      const authorized = currentPermissions.location === 'granted';
      if (!authorized) {
        if (this.platform.is('ios')) {
          await this.showPermissionDeniedError();
          return false;
        }
        // location is not authorized, request new. This only works on Android
        const newPermissionsAfterRequest = await Geolocation.requestPermissions();
        this.loggingService.debug(`Geolocation permissions after new request is: (fine)location is ${newPermissionsAfterRequest?.location}, courseLocation is ${newPermissionsAfterRequest.coarseLocation}`, DEBUG_TAG);
        if (newPermissionsAfterRequest?.location === 'denied') {
          await this.showPermissionDeniedError();
          return false;
        }
      }
      return true;
    } catch (err) {
      this.loggingService.error(
        err,
        DEBUG_TAG,
        'Error asking for location permissions'
      );
      return true; // continute anyway on error
    }
  }

  private async showPermissionDeniedError() {
    const translations = await this.translateService
      .get([
        'ALERT.OK',
        'PERMISSION.LOCATION_DENIED_HEADER',
        'PERMISSION.LOCATION_DENIED_MESSAGE'
      ])
      .toPromise();
    const alert = await this.alertController.create({
      header: translations['PERMISSION.LOCATION_DENIED_HEADER'],
      message: translations['PERMISSION.LOCATION_DENIED_MESSAGE'],
      buttons: [translations['ALERT.OK']]
    });
    await alert.present();
  }

  private startWatchingHeading() {
    if (this.headingSubscription && !this.headingSubscription.closed) {
      this.headingSubscription.unsubscribe();
    }
    // NOTE! Because of issues with show heading with W3C Devece Orientation API in iOS 13, the depricated
    // plugin cordova-plugin-device-orientation is used instead on ios
    // https://github.com/apache/cordova-plugin-device-orientation/issues/52
    this.headingSubscription = (this.isIos()
      ? this.getHeadingNative()
      : this.getWebHeadingObservable()
    ).subscribe((heading: number) => this.validateAndSetHeading(heading));
  }

  private isIos(): boolean {
    return this.platform.is('hybrid') && this.platform.is('ios');
  }

  private getHeadingNative() {
    return this.deviceOrientation
      .watchHeading({filter: 1}) //get notified only if heading changes > 1 degree
      .pipe(map((val) => val?.magneticHeading));
  }

  private getWebHeadingObservable() {
    return merge(
      fromEvent(<any>window, 'deviceorientationabsolute'),
      fromEvent(<any>window, 'deviceorientation')
    ).pipe(
      map((event: DeviceOrientationEvent) => {
        const appleHeading = (<any>event).webkitCompassHeading;
        const heading: number = appleHeading || this.getAbsoluteHeading(event);
        return heading;
      })
    );
  }

  // private requestDeviceOrientationPermission(): Promise<boolean> {
  // TODO: iOS 13 ask for permission every time, and from localhost.
  // this needs to be better supported before turning on
  // or use another native plugin than depricated
  // https://github.com/apache/cordova-plugin-device-orientation
  // https://medium.com/flawless-app-stories/how-to-request-device-motion-and-orientation-permission-in-ios-13-74fc9d6cd140
  // https://github.com/apache/cordova-plugin-device-orientation/issues/52

  // const doe = <any>DeviceOrientationEvent;
  // if (typeof doe.requestPermission === 'function') {
  //   // iOS 13+
  //   const response = await doe.requestPermission();
  //   return response === 'granted';
  // } else {
  //   // non iOS 13+
  // return Promise.resolve(true);
  // }
  // }

  private getAbsoluteHeading(event: DeviceOrientationEvent) {
    return event.alpha !== undefined && event.absolute
      ? 360 - event.alpha
      : undefined;
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
