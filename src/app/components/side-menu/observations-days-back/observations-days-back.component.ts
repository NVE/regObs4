import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { settings } from '../../../../settings';
import { UserSetting } from '../../../core/models/user-settings.model';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { IonSelect } from '@ionic/angular';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss']
})
export class ObservationsDaysBackComponent implements OnInit, OnDestroy {
  daysBack: { val: number, selected: boolean, text: string }[];
  subscription: Subscription;
  constructor(private userSettingService: UserSettingService, private zone: NgZone, private loggingService: LoggingService) { }

  ngOnInit() {
    this.subscription = this.userSettingService.userSettingObservable$
      .pipe(map((val) => this.getDaysBackArray(val)),
        tap((val) =>
          this.loggingService.debug(`Days back changed to ${val.find((d) => d.selected).val}`, 'ObservationsDaysBackComponent')))
      .subscribe((val) => {
        this.zone.run(() => {
          this.daysBack = val;
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDaysBackArray(userSetting: UserSetting) {
    const daysBackArr: { val: number, selected: boolean, text: string }[]
      = settings.observations.daysBack[GeoHazard[userSetting.currentGeoHazard[0]]].filter((x) => x > 0).map((val: number) => ({
        val: val,
        selected: userSetting.observationDaysBack.find((x) => x.geoHazard === userSetting.currentGeoHazard[0]).daysBack === val,
      }));
    const doNowShow = { val: -1, selected: !userSetting.showObservations, text: 'MENU.HIDE_OBSERVATIONS' };
    const today = {
      val: 0,
      selected: userSetting.observationDaysBack.find((x) => x.geoHazard === userSetting.currentGeoHazard[0]).daysBack === 0,
      text: 'MENU.TODAYS_OBSERVATIONS'
    };
    return [doNowShow, today, ...daysBackArr];
  }

  async changeDaysBack(event: Event) {
    const select: IonSelect = (<any>event.target);
    const userSetting = await this.userSettingService.getUserSettings();
    if (select.value === -1) {
      userSetting.showObservations = false;
    } else {
      userSetting.showObservations = true;
      const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === userSetting.currentGeoHazard[0]);
      if (existingValue.daysBack !== select.value) {
        existingValue.daysBack = select.value;
      }
    }
    await this.userSettingService.saveUserSettings(userSetting);
  }
}
