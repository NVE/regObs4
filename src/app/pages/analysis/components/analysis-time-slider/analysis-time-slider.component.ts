import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IonRange, RangeCustomEvent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalysisFilterService } from 'src/app/core/services/analysis-filter/analysis-filter.service';

/**
 * Bottom-of-map slider that lets the user pick the "active" day inside the
 * 14-day analyse-window.
 */
@Component({
  selector: 'app-analysis-time-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './analysis-time-slider.component.html',
  styleUrls: ['./analysis-time-slider.component.scss'],
  imports: [IonRange, TranslatePipe],
})
export class AnalysisTimeSliderComponent {
  private analysisFilterService = inject(AnalysisFilterService);

  windowDates = this.analysisFilterService.windowDates;
  activeDate = this.analysisFilterService.activeDate;

  max = computed(() => this.windowDates().length - 1);

  /** Index of activeDate inside the window. */
  activeIndex = computed(() => {
    const dates = this.windowDates();
    const i = dates.indexOf(this.activeDate());
    return i >= 0 ? i : dates.length - 1;
  });

  onSliderChange(event: RangeCustomEvent) {
    const value = event.detail.value;
    if (typeof value === 'number') {
      const date = this.windowDates()[value];
      if (date) {
        this.analysisFilterService.activeDate.set(date);
      }
    }
  }
}
