import { Pipe, PipeTransform } from '@angular/core';
import { NumberHelper } from '../../../core/helpers/number-helper';

@Pipe({ name: 'metersToCm' })
export class MetersToCmPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, decimalPlaces = 2): any {
    if (value === undefined || value === null) {
      return value;
    }
    return NumberHelper.setDecimalPlaces(value * 100.0, decimalPlaces);
  }
}
