/* tslint:disable */
import { AttachmentViewModel } from './attachment-view-model';
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

  /** Metadata til bilde av snøprofil-plott */
  PlotImage?: AttachmentViewModel;
}
