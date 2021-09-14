import { IRegistration, RegistrationTid } from '../../../registration.models';
import { RegObsGenericValue, GeneralObservationEditModel, Summary } from '@varsom-regobs-common/regobs-api';
import { BaseSummaryProvider } from '../base.summary-provider';
import { Observable, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { KdvService } from '../../kdv/kdv.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralObservationSummaryProvider extends BaseSummaryProvider<GeneralObservationEditModel> {
  readonly registrationTid = RegistrationTid.GeneralObservation;

  constructor(public translateService: TranslateService, public kdvService: KdvService) {
    super(translateService, kdvService);
  }

  generateTypeSpesificSummaries(_reg: IRegistration,
    _registrationTid: RegistrationTid,
    _registrationName: string,
    model: GeneralObservationEditModel,
    summary: Summary): Observable<Summary> {
    return this.generateGeneralObservationSummaries(model).pipe(map((result) => ({ ...summary, Summaries: result })));
  }

  generateGeneralObservationSummaries(model: GeneralObservationEditModel): Observable<RegObsGenericValue[]> {
    const summaries: Observable<RegObsGenericValue>[] = [];
    if(model) {
      if (model.ObsComment) {
        summaries.push(this.getTextSummary('Observations.GeneralObservation.Comment', model.ObsComment));
      }
      if (model.Comment) {
        summaries.push(this.getTextSummary('Observations.GeneralObservation.Comment', model.Comment));
      }
      if (model.ObsHeader) {
        summaries.push(this.getTextSummary('Observations.GeneralObservation.ObsHeader', model.ObsHeader));
      }
      if (model.Urls && model.Urls.length > 0) {
        summaries.push(this.getUrlSummary(model.Urls));
      }
    }
    return combineLatest(summaries);
  }
}
