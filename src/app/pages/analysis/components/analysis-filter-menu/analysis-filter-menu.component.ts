import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  CheckboxCustomEvent,
  DatetimeCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalysisFilterService } from 'src/app/core/services/analysis-filter/analysis-filter.service';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { HeaderWithSelectedItemsComponent } from 'src/app/modules/side-menu/components/header-with-selected-items/header-with-selected-items.component';
import { RegionFilterComponent } from 'src/app/modules/side-menu/components/region-filter/region-filter.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, map } from 'rxjs';

/**
 * Side-menu for the Analyse-tab.
 * Mirrors look & feel of `FilterMenuComponent` but exposes only:
 * - faretegn/skred checkboxes
 * - reference date picker (14-day window end)
 * - reused region filter
 * - nickname (observer) searchbar
 */
@Component({
  selector: 'app-analysis-filter-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './analysis-filter-menu.component.html',
  styleUrls: ['./analysis-filter-menu.component.scss'],
  host: { style: 'display: flex; flex-direction: column; height: 100%' },
  imports: [
    HeaderWithSelectedItemsComponent,
    IonAccordion,
    IonAccordionGroup,
    IonCheckbox,
    IonContent,
    IonDatetime,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    RegionFilterComponent,
    TranslatePipe,
  ],
})
export class AnalysisFilterMenuComponent {
  private analysisFilterService = inject(AnalysisFilterService);
  private searchCriteriaService = inject(SearchCriteriaService);

  showDangerSigns = this.analysisFilterService.showDangerSigns;
  showAvalanches = this.analysisFilterService.showAvalanches;
  referenceDate = this.analysisFilterService.referenceDate;

  private translateService = inject(TranslateService);
  private translations = toSignal(
    combineLatest([
      this.translateService.stream('ANALYSIS_FILTER.DANGER_SIGN'),
      this.translateService.stream('ANALYSIS_FILTER.AVALANCHE'),
    ]).pipe(map(([dangerSign, avalanche]) => ({ dangerSign, avalanche }))),
    { initialValue: { dangerSign: '', avalanche: '' } }
  );

  selectedTypesSummary = computed(() => {
    const result: string[] = [];
    const t = this.translations();
    if (this.showDangerSigns()) {
      result.push(t.dangerSign);
    }
    if (this.showAvalanches()) {
      result.push(t.avalanche);
    }
    return result;
  });

  onDangerSignsChange(event: CheckboxCustomEvent) {
    this.analysisFilterService.showDangerSigns.set(event.detail.checked);
  }

  onAvalanchesChange(event: CheckboxCustomEvent) {
    this.analysisFilterService.showAvalanches.set(event.detail.checked);
  }

  onReferenceDateChange(event: DatetimeCustomEvent) {
    const value = event.detail.value;
    if (typeof value === 'string') {
      this.analysisFilterService.referenceDate.set(value.slice(0, 10));
    }
  }

  resetFilters() {
    this.analysisFilterService.showDangerSigns.set(true);
    this.analysisFilterService.showAvalanches.set(true);
    this.searchCriteriaService.resetSearchCriteria();
  }
}
