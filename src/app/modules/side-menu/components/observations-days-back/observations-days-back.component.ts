import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { SelectInterface } from '@ionic/core';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { Capacitor } from '@capacitor/core';

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
  isNativePlatform: boolean;

  @Output() changeDaysBack = new EventEmitter<number>();

  constructor(private userSettingService: UserSettingService) {
    super();
  }

  ngOnInit(): void {
    this.isNativePlatform = Capacitor.isNativePlatform();
    this.popupType = this.isNativePlatform ? 'action-sheet' : 'popover';
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
    const daysBack = await this.userSettingService.saveGeoHazardsAndDaysBack({ daysBack: this.selectedDaysBack });
    if (typeof daysBack === 'number') {
      this.changeDaysBack.emit(daysBack);
    }
  }
}
