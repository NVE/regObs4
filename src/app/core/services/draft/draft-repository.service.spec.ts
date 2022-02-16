import { TestBed } from '@angular/core/testing';
import moment from 'moment';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { RegistrationDraft } from './draft-model';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { AppModeService } from 'src/app/modules/common-core/services';
import { firstValueFrom, Observable, ReplaySubject } from 'rxjs';
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
    const registration = await service.create(GeoHazard.Ice);
    expect(registration.uuid.length).toBeGreaterThan(0);
    expect(registration.syncStatus).toBe(SyncStatus.Draft);
    expect(registration.draft.GeoHazardTID).toBe(GeoHazard.Ice);
    //TODO: Sjekk eget felt for endringstidspunkt for kladd    expect(registration.changed).toBeGreaterThanOrEqual(moment().unix());
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
    };
    await service.save(registration);

    const savedRegistrations: RegistrationDraft[] = await database.get('drafts.TEST');
    const savedRegistration = savedRegistrations[0];
    expect(savedRegistration.uuid).toEqual(registration.uuid);
    expect(savedRegistration.syncStatus).toBe(SyncStatus.Draft);
    expect(savedRegistration.draft.GeoHazardTID).toBe(GeoHazard.Snow);
    //TODO: Sjekk eget felt for endringstidspunkt for kladd    expect(savedRegistration.changed).toBeGreaterThanOrEqual(moment().unix());
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

  it('we can change a registration, save it and load the changed registration', async () => {
    const irrelevantRegistration1 = await service.create(GeoHazard.Snow);
    await service.save(irrelevantRegistration1);

    const registration = await service.create(GeoHazard.Ice);
    registration.draft.GeneralObservation = { Comment: 'v.1' };
    await service.save(registration);

    const irrelevantRegistration2 = await service.create(GeoHazard.Soil);
    await service.save(irrelevantRegistration2);

    //verify that the comment was saved and we can load it
    const savedRegistration = await service.load(registration.uuid);
    expect(savedRegistration.draft.GeneralObservation).toEqual({ Comment: 'v.1' });

    //irreleant registrations are not changed
    expect(await service.load(irrelevantRegistration1.uuid)).toEqual(irrelevantRegistration1);
    expect(await service.load(irrelevantRegistration2.uuid)).toEqual(irrelevantRegistration2);
  });

  it('we get notified when registrations are saved', async () => {
    const registration = await service.create(GeoHazard.Ice);
    registration.draft.GeneralObservation = { Comment: 'v.1' };
    await service.save(registration);

    const updatedDrafts = await firstValueFrom(service.drafts$);
    expect(updatedDrafts.length).toBe(1);
    const updatedDraft = updatedDrafts[0];
    expect(updatedDraft.uuid).toEqual(registration.uuid);
    expect(updatedDraft.draft.GeneralObservation).toEqual({ Comment: 'v.1' });

    updatedDraft.draft.GeneralObservation = { Comment: 'v.2' };
    await service.save(updatedDraft);
    const updatedDrafts2 = await firstValueFrom(service.drafts$);
    expect(updatedDrafts2.length).toBe(1);
    const updatedDraft2 = updatedDrafts2[0];
    expect(updatedDraft2.uuid).toEqual(registration.uuid);
    expect(updatedDraft2.draft.GeneralObservation).toEqual({ Comment: 'v.2' });
  });

  it('delete works', async () => {
    const registration = await service.create(GeoHazard.Ice);
    await service.save(registration);
    expect((await database.store.get('drafts.TEST')).length).toBe(1);
    expect((await firstValueFrom(service.drafts$)).length).toBe(1);

    await service.delete(registration.uuid);

    //verify that we have no drafts left
    expect((await firstValueFrom(service.drafts$)).length).toBe(0);
    expect((await database.store.get('drafts.TEST')).length).toBe(0);
    expect(await service.load(registration.uuid)).toBeUndefined();
  });
});
