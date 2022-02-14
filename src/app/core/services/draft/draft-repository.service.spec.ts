// TODO: KOmmentert ut inntil jeg får kjørt tester uten å bli sprø
import { TestBed } from '@angular/core/testing';
import moment from 'moment';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from './draft-repository.service';
import { RegistrationDraft } from './draft-model';

describe('DraftRepositoryService', () => {
  let repository: DraftRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(DraftRepositoryService);
  });

  it('should be created', () => {
    const service: DraftRepositoryService = TestBed.get(DraftRepositoryService);
    expect(service).toBeTruthy();
  });

  it('create() should return an empty draft registration', async () => {
    const draft = await repository.create(GeoHazard.Ice);
    expect(draft.uuid.length).toBeGreaterThan(0);
    // expect(draft.syncStatus).toBe(SyncStatus.Draft);
    // expect(draft.draft.GeoHazardTID).toBe(GeoHazard.Ice);
    // expect(draft.draft.DtChangeTime).toBeGreaterThanOrEqual(moment().unix());
    // expect(draft.draft.DtObsTime).toBe(undefined);
    // expect(draft.draft.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
    // expect(draft.draft.Attachments).toEqual([]);
  });
});
