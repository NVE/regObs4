import type { MockedObject } from 'vitest';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import {
  AttachmentUploadEditModel,
  RegistrationTid,
  SyncStatus,
} from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { firstValueFrom, Observable, of, ReplaySubject } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationDraft } from './draft-model';
import { UserSettingService } from '../user-setting/user-setting.service';
import {
  GeneralObservationEditModel,
  RegistrationEditModel,
  RegistrationViewModel,
} from 'src/app/modules/common-regobs-api';
import { provideTranslateService } from '@ngx-translate/core';

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
  let database: TestDatabaseService;
  let newAttachmentService: MockedObject<NewAttachmentService>;
  let userSettingService: UserSettingService;

  beforeEach(() => {
    database = new TestDatabaseService();

    TestBed.configureTestingModule({
      providers: [
        provideTestLogger(),
        provideTranslateService(),
        {
          provide: NewAttachmentService,
          useValue: {
            removeAttachments: vi.fn().mockName('NewAttachmentService.removeAttachments'),
            getAttachments: vi.fn().mockName('NewAttachmentService.getAttachments'),
          },
        },
        {
          provide: DatabaseService,
          useValue: database,
        },
      ],
    });
    newAttachmentService = TestBed.inject(NewAttachmentService) as MockedObject<NewAttachmentService>;
    userSettingService = TestBed.inject(UserSettingService);
    userSettingService.updateUserSettings({ appMode: AppMode.Test });
  });

  it('create() should return an empty draft', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const draft = await service.create(GeoHazard.Ice);
    expect(draft.uuid.length).toBeGreaterThan(0);
    expect(draft.syncStatus).toBe(SyncStatus.Draft);
    expect(draft.simpleMode).toBe(false);
    expect(draft.registration.GeoHazardTID).toBe(GeoHazard.Ice);
    expect(draft.lastSavedTime).toBe(undefined); //not saved yet
    expect((draft.registration as Partial<RegistrationEditModel>).DtObsTime).toBe(undefined);
    expect(draft.registration.ObsLocation).toEqual(undefined);
    expect(draft.registration.Attachments).toEqual(undefined);
  });

  it('create() should choose simple mode for snow registrations if simple mode setting is set', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const snowDraft = await service.create(GeoHazard.Snow);
    expect(snowDraft.simpleMode).toBe(true);

    //verify that drafts for other geo hazards don't have simple mode
    const iceDraft = await service.create(GeoHazard.Ice);
    expect(iceDraft.simpleMode).toBe(false);
    const soilDraft = await service.create(GeoHazard.Soil);
    expect(soilDraft.simpleMode).toBe(false);
    const waterDraft = await service.create(GeoHazard.Water);
    expect(waterDraft.simpleMode).toBe(false);

    //deselect simple mode setting => snow drafts should now be created with complete mode, not simple
    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Test,
      preferCompleteSnowObservations: true,
    });
    const completeSnowDraft = await service.create(GeoHazard.Snow);
    expect(completeSnowDraft.simpleMode).toBe(false);
  });

  it('load() should be backward compatible with database model before simpleMode was added', async () => {
    const service = TestBed.inject(DraftRepositoryService);
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
    const service = TestBed.inject(DraftRepositoryService);
    const draft = await service.create(GeoHazard.Snow);
    const registration: RegistrationEditModel = {
      ...draft.registration,
      DtObsTime: '2022-02-13 08:00',
      SnowSurfaceObservation: {
        Comment: 'comment',
        SnowDepth: 3.5,
      },
    };
    await service.save({ ...draft, registration });

    const savedDraft = await database.get(`drafts.TEST.${draft.uuid}`);
    expect(savedDraft.uuid).toEqual(draft.uuid);
    expect(savedDraft.syncStatus).toBe(SyncStatus.Draft);
    expect(savedDraft.simpleMode).toBe(true);
    expect(savedDraft.registration.GeoHazardTID).toBe(GeoHazard.Snow);
    expect(savedDraft.registration.DtObsTime).toBe('2022-02-13 08:00');
    expect(savedDraft.registration.ObsLocation).toEqual(undefined);
    expect(savedDraft.registration.Attachments).toEqual(undefined);
    expect(savedDraft.registration.SnowSurfaceObservation).toEqual({
      Comment: 'comment',
      SnowDepth: 3.5,
    });
    expect(savedDraft.lastSavedTime).toBeLessThanOrEqual(Date.now());
  });

  it('newly saved drafts should be unique', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const draft = await service.create(GeoHazard.Snow);
    await service.save(draft as RegistrationDraft);
    const draft2 = await service.create(GeoHazard.Snow);
    await service.save(draft2 as RegistrationDraft);
    expect(database.store.size).toEqual(2);
    expect(database.store.has(`drafts.TEST.${draft.uuid}`)).toBe(true);
    expect(database.store.has(`drafts.TEST.${draft2.uuid}`)).toBe(true);
  });

  it('we can change a registration, save it and load the changed registration', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const irrelevantDraft1 = await service.create(GeoHazard.Snow);
    await service.save(irrelevantDraft1 as RegistrationDraft);

    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };
    await service.save(draft as RegistrationDraft);

    const irrelevantDraft2 = await service.create(GeoHazard.Soil);
    await service.save(irrelevantDraft2 as RegistrationDraft);

    //verify that the comment was saved and we can load it
    const savedDraft = await service.load(draft.uuid);
    expect(savedDraft.registration.GeneralObservation).toEqual({ Comment: 'v.1' });

    //irreleant registrations are not changed
    expect(await service.load(irrelevantDraft1.uuid)).toEqual({
      ...(irrelevantDraft1 as RegistrationDraft),
      lastSavedTime: expect.any(Number),
    });
    expect(await service.load(irrelevantDraft2.uuid)).toEqual({
      ...(irrelevantDraft2 as RegistrationDraft),
      lastSavedTime: expect.any(Number),
    });
  });

  it('we get notified when registrations are saved', fakeAsync(async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };

    await service.save(draft as RegistrationDraft);
    tick();

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
    tick();

    //check notfication
    const updatedDrafts2 = await firstValueFrom(service.drafts$);
    expect(updatedDrafts2.length).toBe(1);
    const updatedDraft2 = updatedDrafts2[0];
    expect(updatedDraft2.uuid).toEqual(draft.uuid);
    expect(updatedDraft2.registration.GeneralObservation).toEqual({ Comment: 'v.2' });
  }));

  it('we can use drafts$ as a stream when registrations are saved', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const draft = await service.create(GeoHazard.Ice);
    draft.registration.GeneralObservation = { Comment: 'v.1' };

    let i = 0;
    const draftsResult: RegistrationDraft[][] = [];
    const streamFinished = new Promise<void>((resolve) => {
      service.drafts$.subscribe((drafts) => {
        draftsResult.push(drafts);
        i += 1;
        if (i === 3) {
          resolve();
        }
      });
    });

    await service.save(draft as RegistrationDraft);

    //try to change the comment and check if we get notified about the changes
    draft.registration.GeneralObservation = { Comment: 'v.2' };
    await service.save(draft as RegistrationDraft);

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

  it('delete works', fakeAsync(async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const draft = await service.create(GeoHazard.Ice);
    await service.save(draft as RegistrationDraft);

    expect(database.store.size).toBe(1);

    await service.delete(draft.uuid);
    tick();

    const draftChanges = await firstValueFrom(service.drafts$);

    //verify that we have no drafts left
    expect(draftChanges.length).toBe(0);
    expect(!database.store.has(`drafts.TEST.${draft.uuid}`)).toBe(true);
    expect(await service.load(draft.uuid)).toBeUndefined();
    // Check that draftService requests newAttachmentService to delete draft images
    expect(newAttachmentService.removeAttachments).toHaveBeenCalledWith(draft.uuid);
  }));

  it('we do not mix data from different environments', fakeAsync(async () => {
    const service = TestBed.inject(DraftRepositoryService);
    //save 2 drafts in test environment
    const draft1inTest = await service.create(GeoHazard.Ice);
    await service.save(draft1inTest as RegistrationDraft);

    const draft2inTest = await service.create(GeoHazard.Ice);
    await service.save(draft2inTest as RegistrationDraft);

    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Demo,
    });
    tick();

    const draftChanges = await firstValueFrom(service.drafts$);
    expect(draftChanges.length).toBe(0); //no drafts in demo yet

    //save a draft in demo environment
    const draft1inDemo = await service.create(GeoHazard.Ice);
    await service.save(draft1inDemo as RegistrationDraft);

    //drafts in test database not available in demo environment
    expect(await service.load(draft1inTest.uuid)).toBe(undefined);

    //but all drafts exists in database regardsless of environment
    expect(database.store.has(`drafts.TEST.${draft1inTest.uuid}`)).toBe(true);
    expect(database.store.has(`drafts.TEST.${draft2inTest.uuid}`)).toBe(true);
    expect(database.store.has(`drafts.DEMO.${draft1inDemo.uuid}`)).toBe(true);

    userSettingService.saveUserSettings({
      ...(await firstValueFrom(userSettingService.userSetting$)),
      appMode: AppMode.Test,
    });

    tick();

    const draftChanges2 = await firstValueFrom(service.drafts$);
    expect(draftChanges2.length).toBe(2); //we have 2 drafts in test
    expect(await service.load(draft1inTest.uuid)).toEqual({
      ...(draft1inTest as RegistrationDraft),
      lastSavedTime: expect.any(Number),
    });
    expect(await service.load(draft2inTest.uuid)).toEqual({
      ...(draft2inTest as RegistrationDraft),
      lastSavedTime: expect.any(Number),
    });

    //drafts in demo database not available when in environment test
    expect(await service.load(draft1inDemo.uuid)).toBe(undefined);
  }));

  it('drafts$ returns a draft only when it is available, and completes if it is deleted', fakeAsync(async () => {
    const service = TestBed.inject(DraftRepositoryService);
    let draft = {
      ...(await service.create(GeoHazard.Ice)),
      uuid: 'test',
    };

    let i = 0;
    let completed = false;
    const sub = service.getDraft$('test').subscribe({
      next: (d) => {
        expect(d).toEqual({ ...(draft as RegistrationDraft), lastSavedTime: expect.any(Number) });
        i += 1;
      },
      complete: () => {
        completed = true;
      },
    });
    tick();

    await service.save(draft as RegistrationDraft);
    tick();

    // Update draft
    draft = { ...draft, regId: 123 };
    await service.save(draft as RegistrationDraft);
    tick();

    // The observable should have emitted two times, two versions of the draft
    expect(i).toBe(2);

    // draft = null;
    await service.delete('test');
    tick();

    // The observable should still only have emitted two times, two versions of the draft
    expect(i).toBe(2);

    // It should also have completed the observable when the draft was deleted
    expect(completed).toBe(true);

    // As we deleted the draft, the subscription should be closed
    expect(sub.closed).toBe(true);
  }));

  it('saveAsDraft works', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const viewModel = {
      RegId: 42,
      ExternalReferenceId: 'externalReferenceId',
      DtObsTime: 'obsTime',
      GeoHazardTID: GeoHazard.Ice,
      GeneralObservation: {
        Comment: 'comment',
        GeoHazardTID: GeoHazard.Ice,
      },
    } as RegistrationViewModel;
    await service.saveAsDraft(viewModel);

    //the copy should be saved in the database
    expect(database.store.size).toBe(1);
    expect(database.store.has('drafts.TEST.externalReferenceId')).toBe(true);

    //check that the draft contains a copy of the viewModel
    const draft = await service.load('externalReferenceId');
    expect(draft.regId).toEqual(42);
    expect(draft.registration.GeneralObservation).toEqual({
      Comment: 'comment',
      GeoHazardTID: GeoHazard.Ice,
    });
  });

  it('copyDraftAndSave works', async () => {
    const service = TestBed.inject(DraftRepositoryService);
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
    expect(database.store.has(`drafts.TEST.${newUuid}`)).toBe(true);

    const newDraft = await service.load(newUuid);

    expect(newDraft.regId).toBeUndefined(); //this is a new observation, so the regId should be undefined

    //check that the draft contains a copy of the viewModel
    expect(newDraft.registration.GeneralObservation).toEqual({
      Comment: 'comment',
      GeoHazardTID: GeoHazard.Ice,
    });

    // Check that this is a new object
    (newDraft.registration.GeneralObservation as GeneralObservationEditModel).Comment = 'Test';
    expect((draft.registration.GeneralObservation as GeneralObservationEditModel).Comment).toBe('comment');
  });

  it('hasAttachments() should work', async () => {
    const service = TestBed.inject(DraftRepositoryService);
    const attachments: AttachmentUploadEditModel[] = [
      {
        id: '1',
        type: 'Attachment',
        AttachmentId: 1,
        RegistrationTID: RegistrationTid.SnowSurfaceObservation,
      },
    ];

    const initDraft = await service.create(GeoHazard.Snow);
    const draft: RegistrationDraft = {
      ...initDraft,
      registration: {
        ...initDraft.registration,
        DtObsTime: '2022-02-13 08:00',
        SnowSurfaceObservation: {
          Comment: 'comment',
          SnowDepth: 3.5,
        },
      },
    };

    // no new attachments yet
    newAttachmentService.getAttachments.mockReturnValue(of([]));
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBe(false);

    // fake that we have a new attachment
    newAttachmentService.getAttachments.mockReturnValue(of(attachments));
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBe(true);

    // remove the new attachment
    newAttachmentService.getAttachments.mockReturnValue(of([]));
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBe(false);

    // fake that we have a remote attachment
    draft.registration.Attachments = [{ RegistrationTID: RegistrationTid.SnowSurfaceObservation }];
    expect(await service.hasAttachments(draft, RegistrationTid.SnowSurfaceObservation)).toBe(true);
  });
});
