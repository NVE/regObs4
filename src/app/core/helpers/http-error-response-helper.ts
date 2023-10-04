import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { RegistrationDraftErrorCode } from '../services/draft/draft-model';

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

  if (error.status === 0) {
    code = RegistrationDraftErrorCode.NoNetworkOrTimedOut;
    message = error.message || 'Response failed with status code 0, probably no network?';
  } else if (error.status === HttpStatusCode.BadRequest) {
    code = RegistrationDraftErrorCode.RegistrationError;
    // Regobs api returns additional info for bad requests.
    // Put this info into a readable error message.
    let messages = [];
    if (error.error?.Message) {
      messages.push(error.error.Message);
    }
    if (error.error?.ModelState) {
      messages = [...messages, ...Object.values(error.error.ModelState)];
    }
    if (messages.length > 0) {
      message = messages.join(' ');
    } else {
      message = error.message || `Response failed with ${error.status} - ${error.statusText}`;
    }
  } else if (error.status === HttpStatusCode.Conflict) {
    code = RegistrationDraftErrorCode.ConflictError;
    message = error.message || `Registration conflict ${error.status} - ${error.statusText}`;
  } else if (error.status === HttpStatusCode.Gone) {
    code = RegistrationDraftErrorCode.GoneError;
    message = error.message || `Registration is deleted in Regobs ${error.status} - ${error.statusText}`;
  } else if (error.status > HttpStatusCode.BadRequest) {
    code = RegistrationDraftErrorCode.ServerError;
    message = error.message || `Response failed with ${error.status} - ${error.statusText}`;
  } else {
    code = RegistrationDraftErrorCode.Unknown;
    message = error.message || `Got an unknown http error: ${error.status} - ${error.statusText}`;
  }

  return { code, message };
};
