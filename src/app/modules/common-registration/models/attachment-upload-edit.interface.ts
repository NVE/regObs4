import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { AttachmentEditModel } from 'src/app/modules/common-regobs-api/models';

export interface AttachmentUploadEditModel extends AttachmentEditModel {
  id: string;
  type: AttachmentType;
  fileSize?: number;
  fileName?: string; //attachment filename
  error?: Error;
  ref?: string; // Guid
}

export interface AttachmentUploadEditModelWithBlob extends AttachmentUploadEditModel {
  blob: Blob;
}

export type ExistingOrNewAttachmentModel = AttachmentUploadEditModel | RemoteOrLocalAttachmentEditModel;
export type NewAttachmentType = 'new';
export type ExistingAttachmentType = 'existing';
export type ExistingOrNewAttachmentType = NewAttachmentType | ExistingAttachmentType;

export interface ExistingOrNewAttachment {
  type: ExistingOrNewAttachmentType;
  attachment: ExistingOrNewAttachmentModel;
}

export type AttachmentType = 'Attachment' | 'DamageObsAttachment' | 'WaterLevelMeasurementAttachment';
