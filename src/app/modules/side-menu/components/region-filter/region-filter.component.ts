import {
  CheckboxCustomEvent,
  IonAccordion,
  IonCheckbox,
  IonItem,
  IonList,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { distinctUntilChanged, EMPTY, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { HeaderWithSelectedItemsComponent } from '../header-with-selected-items/header-with-selected-items.component';
import { arrayHasNotChanged } from '../filter-menu/filter-menu.component';
import { toSignal } from '@angular/core/rxjs-interop';

const DEBUG_TAG = 'RegionFilterComponent';

interface AvalancheRegion {
  id: number;
  name: string;
  type: 'A' | 'B'; // A = regioner med fast varsling, B = regioner uten fast varsling
  shortcuts?: string[]; // landsdel(er) som regionen hører til
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  polygon: any; // TODO: Fix polygon;
  checked?: boolean;
}

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonLabel,
    IonButton,
    IonAccordion,
    IonCheckbox,
    IonItem,
    IonList,
    NgIf,
    HeaderWithSelectedItemsComponent,
    TranslatePipe,
  ],
})
/** Filtervalg for region / område */
export class RegionFilterComponent {
  private userSettingService = inject(UserSettingService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private http = inject(HttpClient);
  private logger = inject(LoggingService);

  regions: Signal<AvalancheRegion[]>;
  aRegions = computed(() => this.regions().filter((r) => r.type === 'A'));
  bRegions = computed(() => this.regions().filter((r) => r.type === 'B')); // regioner uten fast varsling
  selectedRegionNames = computed((): string[] => {
    return this.regions()
      .filter((r) => r.checked)
      .map((r) => r.name);
  });

  // hurtigvalg, ett for hver landsdel
  shortcuts = computed(() => {
    const shortcuts: Set<string> = new Set();
    this.regions().forEach((region) => {
      region.shortcuts?.forEach((shortcut) => shortcuts.add(shortcut.trim()));
    });
    return Array.from(shortcuts);
  });

  constructor() {
    const regions$ = this.userSettingService.currentGeoHazard$.pipe(
      switchMap((geoHazards) => (geoHazards.includes(GeoHazard.Snow) ? this.getSnowRegions() : EMPTY)),
      shareReplay(1, 500)
    );
    this.regions = toSignal(regions$, { initialValue: [] });
  }

  regionCheckBoxChanged(event: CheckboxCustomEvent<AvalancheRegion>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addToRegionFilter([event.detail.value.id]);
    } else {
      this.searchCriteriaService.removeFromRegionFilter(event.detail.value.id);
    }
  }

  // velg alle regioner som ligger under aktuell landsdel
  shortcutClicked(shortcut: string) {
    const matchingRegionIds = this.regions()
      .filter((region) => region.shortcuts?.includes(shortcut))
      .map((region) => region.id);
    this.searchCriteriaService.addToRegionFilter(matchingRegionIds);
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
