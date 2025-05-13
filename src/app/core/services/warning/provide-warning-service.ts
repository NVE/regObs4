import { Capacitor } from '@capacitor/core';
import { WarningService } from './warning.service';
import { of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

export function provideWarningService() {
  if (Capacitor.isNativePlatform()) {
    return {
      provide: WarningService,
      useClass: WarningService,
    };
  } else {
    return {
      provide: WarningService,
      useFactory: () => {
        const logger = inject(LoggingService);
        const tag = 'WarningService';
        return {
          warningGroupInMapViewObservable$: of(null).pipe(
            tap(() => logger.debug('warningGroupInMapViewObservable$ subsribed but doing nothing on web', tag))
          ),
          updateWarnings: () => logger.debug('updateWarnings called but doing nothing on web', tag),
        };
      },
    };
  }
}
