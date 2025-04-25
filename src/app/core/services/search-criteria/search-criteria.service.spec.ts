/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import moment from 'moment-timezone';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { createMapView, MapService } from 'src/app/modules/map/services/map/map.service';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { SearchCriteria } from '../../models/search-criteria';
import { UserSettingService } from '../user-setting/user-setting.service';
import { SearchCriteriaOrderBy, SearchCriteriaService } from './search-criteria.service';
import { separatedStringToNumberArray } from './url-params';
import { provideTranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';

export class TestMapService {
  mapView$!: BehaviorSubject<IMapView>;
}

export function createTestMapService(): TestMapService {
  const service = new TestMapService();
  service.mapView$ = new BehaviorSubject({
    bounds: undefined,
    center: undefined,
    zoom: undefined,
  } as unknown as IMapView);
  return service;
}

describe('SearchCriteriaService', () => {
  let service: SearchCriteriaService;
  let userSettingService: UserSettingService;
  let mapService: TestMapService;
  let router: Router;

  const orderByTestCases = [
    { apiValue: 'DtChangeTime', urlValue: 'changeTime' },
    { apiValue: 'DtObsTime', urlValue: 'obsTime' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const expectQueryParameterToHaveBeenApplied = (key: string, value: any) => {
    const url = new URL(document.location.href + router.url);
    if (!value) {
      expect(url.searchParams.has(key)).toBeFalse();
    } else {
      expect(url.searchParams.get(key)).toBe(value);
    }
  };

  beforeEach(async () => {
    mapService = createTestMapService();
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        UserSettingService,
        { provide: MapService, useValue: mapService },
        { provide: ActivatedRoute, useValue: undefined },
      ],
    });

    router = TestBed.inject(Router);
    userSettingService = TestBed.inject(UserSettingService);
    service = TestBed.inject(SearchCriteriaService);

    jasmine.clock().install();
    moment.tz.setDefault('Europe/Oslo');
  });

  afterEach(function () {
    jasmine.clock().uninstall();
    moment.tz.setDefault();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initial criteria should use OrderBy: DtChangeTime', () => {
    const criteria = service.getInitialCriteria();
    expect(criteria.OrderBy).toBe('DtChangeTime');
  });

  it('initial criteria$ should use OrderBy: DtChangeTime', fakeAsync(() => {
    const orderBy = firstValueFrom(service.searchCriteria$).then((c) => c.OrderBy);
    tick();
    expectAsync(orderBy).toBeResolvedTo('DtChangeTime');
  }));

  it('filter should contain language and geo hazard', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(150);
    //check default criteria
    expect(criteria.LangKey).toBeDefined(); // Default langkey hentes fra browserspråk, så ikke test mot én spesifikk
    expect(criteria.SelectedGeoHazards).toEqual([GeoHazard.Snow]);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('hazard', '10');

    //verify that criteria changes when we change language and geo hazard
    userSettingService.updateUserSettings({
      language: LangKey.en,
      currentGeoHazard: [GeoHazard.Soil, GeoHazard.Water],
    });
    tick(500);
    const criteria2 = await firstValueFrom(service.searchCriteria$);
    expect(criteria2.LangKey).toEqual(LangKey.en);
    expect(criteria2.SelectedGeoHazards).toEqual([GeoHazard.Soil, GeoHazard.Water]);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('hazard', '20~60');
  }));

  it('default days-back filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    await userSettingService.saveGeoHazardsAndDaysBack({ daysBack: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(150);
    //check that criteria contains correct from time. Should be 1 days earlier at midnight
    expect(criteria.FromDtObsTime).toEqual('2000-12-23T00:00:00.000+01:00');

    await service.applyQueryParams();

    //check daysBack parameter in url. Should be 1 days earlier based on local time
    expectQueryParameterToHaveBeenApplied('daysBack', '1');

    // Check that fromDate and toDate are not in url while daysBack are there
    expectQueryParameterToHaveBeenApplied('fromDate', null);
    expectQueryParameterToHaveBeenApplied('toDate', null);
  }));

  it('nick name filter should work', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    service.setObserverNickName('Nick');
    tick(500);
    //check that current criteria contains expected nick name

    expect(criteria.ObserverNickName).toEqual('Nick');
    await service.applyQueryParams();
    //check that url contains nickname filter
    expectQueryParameterToHaveBeenApplied('nick', 'Nick');
  }));

  it('competence filter should set the right criteria and url', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    service.addCompetence([150, 105]);
    tick(500);

    expect(criteria.ObserverCompetence).toEqual([150, 105]);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('competence', '150~105');
  }));

  it('set new observation type should be ok', fakeAsync(async () => {
    const obsType = { Id: 81, SubTypes: [13] };
    service.setObservationType(obsType);
    tick(500);
    //check that current criteria contains expected type
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([obsType]);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('type', '81.13');
  }));

  it('remove observation type should be ok', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 81, SubTypes: [26] };
    tick(500);
    await service.setObservationType(obsType1);
    tick(500);
    await service.removeObservationType(obsType2);
    tick(500);
    //check that criteria contains only obsType2
    expect(criteria.SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13] }]);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('type', '81.13');
  }));

  it('det skal gå an å fjerne samme observasjonstype som vi nettopp la til i filteret (ro-2734)', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    const obsType = { Id: 80, SubTypes: [26] };
    tick(500);
    await service.setObservationType(obsType);
    tick(500);
    await service.removeObservationType(obsType);
    tick(500);
    //check that criteria contains only obsType2
    expect(criteria.SelectedRegistrationTypes.length).toEqual(0);
    await service.applyQueryParams();
    const url = new URL(document.location.href);
    expect(url.searchParams.has('type')).toBeFalse();
  }));

  it('remove observation type with wrong parameter, should return the same object', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 40, SubTypes: [26] };
    tick(500);
    await service.setObservationType(obsType1);
    await service.removeObservationType(obsType2);
    tick(500);
    expect(criteria.SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13, 26] }]);

    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('type', '81.13~81.26');
  }));

  it('remove observation type when criteria empty, should return null', fakeAsync(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    const obsType2 = { Id: 40, SubTypes: [26] };
    tick(500);
    await service.removeObservationType(obsType2);
    expect(criteria.SelectedRegistrationTypes).toEqual(undefined);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('type', null);
  }));

  orderByTestCases.forEach((test) => {
    it('orderBy filter should work', fakeAsync(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let criteria: any;
      service.searchCriteria$.subscribe((c) => (criteria = c));
      service.setOrderBy(test.apiValue as SearchCriteriaOrderBy);
      tick(100);
      //check that current criteria contains expected orderBy
      expect(criteria.OrderBy).toEqual(test.apiValue);
      await service.applyQueryParams();
      expectQueryParameterToHaveBeenApplied('orderBy', test.urlValue);
    }));
  });

  it('set correct extent criteria based on mapview coordinates', fakeAsync(async () => {
    //create mapview with coordinates
    const mv = createMapView(70.7978, 21.4343, 67.5715, 33.1458);
    mapService.mapView$.next(mv);

    const extent = {
      BottomRight: Object({ Latitude: 67.5715, Longitude: 33.1458 }),
      TopLeft: Object({ Latitude: 70.7978, Longitude: 21.4343 }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    expect(criteria.Extent).toEqual(extent);
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('nwLat', '70.7978');
    expectQueryParameterToHaveBeenApplied('nwLon', '21.4343');
    expectQueryParameterToHaveBeenApplied('seLat', '67.5715');
    expectQueryParameterToHaveBeenApplied('seLon', '33.1458');
  }));

  it('fromDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    service.setFromDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true), false);

    tick(100);

    expect(criteria.FromDtObsTime).toEqual('2000-12-24T00:00:00.000+01:00');
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('fromDate', '2000-12-24');
  }));

  it('toDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    service.setToDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true));

    tick(100);

    expect(criteria.ToDtObsTime).toEqual('2000-12-24T23:59:59.999+01:00');
    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('toDate', '2000-12-24');
  }));

  it('toDate url param should be removed when updating fromDate with true', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setFromDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true), true);
    expectQueryParameterToHaveBeenApplied('toDate', null);
  }));

  it('slush flow filter should set the right criteria and url when turned on', fakeAsync(async () => {
    let criteria: SearchCriteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    service.setSlushFlow();
    tick(500);
    //check that current criteria contains filter by slush flow
    expect(criteria!.PropertyFilters?.length).toEqual(1);
    const filter = criteria!.PropertyFilters?.[0];
    expect(filter?.Name).toEqual('AvalancheObs.AvalancheTID');
    expect(filter?.Value).toEqual('30');
    expect(filter?.Operator).toEqual(0);

    await service.applyQueryParams();
    expectQueryParameterToHaveBeenApplied('slushFlow', 'true');
  }));

  it('slush flow filter should be removed from criteria and url when turned off', fakeAsync(async () => {
    let criteria: SearchCriteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    service.setSlushFlow(false);
    tick(500);
    //check that current criteria does not contain filter by slush flow
    expect(criteria!.PropertyFilters).toBeUndefined();
    expectQueryParameterToHaveBeenApplied('slushFlow', null);
  }));

  it('slush flow filter should be removed from criteria and url when we change geo hazard', fakeAsync(async () => {
    let criteria: SearchCriteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));

    service.setSlushFlow(); //turn filter by slush flow on

    userSettingService.updateUserSettings({
      language: LangKey.nn,
      currentGeoHazard: [GeoHazard.Ice],
    });
    tick(500);
    //check that current criteria does not contain filter by slush flow
    expect(criteria!.PropertyFilters).toBeUndefined();
    expectQueryParameterToHaveBeenApplied('slushFlow', null);
  }));
});

