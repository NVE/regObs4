import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  private translateService = inject(TranslateService);

  /** Formaterer en lokal dato-tekst på ISO-format som lokal dato- og tid */
  formatDateString(dateString: string) {
    const date = new Date(dateString);
    return this.formatDate(date);
  }

  /** Formaterer dato og tid som lokal dato- og tid */
  formatDate(date: Date) {
    const locale = this.translateService.currentLang;
    const formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    return formatter.format(date);
  }
}
