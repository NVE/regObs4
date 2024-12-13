import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs',
  standalone: false,
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
