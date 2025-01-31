import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../../settings';
import { SelectInterface } from '@ionic/core';
import { Capacitor } from '@capacitor/core';
import { IonItem, IonLabel, IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/angular/standalone';
import { NgIf, NgTemplateOutlet, NgFor, AsyncPipe } from '@angular/common';
import { ɵEmptyOutletComponent } from '@angular/router';
import { CheckDaysOrWeeksBackComponent } from '../check-days-or-weeks-back/check-days-or-weeks-back.component';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-observations-days-back',
  templateUrl: './observations-days-back.component.html',
  styleUrls: ['./observations-days-back.component.scss'],
  imports: [
    AsyncPipe,
    CheckDaysOrWeeksBackComponent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    TranslatePipe,
    ɵEmptyOutletComponent,
  ],
})
export class ObservationsDaysBackComponent {
  userSettingService = inject(UserSettingService);

  private geoHazard = toSignal(this.userSettingService.currentGeoHazard$);
  daysBackOptions = computed(() => {
    const geoHazard = this.geoHazard();
    if (geoHazard) {
      return this.getDaysBackArray(geoHazard[0]);
    }
    return [];
  });

  isNativePlatform = Capacitor.isNativePlatform();
  popupType: SelectInterface = this.isNativePlatform ? 'action-sheet' : 'popover';

  @Output() changeDaysBack = new EventEmitter<number>();

  getDaysBackArray(geoHazard: GeoHazard): { val: number }[] {
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
