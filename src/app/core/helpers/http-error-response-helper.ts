import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { RegistrationDraftErrorCode } from '../services/draft/draft-model';

function extractBadRequestMessage(error: HttpErrorResponse): string {
  const messages: string[] = [];
  if (error.error?.Message) messages.push(error.error.Message);

  const modelState = error.error?.ModelState;
  if (modelState && typeof modelState === 'object' && modelState !== null) {
    messages.push(...Object.values(modelState as Record<string, string | string[]>).flat());
  }

  return messages.length > 0 ? messages.join(' ') : error.message;
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

  switch (error.status) {
    case 0:
      code = RegistrationDraftErrorCode.NoNetworkOrTimedOut;
      break;
    case HttpStatusCode.BadRequest:
      code = RegistrationDraftErrorCode.RegistrationError;
      return { code, message: extractBadRequestMessage(error) };
    case HttpStatusCode.Conflict:
      code = RegistrationDraftErrorCode.ConflictError;
      break;
    case HttpStatusCode.Gone:
      code = RegistrationDraftErrorCode.GoneError;
      break;
    case HttpStatusCode.Unauthorized:
      code = RegistrationDraftErrorCode.Unauthorized;
      break;
    default:
      code = error.status >= HttpStatusCode.InternalServerError
        ? RegistrationDraftErrorCode.ServerError
        : RegistrationDraftErrorCode.Unknown;
  }

  return { code, message: error.message };
};
