import { convertToIsoDateTime, isoDateTimeToLocalDate } from 'src/app/modules/common-core/helpers/date-converters';
import {
  RegistrationTypeCriteriaDto,
  SearchCriteriaRequestDto,
  WithinExtentCriteriaDto,
} from 'src/app/modules/common-regobs-api';
import { isSlushFlow } from './slush-flow';

export const URL_PARAM_NW_LAT = 'nwLat';
export const URL_PARAM_NW_LON = 'nwLon';
export const URL_PARAM_SE_LAT = 'seLat';
export const URL_PARAM_SE_LON = 'seLon';
export const URL_PARAM_GEOHAZARD = 'hazard';
export const URL_PARAM_DAYSBACK = 'daysBack';
export const URL_PARAM_FROMDATE = 'fromDate';
export const URL_PARAM_TODATE = 'toDate';
const URL_PARAM_NICKNAME = 'nick';
const URL_PARAM_COMPETENCE = 'competence';
const URL_PARAM_REGISTRATION_TYPE = 'type';
const URL_PARAM_SLUSH_FLOW = 'slushFlow';
const URL_PARAM_ORDER_BY = 'orderBy';
const URL_PARAM_REGION = 'regions';
const URL_PARAM_ARRAY_DELIMITER = '~'; //https://www.rfc-editor.org/rfc/rfc3986#section-2.3

/**
 * Removes 'optional' attributes
 * Copied from https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers
 */
type Concrete<Type> = {
  [Property in keyof Type]-?: Concrete<Type[Property]>;
};

const URL_COORDS_PRECISION = 4;

const URL_PARAM_CHANGE_TIME = 'changeTime';
const URL_PARAM_OBS_TIME = 'obsTime';
const UrlDtoOrderByMap = {
  [URL_PARAM_CHANGE_TIME]: 'DtChangeTime',
  [URL_PARAM_OBS_TIME]: 'DtObsTime',
} as const;

type OldParamMapper = (params: URLSearchParams, oldKey: string, newKey: string) => string | undefined;

interface OldParamConfig {
  oldKey: string;
  newKey?: string;
  mapper?: OldParamMapper;
}

