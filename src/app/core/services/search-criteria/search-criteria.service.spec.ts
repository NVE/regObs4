import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';

import { SearchCriteriaService } from './search-criteria.service';

class TestMapService {
  mapView: Observable<IMapView>;
}

describe('SearchCriteriaService', () => {
  let service: SearchCriteriaService;
  let userSettingService: UserSettingService;
  let mapService: TestMapService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    mapService = new TestMapService();
    userSettingService = new UserSettingService(null, null);
    router = jasmine.createSpyObj('Router', ['navigate']);

    service = new SearchCriteriaService(
      router,
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService());

    userSettingService.saveUserSettings({
      ...await firstValueFrom(userSettingService.userSetting$),
      language: LangKey.nn,
      currentGeoHazard: [GeoHazard.Soil, GeoHazard.Water]
    });

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Få denne til å virke!
  // it('filter should contain current language and geo hazard automatically', fakeAsync(async () => {
  //   tick(1);
  //   //check default criteria
  //   const criteria = await firstValueFrom(service.searchCriteria$);
  //   expect(criteria.LangKey).toEqual(LangKey.nn);
  //   expect(criteria.SelectedGeoHazards).toEqual([GeoHazard.Soil, GeoHazard.Water]);
  //   //TODO: Check URL for filter parameter

  //   //verify that criteria changes when we change language and geo hazard
  //   userSettingService.saveUserSettings({
  //     ...await firstValueFrom(userSettingService.userSetting$),
  //     language: LangKey.en,
  //     currentGeoHazard: [GeoHazard.Ice]
  //   });
  //   tick(1);
  //   const criteria2 = await firstValueFrom(service.searchCriteria$);
  //   expect(criteria2.LangKey).toEqual(LangKey.en);
  //   expect(criteria2.SelectedGeoHazards).toEqual([GeoHazard.Ice]);
  // }));

  it('obsTime filter should work', fakeAsync(async () => {
    service.setObsTime('fromTime', 'toTime');
    tick(1);

    //check that current criteria contains expected obstime
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual('fromTime');
    expect(criteria.ToDtObsTime).toEqual('toTime');
    //TODO: Check URL for filter parameter
  }));

  it('nick name filter should work', fakeAsync(async () => {
    service.setObserverNickName('nick');
    tick(1);

    //check that current criteria contains expected nick name
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.ObserverNickName).toEqual('nick');
    //TODO: Check URL for filter parameter
  }));

});

