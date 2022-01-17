/* tslint:disable */
import { TempObsDto } from './temp-obs-dto';
import { StratProfileDto } from './strat-profile-dto';
import { DensityProfileDto } from './density-profile-dto';
export interface SnowProfileDto {
  Comment?: string;
  IsProfileToGround?: boolean;
  Exposition?: number;
  SlopeAngle?: number;
  SnowTemp?: TempObsDto;
  StratProfile?: StratProfileDto;
  SnowDensity?: Array<DensityProfileDto>;
}
