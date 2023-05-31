import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import {
  AttachmentUploadEditModel,
  RegistrationTid,
  SyncStatus,
} from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { firstValueFrom, Observable, of, ReplaySubject } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationDraft } from './draft-model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

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
    return [...this.store.keys()];
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }
}

describe('DraftRepositoryService', () => {
  let service: DraftRepositoryService;
  let database: TestDatabaseService;
  let newAttachmentService: jasmine.SpyObj<NewAttachmentService>;
  let userSettingService: UserSettingService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    database = new TestDatabaseService();
    newAttachmentService = jasmine.createSpyObj('NewAttachmentService', ['removeAttachments', 'getAttachments']);
    userSettingService = new UserSettingService(null, null);
    service = new DraftRepositoryService(
      new TestLoggingService(),
      newAttachmentService,
      database as unknown as DatabaseService,
      userSettingService
    );

    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Test,
    });
  });

  it('create() should return an empty draft', async () => {
    const draft = await service.create(GeoHazard.Ice);
    expect(draft.uuid.length).toBeGreaterThan(0);
    expect(draft.syncStatus).toBe(SyncStatus.Draft);
    expect(draft.simpleMode).toBe(false);
    expect(draft.registration.GeoHazardTID).toBe(GeoHazard.Ice);
    expect(draft.lastSavedTime).toBe(undefined); //not saved yet
    expect(draft.registration.DtObsTime).toBe(null);
    expect(draft.registration.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    expect(draft.registration.Attachments).toEqual([]);
  });

  it('create() should choose simple mode for snow registrations if simple mode setting is set', async () => {
    const snowDraft = await service.create(GeoHazard.Snow);
    expect(snowDraft.simpleMode).toBeTrue();

    //verify that drafts for other geo hazards don't have simple mode
    const iceDraft = await service.create(GeoHazard.Ice);
    expect(iceDraft.simpleMode).toBeFalse();
    const soilDraft = await service.create(GeoHazard.Soil);
    expect(soilDraft.simpleMode).toBeFalse();
    const waterDraft = await service.create(GeoHazard.Water);
    expect(waterDraft.simpleMode).toBeFalse();

    //deselect simple mode setting => snow drafts should now be created with complete mode, not simple
    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Test,
      preferCompleteSnowObservations: true,
    });
    const completeSnowDraft = await service.create(GeoHazard.Snow);
    expect(completeSnowDraft.simpleMode).toBeFalse();
  });

  it('load() should be backward compatible with database model before simpleMode was added', async () => {
    const uuid = 'DRAFT_WITHOUT_SIMPLE_MODE';
    const oldDraftRecord = {
      UUID: uuid,
      syncStatus: SyncStatus.Draft,
      lastSavedTime: new Date().getMilliseconds(),
      registration: {
        GeoHazardTID: GeoHazard.Snow,
        DtObsTime: null,
        ObsLocation: { Latitude: 0, Longitude: 0 },
        Attachments: [],
      },
    };
    database.set(`drafts.TEST.${uuid}`, oldDraftRecord);

    const loadedDraft = await service.load(uuid);
    expect(loadedDraft.simpleMode).toBeUndefined();
  });

  it('save() should store a draft', async () => {
    const draft = await service.create(GeoHazard.Snow);
    draft.registration.DtObsTime = '2022-02-13 08:00';
    draft.registration.SnowSurfaceObservation = {
      Comment: 'comment',
      SnowDepth: 3.5,
    };
    await service.save(draft);

    const savedDraft = await database.get(`drafts.TEST.${draft.uuid}`);
    expect(savedDraft.uuid).toEqual(draft.uuid);
    expect(savedDraft.syncStatus).toBe(SyncStatus.Draft);
    expect(savedDraft.simpleMode).toBeTrue();
    expect(savedDraft.registration.GeoHazardTID).toBe(GeoHazard.Snow);
    expect(savedDraft.registration.DtObsTime).toBe('2022-02-13 08:00');
    expect(savedDraft.registration.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    expect(savedDraft.registration.Attachments).toEqual([]);
    expect(savedDraft.registration.SnowSurfaceObservation).toEqual({
      Comment: 'comment',
      SnowDepth: 3.5,
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
      lastSavedTime: jasmine.any(Number),
    });
    expect(await service.load(irrelevantDraft2.uuid)).toEqual({
      ...irrelevantDraft2,
      lastSavedTime: jasmine.any(Number),
    });
  });

  it('we get notified when registrations are saved', fakeAsync(async () => {
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

    // Let draftService handle the update
    tick(1);

    //check notfication
    const updatedDrafts2 = await firstValueFrom(service.drafts$);
    expect(updatedDrafts2.length).toBe(1);
    const updatedDraft2 = updatedDrafts2[0];
    expect(updatedDraft2.uuid).toEqual(draft.uuid);
    expect(updatedDraft2.registration.GeneralObservation).toEqual({ Comment: 'v.2' });
  }));

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

    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Demo,
    });

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

    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Test,
    });

    tick(1);

    const draftChanges2 = await firstValueFrom(service.drafts$);
    expect(draftChanges2.length).toBe(2); //we have 2 drafts in test
    expect(await service.load(draft1inTest.uuid)).toEqual({
      ...draft1inTest,
      lastSavedTime: jasmine.any(Number),
    });
    expect(await service.load(draft2inTest.uuid)).toEqual({
      ...draft2inTest,
      lastSavedTime: jasmine.any(Number),
    });

    //drafts in demo database not available when in environment test
    expect(await service.load(draft1inDemo.uuid)).toBe(undefined);
  }));

  it('drafts$ returns a draft only when it is available, and completes if it is deleted', fakeAsync(async () => {
    let draft: RegistrationDraft = {
      ...(await service.create(GeoHazard.Ice)),
      uuid: 'test',
    };

    let i = 0;
    let completed = false;
    const sub = service.getDraft$('test').subscribe({
      next: (d) => {
        expect(d).toEqual({ ...draft, lastSavedTime: jasmine.any(Number) });
        i += 1;
      },
      complete: () => {
        completed = true;
      },
    });

    tick(1);

    await service.save(draft);

    tick(1);

    // Update draft
    draft = { ...draft, regId: 123 };
    await service.save(draft);

    tick(1);

    // The observable should have emitted two times, two versions of the draft
    expect(i).toBe(2);

    draft = null;
    await service.delete('test');

    flush();

    // The observable should still only have emitted two times, two versions of the draft
    expect(i).toBe(2);

    // It should also have completed the observable when the draft was deleted
    expect(completed).toBeTrue();

    // As we deleted the draft, the subscription should be closed
    expect(sub.closed).toBe(true);
  }));

  it('saveAsDraft works', async () => {
    const viewModel: RegistrationViewModel = {
      RegId: 42,
      ExternalReferenceId: 'externalReferenceId',
      DtObsTime: 'obsTime',
      GeoHazardTID: GeoHazard.Ice,
      GeneralObservation: {
        Comment: 'comment',
        GeoHazardTID: GeoHazard.Ice,
      },
    };
    await service.saveAsDraft(viewModel);

    //the copy should be saved in the database
    expect(database.store.size).toBe(1);
    expect(database.store.has('drafts.TEST.externalReferenceId')).toBeTrue();

    //check that the draft contains a copy of the viewModel
    const draft = await service.load('externalReferenceId');
    expect(draft.regId).toEqual(42);
    expect(draft.registration.GeneralObservation).toEqual({
      Comment: 'comment',
      GeoHazardTID: GeoHazard.Ice,
    });
  });

  it('copyDraftAndSave works', async () => {
    const draft: RegistrationDraft = {
      uuid: 'original-uuid',
      regId: 123456,
      simpleMode: false,
      syncStatus: SyncStatus.Draft,
      registration: {
        DtObsTime: 'obsTime',
        GeoHazardTID: GeoHazard.Ice,
        GeneralObservation: {
          Comment: 'comment',
          GeoHazardTID: GeoHazard.Ice,
        },
      },
    };

    const newUuid = await service.copyDraftAndSave(draft);

    //the copy should be saved in the database
    expect(database.store.size).toBe(1);
    expect(database.store.has(`drafts.TEST.${newUuid}`)).toBeTrue();

    const newDraft = await service.load(newUuid);

    expect(newDraft.regId).toBeNull(); //this is a new observation, so the regId should be null

    //check that the draft contains a copy of the viewModel
    expect(newDraft.registration.GeneralObservation).toEqual({
      Comment: 'comment',
      GeoHazardTID: GeoHazard.Ice,
    });

    // Check that this is a new object
    newDraft.registration.GeneralObservation.Comment = 'Test';
    expect(draft.registration.GeneralObservation.Comment).toBe('comment');
  });

  it('hasAttachments() should work', async () => {
    const attachments: AttachmentUploadEditModel[] = [
      {
        id: '1',
        type: 'Attachment',
        AttachmentId: 1,
        RegistrationTID: RegistrationTid.SnowSurfaceObservation,
      },
    ];

    const draft = await service.create(GeoHazard.Snow);
    draft.registration.DtObsTime = '2022-02-13 08:00';
    draft.registration.SnowSurfaceObservation = {
      Comment: 'comment',
      SnowDepth: 3.5,
    };

    // no new attachments yet
    newAttachmentService.getAttachments.and.returnValue(of([]));
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBeFalse();

    // fake that we have a new attachment
    newAttachmentService.getAttachments.and.returnValue(of(attachments));
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBeTrue();

    // remove the new attachment
    newAttachmentService.getAttachments.and.returnValue(of([]));
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBeFalse();

    // fake that we have a remote attachment
    draft.registration.Attachments = [{ RegistrationTID: RegistrationTid.SnowSurfaceObservation }];
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBeTrue();
  });
});
