import {
  RxJsonSchema
} from 'rxdb';
export const KdvelementSchema : RxJsonSchema = {
  title: 'KDV Element schema',
  description: 'KDV Element',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    }
  },
};
