import { Component, OnInit, OnDestroy, NgZone, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { Observable, Subscription } from 'rxjs';
import { validateConfig } from '@angular/router/src/config';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { settings } from '../../../../settings';
import { UserSetting } from '../../../core/models/user-settings.model';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { Select } from '@ionic/angular';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss']
})
export class ObservationsDaysBackComponent implements OnInit, OnDestroy {
  daysBack: { val: number, selected: boolean, text: string }[];
  subscription: Subscription;
  recreate: boolean;
  constructor(private userSettingService: UserSettingService, private zone: NgZone) { }

  ngOnInit() {
    this.subscription = this.userSettingService.userSettingObservable$
      .pipe(map((val) => this.getDaysBackArray(val)),
        tap((val) => console.log('Days back changed: ', val))).subscribe((val) => {
          this.zone.run(() => {
            this.recreate = false;
          });
          this.zone.run(() => {
            this.daysBack = val;
            this.recreate = true;
          });
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDaysBackArray(userSetting: UserSetting) {
    const daysBackArr: { val: number, selected: boolean, text: string }[]
      = settings.observations.daysBack[GeoHazard[userSetting.currentGeoHazard]].map((val: number) => ({
        val: val,
        selected: userSetting.observationDaysBack.find((x) => x.geoHazard === userSetting.currentGeoHazard).daysBack === val,
        text: `${val} dager tilbake`
      }));
    return daysBackArr;
  }

  async changeDaysBack(event: Event) {
    const select: Select = (<any>event.target);
    const userSetting = await this.userSettingService.getUserSettings();
    const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === userSetting.currentGeoHazard);
    if (existingValue.daysBack !== select.value) {
      existingValue.daysBack = select.value;
      this.userSettingService.saveUserSettings(userSetting);
    }
  }

}
