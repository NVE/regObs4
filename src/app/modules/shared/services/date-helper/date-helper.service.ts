import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  private translateService = inject(TranslateService);

  formatDateString(dateString: string) {
    return this.formatMoment(moment.parseZone(dateString));
  }

  formatDate(date: Date) {
    const locale = this.translateService.currentLang;
    const formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    return formatter.format(date);
  }

  formatMoment(date: moment.Moment) {
    return this.formatDate(date.toDate());
  }
}
