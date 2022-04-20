import { TestBed } from '@angular/core/testing';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { SyncStatus } from '../../common-registration/registration.models';

import { draftHasNotChanged } from './summary-item.service';

describe('SummaryItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('draftHasNotChanged should detect changes in comment schema', async () => {

    const draftV1: RegistrationDraft = {
      uuid: 'draft',
      syncStatus: SyncStatus.Draft,
      registration: {
        GeoHazardTID: 10,
        DtObsTime: 'obsTime',
        GeneralObservation: {
          Comment: 'version 1'
        }
      }
    };

    const draftV1Copy: RegistrationDraft = {
      ...draftV1
    };

    const draftV2: RegistrationDraft = {
      ...draftV1,
      registration: {
        ...draftV1.registration,
        GeneralObservation: {
          Comment: 'version 2'
        }
      }
    };

    expect(draftHasNotChanged(draftV1, draftV1Copy)).toBeTrue();
    expect(draftHasNotChanged(draftV1, draftV2)).toBeFalse();
  });

});
