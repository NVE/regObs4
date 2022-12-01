import { AUTH_CALLBACK_PATH } from 'src/app/modules/auth/factories/auth-factory';

/**
 * Removes oauth tokens from given text
 * @param text looks for patterns that matches 'code=<token>' in the text
 * @returns the same text, but with 'TOKEN_REMOVED' instead of tokens
 */
export function removeOauthTokenFromUrl(text: string): string {
  let result = text;
  if (result?.indexOf(AUTH_CALLBACK_PATH) >= 0) {
    result = updateQueryStringParameter(result, 'code', 'TOKEN_REMOVED');
  }
  return result;
}

/**
 * Replace specific parameter value(s) in provided url.
 * If the parameter doesn't exist in the url, the parameter will NOT be added.
 * Edited version of this SO answer: https://stackoverflow.com/a/6021027
 * created by "amateur" and edited by "Matt Ball", "Joshua Stewardson" and "Niyaz"
 * License: https://creativecommons.org/licenses/by-sa/3.0/.
 * @returns the new url
 */
function updateQueryStringParameter(url: string, paramKey: string, paramValue: string): string {
  const re = new RegExp('(?<=[?&])' + paramKey + "=.*?((?=[&'])|$)", 'g');
  if (url.match(re)) {
    return url.replace(re, paramKey + '=' + paramValue);
  }
  return url;
}
