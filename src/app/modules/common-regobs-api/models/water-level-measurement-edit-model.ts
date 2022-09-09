/* eslint-disable */
import { AttachmentEditModel } from './attachment-edit-model';
export interface WaterLevelMeasurementEditModel {
  Attachments?: Array<AttachmentEditModel>;
  Comment?: string;
  DtMeasurementTime: string;
  WaterLevelMeasurementId?: number;
  WaterLevelValue?: number;
}
