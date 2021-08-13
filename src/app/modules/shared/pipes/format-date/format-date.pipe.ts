import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from '../../services/date-helper/date-helper.service';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  constructor(private dateHelperService: DateHelperService) {}

  transform(
    value: string | number | Date,
    showMonthNames = true,
    showYear = true,
    showTime = true
  ) {
    var dateString: string;
    
    switch (typeof value) {
      case 'string': 
        dateString = value;
        break;
      case 'number':
        const date = new Date(value);
        dateString = date.toISOString();
        break;
      default:
        dateString = date.toISOString(); //assume it is a date object
        break;
    } 
    return this.dateHelperService.formatDateString(
      dateString,
      showMonthNames,
      showYear,
      showTime
    );
  }
}
