import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoPositionService } from './geo-position.service';

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

  /**
   * If geolocation is permitted, returns true AND send the position to currentPosition$.
   * Since the only way to check if the browser allows geolocation is to ask for the position,
   * we also dispatch the posistion to currentPosition$, if the request succeded.
   */
  async requestPositionData(): Promise<boolean> {
    if (!this.geoLocationSupported) {
      this.handleGeoLocationNotSupported();
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (this.isValidPosition(pos)) {
            this.currentPosition.next(pos);
            return true;
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
      return false;
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
