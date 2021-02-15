import { Injectable, Inject } from '@angular/core';
import { OnReset } from '../../interfaces/on-reset.interface';
import { DbHelperService } from '../../../../core/services/db-helper/db-helper.service';
import { LoggingService } from '../logging/logging.service';
import { LogLevel } from '../logging/log-level.model';

const DEBUG_TAG = 'AppResetService';

@Injectable({
  providedIn: 'root'
})
export class AppResetService {
  constructor(
    @Inject('OnReset') private services: OnReset[],
    private dbHelperService: DbHelperService,
    private loggingService: LoggingService
  ) {}

  async resetApp(): Promise<void> {
    await Promise.all(
      this.services.map((s) => Promise.resolve(s.appOnReset()))
    );
    await this.dbHelperService.resetDb((table) => {
      this.loggingService.log(
        `Error reset table ${table}`,
        null,
        LogLevel.Warning,
        DEBUG_TAG
      );
    });
    await Promise.all(
      this.services.map((s) =>
        Promise.resolve(s.appOnResetComplete ? s.appOnResetComplete() : true)
      )
    );
  }
}
