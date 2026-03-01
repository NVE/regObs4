/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import moment from 'moment-timezone';
import { BehaviorSubject, map, of } from 'rxjs';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { createMapView, MapService } from 'src/app/modules/map/services/map/map.service';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { SearchCriteriaOrderBy, SearchCriteriaService } from './search-criteria.service';
import { separatedStringToNumberArray } from './url-params';
import { provideTranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/core';
import { SearchCriteriaModelService } from './search-criteria-model.service';
import { UserSetting } from '../../models/user-settings.model';
import { DEFAULT_USER_SETTINGS } from '../user-setting/user-settings.default';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';

export class TestMapService {
  mapView$!: BehaviorSubject<IMapView | undefined>;
}

export function createTestMapService(): TestMapService {
  const service = new TestMapService();
  service.mapView$ = new BehaviorSubject<IMapView | undefined>(undefined);
  return service;
}

describe('SearchCriteriaService', () => {
  const orderByTestCases = [
    { apiValue: 'DtChangeTime', urlValue: 'changeTime' },
    { apiValue: 'DtObsTime', urlValue: 'obsTime' },
  ];

  // Kan initialisere servicen vi tester basert på queryPath + userSettings med gitte verdier
  const init = ({
    userSettings,
    queryPath,
    langKey,
  }: { userSettings?: Partial<UserSetting>; queryPath?: string; langKey?: LangKey } = {}) => {
    const mapService = createTestMapService();
    const userSetting$ = new BehaviorSubject<UserSetting>({
      ...DEFAULT_USER_SETTINGS(langKey || LangKey.nb),
      ...userSettings,
    });
    const userSettingsMock: Partial<UserSettingService> = {
      userSetting$: userSetting$,
      updateUserSettings: (settings) => {
        userSetting$.next({ ...userSetting$.value, ...settings });
      },
      daysBackForCurrentGeoHazard$: userSetting$.pipe(
        map((us) => {
          const gh = us.currentGeoHazard[0];
          return us.observationDaysBack.find((x) => x.geoHazard === gh)?.daysBack || 2;
        })
      ),
      language$: userSetting$.pipe(map((us) => us.language)),
      currentGeoHazard$: userSetting$.pipe(map((us) => us.currentGeoHazard)),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: { location: { href: `http://regobs.no/${queryPath ? '?' + queryPath : ''}` } } },
        provideTranslateService(),
        provideTestLogger(),
        { provide: UserSettingService, useValue: userSettingsMock },
        { provide: MapService, useValue: mapService },
        { provide: ActivatedRoute, useValue: undefined },
        { provide: SearchCriteriaModelService, useValue: { getCompetenceFilterOptions$: () => of([]) } },
      ],
    });

    return {
      userSettings: userSettingsMock as UserSettingService,
      service: TestBed.inject(SearchCriteriaService),
      mapService,
    };
  };

  beforeEach(() => {
    jasmine.clock().install();
    moment.tz.setDefault('Europe/Oslo');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    moment.tz.setDefault();
  });

  it('should be created', () => {
    const { service } = init();
    expect(service).toBeTruthy();
  });

  it('initial criteria should use OrderBy: DtChangeTime', () => {
    const { service } = init();
    expect(service.criteria().OrderBy).toBe('DtChangeTime');
  });

  it('filter should contain language and geo hazard', () => {
    const { service, userSettings } = init({ userSettings: { language: LangKey.fr } });
    //check default criteria
    expect(service.criteria().LangKey).toEqual(LangKey.fr);
    expect(service.criteria().SelectedGeoHazards).toEqual([GeoHazard.Snow]);

    //verify that criteria changes when we change language and geo hazard
    userSettings.updateUserSettings({
      language: LangKey.en,
      currentGeoHazard: [GeoHazard.Soil, GeoHazard.Water],
    });
    expect(service.criteria().LangKey).toEqual(LangKey.en);
    expect(service.criteria().SelectedGeoHazards).toEqual([GeoHazard.Soil, GeoHazard.Water]);
  });

  it('addRegion should add regions to SelectedRegions', () => {
    const { service } = init();
    service.addRegion(1000);
    expect(service.criteria().SelectedRegions).toEqual([1000]);
    service.addRegion(2000);
    expect(service.criteria().SelectedRegions).toEqual([1000, 2000]);
    // Prøv å legge til samme region flere ganger
    service.addRegion(2000);
    expect(service.criteria().SelectedRegions).toEqual([1000, 2000]);
    service.addRegion(3000);
    expect(service.criteria().SelectedRegions).toEqual([1000, 2000, 3000]);
  });

  it('removeRegion should remove regions from SelectedRegions', () => {
    const { service } = init();
    service.addRegion(1000);
    service.addRegion(2000);
    service.addRegion(3000);
    expect(service.criteria().SelectedRegions).toEqual([1000, 2000, 3000]);
    service.removeRegion(2000);
    expect(service.criteria().SelectedRegions).toEqual([1000, 3000]);
    service.removeRegion(1000);
    expect(service.criteria().SelectedRegions).toEqual([3000]);
    // Prøv å slette samme region to ganger
    service.removeRegion(1000);
    expect(service.criteria().SelectedRegions).toEqual([3000]);
    // Prøv å slette en region som ikke finnes
    service.removeRegion(NaN);
    expect(service.criteria().SelectedRegions).toEqual([3000]);
  });

  it('daysBack from userSettings should be used to set FromDtObsTime', () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    const { service, userSettings } = init({
      userSettings: {
        currentGeoHazard: [GeoHazard.Snow],
        observationDaysBack: [{ geoHazard: GeoHazard.Snow, daysBack: 1 }],
      },
    });
    //check that criteria contains correct from time. Should be 1 days earlier at midnight
    expect(service.criteria().FromDtObsTime).toEqual('2000-12-23T00:00:00.000+01:00');

    // Sjekk at FromDtObsTime endres når daysBack endres
    userSettings.updateUserSettings({ observationDaysBack: [{ geoHazard: GeoHazard.Snow, daysBack: 14 }] });
    expect(service.criteria().FromDtObsTime).toEqual('2000-12-10T00:00:00.000+01:00');

    // Sjekk at FromDtObsTime bevares når useDaysBack settes til false.
    service.useDaysBack.set(false);
    expect(service.criteria().FromDtObsTime).toEqual('2000-12-10T00:00:00.000+01:00');
  });

  it('nick name filter should work', () => {
    const { service } = init();
    service.nickName.set('Nick');
    //check that current criteria contains expected nick name
    expect(service.criteria().ObserverNickName).toEqual('Nick');
  });

  it('competence filter should set the right criteria', () => {
    const { service } = init({ userSettings: { currentGeoHazard: [GeoHazard.Ice] } });
    service.addCompetence([750, 705]);
    expect(service.criteria().ObserverCompetence).toEqual([750, 705]);
  });

  it('set new observation type should be ok', () => {
    const { service } = init();
    const obsType = { Id: 81, SubTypes: [13] };
    service.setObservationType(obsType);
    //check that current criteria contains expected type
    expect(service.criteria().SelectedRegistrationTypes).toEqual([obsType]);
  });

  it('should be possible to remove a subtype', () => {
    const { service } = init();
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 81, SubTypes: [26] };
    service.setObservationType(obsType1);
    service.removeObservationType(obsType2);
    //check that criteria contains only obsType2
    expect(service.criteria().SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13] }]);
  });

  it('det skal gå an å fjerne samme observasjonstype som vi nettopp la til i filteret (ro-2734)', () => {
    const { service } = init();
    const obsType = { Id: 80, SubTypes: [26] };
    service.setObservationType(obsType);
    expect(service.criteria().SelectedRegistrationTypes?.length).toEqual(1);
    service.removeObservationType(obsType);
    expect(service.criteria().SelectedRegistrationTypes).toBeUndefined();
  });

  it('remove observation type with wrong root id, should not change anything', () => {
    const { service } = init();
    const obsType1 = { Id: 81, SubTypes: [13, 26] };
    const obsType2 = { Id: 40, SubTypes: [26] };
    service.setObservationType(obsType1);
    expect(service.criteria().SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13, 26] }]);
    service.removeObservationType(obsType2);
    expect(service.criteria().SelectedRegistrationTypes).toEqual([{ Id: 81, SubTypes: [13, 26] }]);
  });

  it('remove observation type when criteria empty, should return null', () => {
    const { service } = init();
    const obsType2 = { Id: 40, SubTypes: [26] };
    service.removeObservationType(obsType2);
    expect(service.criteria().SelectedRegistrationTypes).toEqual(undefined);
  });

  orderByTestCases.forEach((test) => {
    it('orderBy filter should work', () => {
      const { service } = init();
      service.orderBy.set(test.apiValue as SearchCriteriaOrderBy);
      //check that current criteria contains expected orderBy
      expect(service.criteria().OrderBy).toEqual(test.apiValue);
    });
  });

  it('should set correct extent criteria based on mapview coordinates', fakeAsync(() => {
    //create mapview with coordinates
    const mv = createMapView(70.7978, 21.4343, 67.5715, 33.1458);
    const { service, mapService } = init();
    mapService.mapView$.next(mv);

    const extent = {
      BottomRight: Object({ Latitude: 67.5715, Longitude: 33.1458 }),
      TopLeft: Object({ Latitude: 70.7978, Longitude: 21.4343 }),
    };

    // Det er satt en debounce på 50 ms på mapView i servicen,
    // for å håndtere drag-events osv. Kan hende mapService i seg selv håndterer det godt nok.
    tick(51);
    expect(service.criteriaWithExtent().Extent).toEqual(extent);
  }));

  it('extent on criteria should be controllable using isExtentCriteriaActive', fakeAsync(() => {
    const mv = createMapView(70.7978, 21.4343, 67.5715, 33.1458);
    const { service, mapService } = init();
    mapService.mapView$.next(mv);

    const extent = {
      BottomRight: Object({ Latitude: 67.5715, Longitude: 33.1458 }),
      TopLeft: Object({ Latitude: 70.7978, Longitude: 21.4343 }),
    };

    // Det er satt en debounce på 50 ms på mapView i servicen,
    // for å håndtere drag-events osv. Kan hende mapService i seg selv håndterer det godt nok.
    tick(51);

    service.isExtentCriteriaActive.set(true);
    expect(service.criteria().Extent).toEqual(extent);

    service.isExtentCriteriaActive.set(false);
    expect(service.criteria().Extent).toBeUndefined();

    // Sjekk at ikke extent legges til om det kommer et nytt mapView
    mapService.mapView$.next(createMapView(70.7978, 21.4343, 67.5715, 34.1458));
    tick(51);
    expect(service.isExtentCriteriaActive()).toBeFalse();
    expect(service.criteria().Extent).toBeUndefined();

    // Sjekk at man kan skru det på igjen
    service.isExtentCriteriaActive.set(true);
    expect(service.criteria().Extent).toBeDefined();
  }));

  it('no extent should always set isExtentCriteriaActive to false', fakeAsync(() => {
    const mv = createMapView(70.7978, 21.4343, 67.5715, 33.1458);
    const { service, mapService } = init();

    // Skal initielt være avskrudd siden vi ikke har noe kartutsnitt
    expect(service.isExtentCriteriaActive()).toBe(false);
    expect(service.criteria().Extent).toBeUndefined();

    mapService.mapView$.next(mv);
    // Det er satt en debounce på 50 ms på mapView i servicen,
    // for å håndtere drag-events osv. Kan hende mapService i seg selv håndterer det godt nok.
    tick(51);
    // Skal nå ha fått et kartutsnitt
    expect(service.isExtentCriteriaActive()).toBe(true);
    expect(service.criteria().Extent).toBeDefined();

    // Usikker på om dette faktisk kan skje etter oppstarten av appen, hvis man allerede har et kartutsnitt
    mapService.mapView$.next(undefined);
    tick(51);
    expect(service.isExtentCriteriaActive()).toBe(false);
    expect(service.criteria().Extent).toBeUndefined();
  }));

  it('region filter should set isExtentCriteriaActive to false)', fakeAsync(() => {
    const mv = createMapView(70.7978, 21.4343, 67.5715, 33.1458);
    const { service, mapService } = init();
    mapService.mapView$.next(mv);
    // Det er satt en debounce på 50 ms på mapView i servicen,
    // for å håndtere drag-events osv. Kan hende mapService i seg selv håndterer det godt nok.
    tick(51);

    // Kartutsnitt er nå aktivt i filteret
    expect(service.isExtentCriteriaActive()).toBe(true);
    expect(service.criteria().Extent).toBeDefined();

    // Legge til region bør deaktivere kartutsnitt-filter
    service.addRegion(1000);
    expect(service.isExtentCriteriaActive()).toBe(false);
    expect(service.criteria().Extent).toBeUndefined();

    // Kartutsnitt i criteriaWithExtent bør ikke påvirkes
    expect(service.criteriaWithExtent().Extent).toEqual({
      BottomRight: Object({ Latitude: 67.5715, Longitude: 33.1458 }),
      TopLeft: Object({ Latitude: 70.7978, Longitude: 21.4343 }),
    });
    expect(service.criteriaWithExtent().SelectedRegions).toEqual([1000]);
  }));

  it('FromDtObsTime should be set or updated', () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    const { service } = init();
    service.setFromDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true), false);
    expect(service.criteria().FromDtObsTime).toEqual('2000-12-24T00:00:00.000+01:00');
  });

  it('ToDtObsTime should be set or updated', () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    const { service } = init();
    service.setToDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true));
    expect(service.criteria().ToDtObsTime).toEqual('2000-12-24T23:59:59.999+01:00');
  });

  it('ToDtObsTime and FromDtObsTime should be possible to update when daysBack initially is used', () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    const { service } = init({
      userSettings: {
        currentGeoHazard: [GeoHazard.Snow],
        observationDaysBack: [{ geoHazard: GeoHazard.Snow, daysBack: 4 }],
      },
    });
    // Teste useDaysBack er egentlig ikke så viktig og kan eventuelt fjernes.
    // Det som er viktig for oss er at riktig FromDtObsTime og ToDtObsTime settes.
    // Fjerner vi useDaysBack i servicen kan disse linjene fjernes.
    expect(service.useDaysBack()).toBe(true);
    expect(service.criteria().FromDtObsTime).toEqual('2000-12-20T00:00:00.000+01:00');

    service.setToDate(moment(new Date('2000-12-24T00:00:00+01:00')).toISOString(true));
    expect(service.useDaysBack()).toBe(false);
    expect(service.criteria().FromDtObsTime).toEqual('2000-12-20T00:00:00.000+01:00');
    expect(service.criteria().ToDtObsTime).toEqual('2000-12-24T23:59:59.999+01:00');
  });

  it('ToDtObsTime should be removed when updating fromDate with true', () => {
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    const { service } = init({ queryPath: 'fromDate=2025-10-21&toDate=2025-11-04' });
    expect(service.fromDate()).toBeDefined();
    expect(service.toDate()).toBeDefined();

    service.setFromDate(moment(new Date('2000-12-24T00:00:00')).toISOString(true), true);
    expect(service.toDate()).toBeUndefined();
    expect(service.criteria().ToDtObsTime).toBeUndefined();
  });

  const expectSlushFlowCriteriaToExist = (criteria: SearchCriteriaRequestDto) => {
    //check that current criteria contains filter by slush flow
    expect(criteria.PropertyFilters?.length).toEqual(1);
    const filter = criteria!.PropertyFilters?.[0];
    expect(filter?.Name).toEqual('AvalancheObs.AvalancheTID');
    expect(filter?.Value).toEqual('30');
    expect(filter?.Operator).toEqual(0);
  };

  it('slush flow filter should set the right criteria when turned on', () => {
    const { service } = init();
    service.setSlushFlow();
    expectSlushFlowCriteriaToExist(service.criteria());
  });

  it('slush flow filter should be removed from criteria when turned off', () => {
    const { service } = init({ queryPath: 'slushFlow=true' });

    // Sjekk at slush flow filter er aktivert pga query parameter
    expect(service.slushFlow()).toBe(true);
    expectSlushFlowCriteriaToExist(service.criteria());

    service.setSlushFlow(false);
    // Sjekk at sørpeskredfilter er deaktivert
    expect(service.criteria().PropertyFilters).toBeUndefined();
  });

  // Testen er deaktivert fordi dette vil kreve at både filter på sørpeskred og SelectedRegistrationTypes beregnes
  // basert på geoHazard. Eller at vi bruker en effect for å resette disse når geoHazard endres.
  // Jeg tror koden blir enklere å forstå hvis vi heller bruker reset-metoden til å
  // nullstille filterne når geoHazard har blitt endret i appen.
  xit('slush flow filter should be removed from criteria when we change geo hazard', () => {
    const { service, userSettings } = init();
    service.setSlushFlow(); //turn filter by slush flow on
    expectSlushFlowCriteriaToExist(service.criteria());
    userSettings.updateUserSettings({
      language: LangKey.nn,
      currentGeoHazard: [GeoHazard.Ice],
    });
    //check that current criteria does not contain filter by slush flow
    expect(service.criteria().PropertyFilters).toBeUndefined();
    expect(service.criteria().SelectedRegistrationTypes).toBeUndefined();
  });
});

