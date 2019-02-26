/* tslint:disable */
import { IceThicknessLayerDto } from './ice-thickness-layer-dto';
export interface IceThicknessDto {
  SnowDepth?: number;
  SlushSnow?: number;
  IceThicknessSum?: number;
  IceHeightBefore?: number;
  IceHeightAfter?: number;
  UsageFlagTID?: number;
  Comment?: string;
  IceThicknessLayer?: Array<IceThicknessLayerDto>;
}
