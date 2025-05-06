import { CheckboxCustomEvent, IonAccordion, IonCheckbox, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { HeaderWithSelectedItemsComponent } from '../header-with-selected-items/header-with-selected-items.component';
import { arrayHasNotChanged } from '../filter-menu/filter-menu.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

const DEBUG_TAG = 'RegionFilterComponent';

interface AvalancheRegion {
  id: number;
  name: string;
  type: 'A' | 'B'; // A = regioner med fast varsling, B = regioner uten fast varsling
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  polygon: any; // TODO: Fix polygon;
  checked?: boolean;
}

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonLabel, IonAccordion, IonCheckbox, IonItem, IonList, HeaderWithSelectedItemsComponent, TranslatePipe],
})
/** Filtervalg for region / område */
export class RegionFilterComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private http = inject(HttpClient);
  private logger = inject(LoggingService);

  regions: Signal<AvalancheRegion[]> = toSignal(this.getSnowRegions(), { initialValue: [] });
  aRegions = computed(() => this.regions().filter((r) => r.type === 'A'));
  bRegions = computed(() => this.regions().filter((r) => r.type === 'B')); // regioner uten fast varsling
  selectedAregionNames = computed((): string[] => {
    return this.aRegions()
      .filter((r) => r.checked)
      .map((r) => r.name);
  });
  selectedBregionNames = computed((): string[] => {
    return this.bRegions()
      .filter((r) => r.checked)
      .map((r) => r.name);
  });
  showARegionNames = computed(() => {
    if (this.selectedBregionNames().length === 0) {
      return true;
    }
    return this.selectedAregionNames().length > 0;
  });
  showBRegionNames = computed(() => {
    if (this.selectedAregionNames().length === 0) {
      return true;
    }
    return this.selectedBregionNames().length > 0;
  });

  regionCheckBoxChanged(event: CheckboxCustomEvent<AvalancheRegion>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addToRegionFilter(event.detail.value.id);
    } else {
      this.searchCriteriaService.removeFromRegionFilter(event.detail.value.id);
    }
  }

  private getSnowRegions(): Observable<AvalancheRegion[]> {
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
            return regions.map((r) => markChecked(r));
          })
        )
      )
    );
  }
}
