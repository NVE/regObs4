import { WaterLevelMeasurementEditModel, AttachmentEditModel } from 'src/app/modules/common-regobs-api/models';

export interface WaterLevelMeasurementUploadModel extends WaterLevelMeasurementEditModel {
  WaterLevelMeasurementId?: number;
  WaterLevelValue?: number;
  DtMeasurementTime: string;
  Comment?: string;
  Attachments?: Array<AttachmentEditModel>;
  ref?: string; // Guid
}
