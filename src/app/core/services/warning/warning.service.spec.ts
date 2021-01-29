import { TestBed, inject } from '@angular/core/testing';
import { WarningService } from './warning.service';
import { HttpClient } from '@angular/common/http';
import { UserSettingService } from '../user-setting/user-setting.service';
import { MapService } from '../../../modules/map/services/map/map.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { DbHelperService } from '../db-helper/db-helper.service';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { LangKey } from '../../models/langKey';
import moment from 'moment';
import { IWarningApiResult } from './warning-api-result.interface';

describe('WarningService', () => {
  let httpClient: HttpClient;
  let userSettingService: UserSettingService;
  let mapService: MapService;
  let dataLoadService: DataLoadService;
  let platform: Platform;
  let nativeHttp: HTTP;
  let loggingService: LoggingService;
  let dbHelperService: DbHelperService;
  let service: WarningService;

  beforeEach(() => {
    httpClient = <HttpClient>{};
    userSettingService = <UserSettingService>{};
    mapService = <MapService>{};
    dataLoadService = <DataLoadService>{};
    platform = <Platform>{};
    nativeHttp = <HTTP>{};
    loggingService = <LoggingService>{};
    dbHelperService = <DbHelperService>{};
    // httpClient = jasmine.createSpyObj('HttpClient', { _: true });
    // userSettingService = jasmine.createSpyObj('UserSettingService', { _: true });
    // mapService = jasmine.createSpyObj('MapService', { _: true });
    // dataLoadService = jasmine.createSpyObj('DataLoadService', { _: true });
    // platform = jasmine.createSpyObj('Platform', { _: true });
    // nativeHttp = jasmine.createSpyObj('HTTP', { _: true });
    // loggingService = jasmine.createSpyObj('LoggingService', { _: true });
    // dbHelperService = jasmine.createSpyObj('DbHelperService', { _: true });

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: UserSettingService, useValue: userSettingService },
        { provide: MapService, useValue: mapService },
        { provide: DataLoadService, useValue: dataLoadService },
        { provide: Platform, useValue: platform },
        { provide: HTTP, useValue: nativeHttp },
        { provide: LoggingService, useValue: loggingService },
        { provide: DbHelperService, useValue: dbHelperService },
        WarningService
      ]
    });
  });

  beforeEach(inject([WarningService], (warningService: WarningService) => {
    service = warningService;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('aggregateWarningRegions should return empty array', () => {
    const warningResult = [];
    const result = service.aggregateWarningRegions(
      warningResult,
      GeoHazard.Dirt,
      LangKey.nb,
      moment()
    );

    expect(result).toEqual([]);
  });

  it('aggregateWarningRegions same region should return highest warning level', () => {
    const warningResult: IWarningApiResult[] = [
      {
        Version: 1,
        ValidFrom: '2019-03-23T07:00:00',
        ValidTo: '2019-03-24T06:59:59',
        PublishTime: '2019-03-23T10:48:00',
        ActivityLevel: '1',
        MainText: '',
        CountyList: [
          {
            Id: '50',
            Name: 'Trøndelag',
            MunicipalityList: null
          }
        ],
        MunicipalityCsvString: '1;'
      },
      {
        Version: 1,
        ValidFrom: '2019-03-23T07:00:00',
        ValidTo: '2019-03-24T06:59:59',
        PublishTime: '2019-03-23T10:48:00',
        ActivityLevel: '2',
        MainText: '',
        CountyList: [
          {
            Id: '50',
            Name: 'Trøndelag',
            MunicipalityList: null
          }
        ],
        MunicipalityCsvString: '1;'
      }
    ];
    const now = moment('2019-03-23T17:00:00');
    const result = service.aggregateWarningRegions(
      warningResult,
      GeoHazard.Dirt,
      LangKey.nb,
      now
    );
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual('50_20');
    expect(result[0].warnings.length).toEqual(1);
    expect(result[0].warnings[0].warningLevel).toEqual(2);
  });

  it('aggregateWarningRegions same full api result test', () => {
    const warningResult = require('../../../../assets/test/warning-api-test-result.json');
    const now = moment('2019-03-23T17:00:00');
    const result = service.aggregateWarningRegions(
      warningResult,
      GeoHazard.Dirt,
      LangKey.nb,
      now
    );
    const trondelag = result.filter((x) => x.id === '50_20');
    const todaysWarnings = trondelag[0].warnings.filter((x) =>
      moment(x.validTo)
        .startOf('day')
        .isSame(moment('2019-03-24T05:59:59.000Z').startOf('day'))
    );
    expect(trondelag.length).toEqual(1);
    expect(todaysWarnings.length).toEqual(1);
    expect(todaysWarnings[0].warningLevel).toEqual(2);
  });

  it('aggregateWarningRegions trondelag api result test', () => {
    const warningResult = require('../../../../assets/test/warning-api-test-trond.json');
    const now = moment('2019-03-23T17:00:00');
    const result = service.aggregateWarningRegions(
      warningResult,
      GeoHazard.Dirt,
      LangKey.nb,
      now
    );
    const trondelag = result.filter((x) => x.id === '50_20');
    const todaysWarnings = trondelag[0].warnings.filter((x) =>
      moment(x.validTo)
        .startOf('day')
        .isSame(moment('2019-03-24T05:59:59.000Z').startOf('day'))
    );
    expect(trondelag.length).toEqual(1);
    expect(todaysWarnings.length).toEqual(1);
    expect(todaysWarnings[0].warningLevel).toEqual(2);
  });

  it('aggregateWarningRegions norland api result should show activity level 2', () => {
    const warningResult = require('../../../../../test-files/flood-result-18.json');
    const now = moment('2019-04-05T08:00:00');
    const result = service.aggregateWarningRegions(
      warningResult,
      GeoHazard.Water,
      LangKey.nb,
      now
    );
    const nordland = result.filter((x) => x.id === '18_60');
    const todaysWarnings = nordland[0].warnings.filter((x) =>
      moment(x.validTo)
        .startOf('day')
        .isSame(moment('2019-04-06T06:59:59.000Z').startOf('day'))
    );
    expect(nordland.length).toEqual(1);
    expect(todaysWarnings.length).toEqual(1);
    expect(todaysWarnings[0].warningLevel).toEqual(2);
  });
});
