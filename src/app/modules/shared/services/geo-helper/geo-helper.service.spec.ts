import { TestBed } from '@angular/core/testing';

import { GeoHelperService } from './geo-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { Spied, provideMock } from '../../../../core/helpers/spied';
import { GeoHazard } from 'src/app/modules/common-core/models';

describe('GeoHelperService', () => {
  let translateService: Spied<TranslateService>;
  let geoHelperService: GeoHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateService, provideMock(TranslateService)]
    });
    translateService = TestBed.get(TranslateService);
    geoHelperService = TestBed.get(GeoHelperService);
  });

  it('should be created', () => {
    expect(geoHelperService).toBeTruthy();
  });

  it('geoHazard snow should return translation key GEO_HAZARDS.SNOW', () => {
    expect(geoHelperService.getTranslationKey(GeoHazard.Snow)).toEqual(
      'GEO_HAZARDS.SNOW'
    );
  });
  it('geoHazard water should return translation key GEO_HAZARDS.WATER', () => {
    expect(geoHelperService.getTranslationKey(GeoHazard.Water)).toEqual(
      'GEO_HAZARDS.WATER'
    );
  });
  it('geoHazard dirt should return translation key GEO_HAZARDS.DIRT', () => {
    expect(geoHelperService.getTranslationKey(GeoHazard.Soil)).toEqual(
      'GEO_HAZARDS.DIRT'
    );
  });
  it('geoHazard ice should return translation key GEO_HAZARDS.ICE', () => {
    expect(geoHelperService.getTranslationKey(GeoHazard.Ice)).toEqual(
      'GEO_HAZARDS.ICE'
    );
  });
});
