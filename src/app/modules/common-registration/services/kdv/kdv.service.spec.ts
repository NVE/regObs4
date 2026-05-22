import { TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NEVER, Observable, of } from 'rxjs';
import { KdvService } from './kdv.service';
import { KdvElementsService } from 'src/app/modules/common-regobs-api/services';
import { DatabaseService } from 'src/app/core/services/database/database.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { OfflineSyncMeta } from '../../models/offline-sync-meta.interface';
import { KdvElementsResponseDto } from 'src/app/modules/common-regobs-api/models';
import version from 'src/environments/version.json';

describe('KdvService.update()', () => {
  let service: KdvService;
  let kdvElementsSpy: jasmine.SpyObj<KdvElementsService>;
  let databaseSpy: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    kdvElementsSpy = jasmine.createSpyObj<KdvElementsService>('KdvElementsService', ['KdvElementsGetKdvs']);
    databaseSpy = jasmine.createSpyObj<DatabaseService>('DatabaseService', ['get', 'set']);

    databaseSpy.set.and.returnValue(Promise.resolve());
    databaseSpy.get.and.returnValue(Promise.resolve(null));

    TestBed.configureTestingModule({
      providers: [
        KdvService,
        provideHttpClient(),
        provideTestLogger(),
        { provide: KdvElementsService, useValue: kdvElementsSpy },
        { provide: DatabaseService, useValue: databaseSpy },
        {
          provide: UserSettingService,
          useValue: { language$: of(LangKey.nb), appMode$: of(AppMode.Prod) },
        },
      ],
    });

    service = TestBed.inject(KdvService);
  });

  it('setter isUpdating$ tilbake til false når API-kallet lykkes', fakeAsync(() => {
    kdvElementsSpy.KdvElementsGetKdvs.and.returnValue(of({ KdvRepositories: {}, ViewRepositories: {} }));

    const values: boolean[] = [];
    service.isUpdating$.subscribe((v) => values.push(v));

    let result: boolean | undefined;
    service.update().subscribe((v) => (result = v));
    flushMicrotasks();

    expect(result).toBeTrue();
    expect(values).toEqual([false, true, false]);
  }));

  it('setter isUpdating$ tilbake til false når API-kallet feiler', fakeAsync(() => {
    kdvElementsSpy.KdvElementsGetKdvs.and.returnValue(
      new Observable((subscriber) => subscriber.error(new Error('Network error')))
    );

    const values: boolean[] = [];
    service.isUpdating$.subscribe((v) => values.push(v));

    let result: boolean | undefined;
    service.update().subscribe((v) => (result = v));
    flushMicrotasks();

    expect(result).toBeFalse();
    expect(values).toEqual([false, true, false]);
  }));
});

describe('KdvService cache invalidation on app version change', () => {
  let service: KdvService;
  let kdvElementsSpy: jasmine.SpyObj<KdvElementsService>;
  let databaseSpy: jasmine.SpyObj<DatabaseService>;
  let httpTesting: HttpTestingController;

  const freshApiData: KdvElementsResponseDto = {
    KdvRepositories: { Snow_AvalancheKDV: [{ Id: 1, Name: 'Fresh from API', Description: '' }] },
    ViewRepositories: {},
  };

  const oldCachedData: OfflineSyncMeta<KdvElementsResponseDto> = {
    id: `${LangKey.nb}`,
    lastUpdated: Math.floor(Date.now() / 1000) - 60, // 1 minute ago (still within cache age)
    appVersion: '4.0.0', // different from current version
    data: {
      KdvRepositories: { Snow_AvalancheKDV: [{ Id: 1, Name: 'Old cached', Description: '' }] },
      ViewRepositories: {},
    },
  };

  const fallbackAssetData: KdvElementsResponseDto = {
    KdvRepositories: { Snow_AvalancheKDV: [{ Id: 1, Name: 'From assets', Description: '' }] },
    ViewRepositories: {},
  };

  beforeEach(() => {
    kdvElementsSpy = jasmine.createSpyObj<KdvElementsService>('KdvElementsService', ['KdvElementsGetKdvs']);
    databaseSpy = jasmine.createSpyObj<DatabaseService>('DatabaseService', ['get', 'set']);
    databaseSpy.set.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        KdvService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTestLogger(),
        { provide: KdvElementsService, useValue: kdvElementsSpy },
        { provide: DatabaseService, useValue: databaseSpy },
        {
          provide: UserSettingService,
          useValue: { language$: of(LangKey.nb), appMode$: of(AppMode.Prod) },
        },
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('henter data fra API når cachet data har gammel appVersion', fakeAsync(() => {
    databaseSpy.get.and.returnValue(Promise.resolve(oldCachedData));
    kdvElementsSpy.KdvElementsGetKdvs.and.returnValue(of(freshApiData));

    service = TestBed.inject(KdvService);

    let result: KdvElementsResponseDto | undefined;
    service.data$.subscribe((v) => (result = v));
    flushMicrotasks();

    expect(kdvElementsSpy.KdvElementsGetKdvs).toHaveBeenCalled();
    expect(result).toEqual(freshApiData);
  }));

  it('bruker fallback assets når cachet data har gammel appVersion og API feiler', fakeAsync(() => {
    databaseSpy.get.and.returnValue(Promise.resolve(oldCachedData));
    kdvElementsSpy.KdvElementsGetKdvs.and.returnValue(NEVER); // API will timeout

    service = TestBed.inject(KdvService);

    let result: KdvElementsResponseDto | undefined;
    service.data$.subscribe((v) => (result = v));
    flushMicrotasks();
    tick(2001); // trigger timeout

    // After timeout, falls back to offline → offline is invalid → falls back to assets
    const req = httpTesting.expectOne('/assets/json/kdvelements.nb.json');
    req.flush(fallbackAssetData);
    flushMicrotasks();

    expect(result).toEqual(fallbackAssetData);
  }));

  it('returnerer cachet data direkte når appVersion matcher', fakeAsync(() => {
    const validCachedData: OfflineSyncMeta<KdvElementsResponseDto> = {
      ...oldCachedData,
      appVersion: version.version, // current version
    };
    databaseSpy.get.and.returnValue(Promise.resolve(validCachedData));

    service = TestBed.inject(KdvService);

    let result: KdvElementsResponseDto | undefined;
    service.data$.subscribe((v) => (result = v));
    flushMicrotasks();

    expect(kdvElementsSpy.KdvElementsGetKdvs).not.toHaveBeenCalled();
    expect(result).toEqual(validCachedData.data);
  }));

  it('henter fra API når cachet data mangler appVersion (eldre cache-format)', fakeAsync(() => {
    const legacyCachedData: OfflineSyncMeta<KdvElementsResponseDto> = {
      id: `${LangKey.nb}`,
      lastUpdated: Math.floor(Date.now() / 1000) - 60,
      // no appVersion field
      data: oldCachedData.data,
    };
    databaseSpy.get.and.returnValue(Promise.resolve(legacyCachedData));
    kdvElementsSpy.KdvElementsGetKdvs.and.returnValue(of(freshApiData));

    service = TestBed.inject(KdvService);

    let result: KdvElementsResponseDto | undefined;
    service.data$.subscribe((v) => (result = v));
    flushMicrotasks();

    expect(kdvElementsSpy.KdvElementsGetKdvs).toHaveBeenCalled();
    expect(result).toEqual(freshApiData);
  }));
});
