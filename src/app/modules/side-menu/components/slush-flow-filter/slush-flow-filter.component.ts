import { IonItem, IonCheckbox } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { map } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-slush-flow-filter',
  templateUrl: './slush-flow-filter.component.html',
  styleUrls: ['./slush-flow-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IonCheckbox, IonItem, NgIf],
})
export class SlushFlowFilterComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private userSettingService = inject(UserSettingService);
  label = input<string>('');

  visible$ = this.userSettingService.currentGeoHazard$.pipe(
    map((geoHazard) => {
      const snow = geoHazard.length === 1 && geoHazard.includes(GeoHazard.Snow);
      return !Capacitor.isNativePlatform() && snow;
    })
  );

  value$ = this.searchCriteriaService.searchCriteria$.pipe(
    map((criteria) => {
      return this.searchCriteriaService.isSlushFlow(criteria);
    })
  );

  setValue(event: CustomEvent) {
    const checked = event.detail.checked;
    this.searchCriteriaService.setSlushFlow(checked);
  }
}
