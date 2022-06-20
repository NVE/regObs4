/* eslint-disable */
import { AttachmentViewModel } from './attachment-view-model';
export interface WaterLevelMeasurementViewModel {
  Attachments?: Array<AttachmentViewModel>;
  Comment?: string;
  DtMeasurementTime: string;
  WaterLevelMeasurementId?: number;
  WaterLevelValue?: number;
}
