import { IRegistration, RegistrationTid } from '../../registration.models';
import { RegObsGenericValue, Summary } from '@varsom-regobs-common/regobs-api';
import { BaseSummaryProvider } from './base.summary-provider';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { KdvService } from '../kdv/kdv.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FallbackSummaryProvider extends BaseSummaryProvider<unknown> {
  registrationTid = undefined;

  constructor(public translateService: TranslateService, public kdvService: KdvService) {
    super(translateService, kdvService);
  }

  generateTypeSpesificSummaries(_reg: IRegistration,
    _registrationTid: RegistrationTid,
    _registrationName: string,
    model: unknown,
    summary: Summary): Observable<Summary> {
    return this.generateGenericSummaries().pipe(map((result) => ({ ...summary, Summaries: result })));
  }

  generateGenericSummaries(): Observable<RegObsGenericValue[]> {
    return this.translateService.get('Observations.Shared.UnsentDescription')
      .pipe(switchMap((translation) => this.getTextSummary('Observations.Shared.UnsentSummaryTitle', translation)
        .pipe(map((result) => [result]))));
  }
}
