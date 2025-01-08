import { Pipe, PipeTransform, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { KdvKey } from '../../common-registration/registration.models';
import { KdvService } from '../../common-registration/registration.services';

@Pipe({ name: 'kdvDescription' })
export class KdvDescriptionPipe implements PipeTransform {
  private kdvService = inject(KdvService);

  async transform(value: number | undefined, kdvKey: KdvKey, returnDescription = false): Promise<string> {
    const kdvelements = await firstValueFrom(this.kdvService.getKdvRepositoryByKeyObservable(kdvKey));
    const kdvelement = kdvelements.find((x) => x.Id === value);
    const result = kdvelement ? (returnDescription ? kdvelement.Description : kdvelement.Name) : '';
    return (result || '').trim();
  }
}
