import {
  RxJsonSchema
} from 'rxdb';
export const AttachmentMetaSchema : RxJsonSchema = {
  title: 'Attachment Metadata schema',
  description: 'Attachment Metadata',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    GeoHazardTID: {
      type: 'number',
    },
    RegistrationTID: {
      type: 'number',
    },
    ref: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    error: {
    },
    fileSize: {
      type: 'number'
    },
    AttachmentId: {
      type: 'number'
    },
    AttachmentUploadId: {
      type: 'string',
    },
    Photographer: {
      type: 'string',
    },
    Copyright: {
      type: 'string',
    },
    Aspect: {
      type: 'number'
    },
    Comment: {
      type: 'string',
    },
    AttachmentMimeType: {
      type: 'string',
    },
    IsMainAttachment: {
    }
  },
  required: ['id', 'GeoHazardTID', 'RegistrationTID'],
};
