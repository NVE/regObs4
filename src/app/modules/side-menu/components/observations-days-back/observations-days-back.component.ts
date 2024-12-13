import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { SelectInterface } from '@ionic/core';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { Capacitor } from '@capacitor/core';
import { SelectCustomEvent, IonicModule } from '@ionic/angular';
import { NgIf, NgTemplateOutlet, NgFor, AsyncPipe } from '@angular/common';
import { ɵEmptyOutletComponent } from '@angular/router';
import { CheckDaysOrWeeksBackComponent } from '../check-days-or-weeks-back/check-days-or-weeks-back.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss'],
  imports: [
    NgIf,
    IonicModule,
    NgTemplateOutlet,
    ɵEmptyOutletComponent,
    NgFor,
    CheckDaysOrWeeksBackComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class ObservationsDaysBackComponent extends NgDestoryBase implements OnInit {
  daysBackOptions: { val: number }[];
  subscription: Subscription;
  popupType: SelectInterface;
  isNativePlatform: boolean;

  @Output() changeDaysBack = new EventEmitter<number>();

  constructor(public userSettingService: UserSettingService) {
    super();
  }

  ngOnInit(): void {
    this.isNativePlatform = Capacitor.isNativePlatform();
    this.popupType = this.isNativePlatform ? 'action-sheet' : 'popover';
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
