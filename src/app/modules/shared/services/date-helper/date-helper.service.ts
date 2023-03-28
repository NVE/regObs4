import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  constructor(private translateService: TranslateService) {}

  formatDateString(
    dateString: string,
    showMonthNames = true,
    showYear = true,
    showTime = true,
    currentTimeZone: string = null
  ) {
    return this.formatDate(moment.parseZone(dateString), showMonthNames, showYear, showTime, currentTimeZone);
  }

  // input datetime on web doesnt accept time zones so we have to change format so that it can read min max dates correctly
  getWebDateInputFormat(dateString: string) {
    return moment(dateString).format('YYYY-MM-DD');
  }

  async formatDate(
    date: moment.Moment,
    showMonthNames = true,
    showYear = true,
    showTime = true,
    currentTimeZone: string = null
  ) {
    const timezone = currentTimeZone || moment().format('Z');
    if (!date.isValid()) {
      return '';
    }
    const parts = [];
    let dateAndMonth = date.format('DD/MM');
    if (showMonthNames) {
      const monthNames = await this.translateService.get('MONTHS.SHORT_LIST').toPromise();
      const monthName = monthNames.split(',')[date.month()].trim();
      dateAndMonth = `${date.format('D')}. ${monthName}`;
    }
    parts.push(dateAndMonth);
    if (showYear) {
      parts.push(date.format('YYYY'));
    }
    if (showTime) {
      parts.push(date.format('HH:mm'));
      if (date.format('Z') !== timezone) {
        parts.push(`(${date.format('Z')})`);
      }
    }
    return parts.join(' ');
  }
}
