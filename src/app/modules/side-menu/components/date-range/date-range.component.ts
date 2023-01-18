import { Component, OnInit } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { BehaviorSubject, map, Observable, takeUntil, combineLatest, concatMap } from 'rxjs';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import moment from 'moment';
import { IonAccordionGroup } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { getLangKeyString } from '../../../common-core/helpers';
import { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from '@ionic/core/dist/types/components/radio-group/radio-group-interface';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends NgDestoryBase implements OnInit {
  fromDate: string;
  toDate: string;
  minDate = new Date('2010-01-01T00:00:00').toISOString();
  maxDate = new Date().toISOString();
  mode: BehaviorSubject<'predefined' | 'custom'> = new BehaviorSubject('predefined');
  isOpen = false;
  cachedDays: number | null = null;
  modeText$: Observable<string>;

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private userSettingService: UserSettingService,
    private translateService: TranslateService
  ) {
    super();
    this.modeText$ = combineLatest([
      this.mode,
      this.userSettingService.language$,
      this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
        concatMap((days) => this.getReadableDays(days)),
        map((x) => x[Object.keys(x)[0]])
      ),
    ]).pipe(
      map(([mode, language, translations]) => {
        switch (mode) {
          case 'predefined':
            return translations;
          case 'custom':
            return this.generateDateRange(language);
        }
      })
    );
  }

  ngOnInit() {
    this.searchCriteriaService.searchCriteria$.pipe(takeUntil(this.ngDestroy$), take(1)).subscribe((criteria) => {
      this.fromDate = criteria.FromDtObsTime;
      this.toDate = criteria.ToDtObsTime;
      if (this.cachedDays === null || this.cachedDays !== 0) {
        this.cachedDays = moment().diff(moment(this.fromDate), 'days');
      }
      if (criteria.FromDtObsTime && criteria.ToDtObsTime) {
        this.mode.next('custom');
      }
    });
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

  changeDateAndSetMode(days?: number): void {
    const mode = days !== undefined ? 'predefined' : 'custom';
    let date;

    if (days !== undefined) {
      if (days === 0) {
        date = moment();
      } else {
        date = moment().subtract(days, 'days');
      }
      this.cachedDays = days;
    } else {
      date = moment();
      if (this.cachedDays) {
        days = this.cachedDays;
        date = moment().subtract(days, 'days');
      }
    }
    this.searchCriteriaService.setFromDate(date.format('YYYY-MM-DD'), true);
    this.mode.next(mode);
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

  private generateDateRange(language) {
    let dateRange = '';
    const lang = getLangKeyString(language);
    if (this.fromDate) {
      dateRange = new Date(this.fromDate).toLocaleDateString(lang, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
    if (this.toDate) {
      if (this.fromDate) {
        dateRange += ' - ';
      }
      dateRange += new Date(this.toDate).toLocaleDateString(lang, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
    return dateRange;
  }

  changeMode($event: CustomEvent<IRadioGroupRadioGroupChangeEventDetail>) {
    if ($event.detail.value === 'predefined' || $event.detail.value === 'custom') {
      this.mode.next($event.detail.value);
    }
  }
}
