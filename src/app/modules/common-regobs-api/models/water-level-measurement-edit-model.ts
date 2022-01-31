/* tslint:disable */
import { AttachmentEditModel } from './attachment-edit-model';
export interface WaterLevelMeasurementEditModel {
  WaterLevelMeasurementId?: number;
  WaterLevelValue?: number;
  DtMeasurementTime: string;
  Comment?: string;
  Attachments?: Array<AttachmentEditModel>;
}
