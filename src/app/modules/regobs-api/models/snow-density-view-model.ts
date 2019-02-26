/* tslint:disable */
import { SnowDensityLayerViewModel } from './snow-density-layer-view-model';
export interface SnowDensityViewModel {
  CylinderDiameter?: number;
  TareWeight?: number;
  Comment?: string;
  Layers?: Array<SnowDensityLayerViewModel>;
}
