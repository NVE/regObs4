export const URL_PARAM_NW_LAT = 'nwLat';
export const URL_PARAM_NW_LON = 'nwLon';
export const URL_PARAM_SE_LAT = 'seLat';
export const URL_PARAM_SE_LON = 'seLon';
export const URL_PARAM_GEOHAZARD = 'hazard';
export const URL_PARAM_GEOHAZARDS_OLD = 'GeoHazards';
export const URL_PARAM_DAYSBACK = 'daysBack';
export const URL_PARAM_FROMDATE = 'fromDate';
export const URL_PARAM_TODATE = 'toDate';
export const URL_PARAM_NICKNAME = 'nick';
export const URL_PARAM_COMPETENCE = 'competence';
export const URL_PARAM_REGISTRATION_TYPE = 'type';
export const URL_PARAM_SLUSH_FLOW = 'slushFlow';
export const URL_PARAM_ORDER_BY = 'orderBy';
export const URL_PARAM_REGION = 'regions';
export const URL_PARAM_ARRAY_DELIMITER = '~'; //https://www.rfc-editor.org/rfc/rfc3986#section-2.3
const VALID_GEO_HAZARDS = new Set([[60, 20], [70], [10]]);

export function isGeoHazardValid(hazards: number[]): boolean {
  hazards.sort((a, b) => b - a);
  let isValid = false;
  for (const haz of VALID_GEO_HAZARDS) {
    if (haz.toString() === hazards.toString()) {
      isValid = true;
      break;
    }
  }
  return isValid;
}

export function separatedStringToNumberArray(separatedString: string): number[] {
  if (separatedString?.length) {
    // TODO: Typescript compiler cant find replaceAll on string, we should consider changing to a later es spec
    const hasReplaceAll = separatedString as unknown as {
      replaceAll: (toReplace: string, replaceWith: string) => string;
    };
    const textWithoutDelimiter = hasReplaceAll.replaceAll(URL_PARAM_ARRAY_DELIMITER, '');
    const textContainsOnlyNumbers = !isNaN(+textWithoutDelimiter);
    if (textContainsOnlyNumbers) {
      return separatedString
        .split(URL_PARAM_ARRAY_DELIMITER)
        .filter((x) => x.trim().length && !isNaN(parseInt(x)))
        .map(Number);
    }
  }
  return [];
}

/**
 * A helper class to change url query parameters.
 * Usage: new UrlParams.set('hazard', 10).set('nick', 'siggen').apply()
 */
export class UrlParams {
  private params = new URLSearchParams(document.location.search);

  /**
   * Add a query parameter and a value
   * @param key parameter name
   * @param value if value is null, the parameter will be deleted from the url
   */
  set(key: string, value: unknown): UrlParams {
    if (value) {
      if (Array.isArray(value)) {
        this.params.delete(key);
        value.forEach((v) => this.params.append(key, '' + v));
      } else {
        this.params.set(key, '' + value);
      }
    } else {
      this.delete(key);
    }
    return this;
  }

  delete(key: string): UrlParams {
    this.params.delete(key);
    return this;
  }

  apply(): UrlParams {
    const newRelativePathQuery = window.location.pathname + '?' + this.params.toString();
    history.pushState(null, '', newRelativePathQuery);
    return this;
  }
}
