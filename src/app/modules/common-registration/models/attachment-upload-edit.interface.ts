import { AttachmentEditModel } from '@varsom-regobs-common/regobs-api';

export interface AttachmentUploadEditModel extends AttachmentEditModel {
  id: string;
  type: AttachmentType;
  fileSize?: number;
  fileName?: string;
  error?: Error;
  ref?: string;  // Guid
}

export type ExistingOrNewAttachmentModel = AttachmentUploadEditModel | AttachmentEditModel;
export type NewAttachmentType = 'new';
export type ExistingAttachmentType = 'existing'
export type ExistingOrNewAttachmentType = NewAttachmentType | ExistingAttachmentType;
export interface ExistingOrNewAttachment {
  type: ExistingOrNewAttachmentType;
  attachment: ExistingOrNewAttachmentModel;
}

export type AttachmentType = 'Attachment' | 'DamageObsAttachment' | 'WaterLevelMeasurementAttachment';