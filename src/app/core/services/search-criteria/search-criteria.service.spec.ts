import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import moment from 'moment-timezone';
import { firstValueFrom, Observable, of } from 'rxjs';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { SearchCriteriaOrderBy, SearchCriteriaService, separatedStringToNumberArray } from './search-criteria.service';
import { UrlParams } from './url-params';

export class TestMapService {
  mapView$: Observable<IMapView>;
}

export function createTestMapService(): TestMapService {
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
    moment.tz.setDefault('Europe/Oslo');
  });

  afterEach(function () {
    history.pushState(null, '', window.location.pathname); //remove all query params added in test
    jasmine.clock().uninstall();
    moment.tz.setDefault();
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
    await service.applyQueryParams();
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
    await service.applyQueryParams();
    const url2 = new URL(document.location.href);
    expect(url2.searchParams.get('hazard')).toEqual('20~60');
  }));

  it('default days-back filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());

    const criteria = await firstValueFrom(service.searchCriteria$);
    //check that criteria contains correct from time. Should be 2 days earlier at midnight
    expect(criteria.FromDtObsTime).toEqual('2000-12-22T00:00:00.000+01:00');

    await service.applyQueryParams();

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
    await service.applyQueryParams();
    //check that url contains nickname filter
    const url = new URL(document.location.href);
    expect(url.searchParams.get('nick')).toEqual('Nick');
  }));

  it('competence filter should set the right criteria and url', fakeAsync(async () => {
    service.setCompetence([150, 105]);
    tick();

    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverCompetence).toEqual([150, 105]);
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('competence')).toEqual('150~105');
  }));

  it('set new observation type should be ok', fakeAsync(async () => {
    const obsType = { Id: 81, SubTypes: [13] };
    service.setObservationType(obsType);
    tick(1);
    //check that current criteria contains expected type
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([obsType]);
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('type')).toEqual('81.13');
  }));

  it('remove observation type should be ok', fakeAsync(async () => {
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 81, SubTypes: [26] };
    await service.setObservationType(obsType1);
    await service.removeObservationType(obsType2);
    //check that criteria contains only obsType2
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13] }]);
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('type')).toEqual('81.13');
  }));

  it('remove observation type with wrong parameter, should return the same object', fakeAsync(async () => {
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 40, SubTypes: [26] };
    await service.setObservationType(obsType1);
    await service.removeObservationType(obsType2);
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13, 26] }]);
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('type')).toEqual('81.13~81.26');
  }));

  it('remove observation type when criteria empty, should return null', fakeAsync(async () => {
    const obsType2 = { Id: 40, SubTypes: [26] };
    await service.removeObservationType(obsType2);
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual(null);
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('type')).toEqual(null);
  }));

  orderByTestCases.forEach((test) => {
    it('orderBy filter should work', fakeAsync(async () => {
      service.setOrderBy(test.apiValue as SearchCriteriaOrderBy);
      tick();
      //check that current criteria contains expected orderBy
      const criteria = await firstValueFrom(service.searchCriteria$);
      expect(criteria.OrderBy).toEqual(test.apiValue);
      await service.applyQueryParams();
      const url = new URL(document.location.href);
      expect(url.searchParams.get('orderBy')).toEqual(test.urlValue);
    }));
  });

  it('fromDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setFromDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true), false);

    tick(100);

    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual('2000-12-24T00:00:00.000+01:00');
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('fromDate')).toEqual('2000-12-24');
  }));

  it('toDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setToDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true));

    tick(100);

    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ToDtObsTime).toEqual('2000-12-24T23:59:59.999+01:00');
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.get('toDate')).toEqual('2000-12-24');
  }));

  it('toDate url param should be removed when updating fromDate with true', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setFromDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true), true);

    tick(100);

    const url = new URL(document.location.href);
    expect(url.searchParams.get('toDate')).toBeNull();
  }));
});

//a separate suite because we want to add url parameters before we create the service
describe('SearchCriteriaService url parsing', () => {
  let service: SearchCriteriaService;
  let userSettingService: UserSettingService;
  let mapService: TestMapService;

  const wrongObservationTypeUrl = ['42,66', '23456', 'testMe'];

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    mapService = createTestMapService();
    userSettingService = new UserSettingService(null, null);

    jasmine.clock().install();
    moment.tz.setDefault('Europe/Oslo');
  });

  afterEach(function () {
    history.pushState(null, '', window.location.pathname); //remove all query params added in test
    moment.tz.setDefault();
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

  it('competence url filter works properly', fakeAsync(async () => {
    new UrlParams().set('competence', '150~105').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverCompetence).toEqual([150, 105]);
  }));

  it('type wrong hazard should search for 10 as default', fakeAsync(async () => {
    new UrlParams().set('hazard', '140').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedGeoHazards).toEqual([10]);
  }));

  it('competence url filter with wrong params', fakeAsync(async () => {
    new UrlParams().set('competence', '150~string').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverCompetence).toEqual(undefined);
  }));

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

  it('type url should work', fakeAsync(async () => {
    new UrlParams().set('type', '81.13~81.26~10').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([
      { Id: 10, SubTypes: [] },
      { Id: 81, SubTypes: [13, 26] },
    ]);
  }));

  wrongObservationTypeUrl.forEach((test) => {
    it('type url wrong format, set undefined in criteria', fakeAsync(async () => {
      new UrlParams().set('type', test).apply();
      service = new SearchCriteriaService(
        userSettingService,
        mapService as unknown as MapService,
        new TestLoggingService()
      );

      tick();
      const criteria = await firstValueFrom(service.searchCriteria$);
      expect(criteria.SelectedRegistrationTypes).toEqual(undefined);
    }));
  });

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
    new UrlParams().set('hazard', '70').apply();
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

  it('illegal geo hazard in url should reuturn 10', fakeAsync(async () => {
    new UrlParams().set('hazard', 'illegal').apply();
    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();
    //check that current criteria contains expected geo hazard
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedGeoHazards).toEqual([10]);
  }));

  it('days back url filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    new UrlParams().set('daysBack', 1).apply();

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();

    //check that criteria contains correct from time. Should be 1 day earlier at midnight
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual('2000-12-23T00:00:00.000+01:00');
  }));

  it('toDate and fromDate filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());

    new UrlParams().set('fromDate', '2020-12-24').apply();
    new UrlParams().set('toDate', '2022-12-24').apply();

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );

    tick();

    const criteria = await firstValueFrom(service.searchCriteria$);

    expect(criteria.FromDtObsTime).toEqual('2020-12-24T00:00:00.000+01:00');
    expect(criteria.ToDtObsTime).toEqual('2022-12-24T23:59:59.999+01:00');
  }));
});
