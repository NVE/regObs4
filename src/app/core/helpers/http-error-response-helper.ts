import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { RegistrationDraftErrorCode } from '../services/draft/draft-model';

function extractBadRequestMessage(error: HttpErrorResponse): string {
  const messages: string[] = [];
  if (error.error?.Message) messages.push(error.error.Message);

  const modelState = error.error?.ModelState;
  if (modelState && typeof modelState === 'object' && modelState !== null) {
    messages.push(...Object.values(modelState as Record<string, string | string[]>).flat());
  }

  return messages.length > 0
    ? messages.join(' ')
    : error.message || `Response failed with ${error.status} - ${error.statusText}`;
}

function formatMessage(error: HttpErrorResponse, fallbackMessage: string): string {
  if (error.message) {
    return error.message;
  }
  return `${fallbackMessage} ${error.status} - ${error.statusText}`;
}

/**
 * Create a formatted message for an angular HttpErrorResponse
 *
 * @param error Angular HttpErrorResponse
 * @returns Message and Regobs Draft Error Code. NB: RegistrationDraftErrorCode has nothing to do with Http status code
 *   it is just an internal regobs app error status code used to find out what to do with the draft.
 */
export const getHttpErrorResponseMessageAndCode = (
  error: HttpErrorResponse
): { message: string; code: RegistrationDraftErrorCode } => {
  let code: RegistrationDraftErrorCode;
  let message: string;

  switch (error.status) {
    case 0:
      code = RegistrationDraftErrorCode.NoNetworkOrTimedOut;
      message = formatMessage(error, 'Response failed with status code 0, probably no network?');
      break;
    case HttpStatusCode.BadRequest:
      code = RegistrationDraftErrorCode.RegistrationError;
      message = extractBadRequestMessage(error);
      break;
    case HttpStatusCode.Conflict:
      code = RegistrationDraftErrorCode.ConflictError;
      message = formatMessage(error, 'Registration conflict');
      break;
    case HttpStatusCode.Gone:
      code = RegistrationDraftErrorCode.GoneError;
      message = formatMessage(error, 'Registration is deleted in Regobs');
      break;
    case HttpStatusCode.Unauthorized:
      code = RegistrationDraftErrorCode.Unauthorized;
      message = formatMessage(error, 'Unauthorized');
      break;
    default:
      if (error.status > HttpStatusCode.BadRequest) {
        code = RegistrationDraftErrorCode.ServerError;
        message = formatMessage(error, 'Response failed with server error');
      } else {
        code = RegistrationDraftErrorCode.Unknown;
        message = formatMessage(error, 'Got an unknown http error');
      }
  }

  return { code, message };
};
