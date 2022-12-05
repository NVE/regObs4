import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { Platform } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss'],
})
export class ObservationsDaysBackComponent extends NgDestoryBase implements OnInit {
  selectedDaysBack: number;
  daysBackOptions: { val: number }[];
  subscription: Subscription;
  popupType: SelectInterface;

  @Output() changeDaysBack = new EventEmitter<number>();

  constructor(private userSettingService: UserSettingService, private platform: Platform) {
    super();
  }

  ngOnInit(): void {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.userSettingService.currentGeoHazard$.pipe(takeUntil(this.ngDestroy$)).subscribe((currentGeoHazard) => {
      this.daysBackOptions = this.getDaysBackArray(currentGeoHazard[0]);
    });

    this.userSettingService.daysBackForCurrentGeoHazard$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((selectedDaysBack) => {
        this.selectedDaysBack = selectedDaysBack;
      });
  }

  getDaysBackArray(geoHazard: GeoHazard) {
    return settings.observations.daysBack[GeoHazard[geoHazard]].map((val: number) => ({
      val: val,
    }));
  }

  async save(): Promise<void> {
    const userSetting = await firstValueFrom(this.userSettingService.userSetting$);
    let changed = false;
    for (const geoHazard of userSetting.currentGeoHazard) {
      const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === geoHazard);
      if (existingValue.daysBack !== this.selectedDaysBack) {
        existingValue.daysBack = this.selectedDaysBack;
        changed = true;
      }
    }
    if (changed) {
      this.userSettingService.saveUserSettings(userSetting);
      const daysBack = await firstValueFrom(this.userSettingService.daysBackForCurrentGeoHazard$);
      this.changeDaysBack.emit(daysBack);
    }
  }
}
