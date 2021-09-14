import { Summary, UrlViewModel, RegObsGenericValue, KdvElement } from '@varsom-regobs-common/regobs-api';
import { RegistrationTid, IRegistration, KdvKey } from '../../registration.models';
import { TranslateService } from '@ngx-translate/core';
import { UrlSummary } from '../../models/summary/url-summary';
import { Observable, combineLatest, } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { SummaryKind } from '../../models/summary/summary-kind.enum';
import { KdvService } from '../kdv/kdv.service';
import { TextSummary } from '../../models/summary/text-summary';
import { ISummaryProvider } from './summary-provider.interface';
import { isArrayType } from '../../registration.helpers';
import { getRegistationProperty } from '../../helpers/registration.helper';
import { isEmpty } from '@varsom-regobs-common/core';

export abstract class BaseSummaryProvider<EditModel> implements ISummaryProvider {
  abstract registrationTid: RegistrationTid;
  abstract generateTypeSpesificSummaries(reg: IRegistration, registrationTid: RegistrationTid, registrationName: string, model: EditModel, summary: Summary): Observable<Summary>;

  constructor(public translateService: TranslateService, public kdvService: KdvService) {
  }

  generateSummary(reg: IRegistration, registrationTid: RegistrationTid = this.registrationTid): Observable<Summary[]> {
    return this.getRegistrationName(registrationTid).pipe(switchMap((registrationName) => combineLatest(this.generateSummaryForType(reg, registrationTid, registrationName))));
  }

  private generateSummaryForType(reg: IRegistration, registrationTid: RegistrationTid, registrationName: string): Observable<Summary>[] {
    const registrationProp = getRegistationProperty(reg, registrationTid) as EditModel | Array<EditModel>;
    if (isArrayType(registrationTid)) {
      return ((registrationProp as Array<EditModel>) || []).map((registrationItem) =>
        this.generateTypeSpesificSummaries(reg, registrationTid, registrationName, registrationItem, this.createSummary(registrationTid, registrationName)));
    }
    return [this.generateTypeSpesificSummaries(reg, registrationTid, registrationName, registrationProp as EditModel, this.createSummary(registrationTid, registrationName))];
  }

  private createSummary(registrationTid: RegistrationTid, registrationName: string): Summary {
    return {
      RegistrationTID: registrationTid,
      RegistrationName: registrationName,
      Summaries: [],
    };
  }

  public getRegistrationName(registrationTid: RegistrationTid) {
    return this.kdvService.getKdvRepositoryByKeyObservable('RegistrationKDV').pipe(take(1), map((registrationKdvs) => {
      const registrationName = (registrationKdvs || [])
        .find((x) => x.Id === registrationTid);
      return registrationName ? registrationName.Name : '';
    }));
  }

  getUrlSummary(urls: Array<UrlViewModel>): Observable<RegObsGenericValue> {
    const translationKey = 'Observations.GeneralObservation.Urls';
    return this.translateService.get([translationKey]).pipe(map((translations) => ({
      Kind: SummaryKind.List,
      KindType: 'List',
      Header: translations[translationKey],
      Value: urls.map((url) => new UrlSummary(url.UrlDescription || url.UrlLine, url.UrlLine)),
    })));
  }

  getTextSummary(headerTranslationKey: string, value: string): Observable<TextSummary> {
    return this.translateService.get([headerTranslationKey]).pipe(
      map((translations) => new TextSummary(
        translations[headerTranslationKey], value
      )));
  }

  hasTID(tid: number) {
    return !isEmpty(tid) && tid > 0;
  }

  getKdvSummary(headerTranslationKey: string, kdvKey: KdvKey, tid: number): Observable<TextSummary> {
    return this.translateService.get(headerTranslationKey).pipe(
      switchMap((translation) => this.kdvService.getKdvRepositoryByKeyObservable(kdvKey)
        .pipe(
          take(1),
          map((kdvElements: KdvElement[]) => kdvElements.find((kdvElement: KdvElement) => kdvElement.Id === tid)),
          map((kdvElement) => new TextSummary(
            translation, kdvElement ? kdvElement.Name : ''
          ))
        )));
  }
}
