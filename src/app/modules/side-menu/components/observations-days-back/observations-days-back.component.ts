import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { Platform, SelectCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss'],
})
export class ObservationsDaysBackComponent extends NgDestoryBase implements OnInit {
  daysBackOptions: { val: number }[];
  subscription: Subscription;
  popupType: SelectInterface;

  @Output() changeDaysBack = new EventEmitter<number>();

  constructor(public userSettingService: UserSettingService, private platform: Platform) {
    super();
  }

  ngOnInit(): void {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.userSettingService.currentGeoHazard$.pipe(takeUntil(this.ngDestroy$)).subscribe((currentGeoHazard) => {
      this.daysBackOptions = this.getDaysBackArray(currentGeoHazard[0]);
    });
  }

  getDaysBackArray(geoHazard: GeoHazard) {
    return settings.observations.daysBack[GeoHazard[geoHazard]].map((val: number) => ({
      val: val,
    }));
  }

  async save(event: SelectCustomEvent<number>): Promise<void> {
    const newDaysBack = event.detail.value;
    const savedDaysBack = await this.userSettingService.saveGeoHazardsAndDaysBack({ daysBack: newDaysBack });
    if (typeof savedDaysBack === 'number') {
      this.changeDaysBack.emit(savedDaysBack);
    }
  }
}
