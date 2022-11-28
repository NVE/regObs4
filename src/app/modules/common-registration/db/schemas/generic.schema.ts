import {
  RxJsonSchema
} from 'rxdb';
export const GenericSchema : RxJsonSchema = {
  title: 'Generic schema',
  description: 'Generic offline table with string id',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    lastUpdated: {
      type: 'number'
    },
    data: {
      type: ['object', 'array' ]
    }
  },
};