//a separate suite because we want to add url parameters before we create the service
describe('SearchCriteriaService url parsing', () => {
  const wrongObservationTypeUrl = ['42,66', '23456', 'testMe'];

  const getService = () => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        UserSettingService,
        { provide: MapService, useValue: createTestMapService() },
        { provide: ActivatedRoute, useValue: undefined },
      ],
    });
    return TestBed.inject(SearchCriteriaService);
  };

  /**
   * Bruk denne til å fake at vi har satt en eller flere url-parametre
   * Eksempel: setUrlQueryPath('hazard=10&nick=Oluf')
   */
  const setUrlQueryPath = (queryPath: string) => {
    const newRelativePathQuery = `${window.location.pathname}?${queryPath}`;
    history.pushState(null, '', newRelativePathQuery);
  };

  /**
   * Bruk denne til å sjekke at vi har fått riktige kriteria basert på angitte url-parametre
   * @param queryPath url-parameterne som skal brukes
   * @returns søkekriteria som skal være i henhold til url-parametrene
   * @example applyUrlParameter('nick=Oluf').ObserverNickName === 'Oluf'
   */
  const applyUrlQueryPath = (queryPath: string): SearchCriteriaRequestDto => {
    setUrlQueryPath(queryPath);
    const service = getService();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let criteria: any;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    return criteria as SearchCriteriaRequestDto;
  };

  beforeEach(() => {
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
    expect(separatedStringToNumberArray('70~20~30~3001')).toEqual([70, 20, 30, 3001]);
    expect(separatedStringToNumberArray('~70~20~')).toEqual([70, 20]);
  });

  it('competence url filter works properly', fakeAsync(() => {
    setUrlQueryPath('competence=150~105');
    const service = getService();
    let criteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    expect(criteria!.ObserverCompetence).toEqual([150, 105]);
  }));

  it('competence url filter with wrong params', fakeAsync(() => {
    setUrlQueryPath('competence=150~string');
    const service = getService();
    let criteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    expect(criteria!.ObserverCompetence).toEqual(undefined);
  }));

  it('nick name url filter should work', fakeAsync(() => {
    expect(applyUrlQueryPath('nick=Oluf').ObserverNickName).toEqual('Oluf');
  }));

  it('type url should work', fakeAsync(() => {
    setUrlQueryPath('type=81.13~81.26~10');
    const service = getService();
    let criteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    expect(criteria!.SelectedRegistrationTypes).toEqual([
      { Id: 10, SubTypes: [] },
      { Id: 81, SubTypes: [13, 26] },
    ]);
  }));

  wrongObservationTypeUrl.forEach((test) => {
    it('type url wrong format, set undefined in criteria', fakeAsync(() => {
      setUrlQueryPath(`type=${test}`);
      const service = getService();
      let criteria;
      service.searchCriteria$.subscribe((c) => (criteria = c));
      tick(100);
      expect(criteria!.SelectedRegistrationTypes).toEqual(undefined);
    }));
  });

  it('orderBy url filter should work', fakeAsync(() => {
    setUrlQueryPath('orderBy=changeTime');
    const service = getService();
    let criteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    //check that current criteria contains expected orderBy

    expect(criteria!.OrderBy).toEqual('DtChangeTime');
  }));

  it('orderBy url filter should work', fakeAsync(() => {
    setUrlQueryPath('orderBy=obsTime');
    const service = getService();
    let criteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    //check that current criteria contains expected orderBy
    expect(criteria!.OrderBy).toEqual('DtObsTime');
  }));

  it('geo hazard url filter should work', fakeAsync(() => {
    expect(applyUrlQueryPath('hazard=70').SelectedGeoHazards).toEqual([70]);
  }));

  it('illegal geo hazard in url should return 10', fakeAsync(() => {
    setUrlQueryPath('hazard=illegal');
    const service = getService();
    let criteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    //check that current criteria contains expected geo hazard

    expect(criteria!.SelectedGeoHazards).toEqual([10]);
  }));

  it('days back url filter should work', fakeAsync(() => {
    const queryPath = 'daysBack=1';
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    setUrlQueryPath(queryPath);

    //check that criteria contains correct from time. Should be 1 day earlier at midnight
    expect(applyUrlQueryPath(queryPath).FromDtObsTime).toEqual('2000-12-23T00:00:00.000+01:00');
  }));

  it('toDate and fromDate filter should work', fakeAsync(() => {
    const queryPath = 'fromDate=2020-12-24&toDate=2022-12-24';
    const criteria = applyUrlQueryPath(queryPath);
    expect(criteria!.FromDtObsTime).toEqual('2020-12-24T00:00:00.000+01:00');
    expect(criteria!.ToDtObsTime).toEqual('2022-12-24T23:59:59.999+01:00');
  }));

  it('slush flow filter should be activated by url', fakeAsync(() => {
    setUrlQueryPath('slushFlow=true');
    const service = getService();
    let criteria: SearchCriteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    //check that current criteria contains filter by slush flow
    expect(criteria!.PropertyFilters?.length).toEqual(1);
    const filter = criteria!.PropertyFilters?.[0];
    expect(filter?.Name).toEqual('AvalancheObs.AvalancheTID');
    expect(filter?.Value).toEqual('30');
    expect(filter?.Operator).toEqual(0);
  }));

  it('slush flow filter should be deactivated by url', fakeAsync(() => {
    setUrlQueryPath('slushFlow=false');
    const service = getService();
    let criteria: SearchCriteria;
    service.searchCriteria$.subscribe((c) => (criteria = c));
    tick(100);
    //check that current criteria does not contain filter by slush flow
    expect(criteria!.PropertyFilters).toBeUndefined();
  }));
});
