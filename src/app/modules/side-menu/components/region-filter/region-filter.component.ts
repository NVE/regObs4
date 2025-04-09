import { CheckboxCustomEvent, IonAccordion, IonCheckbox, IonItem, IonList } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, TrackByFunction, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { distinctUntilChanged, EMPTY, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { CompetenceOption } from '../filter-menu/competenceOptions';
import { SelectedItemsCounterLabelComponent } from '../selected-items-counter-label/selected-items-counter-label.component';
import { arrayHasNotChanged } from '../filter-menu/filter-menu.component';

const DEBUG_TAG = 'RegionFilterComponent';

interface AvalancheRegion {
  id: number;
  name: string;
  type: 'A' | 'B';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  polygon: any; // TODO: Fix polygon;
  checked?: boolean;
}

const avalancheRegionTrackById: TrackByFunction<AvalancheRegion> = (index: number, r: AvalancheRegion) => {
  return r.id;
};

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    IonAccordion,
    IonCheckbox,
    IonItem,
    IonList,
    NgFor,
    NgIf,
    SelectedItemsCounterLabelComponent,
    TranslatePipe,
  ],
})
/** Filtervalg for region / område */
export class RegionFilterComponent {
  private userSettingService = inject(UserSettingService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private http = inject(HttpClient);
  private logger = inject(LoggingService);

  isIosOrAndroid?: boolean;
  nickName?: string | null = null;

  competenceItems$?: Observable<CompetenceOption[]>;

  currentGeoHazard?: GeoHazard[];

  regions$: Observable<{ a: AvalancheRegion[]; b: AvalancheRegion[] }>;
  nRegionsSelected$: Observable<number>;

  get avalancheRegionTrackById() {
    return avalancheRegionTrackById;
  }

  constructor() {
    this.regions$ = this.userSettingService.currentGeoHazard$.pipe(
      switchMap((geoHazards) => (geoHazards.includes(GeoHazard.Snow) ? this.getSnowRegions() : EMPTY)),
      shareReplay(1, 500)
    );
    this.nRegionsSelected$ = this.regions$.pipe(
      map((regions) => {
        if (regions) {
          return [...regions.a.filter((r) => r.checked), ...regions.b.filter((r) => r.checked)].length;
        }
        return 0;
      })
    );
  }

  regionCheckBoxChanged(event: CheckboxCustomEvent<AvalancheRegion>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addToRegionFilter(event.detail.value.id);
    } else {
      this.searchCriteriaService.removeFromRegionFilter(event.detail.value.id);
    }
  }

  private getSnowRegions() {
    // hent snøskredregioner fra fil
    return this.http.get<AvalancheRegion[]>('./assets/json/avalancheRegions.json').pipe(
      tap(() => this.logger.debug('Fetched regions from assets', DEBUG_TAG)),
      // Use search criteria to mark what regions are checked
      switchMap((regions) =>
        this.searchCriteriaService.searchCriteria$.pipe(
          map((searchCriteria) => searchCriteria.SelectedRegions || []),
          distinctUntilChanged((prev, curr) => arrayHasNotChanged(prev, curr)),
          map((selectedRegions) => {
            const markChecked = (r: AvalancheRegion): AvalancheRegion => ({
              ...r,
              checked: selectedRegions.includes(r.id),
            });

            return {
              a: regions.filter((r) => r.type === 'A').map((r) => markChecked(r)),
              b: regions.filter((r) => r.type === 'B').map((r) => markChecked(r)),
            };
          })
        )
      )
    );
  }
}
