/* tslint:disable */
import { StratProfileEditModel } from './strat-profile-edit-model';
import { SnowTempModel } from './snow-temp-model';
import { SnowDensityModel } from './snow-density-model';
export interface SnowProfileEditModel {
  StratProfile?: StratProfileEditModel;
  Comment?: string;
  IsProfileToGround?: boolean;
  Exposition?: number;
  SlopeAngle?: number;
  SnowTemp?: SnowTempModel;
  SnowDensity?: Array<SnowDensityModel>;
}
