import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { SnowProfileData } from '../../adaptive-cards/adaptive-snow-profile';
import { GeoHazard } from '../../common-core/models';
import { RegistrationViewModel } from '../../common-regobs-api';
import { RegistrationTid } from '../models/registration-tid.enum';
import { getAllAttachmentsFromViewModel } from './registration.helper';
import { SyncStatus } from '../registration.models';
import { removeEmptyRegistrations } from './registration.helper';

const draft: RegistrationDraft = {
  uuid: 'abc',
  syncStatus: SyncStatus.Sync,
  simpleMode: false,
  registration: {
    GeoHazardTID: GeoHazard.Snow,
    GeneralObservation: { ObsComment: 'comment' },
    DtObsTime: 'test'
  }
};

const viewModel: RegistrationViewModel = {
  GeoHazardTID: GeoHazard.Snow,
  GeneralObservation: { ObsComment: 'comment' },
  DtObsTime: 'test',
  Attachments: [{
    RegistrationTID: RegistrationTid.GeneralObservation,
    UrlFormats: {'Medium': 'common'}
  }],
  Summaries: [{
    RegistrationTID: RegistrationTid.SnowProfile2,
    AdaptiveElements: [{
      type: 'SnowProfilePlot',
      pngUrl: 'snow'
    } as SnowProfileData]
  }],
  WaterLevel2: {
    WaterLevelMeasurement: [{
      DtMeasurementTime: new Date(1970).toISOString(),
      Attachments: [{
        RegistrationTID: RegistrationTid.WaterLevel2,
        UrlFormats: {'Medium': 'water'}
      }]
    }]
  },
  DamageObs: [{
    DamageTypeTID: 1,
    Attachments: [{
      RegistrationTID: RegistrationTid.DamageObs,
      UrlFormats: {'Medium': 'damage'}
    }]
  }]
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

  it('Empty registrationTid should return all attachments', () => {
    expect(
      getAllAttachmentsFromViewModel(viewModel).map(x => x.UrlFormats['Medium'])
    ).toEqual(['snow', 'common', 'damage', 'water']);
  });

  it('SnowProfile2 registrationTid should return profile', () => {
    expect(
      getAllAttachmentsFromViewModel(viewModel, RegistrationTid.SnowProfile2)
        .map(x => x.UrlFormats['Medium'])
    ).toEqual(['snow']);
  });

  it('GeneralObservation registrationTid should return common attachment', () => {
    expect(
      getAllAttachmentsFromViewModel(viewModel, RegistrationTid.GeneralObservation)
        .map(x => x.UrlFormats['Medium'])
    ).toEqual(['common']);
  });

  it('DamageObs registrationTid should return damage attachment', () => {
    expect(
      getAllAttachmentsFromViewModel(viewModel, RegistrationTid.DamageObs)
        .map(x => x.UrlFormats['Medium'])
    ).toEqual(['damage']);
  });

  it('WaterLevel2 registrationTid should return water attachment', () => {
    expect(
      getAllAttachmentsFromViewModel(viewModel, RegistrationTid.WaterLevel2)
        .map(x => x.UrlFormats['Medium'])
    ).toEqual(['water']);
  });
});