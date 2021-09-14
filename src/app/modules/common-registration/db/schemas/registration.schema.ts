import {
  RxJsonSchema
} from 'rxdb';
export const RegistrationSchema : RxJsonSchema = {
  title: 'Registration schema',
  description: 'Registrations',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    changed: {
      type: 'number',
    },
    geoHazard: {
      type: 'number',
    },
    syncStatus: {
      type: 'string',
    },
    lastSync: {
      type: 'number',
    },
    syncError: {
      type: 'string',
    },
    syncStatusCode: {
      type: 'number',
    },
    request: {
      type: 'object',
      properties: {
      }
    },
    response: {
      type: 'object',
      properties: {
      }
    },
    changedRegistrationTid: {
      type: 'number'
    }
  },
  required: ['id', 'changed', 'geoHazard', 'syncStatus'],
  attachments: {
    encrypted: false
  }
};
