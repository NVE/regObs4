/* tslint:disable */
import { AttachmentViewModel } from './attachment-view-model';
export interface WaterLevelMeasurementViewModel {
  WaterLevelMeasurementId?: number;
  Attachments?: Array<AttachmentViewModel>;
  WaterLevelValue?: number;
  DtMeasurementTime: string;
  Comment?: string;
}
