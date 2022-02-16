import { TestBed } from '@angular/core/testing';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { AppModeService } from 'src/app/modules/common-core/services';
import { firstValueFrom, Observable, ReplaySubject, skip } from 'rxjs';
import { DatabaseService } from '../database/database.service';

//key-value-store used to mock the database
class TestDatabaseService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: Map<string, any> = new Map();

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

    async keys(): Promise<string[]> {
      return [ ...this.store.keys() ];
    }

    async remove(key: string): Promise<void> {
      this.store.delete(key);
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
    service = new DraftRepositoryService(appModeService, new TestLoggingService(), database as unknown as DatabaseService);
  });

  it('create() should return an empty draft', async () => {
    const draft = await service.create(GeoHazard.Ice);
    expect(draft.uuid.length).toBeGreaterThan(0);
    expect(draft.syncStatus).toBe(SyncStatus.Draft);
    expect(draft.registration.GeoHazardTID).toBe(GeoHazard.Ice);
    expect(draft.lastSavedTime).toBe(undefined); //not saved yet
    expect(draft.registration.DtObsTime).toBe(undefined);
    expect(draft.registration.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    expect(draft.registration.Attachments).toEqual([]);
  });

  it('save() should store a draft', async () => {
    const draft = await service.create(GeoHazard.Snow);
    draft.registration.DtObsTime = '2022-02-13 08:00';
    draft.registration.SnowSurfaceObservation = {
      Comment: 'comment',
      SnowDepth: 3.5
    };
    await service.save(draft);

    const savedDraft = await database.get(`drafts.TEST.${draft.uuid}`);
    expect(savedDraft.uuid).toEqual(draft.uuid);
    expect(savedDraft.syncStatus).toBe(SyncStatus.Draft);
    expect(savedDraft.registration.GeoHazardTID).toBe(GeoHazard.Snow);
    expect(savedDraft.registration.DtObsTime).toBe('2022-02-13 08:00');
    expect(savedDraft.registration.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    expect(savedDraft.registration.Attachments).toEqual([]);
    expect(savedDraft.registration.SnowSurfaceObservation).toEqual( {
      Comment: 'comment',
      SnowDepth: 3.5
    });
    expect(savedDraft.lastSavedTime).toBeLessThanOrEqual(Date.now());
  });

  it('newly saved drafts should be unique', async () => {
    const draft = await service.create(GeoHazard.Snow);
    await service.save(draft);
    const draft2 = await service.create(GeoHazard.Snow);
    await service.save(draft2);
    expect(database.store.size).toEqual(2);
    expect(database.store.has(`drafts.TEST.${draft.uuid}`)).toBeTrue();
    expect(database.store.has(`drafts.TEST.${draft2.uuid}`)).toBeTrue();
  });

  it('we can change a registration, save it and load the changed registration', async () => {
    const irrelevantDraft1 = await service.create(GeoHazard.Snow);
    await service.save(irrelevantDraft1);

    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };
    await service.save(draft);

    const irrelevantDraft2 = await service.create(GeoHazard.Soil);
    await service.save(irrelevantDraft2);

    //verify that the comment was saved and we can load it
    const savedDraft = await service.load(draft.uuid);
    expect(savedDraft.registration.GeneralObservation).toEqual({ Comment: 'v.1' });

    //irreleant registrations are not changed
    expect(await service.load(irrelevantDraft1.uuid)).toEqual(irrelevantDraft1);
    expect(await service.load(irrelevantDraft2.uuid)).toEqual(irrelevantDraft2);
  });

  it('we get notified when registrations are saved', async () => {
    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };
    const draftChanges = firstValueFrom(service.drafts$.pipe(skip(1)));
    await service.save(draft);

    //check if we get notified after first save
    const updatedDrafts = await draftChanges;
    expect(updatedDrafts.length).toBe(1);
    const updatedDraft = updatedDrafts[0];
    expect(updatedDraft.uuid).toEqual(draft.uuid);
    expect(updatedDraft.registration.GeneralObservation).toEqual({ Comment: 'v.1' });

    //try to change the comment and check if we get notified about the changes
    updatedDraft.registration.GeneralObservation = { Comment: 'v.2' };
    await service.save(updatedDraft);

    //check notfication
    const updatedDrafts2 = await draftChanges;
    expect(updatedDrafts2.length).toBe(1);
    const updatedDraft2 = updatedDrafts2[0];
    expect(updatedDraft2.uuid).toEqual(draft.uuid);
    expect(updatedDraft2.registration.GeneralObservation).toEqual({ Comment: 'v.2' });
  });

  it('delete works', async () => {
    const draft = await service.create(GeoHazard.Ice);

    //we need to skip initial tick and the tick after save to capture the tick after delete
    const draftChanges = firstValueFrom(service.drafts$.pipe(skip(2)));
    await service.save(draft);

    expect(database.store.size).toBe(1);

    await service.delete(draft.uuid);

    //verify that we have no drafts left
    expect((await draftChanges).length).toBe(0);
    expect(!database.store.has(`drafts.TEST.${draft.uuid}`));
    expect(await service.load(draft.uuid)).toBeUndefined();
  });
});
