import { TestBed } from '@angular/core/testing';
import moment from 'moment';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { RegistrationDraft } from './draft-model';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { TestDatabaseService } from '../database/test-database.service';

describe('DraftRepositoryService', () => {
  let service: DraftRepositoryService;
  let database: TestDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    database = new TestDatabaseService();
    service = new DraftRepositoryService(null, new TestLoggingService(), database);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create() should return an empty draft registration', async () => {
    const draft = await service.create(GeoHazard.Ice);
    expect(draft.uuid.length).toBeGreaterThan(0);
    // expect(draft.syncStatus).toBe(SyncStatus.Draft);
    // expect(draft.draft.GeoHazardTID).toBe(GeoHazard.Ice);
    // expect(draft.draft.DtChangeTime).toBeGreaterThanOrEqual(moment().unix());
    // expect(draft.draft.DtObsTime).toBe(undefined);
    // expect(draft.draft.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    // expect(draft.draft.Attachments).toEqual([]);
  });
});
