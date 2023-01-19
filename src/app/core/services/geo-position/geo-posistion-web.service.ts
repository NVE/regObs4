import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoPositionService } from './geo-position.service';

const DEBUG_TAG = 'GeoPositionWebService';

@Injectable({
  providedIn: 'root',
})
/**
 * Fetch position data from browser
 */
export class GeoPositionWebService extends GeoPositionService {
  constructor(
    toastController: ToastController,
    translateService: TranslateService,
    platform: Platform,
    logger: LoggingService
  ) {
    super(toastController, translateService, platform, logger);
  }

  async checkPermissionsAndAsk(): Promise<boolean> {
    //TODO: Mye kopi av kode fra startWatchingPosition, refaktor!
    if (!this.geoLocationSupported) {
      this.handleGeoLocationNotSupported();
      return false;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        return true;
      },
      (err) => {
        this.geolocationError(err);
      },
      this.getPositionOptions()
    );
    return false;
  }

  /**
   * Will request position from browser (only) once and then complete the currentPosition stream
   */
  protected async startWatchingPosition(): Promise<void> {
    if (!this.geoLocationSupported) {
      this.handleGeoLocationNotSupported();
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

  private handleGeoLocationNotSupported() {
    const errorMessage: string = this.translateService.instant('GEOLOCATION.POSITION_ERROR.UNSUPPORTED');
    this.gpsPositionLog.next(this.createPositionError(errorMessage));
    this.createToast(errorMessage);
  }
}
