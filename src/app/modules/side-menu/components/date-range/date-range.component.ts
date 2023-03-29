import { Component, OnInit } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { map, Observable, combineLatest, firstValueFrom, Subject } from 'rxjs';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import moment from 'moment';
import { IonAccordionGroup } from '@ionic/angular';
import { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from '@ionic/core/dist/types/components/radio-group/radio-group-interface';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends NgDestoryBase implements OnInit {
  minDate = new Date('2010-01-01T00:00:00').toISOString();
  maxDate = new Date().toISOString();
  isOpen = false;

  mode$: Observable<'predefined' | 'custom'>;
  modeText$: Observable<string>;
  fromDate$: Observable<string>;
  toDate$: Observable<string>;
  useDaysBack$: Observable<boolean>;
  readableDays$: Observable<string>;
  dateRangeText$: Observable<string>;
  daysBackSubject = new Subject<number>();

  constructor(private searchCriteriaService: SearchCriteriaService, private userSettingService: UserSettingService) {
    super();
    this.mode$ = this.searchCriteriaService.useDaysBack$.pipe(
      map((useDaysBack) => (useDaysBack ? 'predefined' : 'custom'))
    );

    this.fromDate$ = this.searchCriteriaService.searchCriteria$.pipe(map((criteria) => criteria.FromDtObsTime));

    this.toDate$ = this.searchCriteriaService.searchCriteria$.pipe(map((criteria) => criteria.ToDtObsTime));

    this.useDaysBack$ = this.searchCriteriaService.useDaysBack$;

    this.dateRangeText$ = combineLatest([this.fromDate$, this.toDate$]).pipe(
      map(([fromDate, toDate]) => generateDateRange(fromDate, toDate))
    );
  }
  async ngOnInit() {
    const daysBackFromUserSettings = await firstValueFrom(this.userSettingService.daysBackForCurrentGeoHazard$);
    this.daysBackSubject.next(daysBackFromUserSettings);
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

  setUseDaysBack(date: number): void {
    this.daysBackSubject.next(date);
    this.searchCriteriaService.setUseDaysBack(true);
  }

  changeMode($event: CustomEvent<IRadioGroupRadioGroupChangeEventDetail>) {
    if ($event.detail.value === 'predefined') {
      this.searchCriteriaService.setUseDaysBack(true);
    } else if ($event.detail.value === 'custom') {
      this.searchCriteriaService.setUseDaysBack(false);
    }
  }
}

export function generateDateRange(fromDate?: string, toDate?: string) {
  let dateRange = '';
  if (fromDate) {
    dateRange = moment(fromDate).format('DD/MM/YY');
  }
  if (toDate) {
    if (fromDate) {
      dateRange += ' - ';
    }
    dateRange += moment(toDate).format('DD/MM/YY');
  }
  return dateRange;
}
