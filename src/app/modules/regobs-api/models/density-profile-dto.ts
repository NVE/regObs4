/* tslint:disable */
import { DensityProfileLayerDto } from './density-profile-layer-dto';
export interface DensityProfileDto {
  CylinderDiameter?: number;
  TareWeight?: number;
  Comment?: string;
  Layers?: Array<DensityProfileLayerDto>;
}
