import { Injectable } from '@angular/core';
import { RegistrationTid, IRegistration } from '../../../../registration.models';
import { TranslateService } from '@ngx-translate/core';
import { BaseSummaryProvider } from '../../base.summary-provider';
import { Observable, forkJoin, of } from 'rxjs';
import { Summary, RegObsGenericValue, WeatherEditModel } from '@varsom-regobs-common/regobs-api';
import { KdvService } from '../../../kdv/kdv.service';
import { map, switchMap } from 'rxjs/operators';
import { isEmpty } from '@varsom-regobs-common/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherSummaryProvider extends BaseSummaryProvider<WeatherEditModel> {

  readonly registrationTid = RegistrationTid.WeatherObservation;

  constructor(public translateService: TranslateService, public kdvService: KdvService) {
    super(translateService, kdvService);
  }

  generateTypeSpesificSummaries(
    _reg: IRegistration,
    _registrationTid: RegistrationTid,
    _registrationName: string,
    model: WeatherEditModel,
    summary: Summary): Observable<Summary> {
    return this.generateWeatherObservationSummaries(model).pipe(map((result) => ({ ...summary, Summaries: result })));
  }

  generateWeatherObservationSummaries(model: WeatherEditModel): Observable<RegObsGenericValue[]> {
    const summaries: Observable<RegObsGenericValue>[] = [];
    if (model) {
      if(this.hasTID(model.PrecipitationTID)) {
        summaries.push(this.getKdvSummary('Observations.WeatherObservation.PrecipitationTID', 'Snow_PrecipitationKDV', model.PrecipitationTID));
      }

      if (!isEmpty(model.AirTemperature)) {
        summaries.push(this.getTextSummary('Observations.WeatherObservation.AirTemperature', `${model.AirTemperature.toFixed(0)} °C`));
      }

      if(!isEmpty(model.WindDirection) || !isEmpty(model.WindSpeed)){
        summaries.push(this.getWindDirectionValue(model).pipe(
          switchMap((val) => this.getTextSummary('Observations.WeatherObservation.Wind', val))));
      }

      if (model.Comment) {
        summaries.push(this.getTextSummary('Observations.GeneralObservation.Comment', model.Comment));
      }

      if(!isEmpty(model.CloudCover)) {
        summaries.push(this.getTextSummary('Observations.WeatherObservation.CloudCover', `${model.CloudCover}%`));
      }
    }
    return summaries.length > 0 ? forkJoin(summaries) : of([]);
  }

  private getWindDirectionValue(model: WeatherEditModel): Observable<string> {
    const wdString$ = !isEmpty(model.WindDirection) ? this.translateService.get(this.getWindDirectionTranslationKey(model.WindDirection)) : of(null);
    return wdString$.pipe(map((wdString) => {
      const val = [];
      if(!isEmpty(model.WindSpeed)) {
        val.push(`${model.WindSpeed} m/s`);
      }
      if(wdString !== null && wdString !== undefined) {
        val.push(wdString);
      }
      return val.join(' - ');
    }));
  }

  private getWindDirectionTranslationKey(windDirection: number) {
    if (windDirection >= 0 && windDirection < 45 || windDirection == 360)
    {
      return 'Observations.WeatherObservation.FromNorth';
    }
    else if (windDirection >= 45 && windDirection < 90)
    {
      return 'Observations.WeatherObservation.FromNorthEast';
    }
    else if (windDirection >= 90 && windDirection < 135)
    {
      return 'Observations.WeatherObservation.FromEast';
    }
    else if (windDirection >= 135 && windDirection < 180)
    {
      return 'Observations.WeatherObservation.FromSouthEast';
    }
    else if (windDirection >= 180 && windDirection < 225)
    {
      return 'Observations.WeatherObservation.FromSouth';
    }
    else if (windDirection >= 225 && windDirection < 270)
    {
      return 'Observations.WeatherObservation.FromSouthWest';
    }
    else if (windDirection >= 270 && windDirection < 315)
    {
      return 'Observations.WeatherObservation.FromWest';
    }
    else if (windDirection >= 315 && windDirection < 360)
    {
      return 'Observations.WeatherObservation.FromNorthWest';
    }
    return '';
  }
}
