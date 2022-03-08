import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { AppModeService } from 'src/app/modules/common-core/services';
import { firstValueFrom, Observable, ReplaySubject } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';

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
      this.store.set(key, JSON.stringify(value));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(key: string): Promise<any> {
      const value = this.store.get(key);
      if (value) return JSON.parse(value);
      return undefined;
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
  let newAttachmentService: NewAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    appModeService = new AppModeService({ appMode: AppMode.Test, language: LangKey.nb });
    database = new TestDatabaseService();
    newAttachmentService = jasmine.createSpyObj('NewAttachmentService', ['removeAttachments']);
    service = new DraftRepositoryService(
      appModeService,
      new TestLoggingService(),
      newAttachmentService,
      database as unknown as DatabaseService
    );
  });

  it('create() should return an empty draft', async () => {
    const draft = await service.create(GeoHazard.Ice);
    expect(draft.uuid.length).toBeGreaterThan(0);
    expect(draft.syncStatus).toBe(SyncStatus.Draft);
    expect(draft.registration.GeoHazardTID).toBe(GeoHazard.Ice);
    expect(draft.lastSavedTime).toBe(undefined); //not saved yet
    expect(draft.registration.DtObsTime).toBe(null);
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
    expect(await service.load(irrelevantDraft1.uuid)).toEqual({
      ...irrelevantDraft1,
      lastSavedTime: jasmine.any(Number)
    });
    expect(await service.load(irrelevantDraft2.uuid)).toEqual({
      ...irrelevantDraft2,
      lastSavedTime: jasmine.any(Number)
    });
  });

  it('we get notified when registrations are saved', async () => {
    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };

    await service.save(draft);

    //check if we get notified after first save
    const updatedDrafts = await firstValueFrom(service.drafts$);

    expect(updatedDrafts.length).toBe(1);
    const updatedDraft = updatedDrafts[0];
    expect(updatedDraft.uuid).toEqual(draft.uuid);
    expect(updatedDraft.registration.GeneralObservation).toEqual({ Comment: 'v.1' });

    //try to change the comment and check if we get notified about the changes
    updatedDraft.registration.GeneralObservation = { Comment: 'v.2' };
    await service.save(updatedDraft);

    //check notfication
    const updatedDrafts2 = await firstValueFrom(service.drafts$);
    expect(updatedDrafts2.length).toBe(1);
    const updatedDraft2 = updatedDrafts2[0];
    expect(updatedDraft2.uuid).toEqual(draft.uuid);
    expect(updatedDraft2.registration.GeneralObservation).toEqual({ Comment: 'v.2' });
  });

  it('we can use drafts$ as a stream when registrations are saved', async () => {
    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };

    let i = 0;
    const draftsResult = [];
    const streamFinished = new Promise<void>((resolve) => {
      service.drafts$.subscribe((drafts) => {
        draftsResult.push(drafts);
        i += 1;
        if (i === 3) {
          resolve();
        }
      });
    });

    await service.save(draft);

    //try to change the comment and check if we get notified about the changes
    draft.registration.GeneralObservation = { Comment: 'v.2' };
    await service.save(draft);

    await streamFinished;

    expect(draftsResult[0]).toEqual([]);

    expect(draftsResult[1].length).toBe(1);
    const updatedDraft = draftsResult[1][0];
    expect(updatedDraft.uuid).toEqual(draft.uuid);
    expect(updatedDraft.registration.GeneralObservation).toEqual({ Comment: 'v.1' });

    //check notfication
    expect(draftsResult[2].length).toBe(1);
    const updatedDraft2 = draftsResult[2][0];
    expect(updatedDraft2.uuid).toEqual(draft.uuid);
    expect(updatedDraft2.registration.GeneralObservation).toEqual({ Comment: 'v.2' });
  });

  it('delete works', async () => {
    const draft = await service.create(GeoHazard.Ice);
    await service.save(draft);

    expect(database.store.size).toBe(1);

    await service.delete(draft.uuid);

    const draftChanges = await firstValueFrom(service.drafts$);

    //verify that we have no drafts left
    expect(draftChanges.length).toBe(0);
    expect(!database.store.has(`drafts.TEST.${draft.uuid}`)).toBeTrue();
    expect(await service.load(draft.uuid)).toBeUndefined();
    // Check that draftService requests newAttachmentService to delete draft images
    expect(newAttachmentService.removeAttachments).toHaveBeenCalledWith(draft.uuid);
  });

  it('we do not mix data from different environments', fakeAsync(async () => {
    //save 2 drafts in test environment
    const draft1inTest = await service.create(GeoHazard.Ice);
    await service.save(draft1inTest);

    const draft2inTest = await service.create(GeoHazard.Ice);
    await service.save(draft2inTest);

    appModeService.setAppMode(AppMode.Demo); //switch to demo environment

    const draftChanges = await firstValueFrom(service.drafts$);
    expect(draftChanges.length).toBe(0); //no drafts in demo yet

    //save a draft in demo environment
    const draft1inDemo = await service.create(GeoHazard.Ice);
    await service.save(draft1inDemo);

    //drafts in test database not available in demo environment
    expect(await service.load(draft1inTest.uuid)).toBe(undefined);

    //but all drafts exists in database regardsless of environment
    expect(database.store.has(`drafts.TEST.${draft1inTest.uuid}`)).toBeTrue();
    expect(database.store.has(`drafts.TEST.${draft2inTest.uuid}`)).toBeTrue();
    expect(database.store.has(`drafts.DEMO.${draft1inDemo.uuid}`)).toBeTrue();

    appModeService.setAppMode(AppMode.Test); //change back to test environment

    tick(1);

    const draftChanges2 = await firstValueFrom(service.drafts$);
    expect(draftChanges2.length).toBe(2); //we have 2 drafts in test
    expect(await service.load(draft1inTest.uuid)).toEqual({
      ...draft1inTest,
      lastSavedTime: jasmine.any(Number)
    });
    expect(await service.load(draft2inTest.uuid)).toEqual({
      ...draft2inTest,
      lastSavedTime: jasmine.any(Number)
    });

    //drafts in demo database not available when in environment test
    expect(await service.load(draft1inDemo.uuid)).toBe(undefined);
  }));
});
