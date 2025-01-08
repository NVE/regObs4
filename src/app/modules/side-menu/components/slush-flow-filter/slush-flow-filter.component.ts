import { IonItem, IonCheckbox, IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { map } from 'rxjs';
import { SearchCriteriaService, SLUSH_FLOW_ID } from 'src/app/core/services/search-criteria/search-criteria.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-slush-flow-filter',
  templateUrl: './slush-flow-filter.component.html',
  styleUrls: ['./slush-flow-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IonCheckbox, IonItem, IonLabel, NgIf],
})
export class SlushFlowFilterComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private userSettingService = inject(UserSettingService);
  private kdvService = inject(KdvService);

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

  caption$ = this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheKDV').pipe(
    map((avalancheKdvs) => {
      const slushFlowKdv = avalancheKdvs.find((type) => type.Id === SLUSH_FLOW_ID);
      if (slushFlowKdv) {
        return slushFlowKdv.Name;
      }
      return "Slush flow'"; // fallback name
    })
  );

  setValue(event: CustomEvent) {
    const checked = event.detail.checked;
    this.searchCriteriaService.setSlushFlow(checked);
  }
}
