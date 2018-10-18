import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor(private translateService: TranslateService) {

  }

  formatDateString(dateString: string, showMonthNames = true, showYear = true, showTime = true) {
    return this.formatDate(moment(dateString).toDate(), showMonthNames, showYear, showTime);
  }

  async formatDate(date: Date, showMonthNames = true, showYear = true, showTime = true) {
    const dateAsMoment = moment(date);
    let dateAndMonth = dateAsMoment.format('DD/MM');
    if (showMonthNames) {
      const monthNames = await this.translateService.get('MONTHS.SHORT_LIST').toPromise();
      const monthName = monthNames.split(',')[dateAsMoment.month()].trim();
      dateAndMonth = `${dateAsMoment.format('D')}. ${monthName},`;
    }
    return `${dateAndMonth} ${(showYear ? dateAsMoment.format('YYYY') : '')} ${(showTime ? dateAsMoment.format('HH:mm') : '')}`.trim();
  }
}
