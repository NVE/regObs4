import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { KdvService } from '../services/kdv/kdv.service';
import { KdvKey } from '../models/kdv-key.type';

@Pipe({
  name: 'kdvDescription'
})
export class KdvDescriptionPipe implements PipeTransform {
  constructor(private kdvService: KdvService) { }

  async transform(value: number, kdvKey: KdvKey, returnDescription = false): Promise<string> {
    const kdvelements = await this.kdvService.getKdvRepositoryByKeyObservable(kdvKey).pipe(take(1)).toPromise();
    const kdvelement = kdvelements.find((x) => x.Id === value);
    const result = kdvelement ? (returnDescription ? kdvelement.Description : kdvelement.Name) : '';
    return result.trim();
  }

}
