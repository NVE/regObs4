/* eslint-disable */
import { SnowDensityLayerModel } from './snow-density-layer-model';
export interface SnowDensityModel {
  Comment?: string;
  CylinderDiameter?: number;
  Layers?: Array<SnowDensityLayerModel>;
  TareWeight?: number;
}
