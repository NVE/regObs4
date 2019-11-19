import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, ReplaySubject, from, of, Observable } from 'rxjs';
import { filter, takeUntil, map, concatMap, tap, catchError } from 'rxjs/operators';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';

export interface GeoPositionLog {
  status: 'StartGpsTracking' | 'StopGpsTracking' | 'PositionUpdate' | 'PositionError';
  highAccuracyEnabled: boolean;
  pos?: Geoposition;
  err?: PositionError;
}

const DEBUG_TAG = 'GeoPositionService';

@Injectable({
  providedIn: 'root'
})
export class GeoPositionService {

  private stopPostionUpdates: Subject<void> = new Subject();
  private highAccuracyEnabled = new BehaviorSubject(true);
  private gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);
  private currentPosition: BehaviorSubject<Geoposition> = new BehaviorSubject(null);
  private setHeadingFunc: (event: DeviceOrientationEvent) => void;
  private currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);
  private hasCompassHeading = new BehaviorSubject(false);

  get currentPosition$() {
    return this.currentPosition.pipe(filter((cp) => cp !== null));
  }

  get currentHeading$() {
    return this.currentHeading.pipe(filter((cp) => cp !== null));
  }

  get log$() {
    return this.gpsPositionLog.asObservable();
  }

  constructor(
    private geolocation: Geolocation,
    private platform: Platform,
    private loggingService: LoggingService,
    private diagnostic: Diagnostic,
    private alertController: AlertController,
    private translateService: TranslateService) {
    this.setHeadingFunc = this.setHeading.bind(this);
  }

  private createPositionError(
    message: string,
    highAccuracyEnabled = true,
    code: number = 0,
    PERMISSION_DENIED = 0,
    POSITION_UNAVAILABLE = 0,
    TIMEOUT = 0): GeoPositionLog {
    return {
      status: 'PositionError',
      pos: undefined,
      highAccuracyEnabled,
      err: {
        code,
        message,
        PERMISSION_DENIED,
        POSITION_UNAVAILABLE,
        TIMEOUT,
      },
    };
  }

  private mapPosToLog(): (src: Observable<Geoposition>) => Observable<GeoPositionLog> {
    return (src: Observable<Geoposition>) => src.pipe(map((pos) => {
      const log: GeoPositionLog = ({
        status: (pos.coords === undefined ? 'PositionError' : 'PositionUpdate') as 'PositionError' | 'PositionUpdate',
        pos,
        highAccuracyEnabled: true,
        err: pos.coords === undefined ? (pos as unknown as PositionError) : undefined
      });
      return log;
    }));
  }


  startTracking(forcePermissionDialog = false) {
    this.gpsPositionLog.next({ status: 'StartGpsTracking', highAccuracyEnabled: this.highAccuracyEnabled.value });
    this.stopPostionUpdates = new Subject();

    const watchObservable: Observable<GeoPositionLog> = this.geolocation.watchPosition(
      settings.gps.highAccuracyPositionOptions
    ).pipe(
      filter((result) => result !== null),
      this.mapPosToLog(),
      catchError((err) => {
        this.loggingService.log('Error when watchPosition', err, LogLevel.Warning, DEBUG_TAG, err);
        return of(this.createPositionError('Unknown error'));
      }));

    (forcePermissionDialog ? from(this.checkPermissions()) : of(true)).pipe(
      tap(() => this.loggingService.debug('Before watchPosition', DEBUG_TAG)),
      concatMap((startWatch) => startWatch ? watchObservable : of(this.createPositionError('Permission denied'))),
      tap((val) => this.loggingService.debug('After watchPosition', DEBUG_TAG, val)),
      takeUntil(this.stopPostionUpdates))
      .subscribe((result: GeoPositionLog) => {
        this.gpsPositionLog.next(result);
        if (this.isValidPosition(result.pos)) {
          this.gpsPositionLog.next(({ status: 'PositionUpdate', highAccuracyEnabled: result.highAccuracyEnabled, pos: result.pos }));
          this.currentPosition.next(result.pos);
          // if (!this.highAccuracyEnabled.value) {
          //   this.highAccuracyEnabled.next(true);
          // }
        }
      });
    this.startWatchingHeading();
    this.startUpdateHeadingIfValidPositionAndNoCompassHeading();
  }

  stopTracking() {
    this.gpsPositionLog.next({ status: 'StopGpsTracking', highAccuracyEnabled: true });
    this.stopWatchingHeading();
    this.stopPostionUpdates.next();
    this.stopPostionUpdates.complete();
    // this.highAccuracyEnabled.next(false);
  }

  private isValidPosition(pos: Geoposition) {
    return pos !== undefined && pos !== null && pos.coords !== undefined
      && pos.coords !== null && pos.coords.latitude >= -90 && pos.coords.latitude <= 90
      && pos.coords.longitude >= -180 && pos.coords.longitude <= 180;
  }

  private isValidHeading(heading: number) {
    return heading >= 0 && heading <= 360;
  }

  private async checkPermissions() {
    // https://www.devhybrid.com/ionic-4-requesting-user-permissions/
    try {
      const authorized = await this.diagnostic.isLocationAuthorized();
      this.loggingService.debug('Location is ' + (authorized ? 'authorized' : 'unauthorized'), DEBUG_TAG);
      if (!authorized) {
        // if (this.platform.is('ios')) {
        //   await this.showPermissionDeniedError();
        //   return false;
        // }
        // location is not authorized, request new. This only works on Android
        const status = await this.diagnostic.requestLocationAuthorization();
        this.loggingService.debug(`Request location status`, DEBUG_TAG, status);
        if (status === this.diagnostic.permissionStatus.DENIED_ONCE ||
          status === this.diagnostic.permissionStatus.DENIED_ALWAYS) {
          await this.showPermissionDeniedError();
          return false;
        }
      }
      return true;
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, 'Error asking for location permissions');
      return true; // continute anyway on error
    }
  }

  private async showPermissionDeniedError() {
    const translations = await this.translateService.get([
      'ALERT.OK',
      'PERMISSION.LOCATION_DENIED_HEADER',
      'PERMISSION.LOCATION_DENIED_MESSAGE']).toPromise();
    const alert = await this.alertController.create({
      header: translations['PERMISSION.LOCATION_DENIED_HEADER'],
      message: translations['PERMISSION.LOCATION_DENIED_MESSAGE'],
      buttons: [translations['ALERT.OK']]
    });
    await alert.present();
  }

  private startWatchingHeading() {
    // TODO: Implement compass needs calibration alert?
    //   window.addEventListener('compassneedscalibration', function(event) {
    //     // ask user to wave device in a figure-eight motion
    //     event.preventDefault();
    // }, true);

    this.requestDeviceOrientationPermission().then((granted) => {
      if (granted) {
        if ('ondeviceorientationabsolute' in <any>window) {
          window.addEventListener('deviceorientationabsolute', this.setHeadingFunc, false);
        } else if ('ondeviceorientation' in <any>window) {
          window.addEventListener('deviceorientation', this.setHeadingFunc, false);
        }
      }
    });
  }

  private requestDeviceOrientationPermission(): Promise<boolean> {
    // TODO: iOS 13 ask for permission every time, and from localhost.
    // this needs to be better supported before turning on
    // or use another native plugin than depricated
    // https://github.com/apache/cordova-plugin-device-orientation
    // https://medium.com/flawless-app-stories/how-to-request-device-motion-and-orientation-permission-in-ios-13-74fc9d6cd140

    // const doe = <any>DeviceOrientationEvent;
    // if (typeof doe.requestPermission === 'function') {
    //   // iOS 13+
    //   const response = await doe.requestPermission();
    //   return response === 'granted';
    // } else {
    //   // non iOS 13+
    return Promise.resolve(true);
    // }
  }

  private startUpdateHeadingIfValidPositionAndNoCompassHeading() {
    this.currentPosition$.pipe(filter((pos) =>
      !this.hasCompassHeading
      && pos
      && pos.coords
      && this.isValidHeading(pos.coords.heading)),
      takeUntil(this.stopPostionUpdates))
      .subscribe((pos) => this.currentHeading.next(pos.coords.heading));
  }

  private getAbsoluteHeading(event: DeviceOrientationEvent) {
    return (event.alpha !== undefined && event.absolute) ? (360 - event.alpha) : undefined;
  }

  private setHeading(event: DeviceOrientationEvent) {
    const appleHeading = (<any>event).webkitCompassHeading;
    const heading: number = appleHeading || this.getAbsoluteHeading(event);
    if (this.isValidHeading(heading)) {
      this.hasCompassHeading.next(true);
      this.currentHeading.next(heading);
    }
  }

  private stopWatchingHeading() {
    this.hasCompassHeading.next(false);
    window.removeEventListener('deviceorientation', this.setHeadingFunc);
    window.removeEventListener('deviceorientationabsolute', this.setHeadingFunc);
  }
}
