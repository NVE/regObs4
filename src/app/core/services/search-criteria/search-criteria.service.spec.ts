import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import moment from 'moment';
import { firstValueFrom, Observable, of } from 'rxjs';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { SearchCriteriaOrderBy, SearchCriteriaService, separatedStringToNumberArray } from './search-criteria.service';
import { UrlParams } from './url-params';

class TestMapService {
  mapView$: Observable<IMapView>;
}

function createTestMapService(): TestMapService {
  const service = new TestMapService();
  service.mapView$ = of({ bounds: undefined, center: undefined, zoom: undefined });
  return service;
}

describe('SearchCriteriaService', () => {
  let service: SearchCriteriaService;
  let userSettingService: UserSettingService;
  let mapService: TestMapService;

  const orderByTestCases = [
    { apiValue: 'DtChangeTime', urlValue: 'changeTime' },
    { apiValue: 'DtObsTime', urlValue: 'obsTime' },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    mapService = createTestMapService();
    userSettingService = new UserSettingService(null, null);

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    jasmine.clock().install();
  });

  afterEach(function () {
    history.pushState(null, '', window.location.pathname); //remove all query params added in test
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('filter should contain language and geo hazard', fakeAsync(async () => {
    tick(1);
    //check default criteria
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.LangKey).toEqual(LangKey.nb);
    expect(criteria.SelectedGeoHazards).toEqual([GeoHazard.Snow]);
    const url = new URL(document.location.href);
    expect(url.searchParams.get('hazard')).toEqual('10');

    //verify that criteria changes when we change language and geo hazard
    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      language: LangKey.en,
      currentGeoHazard: [GeoHazard.Soil, GeoHazard.Water],
    });
    tick(1);
    const criteria2 = await firstValueFrom(service.searchCriteria$);
    expect(criteria2.LangKey).toEqual(LangKey.en);
    expect(criteria2.SelectedGeoHazards).toEqual([GeoHazard.Soil, GeoHazard.Water]);
    const url2 = new URL(document.location.href);
    expect(url2.searchParams.get('hazard')).toEqual('20~60');
  }));

  it('default days-back filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(new Date('2000-12-24T08:00:00+01:00')); //norwegian time

    //check that criteria contains correct from time. Should be 2 days earlier at midnight
    const expectedFromTime = moment(new Date('2000-12-22 00:00:00.000')).toISOString(true);
    //we must also adjust for time zone because search criteria is in UTC and 1 or 2 hour(s) earlier than norwegian time
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual(expectedFromTime);

    //check fromDate parameter in url. Should be 2 days earlier based on local time
    const url = new URL(document.location.href);
    expect(url.searchParams.get('fromDate')).toEqual('2000-12-22');
  }));

  it('nick name filter should work', fakeAsync(async () => {
    service.setObserverNickName('Nick');
    tick(1);

    //check that current criteria contains expected nick name
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverNickName).toEqual('Nick');

    //check that url contains nickname filter
    const url = new URL(document.location.href);
    expect(url.searchParams.get('nick')).toEqual('Nick');
  }));

  orderByTestCases.forEach((test) => {
    it('orderBy filter should work', fakeAsync(async () => {
      service.setOrderBy(test.apiValue as SearchCriteriaOrderBy);
      tick();
      //check that current criteria contains expected orderBy
      const criteria = await firstValueFrom(service.searchCriteria$);
      expect(criteria.OrderBy).toEqual(test.apiValue);
      const url = new URL(document.location.href);
      expect(url.searchParams.get('orderBy')).toEqual(test.urlValue);
    }));
  });
});

//a separate suite because we want to add url parameters before we create the service
describe('SearchCriteriaService url parsing', () => {
  let service: SearchCriteriaService;
  let userSettingService: UserSettingService;
  let mapService: TestMapService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    mapService = createTestMapService();
    userSettingService = new UserSettingService(null, null);

    jasmine.clock().install();
  });

  afterEach(function () {
    history.pushState(null, '', window.location.pathname); //remove all query params added in test
    jasmine.clock().uninstall();
  });

  it('parsing of query parameter arrays should work', () => {
    expect(separatedStringToNumberArray('')).toEqual([]);
    expect(separatedStringToNumberArray(' ')).toEqual([]);
    expect(separatedStringToNumberArray('70 20')).toEqual([]);
    expect(separatedStringToNumberArray('70ikkelov20')).toEqual([]);
    expect(separatedStringToNumberArray('helt feil')).toEqual([]);
    expect(separatedStringToNumberArray('10')).toEqual([10]);
    expect(separatedStringToNumberArray('70~20')).toEqual([70, 20]);
    expect(separatedStringToNumberArray('~70~20~')).toEqual([]);
  });

  it('nick name url filter should work', fakeAsync(async () => {
    new UrlParams().set('nick', 'Oluf').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that current criteria contains expected nick name
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverNickName).toEqual('Oluf');
  }));

  it('orderBy url filter should work', fakeAsync(async () => {
    new UrlParams().set('orderBy', 'changeTime').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that current criteria contains expected orderBy
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.OrderBy).toEqual('DtChangeTime');
  }));

  it('orderBy url filter should work', fakeAsync(async () => {
    new UrlParams().set('orderBy', 'obsTime').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that current criteria contains expected orderBy
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.OrderBy).toEqual('DtObsTime');
  }));

  it('geo hazard url filter should work', fakeAsync(async () => {
    new UrlParams().set('hazard', 70).apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that current criteria contains expected geo hazard
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedGeoHazards).toEqual([70]);
  }));

  it('illegal geo hazard in url should be ignored', fakeAsync(async () => {
    new UrlParams().set('hazard', 'illegal').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that current criteria contains expected geo hazard
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedGeoHazards).toEqual([]);
  }));

  it('days back url filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(new Date('2000-12-24T08:00:00+01:00')); //norwegian time
    new UrlParams().set('daysBack', 1).apply();

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that criteria contains correct from time. Should be 1 days earlier at midnight
    //we must also adjust for time zone because search criteria is in UTC and 1 or 2 hour(s) earlier than norwegian time
    const expectedFromTime = moment(new Date('2000-12-23 00:00:00.000')).toISOString(true);
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual(expectedFromTime);
  }));

  it('fromDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(new Date('2000-12-24T08:00:00+01:00')); //norwegian time

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    service.setFromDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true), false);
    tick(100);

    const url = new URL(document.location.href);
    expect(url.searchParams.get('fromDate')).toEqual('2000-12-24');

    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual('2000-12-24T00:00:00.000Z');
  }));

  it('toDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(new Date('2000-12-24T08:00:00+01:00')); //norwegian time

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    service.setToDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true));
    tick(100);

    const url = new URL(document.location.href);
    expect(url.searchParams.get('toDateDate')).toEqual('2000-12-24');

    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ToDtObsTime).toEqual('2000-12-24T00:00:00.000Z');
  }));

  it('toDate url param should be removed when updating fromDate with true', fakeAsync(async () => {
    jasmine.clock().mockDate(new Date('2000-12-24T08:00:00+01:00')); //norwegian time

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    service.setFromDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true), true);
    tick(100);

    const url = new URL(document.location.href);
    expect(url.searchParams.get('toDate')).toBeNull();
  }));
});
