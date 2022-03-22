import { AppMode } from 'src/app/modules/common-core/models';
import { AppModeService } from 'src/app/modules/common-core/services';
import { RegobsApiConfigurationInterface } from './regobs-api-configuration';
import { OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { settings } from 'src/settings';

@Injectable()
export class RegObsApiConfigurationProvider implements RegobsApiConfigurationInterface, OnDestroy {
  private subscription: Subscription;
  private appMode: AppMode = AppMode.Prod;

  constructor(private appModeService: AppModeService) {
    this.subscription = this.appModeService.appMode$.subscribe((val) => {
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
