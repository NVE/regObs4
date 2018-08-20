import { Injectable } from '@angular/core';
import { BackgroundFetchService } from './background-fetch.service';
import { ObservationService } from '../observation/observation.service';

@Injectable()
export class BackgroundFetchNativeService implements BackgroundFetchService {
  constructor(private observationService: ObservationService) {
  }

  init() {
    // NOTE: Ionic Native Background fetch only supports ios, so we have to
    // call cordova plugin directly without ts support
    const fetcher = (<any>window).BackgroundFetch;
    const fetchCallback = function () {
      this.observationService.updateObservations();
      fetcher.finish();
    };
    const failureCallback = function (error) {
      console.log('- BackgroundFetch failed', error);
    };
    fetcher.configure(fetchCallback, failureCallback, {
      stopOnTerminate: false,  // <-- true is default
      startOnBoot: true,        // <-- Android only
    });
  }
}