//a separate suite because we want to add url parameters before we create the service
describe('SearchCriteriaService url parsing', () => {
  const wrongObservationTypeUrl = ['42,66', '23456', 'testMe'];

  const getService = (queryPath = '') => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: { location: { href: `http://regobs.no/?${queryPath}` } } },
        provideTranslateService(),
        provideTestLogger(),
        UserSettingService,
        { provide: MapService, useValue: createTestMapService() },
        { provide: ActivatedRoute, useValue: undefined },
      ],
    });
    return TestBed.inject(SearchCriteriaService);
  };

  beforeEach(() => {
    jasmine.clock().install();
    moment.tz.setDefault('Europe/Oslo');
  });

  afterEach(function () {
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

  it('competence url filter works properly', () => {
    const service = getService('competence=150~105');
    const criteria = service.criteria();
    expect(criteria.ObserverCompetence).toEqual([150, 105]);
  });

  it('competence url filter with wrong params', () => {
    const service = getService('competence=150~string');
    const criteria = service.criteria();
    expect(criteria.ObserverCompetence).toEqual(undefined);
  });

  it('nick name url filter should work', () => {
    const service = getService('nick=Oluf');
    const criteria = service.criteria();
    expect(criteria.ObserverNickName).toEqual('Oluf');
  });

  it('type url should work', () => {
    const service = getService('type=81.13~81.26~10');
    const criteria = service.criteria();
    expect(criteria.SelectedRegistrationTypes).toEqual([
      { Id: 10, SubTypes: [] },
      { Id: 81, SubTypes: [13, 26] },
    ]);
  });

  wrongObservationTypeUrl.forEach((test) => {
    it('type url wrong format, set undefined in criteria', () => {
      const service = getService(`type=${test}`);
      const criteria = service.criteria();
      expect(criteria.SelectedRegistrationTypes).toEqual(undefined);
    });
  });

  it('orderBy url filter should work', () => {
    const service = getService('orderBy=changeTime');
    const criteria = service.criteria();
    //check that current criteria contains expected orderBy
    expect(criteria.OrderBy).toEqual('DtChangeTime');
  });

  it('orderBy url filter should work', () => {
    const service = getService('orderBy=obsTime');
    const criteria = service.criteria();
    //check that current criteria contains expected orderBy
    expect(criteria.OrderBy).toEqual('DtObsTime');
  });

  // TODO: Flytt test til test suite for userSettings, siden det er der denne parses fra url.
  // Det finnes allerede en test som sjekker at riktig GeoHazard settes på søkekriterene basert på det userSettings
  // tilbyr, og det er dette som er relevant å teste for søkekritere-servicen.
  it('geo hazard url filter should work', () => {
    pending('Flytt test til userSettings-tester');
    const service = getService('hazard=70');
    const criteria = service.criteria();
    expect(criteria.SelectedGeoHazards).toEqual([70]);
  });

  // TODO: Flytt test til test suite for userSettings, siden det er der denne parses fra url.
  // Det finnes allerede en test som sjekker at riktig GeoHazard settes på søkekriterene basert på det userSettings
  // tilbyr, og det er dette som er relevant å teste for søkekritere-servicen.
  it('illegal geo hazard in url should return 10', () => {
    pending('Flytt test til userSettings-tester');
    const service = getService('hazard=illegal');
    const criteria = service.criteria();
    //check that current criteria contains expected geo hazard
    expect(criteria.SelectedGeoHazards).toEqual([10]);
  });

  // TODO: Flytt test til test suite for userSettings, siden det er der denne parses fra url.
  // Det finnes allerede tester som sjekker at daysBack fra usersettings brukes riktig.
  it('days back url filter should work', () => {
    pending('Flytt test til userSettings-tester');
    const queryPath = 'daysBack=1';
    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    const service = getService(queryPath);
    const criteria = service.criteria();
    //check that criteria contains correct from time. Should be 1 day earlier at midnight
    expect(criteria.FromDtObsTime).toEqual('2000-12-23T00:00:00.000+01:00');
  });

  it('toDate and fromDate filter should work', () => {
    const service = getService('fromDate=2020-12-24&toDate=2022-12-24');
    const criteria = service.criteria();
    expect(criteria.FromDtObsTime).toEqual('2020-12-24T00:00:00.000+01:00');
    expect(criteria.ToDtObsTime).toEqual('2022-12-24T23:59:59.999+01:00');
  });

  it('slush flow filter should be activated by url', () => {
    const service = getService('slushFlow=true');
    const criteria = service.criteria();
    //check that current criteria contains filter by slush flow
    expect(criteria.PropertyFilters?.length).toEqual(1);
    const filter = criteria.PropertyFilters?.[0];
    expect(filter?.Name).toEqual('AvalancheObs.AvalancheTID');
    expect(filter?.Value).toEqual('30');
    expect(filter?.Operator).toEqual(0);
  });

  it('slush flow filter should not become active if query param is false', () => {
    const service = getService('slushFlow=false');
    const criteria = service.criteria();
    //check that current criteria does not contain filter by slush flow
    expect(criteria.PropertyFilters).toBeUndefined();
  });
});
