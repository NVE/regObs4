import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { concat, distinctUntilChanged, fromEventPattern, map, Observable, shareReplay, tap } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'NetworkStatus';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {

  public connected$: Observable<boolean>

  constructor(loggerService: LoggingService) {
    const currentStatus = Network.getStatus();

    // networkStatusChange will not emit before a change occurs thats why we need to use
    // Network.getStatus and concat to include the initial status in the stream
    const statusChanges: Observable<ConnectionStatus> = fromEventPattern(
      (handler) => Network.addListener('networkStatusChange', handler)
    );

    this.connected$ = concat(currentStatus, statusChanges).pipe(
      tap((networkStatus) => {
        if (networkStatus.connected) {
          loggerService.debug('Network status', DEBUG_TAG, networkStatus);
        } else {
          loggerService.debug('No network, will not send registrations', DEBUG_TAG, networkStatus);
        }
      }),
      map((networkStatus) => networkStatus.connected),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}
