import { Pipe, PipeTransform, inject } from '@angular/core';
import { DateHelperService } from '../../services/date-helper/date-helper.service';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  private dateHelperService = inject(DateHelperService);

  transform(value: string | Date) {
    if (typeof value === 'string') {
      return this.dateHelperService.formatDateString(value);
    }
    return this.dateHelperService.formatDate(value);
  }
}
