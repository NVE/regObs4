import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CallbackID, ClearWatchOptions, Geolocation, Position, WatchPositionCallback } from '@capacitor/geolocation';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoPositionLog, PositionError } from './geo-position-log.interface';
import { GeoPositionService } from './geo-position.service';

const DEBUG_TAG = 'GeoPositionNativeService';

//TODO: Fjern denne hvis vi ikke trenger den
const POSITION_OPTIONS_ANDROID: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20 * 1000, // 20 sec
  maximumAge: Infinity,
};

/**
 * On Android we need to use other options on first watch request to avoid a long delay on first request
 */
const POSITION_OPTIONS_ANDROID_FIRST_REQUEST: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 1000, //to avoid a long delay on app startup
  maximumAge: 0, //we do not accept cached positions, ask for GPS position immediately
};

@Injectable({
  providedIn: 'root',
})
export class GeoPositionNativeService extends GeoPositionService {
  private watchPositionCallbackId: CallbackID = null;
  private watchPositionRequestTime: number = null;
  private watchPositionFirstCallbackReceived = false;
  private highAccuracyEnabled = new BehaviorSubject(true);

  constructor(
    toastController: ToastController,
    translateService: TranslateService,
    platform: Platform,
    logger: LoggingService
  ) {
    super(toastController, translateService, platform, logger);

    this.platform.pause.subscribe(() => this.stopWatchingPosition());
    this.platform.resume.subscribe(() => {
      this.logger.debug('Resume, try to start watching position...', DEBUG_TAG);
      this.startWatchingPosition();
      this.logger.debug('Resume, watching position...', DEBUG_TAG);
    }); //TODO: Check that current subscribers will get notified after resume
  }

  protected async startWatchingPosition(): Promise<void> {
    const permissionGranted = await this.checkPermissions();
    if (!permissionGranted) {
      this.showPermissionDeniedToast();
      this.logger.debug(
        'Watch position request aborted because permission denied. Please run checkPermissionsAndAsk() to check again',
        DEBUG_TAG
      );
      return;
    }
    const watchPositionCallback: WatchPositionCallback = (position: Position, err: any) => {
      if (err) {
        this.logger.log('Error when watchPosition', err, LogLevel.Warning, DEBUG_TAG, err);
        this.gpsPositionLog.next(this.createPositionError('Unknown error'));
      }
      if (position !== null) {
        if (!this.watchPositionFirstCallbackReceived) {
          this.watchPositionFirstCallbackReceived = true;
          this.logFirstCallback(position);
          if (Capacitor.getPlatform() === 'android') {
            //we stop current subscription an start a new with much lower callback frequency
            this.stopWatchingPosition();
            this.watchPosition(watchPositionCallback);
          }
        }
        this.gpsPositionLog.next(this.createGpsPositionLogElement(position));
        if (this.isValidPosition(position)) {
          this.currentPosition.next(position);
        }
      }
    };
    this.addStatusToGpsPositionLog('StartGpsTracking');
    this.stopWatchingPosition(); //we need to stop current watch of position if any
    this.watchPosition(watchPositionCallback);
    this.isWatching = true;
  }

  private async checkPermissions(): Promise<boolean> {
    try {
      const permissions = await Geolocation.checkPermissions();
      this.logger.debug('Geolocation permissions', DEBUG_TAG, permissions);
      return permissions?.location === 'granted';
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Error asking for location permissions');
    }
    return false;
  }

  // This only works on Android
  private async askForPermission(): Promise<boolean> {
    try {
      const permissions = await Geolocation.requestPermissions();
      this.logger.debug('Geolocation permissions after request', DEBUG_TAG, permissions);
      if (permissions?.location === 'denied') {
        this.showPermissionDeniedToast();
        return false;
      }
    } catch (err) {
      this.logger.error(err, DEBUG_TAG, 'Error asking for location permissions');
      this.showPermissionDeniedToast();
      return false;
    }
    return true;
  }

  async checkPermissionsAndAsk(): Promise<boolean> {
    let authorized = await this.checkPermissions();
    if (!authorized && Capacitor.getPlatform() === 'android') {
      // location is not authorized, request new. This only works on Android
      authorized = await this.askForPermission();
    }
    if (!authorized) {
      this.showPermissionDeniedToast();
      return false;
    }
    return true;
  }

  private async watchPosition(callback: WatchPositionCallback) {
    this.watchPositionRequestTime = Date.now();
    this.watchPositionCallbackId = await Geolocation.watchPosition(this.getPositionOptions(), callback);
    this.logger.debug(
      `Start GPS position subscription with callback ID: ${this.watchPositionCallbackId}`,
      DEBUG_TAG,
      this.getPositionOptions()
    );
  }

  protected getPositionOptions(): PositionOptions {
    if (Capacitor.getPlatform() === 'android') {
      if (!this.watchPositionFirstCallbackReceived) {
        return POSITION_OPTIONS_ANDROID_FIRST_REQUEST;
      }
    }
    return super.getPositionOptions();
  }

  private logFirstCallback(position: Position) {
    const secondsSinceStartWatch = (Date.now() - this.watchPositionRequestTime) / 1000;
    this.logger.debug(
      'First callback received. ' +
        `Timestamp: ${new Date(position.timestamp).toLocaleTimeString()}, ` +
        `Delay since request: ${secondsSinceStartWatch}s`,
      DEBUG_TAG,
      { accuracy: position?.coords?.accuracy }
    );
  }

  protected stopWatchingPosition() {
    if (this.watchPositionCallbackId !== null) {
      this.logger.debug(
        `Stop current GPS position watch subscription with callback ID: ${this.watchPositionCallbackId}`,
        DEBUG_TAG
      );
      this.addStatusToGpsPositionLog('StopGpsTracking');
      const options: ClearWatchOptions = { id: this.watchPositionCallbackId };
      Geolocation.clearWatch(options);
      this.watchPositionCallbackId = null;
      this.watchPositionRequestTime = null;
    }
  }

  private getTimestamp(geopos: Position) {
    if (geopos && geopos.timestamp > 0) {
      if (Capacitor.getPlatform() === 'ios') {
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
}
