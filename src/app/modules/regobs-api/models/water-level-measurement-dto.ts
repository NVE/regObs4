/* tslint:disable */
import { PictureRequestDto } from './picture-request-dto';
export interface WaterLevelMeasurementDto {
  WaterLevelValue?: number;
  DtMeasurementTime: string;
  UsageFlagTID?: number;
  Comment?: string;
  Pictures?: Array<PictureRequestDto>;
}
