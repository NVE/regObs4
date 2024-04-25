import { Injectable, Inject } from '@angular/core';
import { OnReset } from '../../interfaces/on-reset.interface';
import { DbHelperService } from '../../../../core/services/db-helper/db-helper.service';
import { LoggingService } from '../logging/logging.service';
import { LogLevel } from '../logging/log-level.model';

const DEBUG_TAG = 'AppResetService';

/**
 * NB! Husk å legge til "{ provide: 'OnReset' ... }" i app.providers.ts i tillegg til å implementere OnReset interface
 */
@Injectable({
  providedIn: 'root',
})
export class AppResetService {
  constructor(
    @Inject('OnReset') private services: OnReset[],
    private dbHelperService: DbHelperService,
    private loggingService: LoggingService
  ) {}

  async resetApp(): Promise<void> {
    // Bruk allSettled her i stedet for Promise.all for å håndtere eventuelle feil når metodene kalles.
    // Så kan vi heller logge feilene og fortsette med de andre kallene.
    // Dette hindrer at app reset kaster en exception om en av tjenestene feiler..

    const serviceNames = this.services.map((s) => s.constructor.name);
    this.loggingService.debug('Reset app', DEBUG_TAG, serviceNames);

    // Call appOnReset()
    const appResetResult = await Promise.allSettled(
      this.services.map((s) => Promise.resolve(s.appOnReset ? s.appOnReset() : true))
    );
    for (const result of appResetResult) {
      if (result.status === 'rejected') {
        this.loggingService.error(result.reason, DEBUG_TAG, 'appOnReset error');
      }
    }

    await this.dbHelperService.resetDb((table) => {
      this.loggingService.log(`Error reset table ${table}`, null, LogLevel.Warning, DEBUG_TAG);
    });

    // Call appOnResetComplete()
    const appOnResetCompleteResults = await Promise.allSettled(
      this.services.map((s) => Promise.resolve(s.appOnResetComplete ? s.appOnResetComplete() : true))
    );
    for (const result of appOnResetCompleteResults) {
      if (result.status === 'rejected') {
        this.loggingService.error(result.reason, DEBUG_TAG, 'appOnResetComplete error');
      }
    }
  }
}
