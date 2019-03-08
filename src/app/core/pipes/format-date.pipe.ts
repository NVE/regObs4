import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from '../../modules/shared/services/date-helper/date-helper.service';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private dateHelperService: DateHelperService) {

  }

  transform(value: string | Date, showMonthNames = true, showYear = true, showTime = true) {
    return this.dateHelperService.formatDateString(typeof (value) === 'string' ? value : (value ? value.toISOString() : '')
      , showMonthNames, showYear, showTime);
  }

}
