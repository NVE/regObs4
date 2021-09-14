import { TestBed } from '@angular/core/testing';
import { GeneralObservationSummaryProvider } from './general-observation.summary-provider';
import NORWEGIAN_TRANSLATIONS from '../../../../assets/i18n/no.json';
import ENGLISH_TRANSLATIONS from '../../../../assets/i18n/en.json';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { KdvService } from '../../kdv/kdv.service';
import { KdvElement, GeneralObservationEditModel } from '@varsom-regobs-common/regobs-api';
import { CoreModule } from '@varsom-regobs-common/core';
import { HttpClientModule } from '@angular/common/http';
import { SummaryKind } from '../../../models/summary/summary-kind.enum';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { concatMap } from 'rxjs/operators';
import { UrlSummary } from '../../../models/summary/url-summary';

describe('GeneralObservationSummaryProvider', () => {

  let kdvServiceSpy: jasmine.SpyObj<KdvService>;
  let fakeKdvElements: BehaviorSubject<KdvElement[]>;
  let provider: GeneralObservationSummaryProvider;
  let translateService: TranslateService;

  beforeEach(() => {
    kdvServiceSpy = jasmine.createSpyObj<KdvService>(['getKdvRepositoryByKeyObservable']);
    fakeKdvElements = new BehaviorSubject<KdvElement[]>([]);
    kdvServiceSpy.getKdvRepositoryByKeyObservable.and.returnValue(fakeKdvElements);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CoreModule,
        TranslateTestingModule
          .withTranslations({
            en: ENGLISH_TRANSLATIONS,
            no: NORWEGIAN_TRANSLATIONS,
          })
          .withDefaultLanguage('no')
      ],
      providers: [
        { provide: KdvService, useValue: kdvServiceSpy },
      ]
    });
  });

  beforeEach(() => {
    provider = TestBed.get(GeneralObservationSummaryProvider);
    translateService = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });

  // it('should generate nothing when undefined', () => {
  //   provider.generateTypeSpesificSummaries(undefined, undefined, undefined, undefined, undefined, {  }).subscribe((result) => {
  //     expect(result.length).toBe(0);
  //   });
  // });

  // it('should generate nothing when null', () => {
  //   provider.generateTypeSpesificSummaries(null).subscribe((result) => {
  //     expect(result.length).toBe(0);
  //   });
  // });

  // it('should generate nothing when empty', () => {
  //   provider.generateTypeSpesificSummaries({} as unknown as IRegistration).subscribe((result) => {
  //     expect(result.length).toBe(0);
  //   });
  // });

  it('should generate general obs summary for ObsComment - NO', () => {
    const obs: GeneralObservationEditModel = {
      ObsComment: 'Test ObsComment'
    };
    provider.generateGeneralObservationSummaries(obs).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Kommentar');
      expect(result[0].Value).toBe(obs.ObsComment);
      expect(result[0].Kind).toBe(SummaryKind.Text);
      expect(result[0].KindType).toBe('Text');
    });
  });

  it('should generate general obs summary for ObsComment - EN', () => {
    const obs: GeneralObservationEditModel = {
      ObsComment: 'Test ObsComment'
    };
    translateService.use('en').pipe(concatMap(() =>
      provider.generateGeneralObservationSummaries(obs))).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Comment');
      expect(result[0].Value).toBe(obs.ObsComment);
    });
  });

  it('should generate general obs summary for Comment - NO', () => {
    const obs: GeneralObservationEditModel = {
      Comment: 'Test Comment'
    };
    provider.generateGeneralObservationSummaries(obs).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Kommentar');
      expect(result[0].Value).toBe(obs.Comment);
      expect(result[0].Kind).toBe(SummaryKind.Text);
      expect(result[0].KindType).toBe('Text');
    });
  });

  it('should generate general obs summary for Comment - EN', () => {
    const obs: GeneralObservationEditModel = {
      Comment: 'Test ObsComment'
    };
    translateService.use('en').pipe(concatMap(() =>
      provider.generateGeneralObservationSummaries(obs))).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Comment');
      expect(result[0].Value).toBe(obs.Comment);
    });
  });

  it('should generate general obs summary for ObsHeader - NO', () => {
    const obs: GeneralObservationEditModel = {
      ObsHeader: 'Test ObsHeader'
    };
    provider.generateGeneralObservationSummaries(obs).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Overskrift');
      expect(result[0].Value).toBe(obs.ObsHeader);
      expect(result[0].Kind).toBe(SummaryKind.Text);
      expect(result[0].KindType).toBe('Text');
    });
  });

  it('should generate general obs summary for ObsHeader - EN', () => {
    const obs: GeneralObservationEditModel = {
      ObsHeader: 'Test ObsComment'
    };
    translateService.use('en').pipe(concatMap(() =>
      provider.generateGeneralObservationSummaries(obs))).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Header');
      expect(result[0].Value).toBe(obs.ObsHeader);
    });
  });

  it('should generate general obs summary for Url - NO', () => {
    const obs: GeneralObservationEditModel = {
      Urls: [
        { UrlDescription: 'Test description', UrlLine: 'https://www.vg.no' },
        { UrlLine: 'Second Url' },
      ]
    };
    provider.generateGeneralObservationSummaries(obs).subscribe((result) => {
      expect(result.length === 1);
      expect(result[0].Header).toBe('Lenker');
      const urlSummary = result[0].Value as UrlSummary[];
      expect(urlSummary.length).toBe(2);
      expect(urlSummary[0].Header).toBe('Test description');
      expect(urlSummary[0].Value).toBe('https://www.vg.no');
      expect(urlSummary[1].Header).toBe('Second Url');
      expect(urlSummary[1].Value).toBe('http://Second Url');
    });
  });
});
