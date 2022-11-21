import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import moment from 'moment';
import 'moment-timezone';
import { firstValueFrom, Observable, of } from 'rxjs';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';

import { SearchCriteriaService } from './search-criteria.service';

class TestMapService {
  mapView$: Observable<IMapView>;
}

describe('SearchCriteriaService', () => {
  let service: SearchCriteriaService;
  let userSettingService: UserSettingService;
  let mapService: TestMapService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    mapService = new TestMapService();
    mapService.mapView$ = of({ bounds: undefined, center: undefined, zoom: undefined });

    userSettingService = new UserSettingService(null, null);

    service = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService());

    userSettingService.saveUserSettings({
      ...await firstValueFrom(userSettingService.userSetting$),
      language: LangKey.nn,
      currentGeoHazard: [GeoHazard.Soil, GeoHazard.Water]
    });

    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('filter should contain current language and geo hazard automatically', fakeAsync(async () => {
    tick(1);
    //check default criteria
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.LangKey).toEqual(LangKey.nn);
    expect(criteria.SelectedGeoHazards).toEqual([GeoHazard.Soil, GeoHazard.Water]);
    const url = new URL(document.location.href);
    expect(url.searchParams.get('hazard')).toEqual('20~60');

    //verify that criteria changes when we change language and geo hazard
    userSettingService.saveUserSettings({
      ...await firstValueFrom(userSettingService.userSetting$),
      language: LangKey.en,
      currentGeoHazard: [GeoHazard.Ice]
    });
    tick(1);
    const criteria2 = await firstValueFrom(service.searchCriteria$);
    expect(criteria2.LangKey).toEqual(LangKey.en);
    expect(criteria2.SelectedGeoHazards).toEqual([GeoHazard.Ice]);
    const url2 = new URL(document.location.href);
    expect(url2.searchParams.get('hazard')).toEqual('70');
  }));

  it('default days-back filter should work', fakeAsync(async () => {
    //    jasmine.clock().mockDate(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());
    jasmine.clock().mockDate(new Date('2000-12-24T08:00:00+01:00'));
    // const offset = new Date().getTimezoneOffset();
    // const expectedFromTime2 = moment(new Date('2000-12-24 00:00:00.000')).add(offset, 'm');
    // const expectedFromTime = moment(new Date('2000-12-24 00:00:00.000')).toISOString();

    //check that criteria contains from time. Should be 3 days earlier minus 1 hour because UTC is one hour after us
    const criteria = await firstValueFrom(service.searchCriteria$);
    expect(criteria.FromDtObsTime).toEqual('2000-12-20T23:00:00.000Z');

    //check fromDate parameter in url. Should be 3 days earlier based on local time
    const url = new URL(document.location.href);
    expect(url.searchParams.get('fromDate')).toEqual('2000-12-21');
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

});

