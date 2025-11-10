import { Component, computed, inject } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import moment from 'moment';
import { IonAccordion, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { CheckDaysOrWeeksBackComponent } from '../check-days-or-weeks-back/check-days-or-weeks-back.component';
import { ObservationsDaysBackComponent } from '../observations-days-back/observations-days-back.component';
import { DatetimePickerComponent } from '../../../../components/datetime-picker/datetime-picker.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderWithSelectedItemsComponent } from '../header-with-selected-items/header-with-selected-items.component';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  imports: [
    CheckDaysOrWeeksBackComponent,
    DatetimePickerComponent,
    IonAccordion,
    IonItem,
    IonLabel,
    IonList,
    ObservationsDaysBackComponent,
    TranslatePipe,
    HeaderWithSelectedItemsComponent,
  ],
})
export class DateRangeComponent {
  private searchCriteriaService = inject(SearchCriteriaService);
  private userSettingService = inject(UserSettingService);
  private translations = inject(TranslateService);

  daysBack = toSignal(this.userSettingService.daysBackForCurrentGeoHazard$);

  minDate = new Date('2010-01-01T00:00:00').toISOString();
  maxDate = new Date().toISOString();
  fromDate = this.searchCriteriaService.fromDate;
  toDate = this.searchCriteriaService.toDate;
  dateRangeText = computed(() => generateDateRange(this.translations, this.fromDate(), this.toDate()));
  useDaysBack = this.searchCriteriaService.useDaysBack;
  dateFormat: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  setFromDate(date: string | undefined): void {
    this.searchCriteriaService.setFromDate(date);
  }

  setToDate(date: string | undefined): void {
    this.searchCriteriaService.setToDate(date);
  }

  setUseDaysBack(daysBack: number): void {
    this.userSettingService.saveGeoHazardsAndDaysBack({ daysBack });
    this.searchCriteriaService.useDaysBack.set(true);
  }
}

export function generateDateRange(translations: TranslateService, fromDate?: string, toDate?: string) {
  let dateRange = '';
  if (fromDate) {
    dateRange = moment(fromDate).format('DD.MM.yyyy');
  }

  dateRange += ' - ';

  if (toDate) {
    dateRange += moment(toDate).format('DD.MM.yyyy');
  } else {
    dateRange += translations.instant('MENU.DATE_RANGE.TODAY');
  }
  return dateRange;
}
