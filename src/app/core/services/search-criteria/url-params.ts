import { RegistrationTypeCriteriaDto } from 'src/app/modules/common-regobs-api';

export const URL_PARAM_NW_LAT = 'nwLat';
export const URL_PARAM_NW_LON = 'nwLon';
export const URL_PARAM_SE_LAT = 'seLat';
export const URL_PARAM_SE_LON = 'seLon';
export const URL_PARAM_GEOHAZARD = 'hazard';
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

// gamle url-parametre som ble brukt av regobs.no fram til mai 2025, som vi fortsatt støtter
type OldParamMapper = (params: URLSearchParams, oldKey: string, newKey: string) => string | undefined;

interface OldParamConfig {
  oldKey: string;
  newKey: string;
  mapper?: OldParamMapper;
}

const OLD_PARAM_CONFIG: OldParamConfig[] = [
  { oldKey: 'NWLat', newKey: URL_PARAM_NW_LAT },
  { oldKey: 'NWLon', newKey: URL_PARAM_NW_LON },
  { oldKey: 'SELat', newKey: URL_PARAM_SE_LAT },
  { oldKey: 'SELon', newKey: URL_PARAM_SE_LON },
  { oldKey: 'GeoHazards', newKey: URL_PARAM_GEOHAZARD },
  { oldKey: 'SelectedNumberOfDays', newKey: URL_PARAM_DAYSBACK },
  { oldKey: 'FromDate', newKey: URL_PARAM_FROMDATE },
  { oldKey: 'ToDate', newKey: URL_PARAM_TODATE },
  { oldKey: 'ObserverNickName', newKey: URL_PARAM_NICKNAME },
  {
    oldKey: 'SelectedRegistrationTypes',
    newKey: URL_PARAM_REGISTRATION_TYPE,
    mapper: (params, oldKey) => {
      const values = params.getAll(oldKey);
      const parsedValues = values
        .map((v) => {
          try {
            return JSON.parse(v);
          } catch (error) {
            return undefined;
          }
        })
        .filter((v) => v !== undefined);
      return convertRegTypeDtoToUrl(parsedValues);
    },
  },
  {
    oldKey: 'SelectedRegions',
    newKey: URL_PARAM_REGION,
    mapper: (params, oldKey) => {
      const values = params.getAll(oldKey);
      const unique = values.filter((v, i, arr) => arr.indexOf(v) === i);
      return arrayToSeparatedString(unique);
    },
  },
];

const VALID_GEO_HAZARDS = new Set([[60, 20], [70], [10]]);

function defaultMapper(params: URLSearchParams, oldKey: string) {
  return params.get(oldKey);
}

/**
 * NB: Modifies passed in params
 */
export function mapOldParamsToNew(params: URLSearchParams): void {
  for (const config of OLD_PARAM_CONFIG) {
    const { oldKey, newKey } = config;
    if (!params.has(oldKey)) continue;

    const mapper = config.mapper || defaultMapper;
    const value = mapper(params, oldKey, newKey);
    if (value != undefined && value !== '') {
      params.set(newKey, value);
    }
    params.delete(oldKey);
  }
}

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
 * Bruk denne til å sette eller fjerne url-parametre.
 * Eksempel: new UrlParams.set('hazard', 10).set('nick', 'siggen')
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

  entries() {
    return Object.fromEntries(this.params.entries());
  }
}

//[{Id: 80, SubTypes: [26,11]}] => 80.11~80.26
export function convertRegTypeDtoToUrl(types?: RegistrationTypeCriteriaDto[]) {
  if (types != null) {
    const url = [] as string[];
    types.forEach((type) => {
      const parentId = type.Id;
      if (type.SubTypes && type.SubTypes.length > 0) {
        type.SubTypes.forEach((subtype) => url.push(`${parentId}.${subtype}`));
      } else {
        url.push(parentId.toString());
      }
    });
    return url.join('~');
  }
  return;
}

export function arrayToSeparatedString<T extends number | string>(values: T[] | undefined): string | undefined {
  if (values?.length) {
    return values.join(URL_PARAM_ARRAY_DELIMITER);
  }
  return;
}
