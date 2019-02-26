/* tslint:disable */
import { IceThicknessLayerViewModel } from './ice-thickness-layer-view-model';
export interface IceThicknessViewModel {
  SnowDepth?: number;
  SlushSnow?: number;
  IceThicknessSum?: number;
  IceHeightBefore?: number;
  IceHeightAfter?: number;
  Comment?: string;
  IceThicknessLayers?: Array<IceThicknessLayerViewModel>;
}
