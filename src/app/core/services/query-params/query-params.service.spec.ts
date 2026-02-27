import { TestBed } from '@angular/core/testing';

import { QueryParamsService } from './query-params.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_PARAM_DAYSBACK, URL_PARAM_FROMDATE, URL_PARAM_TODATE } from '../search-criteria/url-params';
import moment from 'moment';

describe('QueryParamsService', () => {
  let service: QueryParamsService;
  let router: Router;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const expectQueryParameterToHaveBeenApplied = (key: string, value: any) => {
    const url = new URL(document.location.href + router.url);
    if (!value) {
      expect(url.searchParams.has(key)).toBe(false);
    } else {
      expect(url.searchParams.get(key)).toBe(value);
    }
  };

  beforeEach(() => {
    vi.useFakeTimers();
    moment.tz.setDefault('Europe/Oslo');

    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: undefined }],
    });
    router = TestBed.inject(Router);
    service = TestBed.inject(QueryParamsService);
  });

  afterEach(() => {
    vi.useRealTimers();
    moment.tz.setDefault();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply geo hazard', async () => {
    await service.apply({ criteria: { SelectedGeoHazards: [GeoHazard.Snow] } });
    expectQueryParameterToHaveBeenApplied('hazard', '10');
  });

  it('should apply multiple geo hazards', async () => {
    await service.apply({ criteria: { SelectedGeoHazards: [GeoHazard.Soil, GeoHazard.Water] } });
    expectQueryParameterToHaveBeenApplied('hazard', '20~60');
  });

  it('should apply dates', async () => {
    vi.setSystemTime(moment.tz('2000-12-24 08:00:00', 'Europe/Oslo').toDate());

    await service.apply({
      criteria: { FromDtObsTime: '2000-12-24T00:00:00.000+01:00' },
    });
    expectQueryParameterToHaveBeenApplied('fromDate', '2000-12-24');
    expectQueryParameterToHaveBeenApplied(URL_PARAM_TODATE, null);
    expectQueryParameterToHaveBeenApplied(URL_PARAM_DAYSBACK, null);

    await service.apply({
      criteria: {
        FromDtObsTime: '2000-12-24T00:00:00.000+01:00',
        ToDtObsTime: '2000-12-24T23:59:59.999+01:00',
      },
    });
    expectQueryParameterToHaveBeenApplied('fromDate', '2000-12-24');
    expectQueryParameterToHaveBeenApplied('toDate', '2000-12-24');
    expectQueryParameterToHaveBeenApplied(URL_PARAM_DAYSBACK, null);
  });

  it('should apply daysBack if specified and not dates', async () => {
    await service.apply({
      criteria: { FromDtObsTime: '2000-12-23T00:00:00.000+01:00' },
      daysBack: 1,
    });
    expectQueryParameterToHaveBeenApplied('daysBack', '1');

    // Check that fromDate and toDate are not in url while daysBack are there
    expectQueryParameterToHaveBeenApplied(URL_PARAM_FROMDATE, null);
    expectQueryParameterToHaveBeenApplied(URL_PARAM_TODATE, null);
  });

  it('should apply competence', async () => {
    await service.apply({
      criteria: { ObserverCompetence: [150, 105] },
    });
    expectQueryParameterToHaveBeenApplied('competence', '150~105');
  });

  it('should apply observation type', async () => {
    await service.apply({
      criteria: { SelectedRegistrationTypes: [{ Id: 81, SubTypes: [13] }] },
    });
    expectQueryParameterToHaveBeenApplied('type', '81.13');
  });

  it('should apply multiple observation types', async () => {
    await service.apply({
      criteria: { SelectedRegistrationTypes: [{ Id: 81, SubTypes: [13, 26] }] },
    });
    expectQueryParameterToHaveBeenApplied('type', '81.13~81.26');
  });

  it('should not apply empty arrays', async () => {
    await service.apply({
      criteria: { SelectedRegistrationTypes: [] },
    });
    expectQueryParameterToHaveBeenApplied('type', null);
  });

  it('should not apply undefined values', async () => {
    await service.apply({
      criteria: { SelectedRegistrationTypes: undefined },
    });
    expectQueryParameterToHaveBeenApplied('type', null);
  });

  [
    { apiValue: 'DtChangeTime', urlValue: 'changeTime' },
    { apiValue: 'DtObsTime', urlValue: 'obsTime' },
  ].forEach((test) => {
    it(`should apply orderBy ${test.apiValue} correctly`, async () => {
      await service.apply({
        criteria: { OrderBy: test.apiValue },
      });
      expectQueryParameterToHaveBeenApplied('orderBy', test.urlValue);
    });
  });

  it('should apply map extent', async () => {
    await service.apply({
      criteria: {
        Extent: {
          BottomRight: Object({ Latitude: 67.5715, Longitude: 33.1458 }),
          TopLeft: Object({ Latitude: 70.7978, Longitude: 21.4343 }),
        },
      },
    });
    expectQueryParameterToHaveBeenApplied('nwLat', '70.7978');
    expectQueryParameterToHaveBeenApplied('nwLon', '21.4343');
    expectQueryParameterToHaveBeenApplied('seLat', '67.5715');
    expectQueryParameterToHaveBeenApplied('seLon', '33.1458');
  });

  it('should add and remove slush flow', async () => {
    expectQueryParameterToHaveBeenApplied('slushFlow', null);
    await service.apply({
      criteria: {
        PropertyFilters: [{ Name: 'AvalancheObs.AvalancheTID', Value: '30', Operator: 0 }],
      },
    });
    expectQueryParameterToHaveBeenApplied('slushFlow', 'true');
    await service.apply({
      criteria: {},
    });
    expectQueryParameterToHaveBeenApplied('slushFlow', null);
  });
});
