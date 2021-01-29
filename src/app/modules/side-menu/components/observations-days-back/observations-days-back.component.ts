import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { IonSelect } from '@ionic/angular';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { settings } from '../../../../../settings';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss']
})
export class ObservationsDaysBackComponent implements OnInit, OnDestroy {
  selectedDaysBack: number;
  daysBackOptions: { val: number; text: string }[];
  subscription: Subscription;

  constructor(
    private userSettingService: UserSettingService,
    private zone: NgZone,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
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

  async save() {
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
