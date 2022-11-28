import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {
  transform(value: unknown): number | null {
    try {
      return Math.abs(value as number);
    } catch (error) {
      return null;
    }
  }
}
