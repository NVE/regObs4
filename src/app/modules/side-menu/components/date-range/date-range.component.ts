import { Component, OnInit } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { BehaviorSubject, map, Observable, takeUntil, combineLatest, concatMap, switchMap, startWith } from 'rxjs';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import moment from 'moment';
import { IonAccordionGroup } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { getLangKeyString } from '../../../common-core/helpers';
import { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from '@ionic/core/dist/types/components/radio-group/radio-group-interface';
import { LangKey } from 'src/app/modules/common-core/models';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends NgDestoryBase {
  minDate = new Date('2010-01-01T00:00:00').toISOString();
  maxDate = new Date().toISOString();
  isOpen = false;

  mode$: Observable<'predefined' | 'custom'>;
  modeText$: Observable<string>;
  fromDate$: Observable<string>;
  toDate$: Observable<string>;
  readableDays$: Observable<string>;

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private userSettingService: UserSettingService,
    private translateService: TranslateService
  ) {
    super();
    this.mode$ = this.searchCriteriaService.useDaysBack$.pipe(
      map((useDaysBack) => (useDaysBack ? 'predefined' : 'custom'))
    );

    this.fromDate$ = this.searchCriteriaService.searchCriteria$.pipe(map((criteria) => criteria.FromDtObsTime));

    this.toDate$ = this.searchCriteriaService.searchCriteria$.pipe(map((criteria) => criteria.ToDtObsTime));

    const daysBackText$ = this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
      concatMap((days) => this.getReadableDays(days)),
      map((x) => x[Object.keys(x)[0]])
    );

    const dateRangeText$ = combineLatest([this.userSettingService.language$, this.fromDate$, this.toDate$]).pipe(
      map(([lang, fromDate, toDate]) => generateDateRange(lang, fromDate, toDate))
    );

    this.modeText$ = this.searchCriteriaService.useDaysBack$.pipe(
      switchMap((useDaysBack) => (useDaysBack ? daysBackText$ : dateRangeText$))
    );
  }

  /**
   * e.detail.value will return one of the following:
   * 1. 'predefined' - if the user has selected a predefined date range
   * 2. 'custom' - if the user has selected a custom date range
   * 3. undefined - When closing the accordion
   * 4. 'first' - When opening the accordion
   * We only care about 3 and 4, so we ignore the rest
   * @param e - The event from the ionChange event
   */
  toggleAccordion(e: CustomEvent<IonAccordionGroup>): void {
    switch (e.detail.value) {
      case 'first':
        this.isOpen = true;
        break;
      case undefined:
        this.isOpen = false;
        break;
      case 'predefined':
      case 'custom':
        break;
    }
  }

  setFromDate(date: string): void {
    this.searchCriteriaService.setFromDate(date);
  }

  setToDate(date: string): void {
    this.searchCriteriaService.setToDate(date);
  }

  setUseDaysBack(): void {
    this.searchCriteriaService.setUseDaysBack(true);
  }

  private getReadableDays(day: number): Observable<string> {
    if (day === 0) return this.translateService.get(['MENU.DATE_RANGE.TODAY']);
    if (day === 1) return this.translateService.get(['MENU.DATE_RANGE.YESTERDAY']);
    if (day > 1 && day < 7) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_X_DAYS'], { days: day });
    }
    if (day >= 7 && day < 14) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_WEEK']);
    }
    if (day >= 14 && day < 28) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_X_WEEKS'], { weeks: day / 7 });
    }
    if (day >= 28) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_X_MONTHS'], { months: day / 30 });
    }
  }

  changeMode($event: CustomEvent<IRadioGroupRadioGroupChangeEventDetail>) {
    if ($event.detail.value === 'predefined') {
      this.searchCriteriaService.setUseDaysBack(true);
    } else if ($event.detail.value === 'custom') {
      this.searchCriteriaService.setUseDaysBack(false);
    }
  }
}

export function generateDateRange(language: LangKey, fromDate?: string, toDate?: string) {
  let dateRange = '';
  const lang = getLangKeyString(language);
  if (fromDate) {
    dateRange = new Date(fromDate).toLocaleDateString(lang, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }
  if (toDate) {
    if (fromDate) {
      dateRange += ' - ';
    }
    dateRange += new Date(toDate).toLocaleDateString(lang, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }
  return dateRange;
}
