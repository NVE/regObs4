import { Injectable } from '@angular/core';
import { RegobsApiConfigurationInterface } from '../../modules/regobs-api/regobs-api-configuration';
import { UserSettingService } from '../services/user-setting/user-setting.service';
import { settings } from '../../../settings';

@Injectable()
export class ApiConfiguration implements RegobsApiConfigurationInterface {
  private _rootUrl = settings.services.regObs.apiUrl['PROD'];

  get rootUrl() {
    return this._rootUrl;
  }

  set rootUrl(val: string) {
    // Set root url disabled. Use app settings only.
  }

  constructor(private userSettingService: UserSettingService) {
    this.userSettingService.appMode$.subscribe((val) => {
      this._rootUrl = settings.services.regObs.apiUrl[val];
    });
  }
}
