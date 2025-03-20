import { Pipe, PipeTransform } from '@angular/core';
import { setDecimalPlaces } from '../helpers/number.extensions';

@Pipe({ name: 'metersToCm' })
export class MetersToCmPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, decimalPlaces = 2): any {
    if (value === undefined || value === null) {
      return value;
    }
    return setDecimalPlaces(value * 100.0, decimalPlaces);
  }
}
