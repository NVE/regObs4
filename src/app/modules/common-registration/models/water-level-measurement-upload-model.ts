import { WaterLevelMeasurementEditModel } from 'src/app/modules/common-regobs-api';

export interface WaterLevelMeasurementUploadModel extends WaterLevelMeasurementEditModel {
  /**
   * Ref is used to attach a water level measurement image to a measurement, after we upload the images to regobs.
   * See addWaterLevelAttachment in attachmentHelpers.ts
   */
  ref?: string; // Guid
}
