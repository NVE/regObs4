import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CallbackID, ClearWatchOptions, Geolocation, Position, WatchPositionCallback } from '@capacitor/geolocation';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
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
  private watchPositionReadyToReduceCallbackFrequency: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    deviceOrientation: DeviceOrientation,
    toastController: ToastController,
    translateService: TranslateService,
    platform: Platform,
    loggingService: LoggingService
  ) {
    super(deviceOrientation, toastController, translateService, platform, loggingService);

    this.platform.pause.subscribe(() => this.stopWatchingPosition());
    this.platform.resume.subscribe(() => this.startWatchingPosition()); //TODO: Check that current subscribers will get notified after resume
  }

  protected async startWatchingPosition(): Promise<void> {
    const permissionToGetPosition = await this.checkPermissionsAndAsk();
    if (permissionToGetPosition) {
      const watchPositionCallback: WatchPositionCallback = (position: Position, err: any) => {
        if (err) {
          this.loggingService.log('Error when watchPosition', err, LogLevel.Warning, DEBUG_TAG, err);
          this.gpsPositionLog.next(this.createPositionError('Unknown error'));
        }
        if (position !== null) {
          if (!this.watchPositionFirstCallbackReceived) {
            this.watchPositionFirstCallbackReceived = true;
            this.logFirstCallback(position);
            if (Capacitor.getPlatform() === 'Android') {
              this.watchPositionReadyToReduceCallbackFrequency.next();
              this.watchPositionReadyToReduceCallbackFrequency.complete();
            }
          }
          // this.gpsPositionLog.next(this.createGpsPositionLogElement(position));
          if (this.isValidPosition(position)) {
            this.currentPosition.next(position);
          }
        }
      };
      // this.addStatusToGpsPositionLog('StartGpsTracking');
      this.stopWatchingPosition(); //we need to stop current watch of position if any
      this.watchPosition(watchPositionCallback);
      if (Capacitor.getPlatform() === 'Android') {
        this.watchPositionReadyToReduceCallbackFrequency.subscribe(() => {
          this.stopWatchingPosition(); //we need to stopp current subscription an start a new with different options
          this.watchPosition(watchPositionCallback);
        });
      }
    } else {
      Promise.reject('Position data not available');
    }
  }

  private async checkPermissionsAndAsk(): Promise<boolean> {
    try {
      const currentPermissions = await Geolocation.checkPermissions();
      this.loggingService.debug('Geolocation permissions', DEBUG_TAG, currentPermissions);
      const authorized = currentPermissions.location === 'granted';
      if (!authorized) {
        if (Capacitor.getPlatform() === 'ios') {
          this.showPermissionDeniedToast();
          return false;
        }
        // location is not authorized, request new. This only works on Android
        const newPermissionsAfterRequest = await Geolocation.requestPermissions();
        this.loggingService.debug('Geolocation permissions after new request', DEBUG_TAG, newPermissionsAfterRequest);
        if (newPermissionsAfterRequest?.location === 'denied') {
          this.showPermissionDeniedToast();
          return false;
        }
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, 'Error asking for location permissions');
      this.showPermissionDeniedToast();
      return false;
    }
    return true;
  }

  private async watchPosition(callback: WatchPositionCallback) {
    this.watchPositionRequestTime = Date.now();
    this.watchPositionCallbackId = await Geolocation.watchPosition(this.getPositionOptions(), callback);
    this.loggingService.debug(
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
    this.loggingService.debug(
      'First callback received. ' +
        `Timestamp: ${new Date(position.timestamp).toLocaleTimeString()}, ` +
        `Delay since request: ${secondsSinceStartWatch}s`,
      DEBUG_TAG,
      { accuracy: position?.coords?.accuracy }
    );
  }

  protected stopWatchingPosition() {
    if (this.watchPositionCallbackId !== null) {
      this.loggingService.debug(
        `Stop current GPS position watch subscription with callback ID: ${this.watchPositionCallbackId}`,
        DEBUG_TAG
      );
      // TODO: this.addStatusToGpsPositionLog('StopGpsTracking');
      const options: ClearWatchOptions = { id: this.watchPositionCallbackId };
      Geolocation.clearWatch(options);
      this.watchPositionCallbackId = null;
      this.watchPositionRequestTime = null;
      this.watchPositionFirstCallbackReceived = false;
    }
  }
}
