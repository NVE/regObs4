/* tslint:disable */
import { StratProfileViewModel } from './strat-profile-view-model';
import { SnowTempViewModel } from './snow-temp-view-model';
import { SnowDensityViewModel } from './snow-density-view-model';
import { CompressionTestViewModel } from './compression-test-view-model';
export interface SnowProfileViewModel {
  TotalDepth?: number;
  AttachmentID?: number;
  Comment?: string;
  IsProfileToGround?: boolean;
  StratProfile?: StratProfileViewModel;
  SnowTemp?: SnowTempViewModel;
  SnowDensity?: Array<SnowDensityViewModel>;
  CompressionTest?: Array<CompressionTestViewModel>;
}
