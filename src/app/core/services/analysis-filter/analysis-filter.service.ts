import { Injectable, computed, linkedSignal, signal } from '@angular/core';
import moment from 'moment';

/**
 * State holder for the Analyse-tab filters.
 *
 * Holds:
 * - which observation types (faretegn / skred) to render
 * - the reference date defining the end of a 14-day window
 * - the currently active day inside that window (used by the time slider for dimming)
 */
@Injectable({ providedIn: 'root' })
export class AnalysisFilterService {
  /** Number of days the reference date looks back. */
  static readonly DAYS_BACK = 14;

  readonly showDangerSigns = signal(true);
  readonly showAvalanches = signal(true);

  /** End of the 14-day analysis window. ISO date (yyyy-MM-dd). Defaults to today. */
  readonly referenceDate = signal<string>(moment().format('YYYY-MM-DD'));

  /** Start of the analysis window (referenceDate - 14 days). */
  readonly fromDate = computed(() =>
    moment(this.referenceDate()).subtract(AnalysisFilterService.DAYS_BACK, 'days').format('YYYY-MM-DD')
  );

  /** All dates (oldest -> newest) inside the analysis window, inclusive. */
  readonly windowDates = computed<string[]>(() => {
    const end = moment(this.referenceDate());
    const dates: string[] = [];
    for (let i = AnalysisFilterService.DAYS_BACK; i >= 0; i--) {
      dates.push(end.clone().subtract(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  });

  /**
   * The currently selected "active" day in the analysis window.
   * Re-syncs to the reference date whenever it changes (linkedSignal).
   */
  readonly activeDate = linkedSignal<string, string>({
    source: this.referenceDate,
    computation: (ref) => ref,
  });
}
