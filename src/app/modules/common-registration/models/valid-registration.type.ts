import {
  AvalancheActivityObs2EditModel,
  AvalancheEvalProblem2EditModel,
  AvalancheEvaluation3EditModel,
  AvalancheObsEditModel,
  CompressionTestEditModel,
  DangerObsEditModel,
  GeneralObservationEditModel,
  IceCoverEditModel,
  IceThicknessEditModel,
  IncidentEditModel,
  LandslideEditModel,
  ObsLocationEditModel,
  AttachmentEditModel,
  SnowProfileEditModel,
  SnowSurfaceEditModel,
  WeatherEditModel,
  Waterlevel2EditModel,
  DamageObsEditModel
} from '@varsom-regobs-common/regobs-api';

export type ValidRegistrationType =
  | Array<AvalancheActivityObs2EditModel>
  | Array<AvalancheEvalProblem2EditModel>
  | AvalancheEvaluation3EditModel
  | AvalancheObsEditModel
  | Array<CompressionTestEditModel>
  | Array<DangerObsEditModel>
  | GeneralObservationEditModel
  | IceCoverEditModel
  | IceThicknessEditModel
  | IncidentEditModel
  | LandslideEditModel
  | ObsLocationEditModel
  | Array<AttachmentEditModel>
  | SnowProfileEditModel
  | SnowSurfaceEditModel
  | WeatherEditModel
  | Waterlevel2EditModel
  | Array<DamageObsEditModel>;
