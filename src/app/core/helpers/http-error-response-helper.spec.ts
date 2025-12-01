import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { getHttpErrorResponseMessageAndCode } from './http-error-response-helper';
import { RegistrationDraftErrorCode } from '../services/draft/draft-model';

describe('getHttpErrorResponseMessageAndCode', () => {
  it('should handle network error (status 0)', () => {
    const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown', error: null, url: 'test' });
    const result = getHttpErrorResponseMessageAndCode(error);
    expect(result.code).toBe(RegistrationDraftErrorCode.NoNetworkOrTimedOut);
    expect(result.message).toEqual('Http failure response for test: 0 Unknown');
  });

  it('should handle BadRequest with ModelState', () => {
    const error = new HttpErrorResponse({
      status: HttpStatusCode.BadRequest,

      statusText: 'Bad Request',
      error: {
        Message: 'Invalid input', 
        ModelState: { field1: 'Field1 is required', field2: ['Field2 is invalid'] }
      },
      url: 'test'
    });
    const result = getHttpErrorResponseMessageAndCode(error);
    expect(result.code).toBe(RegistrationDraftErrorCode.RegistrationError);
    expect(result.message).toContain('Invalid input');
    expect(result.message).toContain('Field1 is required');
    expect(result.message).toContain('Field2 is invalid');
  });

  it('should handle Conflict', () => {
    const error = new HttpErrorResponse({ status: HttpStatusCode.Conflict, statusText: 'Conflict', error: null, url: 'test' });
    const result = getHttpErrorResponseMessageAndCode(error);
    expect(result.code).toBe(RegistrationDraftErrorCode.ConflictError);
    expect(result.message).toEqual('Http failure response for test: 409 Conflict');
  });

  it('should handle Gone', () => {
    const error = new HttpErrorResponse({ status: HttpStatusCode.Gone, statusText: 'Gone', error: null, url: 'test' });
    const result = getHttpErrorResponseMessageAndCode(error);
    expect(result.code).toBe(RegistrationDraftErrorCode.GoneError);
    expect(result.message).toEqual('Http failure response for test: 410 Gone');
  });

  it('should handle Unauthorized', () => {
    const error = new HttpErrorResponse({ status: HttpStatusCode.Unauthorized, statusText: 'Unauthorized', error: null, url: 'test' });
    const result = getHttpErrorResponseMessageAndCode(error);
    expect(result.code).toBe(RegistrationDraftErrorCode.Unauthorized);
    expect(result.message).toEqual('Http failure response for test: 401 Unauthorized');
  });

  it('should handle unknown error', () => {
    const error = new HttpErrorResponse({ status: 123, statusText: 'Unknown', error: null, url: 'test' });
    const result = getHttpErrorResponseMessageAndCode(error);
    expect(result.code).toBe(RegistrationDraftErrorCode.Unknown);
    expect(result.message).toEqual('Http failure response for test: 123 Unknown');
  });
});

