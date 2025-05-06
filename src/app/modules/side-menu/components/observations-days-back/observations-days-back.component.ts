import { Component, computed, inject, input, output } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { SelectInterface } from '@ionic/core';
import { Capacitor } from '@capacitor/core';
import { IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/angular/standalone';
import { CheckDaysOrWeeksBackComponent } from '../check-days-or-weeks-back/check-days-or-weeks-back.component';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss'],
  imports: [CheckDaysOrWeeksBackComponent, IonSelect, IonSelectOption, TranslatePipe],
})
export class ObservationsDaysBackComponent {
  private userSettingService = inject(UserSettingService);
  private searchCriteria = inject(SearchCriteriaService);

  labelKey = input('MENU.TIMESPAN');
  daysBack = toSignal(this.userSettingService.daysBackForCurrentGeoHazard$);
  private geoHazard = toSignal(this.userSettingService.currentGeoHazard$);
  daysBackOptions = computed(() => {
    const geoHazard = this.geoHazard();
    if (geoHazard) {
      return this.getDaysBackArray(geoHazard[0]);
    }
    return [];
  });

  useDaysBack = toSignal(this.searchCriteria.useDaysBack$, { initialValue: true });
  isNativePlatform = Capacitor.isNativePlatform();
  popupType: SelectInterface = this.isNativePlatform ? 'action-sheet' : 'popover';

  daysBackChange = output<number>();

  getDaysBackArray(geoHazard: GeoHazard): { val: number }[] {
    return settings.observations.daysBack[GeoHazard[geoHazard]].map((val: number) => ({
      val: val,
    }));
  }

  async save(event: SelectCustomEvent<number>): Promise<void> {
    const newDaysBack = event.detail.value;
    const savedDaysBack = await this.userSettingService.saveGeoHazardsAndDaysBack({ daysBack: newDaysBack });
    this.daysBackChange.emit(savedDaysBack);
  }
}
