import { Pipe, PipeTransform } from '@angular/core';
import { NumberHelper } from '../../../core/helpers/number-helper';

@Pipe({
  name: 'metersToCm'
})
export class MetersToCmPipe implements PipeTransform {
  transform(value: any, decimalPlaces = 2): any {
    if (value === undefined || value === null) {
      return value;
    }
    return NumberHelper.setDecimalPlaces(value * 100.0, decimalPlaces);
  }
}
