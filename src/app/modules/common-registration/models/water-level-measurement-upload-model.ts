import { WaterLevelMeasurementEditModel, AttachmentEditModel } from '@varsom-regobs-common/regobs-api';

export interface WaterLevelMeasurementUploadModel extends WaterLevelMeasurementEditModel {
  WaterLevelMeasurementId?: number;
  WaterLevelValue?: number;
  DtMeasurementTime: string;
  Comment?: string;
  Attachments?: Array<AttachmentEditModel>;
  ref?: string;  // Guid
}
