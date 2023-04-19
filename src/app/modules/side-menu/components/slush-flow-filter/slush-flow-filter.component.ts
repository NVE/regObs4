import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { map, Observable, takeUntil } from 'rxjs';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { SearchCriteriaService, SLUSH_FLOW_ID } from 'src/app/core/services/search-criteria/search-criteria.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';

@Component({
  selector: 'app-slush-flow-filter',
  templateUrl: './slush-flow-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlushFlowFilterComponent extends NgDestoryBase implements OnInit {
  visible$: Observable<boolean>;
  value$: Observable<boolean>;
  caption$: Observable<string>;

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private userSettingService: UserSettingService,
    private kdvService: KdvService
  ) {
    super();
  }

  ngOnInit(): void {
    this.visible$ = this.userSettingService.currentGeoHazard$.pipe(
      takeUntil(this.ngDestroy$),
      map((geoHazard) => {
        const snow = geoHazard.length === 1 && geoHazard.includes(GeoHazard.Snow);
        return !Capacitor.isNativePlatform() && snow;
      })
    );

    this.caption$ = this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheKDV').pipe(
      map((avalancheKdvs) => {
        const slushFlowKdv = avalancheKdvs.find((type) => type.Id === SLUSH_FLOW_ID);
        if (slushFlowKdv) {
          return slushFlowKdv.Name;
        }
        return "Sørpeskred'"; // fallback name
      })
    );

    this.value$ = this.searchCriteriaService.searchCriteria$.pipe(
      takeUntil(this.ngDestroy$),
      map((criteria) => {
        return this.searchCriteriaService.isSlushFlow(criteria);
      })
    );
  }

  setValue(event: CustomEvent) {
    const checked = event.detail.checked;
    this.searchCriteriaService.setSlushFlow(checked);
  }
}
