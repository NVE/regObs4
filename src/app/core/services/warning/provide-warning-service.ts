import { Capacitor } from '@capacitor/core';
import { WarningService } from './warning.service';
import { of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

export function provideWarningService() {
  if (true) {
    return {
      provide: WarningService,
      useClass: WarningService,
    };
  } else {
  }
}
