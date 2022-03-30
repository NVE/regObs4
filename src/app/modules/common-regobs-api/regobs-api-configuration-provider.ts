import { AppMode } from 'src/app/modules/common-core/models';
import { RegobsApiConfigurationInterface } from './regobs-api-configuration';
import { OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { settings } from 'src/settings';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';

@Injectable()
export class RegObsApiConfigurationProvider implements RegobsApiConfigurationInterface, OnDestroy {
  private subscription: Subscription;
  private appMode: AppMode = AppMode.Prod;

  constructor(private userSettingService: UserSettingService) {
    this.subscription = this.userSettingService.appMode$.subscribe((val) => {
      this.appMode = val;
    });
  }

  get rootUrl() {
    return settings.services.regObs.apiUrl[this.appMode];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
