import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { Platform } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss']
})
export class ObservationsDaysBackComponent implements OnInit, OnDestroy {
  selectedDaysBack: number;
  daysBackOptions: { val: number; text: string }[];
  subscription: Subscription;
  popupType: SelectInterface;

  constructor(
    private userSettingService: UserSettingService,
    private zone: NgZone,
    private platform: Platform,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.subscription = combineLatest([
      this.userSettingService.daysBack$,
      this.userSettingService.currentGeoHazard$
    ]).subscribe(([daysBack, currentGeoHazard]) => {
      const geoHazard = currentGeoHazard[0];
      this.zone.run(() => {
        this.daysBackOptions = this.getDaysBackArray(geoHazard);
        const daysBackForCurrentGeoHazard = daysBack.find(
          (x) => x.geoHazard === geoHazard
        );
        if (daysBackForCurrentGeoHazard) {
          this.selectedDaysBack = daysBackForCurrentGeoHazard.daysBack;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDaysBackArray(geoHazard: GeoHazard) {
    return settings.observations.daysBack[GeoHazard[geoHazard]].map(
      (val: number) => ({
        val: val,
        text: val === 0 ? 'MENU.TODAYS_OBSERVATIONS' : undefined
      })
    );
  }

  async save(): Promise<void> {
    const userSetting = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    let changed = false;
    for (const geoHazard of userSetting.currentGeoHazard) {
      const existingValue = userSetting.observationDaysBack.find(
        (x) => x.geoHazard === geoHazard
      );
      if (existingValue.daysBack !== this.selectedDaysBack) {
        existingValue.daysBack = this.selectedDaysBack;
        changed = true;
      }
    }
    if (changed) {
      this.userSettingService.saveUserSettings(userSetting);
    }
  }
}
