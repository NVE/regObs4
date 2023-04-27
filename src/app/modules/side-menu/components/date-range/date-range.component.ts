import { Component, OnInit } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { map, Observable, combineLatest, firstValueFrom } from 'rxjs';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import moment from 'moment';
import { IonAccordionGroup } from '@ionic/angular';
import { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from '@ionic/core/dist/types/components/radio-group/radio-group-interface';
import { DateHelperService } from 'src/app/modules/shared/services/date-helper/date-helper.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends NgDestoryBase implements OnInit {
  fromDate: string;
  toDate: string | null = null;
  useDaysBack$: Observable<boolean>;
  dateRangeText: string;

  minDate;
  maxDate;
  isOpen = false;
  isNativePlatform: boolean;
  modeText$: Observable<string>;
  fromDate$: Observable<string>;
  toDate$: Observable<string>;
  dateRangeText$: Observable<string>;
  mode: 'predefined' | 'custom';

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    public userSettingService: UserSettingService,
    private dateHelperService: DateHelperService
  ) {
    super();
    this.isNativePlatform = Capacitor.isNativePlatform();
    this.fromDate$ = this.searchCriteriaService.searchCriteria$.pipe(map((criteria) => criteria.FromDtObsTime));

    this.toDate$ = this.searchCriteriaService.searchCriteria$.pipe(map((criteria) => criteria.ToDtObsTime));

    this.useDaysBack$ = this.searchCriteriaService.useDaysBack$;
    this.searchCriteriaService.useDaysBack$.subscribe((useDaysBack) => {
      this.mode = useDaysBack ? 'predefined' : 'custom';
    });

    this.dateRangeText$ = combineLatest([this.fromDate$, this.toDate$]).pipe(
      map(([fromDate, toDate]) => generateDateRange(fromDate, toDate))
    );
  }

  async ngOnInit() {
    this.fromDate = await firstValueFrom(
      this.searchCriteriaService.searchCriteria$.pipe(
        map((criteria) => this.dateHelperService.getWebDateInputFormat(criteria.FromDtObsTime))
      )
    );
    this.toDate = await firstValueFrom(
      this.searchCriteriaService.searchCriteria$.pipe(
        map((criteria) => criteria.ToDtObsTime && this.dateHelperService.getWebDateInputFormat(criteria.ToDtObsTime))
      )
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
    this.fromDate = this.dateHelperService.getWebDateInputFormat(date);
  }

  setToDate(date: string): void {
    this.toDate = this.dateHelperService.getWebDateInputFormat(date);
  }

  onClickSetDate() {
    this.searchCriteriaService.setFromDate(moment(this.fromDate).toISOString(true));
    this.toDate && this.searchCriteriaService.setToDate(moment(this.toDate).toISOString(true));
  }

  setUseDaysBack(daysBack: number): void {
    this.userSettingService.saveGeoHazardsAndDaysBack({ daysBack });
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
    dateRange = moment(fromDate).format('DD.MM.yyyy');
  }
  if (toDate) {
    if (fromDate) {
      dateRange += ' - ';
    }
    dateRange += moment(toDate).format('DD.MM.yyyy');
  }
  return dateRange;
}
