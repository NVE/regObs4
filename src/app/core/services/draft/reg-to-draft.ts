/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { isEmpty } from 'src/app/modules/common-core/helpers';
import {
  AttachmentViewModel,
  AvalancheActivityObs2EditModel,
  AvalancheActivityObs2ViewModel,
  ObsLocationEditModel,
  ObsLocationViewModel,
  RegistrationViewModel,
} from 'src/app/modules/common-regobs-api';
import { RegistrationEditModelWithRemoteOrLocalAttachments, RemoteOrLocalAttachmentEditModel } from './draft-model';

export function viewModelToEditModel(
  viewModel: RegistrationViewModel
): RegistrationEditModelWithRemoteOrLocalAttachments {
  // Destructure all properties of the view model
  const {
    Anonymous,
    // RegId,
    // ExternalReferenceId,
    // GeoHazardName,
    // DtRegTime,
    DtChangeTime,
    // SourceName,
    // Observer,
    ObsLocation,
    Attachments,
    AvalancheActivityObs2,
    AvalancheEvalProblem2,
    AvalancheEvaluation3,
    AvalancheObs,
    CompressionTest,
    DangerObs,
    GeneralObservation,
    IceCoverObs,
    IceThickness,
    Incident,
    LandSlideObs,
    SnowProfile2,
    SnowSurfaceObservation,
    WeatherObservation,
    WaterLevel2,
    DamageObs,
    // Summaries,
    // AttachmentSummaries,
    // SnowProfile,
    // AvalancheEvaluation,
    // AvalancheActivityObs,
    // AvalancheDangerObs,
    // AvalancheEvalProblem,
    // AvalancheEvaluation2,
    // SnowCoverObs,
    // WaterLevel,
    GeoHazardTID,
    SourceTID,
    DtObsTime,
    ObserverGroupID,
    ObserverGroupName,
  } = viewModel;

  const registration: RegistrationEditModelWithRemoteOrLocalAttachments = {
    Anonymous,
    GeoHazardTID,
    DtObsTime,
  };

  if (!isEmpty(DtChangeTime)) {
    registration['DtChangeTime'] = DtChangeTime;
  }

  if (!isEmpty(SourceTID)) {
    registration['SourceTID'] = SourceTID;
  }

  if (!isEmpty(ObserverGroupID)) {
    registration['ObserverGroupID'] = ObserverGroupID;
  }

  if (!isEmpty(ObserverGroupName)) {
    registration['ObserverGroupName'] = ObserverGroupName;
  }

  if (!isEmpty(ObsLocation)) {
    registration['ObsLocation'] = obsLocationEditModel(ObsLocation);
  }

  if (!isEmpty(Attachments)) {
    registration['Attachments'] = attachmentEditModel(Attachments);
  }

  if (!isEmpty(AvalancheActivityObs2)) {
    registration['AvalancheActivityObs2'] = avalancheActivityObs2EditModel(AvalancheActivityObs2);
  }

  if (!isEmpty(AvalancheEvalProblem2)) {
    registration['AvalancheEvalProblem2'] = AvalancheEvalProblem2;
  }

  if (!isEmpty(AvalancheEvaluation3)) {
    registration['AvalancheEvaluation3'] = AvalancheEvaluation3;
  }

  if (!isEmpty(AvalancheObs)) {
    registration['AvalancheObs'] = AvalancheObs;
  }

  if (!isEmpty(CompressionTest)) {
    registration['CompressionTest'] = CompressionTest;
  }

  if (!isEmpty(DangerObs)) {
    registration['DangerObs'] = DangerObs;
  }

  if (!isEmpty(GeneralObservation)) {
    registration['GeneralObservation'] = GeneralObservation;
  }

  if (!isEmpty(IceCoverObs)) {
    registration['IceCoverObs'] = IceCoverObs;
  }

  if (!isEmpty(IceThickness)) {
    registration['IceThickness'] = IceThickness;
  }

  if (!isEmpty(Incident)) {
    registration['Incident'] = Incident;
  }

  if (!isEmpty(LandSlideObs)) {
    registration['LandSlideObs'] = LandSlideObs;
  }

  if (!isEmpty(SnowProfile2)) {
    registration['SnowProfile2'] = SnowProfile2;
  }

  if (!isEmpty(SnowSurfaceObservation)) {
    registration['SnowSurfaceObservation'] = SnowSurfaceObservation;
  }

  if (!isEmpty(WeatherObservation)) {
    registration['WeatherObservation'] = WeatherObservation;
  }

  if (!isEmpty(WaterLevel2)) {
    registration['WaterLevel2'] = WaterLevel2;
  }

  if (!isEmpty(DamageObs)) {
    registration['DamageObs'] = DamageObs;
  }

  return registration;
}

function obsLocationEditModel(viewModel: ObsLocationViewModel): ObsLocationEditModel {
  const {
    ForecastRegionTID,
    ForecastRegionName,
    Height,
    MunicipalName,
    MunicipalNo,
    CountryId,
    CountryName,
    UTMSourceName,
    // Title,  -- include title as api returns the model without description and name
    ...ObsLocation
  } = viewModel;
  return ObsLocation;
}

function attachmentEditModel(viewModel: Array<AttachmentViewModel>): Array<RemoteOrLocalAttachmentEditModel> {
  return viewModel.map((a) => {
    const { GeoHazardName, RegistrationName, ...attachment } = a;
    return attachment;
  });
}

function avalancheActivityObs2EditModel(
  viewModel: Array<AvalancheActivityObs2ViewModel>
): Array<AvalancheActivityObs2EditModel> {
  return viewModel.map((a) => {
    const {
      ExposedHeightComboName,
      EstimatedNumName,
      AvalancheExtName,
      AvalCauseName,
      AvalPropagationName,
      DestructiveSizeName,
      ...avalancheActivity
    } = a;
    return avalancheActivity;
  });
}
