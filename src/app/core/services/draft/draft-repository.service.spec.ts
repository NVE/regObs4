import { TestBed } from '@angular/core/testing';
import moment from 'moment';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { RegistrationDraft } from './draft-model';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { AppModeService } from 'src/app/modules/common-core/services';
import { Observable, ReplaySubject } from 'rxjs';
import { DatabaseService } from '../database/database.service';

//key-value-store used to mock the database
class TestDatabaseService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private store: Map<string, any> = new Map();

    private ready = new ReplaySubject<void>();
    readonly ready$: Observable<void> = this.ready.asObservable();

    constructor() {
        this.ready.next();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async set(key: string, value: any): Promise<void> {
        this.store.set(key, value);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(key: string): Promise<any> {
        return this.store.get(key);
    }
}

describe('DraftRepositoryService', () => {

  let service: DraftRepositoryService;
  let database: TestDatabaseService;
  let appModeService: AppModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    appModeService = new AppModeService({ appMode: AppMode.Test, language: LangKey.nb });
    database = new TestDatabaseService();
    service = new DraftRepositoryService(appModeService, new TestLoggingService(), database as unknown as DatabaseService );
  });

  it('create() should return an empty draft', async () => {
    const registration = await service.create(GeoHazard.Ice);
    expect(registration.uuid.length).toBeGreaterThan(0);
    expect(registration.syncStatus).toBe(SyncStatus.Draft);
    expect(registration.draft.GeoHazardTID).toBe(GeoHazard.Ice);
    expect(registration.draft.DtChangeTime).toBeGreaterThanOrEqual(moment().unix());
    expect(registration.draft.DtObsTime).toBe(undefined);
    expect(registration.draft.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    expect(registration.draft.Attachments).toEqual([]);
  });

  it('save() should store a draft', async () => {
    const registration = await service.create(GeoHazard.Snow);
    registration.draft.DtObsTime = '2022-02-13 08:00';
    registration.draft.SnowSurfaceObservation = { 
        Comment: 'comment',
        SnowDepth: 3.5
    }
    await service.save(registration);

    const savedRegistrations: RegistrationDraft[] = await database.get('drafts.TEST');
    const savedRegistration = savedRegistrations[0];
    expect(savedRegistration.uuid).toEqual(registration.uuid);
    expect(savedRegistration.syncStatus).toBe(SyncStatus.Draft);
    expect(savedRegistration.draft.GeoHazardTID).toBe(GeoHazard.Snow);
    expect(savedRegistration.draft.DtChangeTime).toBeGreaterThanOrEqual(moment().unix());
    expect(savedRegistration.draft.DtObsTime).toBe('2022-02-13 08:00');
    expect(savedRegistration.draft.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    expect(savedRegistration.draft.Attachments).toEqual([]);
    expect(savedRegistration.draft.SnowSurfaceObservation).toEqual( {
        Comment: 'comment',
        SnowDepth: 3.5
    });
  });

  it('newly saved drafts should be unique', async () => {
    const registration = await service.create(GeoHazard.Snow);
    await service.save(registration);
    const registration2 = await service.create(GeoHazard.Snow);
    await service.save(registration2);

    const savedRegistrations: RegistrationDraft[] = await database.get('drafts.TEST');
    expect(savedRegistrations.length).toEqual(2);
    expect(savedRegistrations[0].uuid !== savedRegistrations[1].uuid).toBeTrue;
  });
});
