import { Pipe, PipeTransform, NgZone } from '@angular/core';
import { KdvService } from '../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { take } from 'rxjs/operators';

@Pipe({
  name: 'kdvDescription'
})
export class KdvDescriptionPipe implements PipeTransform {

  constructor(private kdvService: KdvService, private userSettingService: UserSettingService) {
  }

  async transform(value: number, kdvKey: string, returnDescription = false): Promise<string> {
    const kdvelements = await this.kdvService.getKdvRepositoryByKeyObservable(kdvKey).pipe(take(1)).toPromise();
    const kdvelement = kdvelements.find((x) => x.Id === value);
    return kdvelement ? (returnDescription ? kdvelement.Description : kdvelement.Name) : '';
  }

}
