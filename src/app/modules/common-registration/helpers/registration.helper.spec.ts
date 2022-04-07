import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { GeoHazard } from '../../common-core/models';
import { SyncStatus } from '../registration.models';
import { removeEmptyRegistrations } from './registration.helper';

const draft: RegistrationDraft = {
  uuid: 'abc',
  syncStatus: SyncStatus.Sync,
  registration: {
    GeoHazardTID: GeoHazard.Snow,
    GeneralObservation: { ObsComment: 'comment' },
    DtObsTime: 'test'
  }
};

describe('registration.helper', () => {

  const draftWithEmptyRegistrations: RegistrationDraft = {
    ...draft,
    registration: {
      ...draft.registration,
      WeatherObservation: {},
      CompressionTest: []
    }
  };

  it('removeEmptyRegistrations should work', () => {
    expect(removeEmptyRegistrations(draft)).toEqual(draft); //nothing should happen here

    const draftWithoutEmptyRegistrations = removeEmptyRegistrations(draftWithEmptyRegistrations);
    expect(draftWithoutEmptyRegistrations).toEqual(draft);
  });
});