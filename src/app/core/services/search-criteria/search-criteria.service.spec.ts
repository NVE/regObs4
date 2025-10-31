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
import { ActivatedRoute } from '@angular/router';
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

  const orderByTestCases = [
    { apiValue: 'DtChangeTime', urlValue: 'changeTime' },
    { apiValue: 'DtObsTime', urlValue: 'obsTime' },
  ];

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

    //verify that criteria changes when we change language and geo hazard
    userSettingService.updateUserSettings({
      language: LangKey.en,
      currentGeoHazard: [GeoHazard.Soil, GeoHazard.Water],
    });
    tick(500);
    const criteria2 = await firstValueFrom(service.searchCriteria$);
    expect(criteria2.LangKey).toEqual(LangKey.en);
    expect(criteria2.SelectedGeoHazards).toEqual([GeoHazard.Soil, GeoHazard.Water]);
  }));

  it('default days-back filter should work', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    await userSettingService.saveGeoHazardsAndDaysBack({ daysBack: 1 });
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    //check that criteria contains correct from time. Should be 1 days earlier at midnight
    expect(criteria.FromDtObsTime).toEqual('2000-12-23T00:00:00.000+01:00');
  }));

  it('nick name filter should work', fakeAsync(async () => {
    service.setObserverNickName('Nick');
    tick();
    //check that current criteria contains expected nick name
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverNickName).toEqual('Nick');
  }));

  it('competence filter should set the right criteria', fakeAsync(async () => {
    await service.addCompetence([150, 105]);
    tick(500);
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverCompetence).toEqual([150, 105]);
  }));

  it('set new observation type should be ok', fakeAsync(async () => {
    const obsType = { Id: 81, SubTypes: [13] };
    await service.setObservationType(obsType);
    tick(500);
    //check that current criteria contains expected type
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([obsType]);
  }));

  it('remove observation type should be ok', fakeAsync(async () => {
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 81, SubTypes: [26] };
    await service.setObservationType(obsType1);
    tick(500);
    await service.removeObservationType(obsType2);
    tick(500);
    const criteria = await firstValueFrom(service.searchCriteria$);
    //check that criteria contains only obsType2
    expect(criteria.SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13] }]);
  }));

  it('det skal gå an å fjerne samme observasjonstype som vi nettopp la til i filteret (ro-2734)', fakeAsync(async () => {
    const obsType = { Id: 80, SubTypes: [26] };
    await service.setObservationType(obsType);
    tick(500);
    await service.removeObservationType(obsType);
    tick(500);
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes?.length).toEqual(0);
  }));

  it('remove observation type with wrong parameter, should return the same object', fakeAsync(async () => {
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 40, SubTypes: [26] };
    await service.setObservationType(obsType1);
    tick(500);
    await service.removeObservationType(obsType2);
    tick(500);
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13, 26] }]);
  }));

  it('remove observation type when criteria empty, should return null', fakeAsync(async () => {
    const obsType2 = { Id: 40, SubTypes: [26] };
    await service.removeObservationType(obsType2);
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.SelectedRegistrationTypes).toEqual(undefined);
  }));

  orderByTestCases.forEach((test) => {
    it('orderBy filter should work', fakeAsync(async () => {
      service.setOrderBy(test.apiValue as SearchCriteriaOrderBy);
      tick();
      const criteria = await firstValueFrom(service.searchCriteria$);
      //check that current criteria contains expected orderBy
      expect(criteria.OrderBy).toEqual(test.apiValue);
    }));
  });

  it('should set correct extent criteria based on mapview coordinates', fakeAsync(async () => {
    //create mapview with coordinates
    const mv = createMapView(70.7978, 21.4343, 67.5715, 33.1458);
    mapService.mapView$.next(mv);

    const extent = {
      BottomRight: Object({ Latitude: 67.5715, Longitude: 33.1458 }),
      TopLeft: Object({ Latitude: 70.7978, Longitude: 21.4343 }),
    };
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.Extent).toEqual(extent);
  }));

  it('fromDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setFromDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true), false);
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual('2000-12-24T00:00:00.000+01:00');
  }));

  it('toDate url param should be set or updated', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setToDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true));
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ToDtObsTime).toEqual('2000-12-24T23:59:59.999+01:00');
  }));

  it('toDate criteria should be removed when updating fromDate with true', fakeAsync(async () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    service.setFromDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true), true);
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ToDtObsTime).toBeUndefined();
  }));

  it('slush flow filter should set the right criteria when turned on', fakeAsync(async () => {
    service.setSlushFlow();
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    //check that current criteria contains filter by slush flow
    expect(criteria.PropertyFilters?.length).toEqual(1);
    const filter = criteria!.PropertyFilters?.[0];
    expect(filter?.Name).toEqual('AvalancheObs.AvalancheTID');
    expect(filter?.Value).toEqual('30');
    expect(filter?.Operator).toEqual(0);
  }));

  it('slush flow filter should be removed from criteria when turned off', fakeAsync(async () => {
    service.setSlushFlow(false);
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    //check that current criteria does not contain filter by slush flow
    expect(criteria.PropertyFilters).toBeUndefined();
  }));

  it('slush flow filter should be removed from criteria when we change geo hazard', fakeAsync(async () => {
    service.setSlushFlow(); //turn filter by slush flow on
    userSettingService.updateUserSettings({
      language: LangKey.nn,
      currentGeoHazard: [GeoHazard.Ice],
    });
    tick();
    const criteria = await firstValueFrom(service.searchCriteria$);
    //check that current criteria does not contain filter by slush flow
    expect(criteria.PropertyFilters).toBeUndefined();
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
