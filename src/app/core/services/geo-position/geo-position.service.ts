import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  ReplaySubject,
  of,
  Observable,
  Subscription,
  combineLatest,
  merge,
  fromEvent
} from 'rxjs';
import {
  filter,
  map,
  catchError,
  distinctUntilChanged,
  startWith
} from 'rxjs/operators';
import {
  Geolocation,
  Geoposition,
  PositionError
} from '@ionic-native/geolocation/ngx';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { GeoPositionLog } from './geo-position-log.interface';
import { GeoPositionErrorCode } from './geo-position-error.enum';
import moment from 'moment';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';

const DEBUG_TAG = 'GeoPositionService';

@Injectable({
  providedIn: 'root'
})
export class GeoPositionService implements OnDestroy {
  private highAccuracyEnabled = new BehaviorSubject(true);
  private gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);
  private currentPosition: BehaviorSubject<Geoposition> = new BehaviorSubject(
    null
  );
  private currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);

  private readonly trackingComponents = new BehaviorSubject<string[]>([]);

  // Subscriptions
  private positionSubscription: Subscription;
  private headingSubscription: Subscription;

  get currentPosition$(): Observable<Geoposition> {
    return this.currentPosition.pipe(filter((cp) => cp !== null));
  }

  get currentHeading$(): Observable<number> {
    return this.currentHeading.pipe(filter((cp) => cp !== null));
  }

  get log$(): Observable<GeoPositionLog> {
    return this.gpsPositionLog.asObservable();
  }

  constructor(
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private loggingService: LoggingService,
    private diagnostic: Diagnostic,
    private alertController: AlertController,
    private translateService: TranslateService
  ) {
    this.startGeolocationTrackingSubscription();
  }

  ngOnDestroy(): void {
    this.stopSubscriptions();
  }

  getSingleCurrentPosition(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition(
      settings.gps.highAccuracyPositionOptions
    );
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

  getTimestamp(geopos: Geoposition) {
    if (geopos && geopos.timestamp > 0) {
      if (this.platform.is('cordova') && this.platform.is('ios')) {
        return geopos.timestamp / 1000;
      }
      return geopos.timestamp;
    }
    return moment().unix();
  }

  private mapPosToLog(): (
    src: Observable<Geoposition>
  ) => Observable<GeoPositionLog> {
    return (src: Observable<Geoposition>) =>
      src.pipe(
        map((pos) => {
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
        })
      );
  }

  private addGpsPositionLog(status: 'StartGpsTracking' | 'StopGpsTracking') {
    this.gpsPositionLog.next({
      timestamp: moment().unix(),
      status,
      highAccuracyEnabled: this.highAccuracyEnabled.value
    });
  }

  public async startTrackingComponent(
    name: string,
    forcePermissionDialog = false
  ) {
    if (forcePermissionDialog) {
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
    if (this.positionSubscription && !this.positionSubscription.closed) {
      this.addGpsPositionLog('StopGpsTracking');
      this.positionSubscription.unsubscribe();
    }
  }

  private startWatchingPosition() {
    this.addGpsPositionLog('StartGpsTracking');
    if (this.positionSubscription && !this.positionSubscription.closed) {
      this.positionSubscription.unsubscribe();
    }
    this.positionSubscription = this.geolocation
      .watchPosition(settings.gps.highAccuracyPositionOptions)
      .pipe(
        filter((result) => result !== null),
        this.mapPosToLog(),
        catchError((err) => {
          this.loggingService.log(
            'Error when watchPosition',
            err,
            LogLevel.Warning,
            DEBUG_TAG,
            err
          );
          return of(this.createPositionError('Unknown error'));
        })
      )
      .subscribe((result: GeoPositionLog) => {
        this.gpsPositionLog.next(result);
        if (this.isValidPosition(result.pos)) {
          this.gpsPositionLog.next({
            timestamp: result.pos.timestamp,
            status: 'PositionUpdate',
            highAccuracyEnabled: result.highAccuracyEnabled,
            pos: result.pos
          });
          this.currentPosition.next(result.pos);
        }
      });
  }

  private isValidPosition(pos: Geoposition) {
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

  private async checkPermissions() {
    // https://www.devhybrid.com/ionic-4-requesting-user-permissions/
    try {
      if (isAndroidOrIos(this.platform)) {
        const authorized = await this.diagnostic.isLocationAuthorized();
        this.loggingService.debug(
          'Location is ' + (authorized ? 'authorized' : 'unauthorized'),
          DEBUG_TAG
        );
        if (!authorized) {
          if (this.platform.is('ios')) {
            await this.showPermissionDeniedError();
            return false;
          }
          // location is not authorized, request new. This only works on Android
          const status = await this.diagnostic.requestLocationAuthorization();
          this.loggingService.debug(
            'Request location status',
            DEBUG_TAG,
            status
          );
          if (
            status === this.diagnostic.permissionStatus.DENIED_ONCE ||
            status === this.diagnostic.permissionStatus.DENIED_ALWAYS
          ) {
            await this.showPermissionDeniedError();
            return false;
          }
        }
        return true;
      }
      else {
        await navigator.permissions
          .query({
            name: 'geolocation'
          })
          .then((res) => {
            if (res.state === 'denied') {
              this.showPermissionDeniedError();
              return false;
            } else if (res.state === 'prompt') {
              this.currentPosition;
            }
          });
          return true;
      }
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
    this.headingSubscription = (this.shouldUseNativePlugin()
      ? this.getHeadingNative()
      : this.getWebHeadingObservable()
    ).subscribe((heading: number) => this.validateAndSetHeading(heading));
  }

  private shouldUseNativePlugin(): boolean {
    return this.platform.is('cordova') && this.platform.is('ios');
  }

  private getHeadingNative() {
    return this.deviceOrientation
      .watchHeading()
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
