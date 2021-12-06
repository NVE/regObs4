import { AUTH_CALLBACK_PATH } from 'src/app/modules/auth/factories/auth-factory';

export function removeOauthTokenFromUrl(url: string): string {
  if (url?.indexOf(AUTH_CALLBACK_PATH) >= 0) {
    const urlWithoutStateParameter = updateQueryStringParameter(url, 'state', 'TOKEN_REMOVED');
    return updateQueryStringParameter(urlWithoutStateParameter, 'code', 'TOKEN_REMOVED');
  }
  return url;
}

/**
 * Replace a specific parameter value in provided url
 * Copied from https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
 * @returns the new url
 */
function updateQueryStringParameter(url: string, paramKey: string, paramValue: string): string {
  const re = new RegExp('([?&])' + paramKey + '=.*?(&|$)', 'i');
  const separator = url.indexOf('?') !== -1 ? '&' : '?';
  if (url.match(re)) {
    return url.replace(re, '$1' + paramKey + '=' + paramValue + '$2');
  }
  else {
    return url + separator + paramKey + '=' + paramValue;
  }
}

