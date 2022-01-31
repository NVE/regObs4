import {
  RxJsonSchema
} from 'rxdb';
export const UploadProgressSchema : RxJsonSchema = {
  title: 'Upload progress schema',
  description: 'Upload progress',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    totalBytes: {
      type: 'number',
    },
    complete: {
      type: 'number',
    }
  },
  required: ['id', 'totalBytes', 'complete'],
};
