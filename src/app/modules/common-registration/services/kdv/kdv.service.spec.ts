import { TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { NEVER, of } from 'rxjs';
import { KdvService } from './kdv.service';
import { KdvElementsService } from 'src/app/modules/common-regobs-api/services';
import { DatabaseService } from 'src/app/core/services/database/database.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';

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

    service.update();
    flushMicrotasks(); // løser Promise fra saveDataToOfflineDb

    expect(values).toEqual([false, true, false]);
  }));

  it('setter isUpdating$ tilbake til false når API-kallet timer ut', fakeAsync(() => {
    // NEVER simulerer et API-kall som aldri svarer → utløser timeout etter 2000ms
    kdvElementsSpy.KdvElementsGetKdvs.and.returnValue(NEVER);

    const values: boolean[] = [];
    service.isUpdating$.subscribe((v) => values.push(v));

    service.update();
    tick(2001); // forbi FETCH_NEW_DATA_TIMEOUT (2000ms)

    // Feilen skal fanges internt – ingenting bobler ut av update()
    // isUpdating$ skal resettes til false etter timeout
    expect(values).toEqual([false, true, false]);
  }));
});