// gamle url-parametre som ble brukt av regobs.no fram til mai 2025
const OLD_PARAM_CONFIG: OldParamConfig[] = [
  { oldKey: 'NWLat', newKey: URL_PARAM_NW_LAT },
  { oldKey: 'NWLon', newKey: URL_PARAM_NW_LON },
  { oldKey: 'SELat', newKey: URL_PARAM_SE_LAT },
  { oldKey: 'SELon', newKey: URL_PARAM_SE_LON },
  {
    oldKey: 'GeoHazards',
    newKey: URL_PARAM_GEOHAZARD,
    mapper: (params, oldKey) => {
      const values = params.getAll(oldKey);
      return arrayToSeparatedString(values);
    },
  },
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

  {
    oldKey: 'ObserverCompetence',
    newKey: URL_PARAM_COMPETENCE,
    mapper: (params, oldKey) => {
      const values = params.getAll(oldKey);
      return arrayToSeparatedString(values);
    },
  },

  // Entries without newKey will be deleted
  { oldKey: 'Countries' },
  { oldKey: 'SupportMaps' },
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

    if (!params.has(oldKey)) {
      continue;
    }

    if (newKey !== undefined) {
      const mapper = config.mapper || defaultMapper;
      const value = mapper(params, oldKey, newKey);
      if (value != undefined && value !== '') {
        params.set(newKey, value);
      }
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
class UrlParams {
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
function convertRegTypeDtoToUrl(types?: RegistrationTypeCriteriaDto[]) {
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

function arrayToSeparatedString<T extends number | string>(values: T[] | undefined): string | undefined {
  if (values?.length) {
    return values.join(URL_PARAM_ARRAY_DELIMITER);
  }
  return;
}

function competenceFromDtoToUrl(competence?: number[]): string | undefined {
  return competence ? competence.join(URL_PARAM_ARRAY_DELIMITER) : undefined;
}

//DtObsTime => obsTime
function convertApiOrderByToUrl(value: SearchCriteriaRequestDto['OrderBy']): string | undefined {
  if (value) {
    const orderBy = Object.entries(UrlDtoOrderByMap).find(([, val]) => val == value);
    if (orderBy?.[0] != null) {
      return orderBy[0];
    }
  }
  return;
}

function isValidExtent(extent?: WithinExtentCriteriaDto): extent is Concrete<WithinExtentCriteriaDto> {
  if (extent == null) {
    return false;
  }
  for (const cornerProp of ['TopLeft', 'BottomRight'] as const) {
    if (extent[cornerProp] == null) {
      return false;
    }
    for (const coordProp of ['Latitude', 'Longitude'] as const) {
      if (extent[cornerProp][coordProp] == null) {
        return false;
      }
    }
  }
  return true;
  // params.set(URL_PARAM_NW_LAT, +criteria.Extent.TopLeft.Latitude.toFixed(ULR_COORDS_PRECISION));
  // params.set(URL_PARAM_NW_LON, +criteria.Extent.TopLeft.Longitude.toFixed(ULR_COORDS_PRECISION));
  // params.set(URL_PARAM_SE_LAT, +criteria.Extent.BottomRight.Latitude.toFixed(ULR_COORDS_PRECISION));
  // params.set(URL_PARAM_SE_LON, +criteria.Extent.BottomRight.Longitude.toFixed(ULR_COORDS_PRECISION));
}

function setExtentParams(params: UrlParams, criteria: SearchCriteriaRequestDto): UrlParams {
  if (isValidExtent(criteria.Extent)) {
    params.set(URL_PARAM_NW_LAT, +criteria.Extent.TopLeft.Latitude.toFixed(URL_COORDS_PRECISION));
    params.set(URL_PARAM_NW_LON, +criteria.Extent.TopLeft.Longitude.toFixed(URL_COORDS_PRECISION));
    params.set(URL_PARAM_SE_LAT, +criteria.Extent.BottomRight.Latitude.toFixed(URL_COORDS_PRECISION));
    params.set(URL_PARAM_SE_LON, +criteria.Extent.BottomRight.Longitude.toFixed(URL_COORDS_PRECISION));
  } else {
    params.delete(URL_PARAM_NW_LAT);
    params.delete(URL_PARAM_NW_LON);
    params.delete(URL_PARAM_SE_LAT);
    params.delete(URL_PARAM_SE_LON);
  }
  return params;
}

function setSlushFlowParam(params: UrlParams, criteria: SearchCriteriaRequestDto): UrlParams {
  if (isSlushFlow(criteria)) {
    params.set(URL_PARAM_SLUSH_FLOW, true);
  } else {
    params.delete(URL_PARAM_SLUSH_FLOW);
  }
  return params;
}

function setDateParams(params: UrlParams, criteria: SearchCriteriaRequestDto, daysBack?: number): UrlParams {
  if (daysBack != null) {
    params.set(URL_PARAM_DAYSBACK, daysBack.toString()); // Convert to string so that 0 is accepted as a value
    params.delete(URL_PARAM_FROMDATE);
    params.delete(URL_PARAM_TODATE);
  } else {
    params.delete(URL_PARAM_DAYSBACK);
    params.set(URL_PARAM_FROMDATE, isoDateTimeToLocalDate(criteria.FromDtObsTime));
    params.set(URL_PARAM_TODATE, isoDateTimeToLocalDate(criteria.ToDtObsTime));
  }
  return params;
}

export function toUrlParams(criteria: SearchCriteriaRequestDto, daysBack?: number): UrlParams {
  const params = new UrlParams();
  params.set(URL_PARAM_GEOHAZARD, arrayToSeparatedString(criteria.SelectedGeoHazards));
  params.set(URL_PARAM_NICKNAME, criteria.ObserverNickName);
  params.set(URL_PARAM_COMPETENCE, competenceFromDtoToUrl(criteria.ObserverCompetence));
  params.set(URL_PARAM_REGISTRATION_TYPE, convertRegTypeDtoToUrl(criteria.SelectedRegistrationTypes));
  params.set(URL_PARAM_ORDER_BY, convertApiOrderByToUrl(criteria.OrderBy));
  params.set(URL_PARAM_REGION, arrayToSeparatedString(criteria.SelectedRegions));
  setDateParams(params, criteria, daysBack);
  setSlushFlowParam(params, criteria);
  setExtentParams(params, criteria);
  return params;
}

function competenceFromUrlToDto(competence?: string | null): SearchCriteriaRequestDto['ObserverCompetence'] {
  if (competence == null) {
    return undefined;
  }
  if (!isCompetenceUrlValid(competence)) {
    return undefined;
  }
  return competence.split(URL_PARAM_ARRAY_DELIMITER).map((c) => parseInt(c));
}

function isCompetenceUrlValid(competence: string): RegExpMatchArray | null {
  //check if its a sequence of numbers to max 3 digits with optional tilde as param
  const regex = /^(\b\d{0,3}\b~?)*$/g;
  const isValid = competence.match(regex);
  return isValid;
}

function isRegTypeValid(type: string) {
  //accepts only two digits or two digits with coma, and optional tilde as delimiter
  const regex = /^((\b\d{2}\b~?)|(\b\d{2}\.\d{2}\b~?))*$/g;
  const found = type.match(regex);
  return found;
}

//81.15~81.26 => [{Id: 81, SubTypes: [15,26]}]
function convertRegTypeFromUrlToDto(type: string): RegistrationTypeCriteriaDto[] {
  if (!isRegTypeValid(type)) return [];
  //81.15~81.26~13 => [['81', '15'], ['81', '26'], ['13]]
  const splitUrlToArray = type.split('~').map((i) => i.split('.'));
  //[['81', '15'], ['81', '26'], ['13]] => [{Id: 81, SubTypes: [15,26]}, {Id:13, SubTypes: []}]
  const regTypeCriteriaDto = splitUrlToArray
    .map((i) => {
      return { Id: parseInt(i[0]), SubTypes: i[1] ? [parseInt(i[1])] : [] };
    })
    .reduce(
      (obj, item) => {
        obj[item.Id] ? (obj[item.Id].SubTypes || []).push(...item.SubTypes) : (obj[item.Id] = { ...item });
        return obj;
      },
      {} as { [key: number]: RegistrationTypeCriteriaDto }
    );
  return Object.values(regTypeCriteriaDto);
}

/**
 * Hjelpemetode for å lese verdier fra query parametere
 */
export const readParamsFromDoc = (doc: Document) => {
  const url = new URL(doc.location.href);

  const readValue = (key: string) => {
    const value = url.searchParams.get(key);
    if (value) {
      return value;
    }
    return undefined;
  };

  const readDate = (key: string, startOrEnd?: 'end') => {
    if (url.searchParams.has(key)) {
      return convertToIsoDateTime(url.searchParams.get(key), startOrEnd);
    }
    return undefined;
  };

  return {
    nick: () => readValue(URL_PARAM_NICKNAME),
    fromTime: () => readDate(URL_PARAM_FROMDATE),
    toTime: () => readDate(URL_PARAM_TODATE, 'end'),
    orderBy: () => {
      const value = readValue(URL_PARAM_ORDER_BY);
      if (value === URL_PARAM_CHANGE_TIME || value === URL_PARAM_OBS_TIME) {
        return UrlDtoOrderByMap[value];
      }
      return undefined;
    },
    slushFlow: () => readValue(URL_PARAM_SLUSH_FLOW) === 'true',
    competence: () => competenceFromUrlToDto(readValue(URL_PARAM_COMPETENCE)),
    regTypes: () => {
      const value = readValue(URL_PARAM_REGISTRATION_TYPE);
      return value != null ? convertRegTypeFromUrlToDto(value) : [];
    },
    regions: () => {
      const value = readValue(URL_PARAM_REGION);
      return value ? separatedStringToNumberArray(value) : [];
    },
  };
};
