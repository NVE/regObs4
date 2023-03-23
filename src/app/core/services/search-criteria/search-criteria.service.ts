import { Injectable } from '@angular/core';
import L from 'leaflet';
import moment from 'moment';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  firstValueFrom,
  map,
  Observable,
  ReplaySubject,
  scan,
  shareReplay,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { Immutable } from 'src/app/core/models/immutable';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import {
  PositionDto,
  RegistrationTypeCriteriaDto,
  SearchCriteriaRequestDto,
  WithinExtentCriteriaDto,
} from 'src/app/modules/common-regobs-api';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { UrlParams } from './url-params';
import { URL_PARAM_NW_LAT, URL_PARAM_NW_LON, URL_PARAM_SE_LAT, URL_PARAM_SE_LON } from './coordinatesUrl';
import { isoDateTimeToLocalDate, convertToIsoDateTime } from '../../../modules/common-core/helpers/date-converters';

export type SearchCriteriaOrderBy = 'DtObsTime' | 'DtChangeTime';

const UrlDtoOrderByMap = new Map([
  ['changeTime', 'DtChangeTime'],
  ['obsTime', 'DtObsTime'],
]);
export const AUTOMATIC_STATIONS = 105;

const DEBUG_TAG = 'SearchCriteriaService';
const URL_PARAM_GEOHAZARD = 'hazard';
const URL_PARAM_GEOHAZARDS_OLD = 'GeoHazards';
const URL_PARAM_DAYSBACK = 'daysBack';
const URL_PARAM_FROMDATE = 'fromDate';
const URL_PARAM_TODATE = 'toDate';
const URL_PARAM_NICKNAME = 'nick';
const URL_PARAM_COMPETENCE = 'competence';
const URL_PARAM_TYPE = 'type';
const URL_PARAM_ORDER_BY = 'orderBy';
const URL_PARAM_ARRAY_DELIMITER = '~'; //https://www.rfc-editor.org/rfc/rfc3986#section-2.3
const VALID_GEO_HAZARDS = new Set([[60, 20], [70], [10]]);

const latLngToPositionDto = (latLng: L.LatLng): PositionDto => ({
  Latitude: latLng.lat,
  Longitude: latLng.lng,
});

