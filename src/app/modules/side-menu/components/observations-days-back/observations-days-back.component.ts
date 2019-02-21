import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  daysBack: { val: number, selected: boolean, text: string }[];
  subscription: Subscription;
  constructor(private userSettingService: UserSettingService, private zone: NgZone, private loggingService: LoggingService) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.userSettingService.daysBack$,
      this.userSettingService.currentGeoHazardObservable$,
      this.userSettingService.showObservations$,
    )
      .pipe(map(([daysBack, currentGeoHazard, showObservations]) => this.getDaysBackArray(daysBack, currentGeoHazard, showObservations)),
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

  getDaysBackArray(daysBack: { geoHazard: GeoHazard, daysBack: number }[], currentGeoHazard: GeoHazard[], showObservations: boolean) {
    const daysBackArr: { val: number, selected: boolean, text: string }[]
      = settings.observations.daysBack[GeoHazard[currentGeoHazard[0]]].filter((x) => x > 0).map((val: number) => ({
        val: val,
        selected: daysBack.find((x) => x.geoHazard === currentGeoHazard[0]).daysBack === val,
      }));
    const today = {
      val: 0,
      selected: daysBack.find((x) => x.geoHazard === currentGeoHazard[0]).daysBack === 0,
      text: 'MENU.TODAYS_OBSERVATIONS'
    };
    return [today, ...daysBackArr];
  }

  async changeDaysBack(event: Event) {
    const select: IonSelect = (<any>event.target);
    const userSetting = await this.userSettingService.getUserSettings();
    for (const geoHazard of userSetting.currentGeoHazard) {
      const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === userSetting.currentGeoHazard[0]);
      if (existingValue.daysBack !== select.value) {
        existingValue.daysBack = select.value;
      }
    }
    await this.userSettingService.saveUserSettings(userSetting);
  }
}
