import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { SyncStatus } from '../../common-registration/registration.models';

import { draftHasNotChanged } from './summary-item.service';

describe('SummaryItemService', () => {
  it('draftHasNotChanged should detect changes in comment schema', () => {
    const draftV1: RegistrationDraft = {
      uuid: 'draft',
      syncStatus: SyncStatus.Draft,
      simpleMode: false,
      registration: {
        GeoHazardTID: 10,
        DtObsTime: 'obsTime',
        GeneralObservation: {
          Comment: 'version 1',
        },
      },
    };

    const draftV1Copy: RegistrationDraft = {
      ...draftV1,
    };

    const draftV2: RegistrationDraft = {
      ...draftV1,
      registration: {
        ...draftV1.registration,
        GeneralObservation: {
          Comment: 'version 2',
        },
      },
    };

    const draftV3: RegistrationDraft = {
      ...draftV1,
      registration: {
        ...draftV1.registration,
        GeneralObservation: undefined,
      },
    };

    const draftV4: RegistrationDraft = {
      ...draftV3,
      registration: {
        ...draftV1.registration,
        WeatherObservation: {
          AirTemperature: 42,
        },
      },
    };

    expect(draftHasNotChanged(draftV1, draftV1Copy)).toBeTrue();
    expect(draftHasNotChanged(draftV1, draftV2)).toBeFalse();
    expect(draftHasNotChanged(draftV1, draftV3)).toBeFalse();
    expect(draftHasNotChanged(draftV1, draftV4)).toBeFalse(); //same number of schemas, but schemas are different
  });
});
