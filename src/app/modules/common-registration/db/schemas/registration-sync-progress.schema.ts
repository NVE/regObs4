import {
  RxJsonSchema
} from 'rxdb';
export const RegistrationSyncProgressSchema : RxJsonSchema = {
  title: 'Registration sync progress schema',
  description: 'Registration sync progress',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    recordsLeft: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string'
      }
    },
    totalRecords: {
      type: 'number',
    },
    startedTimestamp: {
      type: 'number',
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          error: {
            type: 'string'
          }
        }
      }
    }
  },
  required: ['id'],
};
