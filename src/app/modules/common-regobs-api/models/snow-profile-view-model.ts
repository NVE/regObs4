/* eslint-disable */
import { SnowDensityModel } from './snow-density-model';
import { SnowTempModel } from './snow-temp-model';
import { StratProfileViewModel } from './strat-profile-view-model';
export interface SnowProfileViewModel {
  Comment?: string;
  Exposition?: number;
  IsProfileToGround?: boolean;
  SlopeAngle?: number;
  SnowDensity?: Array<SnowDensityModel>;
  SnowTemp?: SnowTempModel;
  StratProfile?: StratProfileViewModel;
  TotalDepth?: number;
}
