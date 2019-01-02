import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from '../../modules/shared/services/date-helper/date-helper.service';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private dateHelperService: DateHelperService) {

  }

  transform(value: string | Date, showMonthNames = true, showYear = true, showTime = true) {
    return typeof (value) === 'string' ?
      this.dateHelperService.formatDateString(value, showMonthNames, showYear, showTime) :
      this.dateHelperService.formatDate(value, showMonthNames, showYear, showTime);
  }

}
