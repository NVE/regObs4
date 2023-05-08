import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { filter, firstValueFrom, Subject, take, withLatestFrom } from 'rxjs';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';

const DEBUG_TAG = 'ApiVersionService';

/**
 * Varsler om vi bruker et utdatert Regobs-API
 */
@Injectable({
  providedIn: 'root',
})
export class ApiVersionService {
  private sunsetDate = new Subject<string>();

  constructor(
    private logger: LoggingService,
    private translateService: TranslateService,
    private toastService: ToastController,
    userSettingsService: UserSettingService
  ) {
    this.sunsetDate
      .pipe(
        filter((sunsetDate) => sunsetDate !== null),
        withLatestFrom(userSettingsService.language$),
        take(1)
      )
      .subscribe(([sunsetDate]) => {
        this.logger.log(`Regobs API sunset at ${sunsetDate}`, null, LogLevel.Warning, DEBUG_TAG);
        this.showWarning(sunsetDate);
      });
  }

  setSunsetDate(date: string) {
    this.sunsetDate.next(date);
  }

  private async showWarning(sunsetDate: string) {
    const translations = await firstValueFrom(this.translateService.get(['CLOSE', 'API.SUNSET'], { sunsetDate }));
    const toast = await this.toastService.create({
      message: translations['API.SUNSET'],
      position: 'bottom',
      cssClass: 'toast',
      buttons: [
        {
          text: translations['CLOSE'],
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }
}
