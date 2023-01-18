import { Injectable } from '@angular/core';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoPositionService } from './geo-position.service';

const DEBUG_TAG = 'GeoPositionWebService';

@Injectable({
  providedIn: 'root',
})
export class GeoPositionWebService extends GeoPositionService {
  constructor(
    deviceOrientation: DeviceOrientation,
    toastController: ToastController,
    translateService: TranslateService,
    platform: Platform,
    loggingService: LoggingService
  ) {
    super(deviceOrientation, toastController, translateService, platform, loggingService);
  }

  /**
   * Will request position from browser (only) once
   */
  protected async startWatchingPosition(): Promise<void> {
    if (!this.geoLocationSupported) {
      const errorMessage: string = this.translateService.instant('GEOLOCATION.POSITION_ERROR.UNSUPPORTED');
      this.gpsPositionLog.next(this.createPositionError(errorMessage));
      this.createToast(errorMessage);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (this.isValidPosition(pos)) {
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
        this.getPositionOptions()
      );
    }
  }

  private get geoLocationSupported(): boolean {
    return !!navigator?.geolocation?.getCurrentPosition;
  }
}
