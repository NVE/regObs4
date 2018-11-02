import { Pipe, PipeTransform, NgZone } from '@angular/core';
import { KdvService } from '../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';

@Pipe({
  name: 'kdvDescription'
})
export class KdvDescriptionPipe implements PipeTransform {

  constructor(private kdvService: KdvService, private userSettingService: UserSettingService) {
  }

  async transform(value: number, kdvKey: string, returnDescription = false): Promise<string> {
    const userSetting = await this.userSettingService.getUserSettings();
    const kdvelements = await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, kdvKey);
    const kdvelement = kdvelements.find((x) => x.Id === value);
    return kdvelement ? (returnDescription ? kdvelement.Description : kdvelement.Name) : '';
  }

}
