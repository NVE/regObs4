/* eslint-disable */
import { SnowDensityModel } from './snow-density-model';
import { SnowTempModel } from './snow-temp-model';
import { StratProfileEditModel } from './strat-profile-edit-model';
export interface SnowProfileEditModel {
  Comment?: string;
  Exposition?: number;
  IsProfileToGround?: boolean;
  SlopeAngle?: number;
  SnowDensity?: Array<SnowDensityModel>;
  SnowTemp?: SnowTempModel;
  StratProfile?: StratProfileEditModel;
}
