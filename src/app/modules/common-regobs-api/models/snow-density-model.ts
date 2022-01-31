/* tslint:disable */
import { SnowDensityLayerModel } from './snow-density-layer-model';
export interface SnowDensityModel {
  CylinderDiameter?: number;
  TareWeight?: number;
  Comment?: string;
  Layers?: Array<SnowDensityLayerModel>;
}