export function separatedStringToNumberArray(separatedString: string): number[] {
  if (separatedString?.length) {
    const textWithoutDelimiter = separatedString.replace(URL_PARAM_ARRAY_DELIMITER, '');
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

function competenceFromUrlToDto(competence: string): number[] {
  if (competence && !isCompetenceUrlValid(competence)) return;
  return competence ? competence.split(URL_PARAM_ARRAY_DELIMITER).map((c) => parseInt(c)) : null;
}

function competenceFromDtoToUrl(competence: number[]): string {
  return competence ? competence.join(URL_PARAM_ARRAY_DELIMITER) : null;
}

//DtObsTime => obsTime
function convertApiOrderByToUrl(value: SearchCriteriaOrderBy): string {
  if (value) {
    const keyValue = [...UrlDtoOrderByMap].find(([key, val]) => val == value)[0];
    return keyValue;
  }
  return null;
}

function numberArrayToSeparatedString(numbers: number[]): string {
  if (numbers?.length) {
    return numbers.join(URL_PARAM_ARRAY_DELIMITER);
  }
  return '';
}

function isGeoHazardValid(hazards: number[]): boolean {
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

function isCompetenceUrlValid(competence: string): RegExpMatchArray {
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
  if (!isRegTypeValid(type)) return;
  //81.15~81.26~13 => [['81', '15'], ['81', '26'], ['13]]
  const splitUrlToArray = type.split('~').map((i) => i.split('.'));
  //[['81', '15'], ['81', '26'], ['13]] => [{Id: 81, SubTypes: [15,26]}, {Id:13, SubTypes: []}]
  const regTypeCriteriaDto = splitUrlToArray
    .map((i) => {
      return { Id: parseInt(i[0]), SubTypes: i[1] ? [parseInt(i[1])] : [] };
    })
    .reduce((obj, item) => {
      obj[item.Id] ? obj[item.Id].SubTypes.push(...item.SubTypes) : (obj[item.Id] = { ...item });
      return obj;
    }, {});
  return Object.values(regTypeCriteriaDto);
}

//[{Id: 80, SubTypes: [26,11]}] => 80.11~80.26
function convertRegTypeDtoToUrl(types: RegistrationTypeCriteriaDto[]) {
  if (types != null) {
    const url = [] as string[];
    types.forEach((type) => {
      const parentId = type.Id;
      if (type.SubTypes.length > 0) {
        type.SubTypes.forEach((subtype) => url.push(`${parentId}.${subtype}`));
      } else {
        url.push(parentId.toString());
      }
    });
    return url.join('~');
  }
  return '';
}

/**
 * Contains current filter for registrations.
 * Use this to change which registrations you want to find.
 *
 * Also responsible for saving the filter as query params in the url.
 * Initializes filter from url query params on startup.
 * The URL should be short, easily readable for the user and easy to type.
 * Multi-select parameters, like geoHazard and type should be represented as a delimited list, example:
 * geoHazard=20~60&type=21~22~36
 *
 * TODO: Vi håndterer ikke alle URL-parametre ennå
 */
@Injectable({
  providedIn: 'root',
})
export class SearchCriteriaService {
  // Jeg tror searchCriteria må være en ReplaySubject for at vi skal være sikre på at scan fungerer som tenkt,
  // i tillfelle noen subscriber sent på searchCriteria$, og vi i mellomtiden har oppdatert søkrekriterier via
  // this.searchCriteria.next(...).
  // Fordelen med å bruke en replaysubject her er faktisk at historikken for søkrekriteriene huskes, som kan være
  // interessant å logge hvis man får en error feks.
  // For å logge alle valg brukeren har gjort som påvirker searchCriteria-subjecten kan man
  // feks gjøre som på linje 60 - 64
  private searchCriteriaChanges: Subject<SearchCriteriaRequestDto> = new ReplaySubject<SearchCriteriaRequestDto>();

  private useDaysBack: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get useDaysBack$(): Observable<boolean> {
    return this.useDaysBack.asObservable();
  }

  private useMapExtent: Subject<boolean> = new BehaviorSubject<boolean>(true);
  get useMapExtent$() {
    return this.useMapExtent.asObservable();
  }
  private currentGeoHazard: GeoHazard[];
  resetEvent: Subject<void> = new Subject();
  /**
   * Current filter. Current language and geo hazards are always included
   */
  readonly searchCriteria$: Observable<Immutable<SearchCriteriaRequestDto>>;

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private logger: LoggingService
  ) {
    const criteria = this.readUrlParams();
    this.logger.debug('Criteria from URL params: ', DEBUG_TAG, criteria);

    // Log last 10 changes made (nb, does not include langKey, extent etc, and only logs the change, not entire critera)
    this.searchCriteriaChanges
      .pipe(scan((history, currentCriteriaChange) => [...history, currentCriteriaChange].slice(-10), []))
      .subscribe((history) => this.logger.debug('Change history (last 10)', DEBUG_TAG, history));

    this.searchCriteria$ = combineLatest([
      this.searchCriteriaChanges.pipe(
        startWith(criteria),
        // Akkumuler alle søkekriterier vi setter via searchCriteria-subjecten
        scan(
          (allSearchCriteria, newSearchCriteria) => ({ ...allSearchCriteria, ...newSearchCriteria }),
          {} as SearchCriteriaRequestDto
        )
      ),
      this.userSettingService.language$,
      this.userSettingService.currentGeoHazard$.pipe(
        tap((geohazard) => {
          this.currentGeoHazard !== undefined && this.resetSearchCriteria();
          this.currentGeoHazard = geohazard;
        })
      ),
      this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
        map((daysBack) => this.daysBackToIsoDateTime(daysBack))
      ),
      this.useMapExtent$,
      this.mapService.mapView$.pipe(
        map((mapView) => {
          return this.createExtentCriteria(mapView);
        })
      ),
    ]).pipe(
      // Kombiner søkerekriterer som ligger utenfor denne servicen med de vi har i denne servicen, feks valgt språk.
      // Vi overskriver utvalgte søkekriterier med de som settes manuelt i filtermenyen:
      // - FromDtObsTime: fromDate URL param
      debounceTime(50),
      map(
        ([criteria, langKey, geoHazards, fromObsTime, useMapExtent, extent]: [
          SearchCriteriaRequestDto,
          LangKey,
          GeoHazard[],
          string,
          boolean,
          WithinExtentCriteriaDto
        ]) => {
          return {
            ...criteria,
            LangKey: langKey,
            SelectedGeoHazards: geoHazards,
            FromDtObsTime: convertToIsoDateTime(criteria.FromDtObsTime || fromObsTime),
            Extent: useMapExtent ? extent : null,
          };
        }
      ),
      tap((currentCriteria) => this.logger.debug('Current combined criteria', DEBUG_TAG, currentCriteria)),
      shareReplay(1)
    );
  }

  async resetSearchCriteria() {
    const criteria: SearchCriteriaRequestDto = {
      ObserverCompetence: null,
      SelectedRegistrationTypes: null,
      ObserverNickName: null,
      FromDtObsTime: null,
      ToDtObsTime: null,
    };
    this.useDaysBack.next(true);
    this.searchCriteriaChanges.next(criteria);
    this.resetEvent.next();
  }

  // build search criteria from url parameters. Some params are stored in user settings
  private readUrlParams(): SearchCriteriaRequestDto {
    const url = new URL(document.location.href);

    const geoHazards = this.readGeoHazardsFromUrl(url.searchParams);
    const orderBy = this.readOrderBy(url.searchParams.get(URL_PARAM_ORDER_BY));

    const daysBack = url.searchParams.get(URL_PARAM_DAYSBACK);
    const daysBackNumeric = this.convertToPositiveInteger(daysBack);

    let fromObsTime: string;
    if (url.searchParams.get(URL_PARAM_FROMDATE)) {
      fromObsTime = convertToIsoDateTime(url.searchParams.get(URL_PARAM_FROMDATE));
    }
    if (daysBackNumeric != null) {
      fromObsTime = this.daysBackToIsoDateTime(daysBackNumeric);
    }

    let toObsTime: string;
    if (url.searchParams.get(URL_PARAM_TODATE)) {
      toObsTime = convertToIsoDateTime(url.searchParams.get(URL_PARAM_TODATE), 'end');
    }

    if (fromObsTime && toObsTime) {
      this.useDaysBack.next(false);
    }

    const nickName = url.searchParams.get(URL_PARAM_NICKNAME);
    const observerCompetence = competenceFromUrlToDto(url.searchParams.get(URL_PARAM_COMPETENCE));
    const type = url.searchParams.get(URL_PARAM_TYPE);
    const convertTypeFromUrlToCriteria = type != null ? convertRegTypeFromUrlToDto(type) : null;

    //I recommend to add spread operator on optional properties so that we dont send 'null' values to API.
    //example: ...(nickName && {ObserverCompetence: nickname})
    const criteria = {
      SelectedGeoHazards: geoHazards,
      FromDtObsTime: fromObsTime,
      ObserverNickName: nickName,
      ObserverCompetence: observerCompetence,
      SelectedRegistrationTypes: convertTypeFromUrlToCriteria,
      ToDtObsTime: toObsTime,
      OrderBy: orderBy,
    } as SearchCriteriaRequestDto;

    this.userSettingService.saveGeoHazardsAndDaysBack({ geoHazards: geoHazards, daysBack: daysBackNumeric });
    return criteria;
  }

  private readOrderBy(orderBy: string): string {
    return UrlDtoOrderByMap.get(orderBy);
  }

  private readGeoHazardsFromUrl(searchParams: URLSearchParams): number[] {
    let geoHazards: number[] = [GeoHazard.Snow];

    //read param used in (old) regobs.no
    const geoHazardsParamValueOld = searchParams.getAll(URL_PARAM_GEOHAZARDS_OLD);
    if (geoHazardsParamValueOld?.length) {
      geoHazards = geoHazardsParamValueOld.filter((x) => x.trim().length && !isNaN(parseInt(x))).map(Number);
      new UrlParams().delete(URL_PARAM_GEOHAZARDS_OLD).apply(); //we will create url params in new format instead
    }

    //read param on new format
    const geoHazardsParamValue = searchParams.get(URL_PARAM_GEOHAZARD);
    if (geoHazardsParamValue?.length > 0) {
      const geoHazardsToArray = separatedStringToNumberArray(geoHazardsParamValue);
      isGeoHazardValid(geoHazardsToArray) && (geoHazards = geoHazardsToArray);
    }

    return geoHazards;
  }

  async applyQueryParams() {
    const currentCriteria = (await firstValueFrom(this.searchCriteria$)) as SearchCriteriaRequestDto;
    currentCriteria && this.setUrlParams(currentCriteria);
  }

  private setUrlParams(criteria: SearchCriteriaRequestDto) {
    const params = new UrlParams();
    params.set(URL_PARAM_GEOHAZARD, numberArrayToSeparatedString(criteria.SelectedGeoHazards));
    params.set(URL_PARAM_FROMDATE, isoDateTimeToLocalDate(criteria.FromDtObsTime));
    params.set(URL_PARAM_TODATE, isoDateTimeToLocalDate(criteria.ToDtObsTime));
    params.set(URL_PARAM_NICKNAME, criteria.ObserverNickName);
    params.set(URL_PARAM_COMPETENCE, competenceFromDtoToUrl(criteria.ObserverCompetence));
    params.set(URL_PARAM_TYPE, convertRegTypeDtoToUrl(criteria.SelectedRegistrationTypes));
    params.set(URL_PARAM_ORDER_BY, convertApiOrderByToUrl(criteria.OrderBy as SearchCriteriaOrderBy));

    if (criteria.Extent != null) {
      params.set(URL_PARAM_NW_LAT, +criteria.Extent.TopLeft.Latitude.toFixed(4));
      params.set(URL_PARAM_NW_LON, +criteria.Extent.TopLeft.Longitude.toFixed(4));
      params.set(URL_PARAM_SE_LAT, +criteria.Extent.BottomRight.Latitude.toFixed(4));
      params.set(URL_PARAM_SE_LON, +criteria.Extent.BottomRight.Longitude.toFixed(4));
    } else {
      params.delete(URL_PARAM_NW_LAT);
      params.delete(URL_PARAM_NW_LON);
      params.delete(URL_PARAM_SE_LAT);
      params.delete(URL_PARAM_SE_LON);
    }
    params.apply();
  }

  private convertToPositiveInteger(value: string): number {
    if (typeof value !== 'string') {
      return null;
    }
    const numericValue = Number(value);
    if (Number.isInteger(numericValue) && numericValue > 0) {
      return numericValue;
    }
    return null;
  }

  setObserverNickName(nickName: string) {
    this.searchCriteriaChanges.next({ ObserverNickName: nickName });
  }

  setCompetence(competenceCriteria: number[]) {
    //[105, 120, 130]   //[140, 130]
    if (!competenceCriteria) {
      this.searchCriteriaChanges.next({ ObserverCompetence: null });
      return;
    }
    const removedDuplicates = competenceCriteria.reduce((compArr, item) => {
      if (!compArr.includes(item)) compArr.push(item);
      return compArr;
    }, [] as number[]);
    this.searchCriteriaChanges.next({ ObserverCompetence: removedDuplicates });
  }

  setFromDate(fromDate: string, removeToDate = false) {
    const dateCriteria: Pick<SearchCriteriaRequestDto, 'FromDtObsTime' | 'ToDtObsTime'> = {};
    if (fromDate) {
      dateCriteria.FromDtObsTime = moment(fromDate).startOf('day').toISOString(true);
      if (removeToDate) {
        dateCriteria.ToDtObsTime = null;
      }
    }

    this.searchCriteriaChanges.next(dateCriteria);
  }

  setToDate(toDate: string) {
    if (toDate) {
      this.searchCriteriaChanges.next({ ToDtObsTime: moment(toDate).endOf('day').toISOString(true) });
    }
  }

  async setObservationType(newType: RegistrationTypeCriteriaDto) {
    const { SelectedRegistrationTypes: currentTypesCriteria } = await firstValueFrom(this.searchCriteria$);

    if (currentTypesCriteria) {
      const copyCriteria = [...currentTypesCriteria] as RegistrationTypeCriteriaDto[];
      const criteriaToUpdateIndex = copyCriteria.findIndex((i) => i.Id === newType.Id);

      if (criteriaToUpdateIndex != -1) {
        copyCriteria[criteriaToUpdateIndex].SubTypes = [
          ...copyCriteria[criteriaToUpdateIndex].SubTypes,
          ...newType.SubTypes,
        ];
        this.searchCriteriaChanges.next({ SelectedRegistrationTypes: copyCriteria });
      } else
        this.searchCriteriaChanges.next({
          SelectedRegistrationTypes: [...(currentTypesCriteria as RegistrationTypeCriteriaDto[]), newType],
        });
    } else this.searchCriteriaChanges.next({ SelectedRegistrationTypes: [newType] });
  }

  async removeObservationType(typeToRemove: RegistrationTypeCriteriaDto) {
    const { SelectedRegistrationTypes: currentTypesCriteria } = await firstValueFrom(this.searchCriteria$);
    if (currentTypesCriteria) {
      const copyCriteria = [...currentTypesCriteria] as RegistrationTypeCriteriaDto[];

      const criteriaToUpdateWithIndex = copyCriteria.findIndex((criteria) => criteria.Id == typeToRemove.Id);

      if (!(criteriaToUpdateWithIndex >= 0)) return;
      //compare chosen object with existing one and if they are the same (no SubTypes differences) remove it from criteria
      if (JSON.stringify(copyCriteria[criteriaToUpdateWithIndex]) == JSON.stringify(typeToRemove)) {
        copyCriteria.splice(criteriaToUpdateWithIndex, 1);
        this.searchCriteriaChanges.next({ SelectedRegistrationTypes: copyCriteria });
      }
      //if not then it means there are subtypes differences so remove the subtypes from the current criterias
      else {
        //{Id:81, SubTypes: [33,23]} => {Id:81, SubTypes: [33]} remove typeToRemove subtypes from current criteria
        const [subTypeValueToRemove] = typeToRemove.SubTypes;
        const subTypesToRemoveWithIndex =
          copyCriteria[criteriaToUpdateWithIndex].SubTypes.indexOf(subTypeValueToRemove);
        copyCriteria[criteriaToUpdateWithIndex].SubTypes.splice(subTypesToRemoveWithIndex, 1);
        this.searchCriteriaChanges.next({ SelectedRegistrationTypes: copyCriteria });
      }
    }
  }

  setOrderBy(order: SearchCriteriaOrderBy) {
    this.searchCriteriaChanges.next({ OrderBy: order });
  }

  async removeAutomaticStations() {
    const { ObserverCompetence: currentObserverCriteria } = await firstValueFrom(this.searchCriteria$);
    if (currentObserverCriteria) {
      const copyCriteria = [...currentObserverCriteria] as number[];
      const removed = copyCriteria.filter((i) => i !== AUTOMATIC_STATIONS);
      this.searchCriteriaChanges.next({ ObserverCompetence: removed });
    }
  }

  async setAutomaticStations() {
    const { ObserverCompetence: currentObserverCriteria } = await firstValueFrom(this.searchCriteria$);

    if (currentObserverCriteria?.length > 0) {
      const copyCriteria = [...currentObserverCriteria] as number[];
      copyCriteria.push(AUTOMATIC_STATIONS);
      this.searchCriteriaChanges.next({ ObserverCompetence: copyCriteria });
    }
  }

  setExtentFilterActive(isExtentFilterActive: boolean) {
    this.useMapExtent.next(isExtentFilterActive);
  }

  private daysBackToIsoDateTime(daysBack: number): string {
    return moment().subtract(daysBack, 'days').startOf('day').toISOString(true);
  }

  private createExtentCriteria(mapView: IMapView): WithinExtentCriteriaDto {
    if (mapView?.bounds) {
      const extent: WithinExtentCriteriaDto = {
        BottomRight: latLngToPositionDto(mapView.bounds.getSouthEast()),
        TopLeft: latLngToPositionDto(mapView.bounds.getNorthWest()),
      };
      return extent;
    }
    return null;
  }
}
