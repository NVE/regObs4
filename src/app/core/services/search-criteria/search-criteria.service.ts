import { Injectable } from '@angular/core';
import moment from 'moment';
import {
  combineLatest,
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
import { GeoHazard } from 'src/app/modules/common-core/models';
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

export type SearchCriteriaOrderBy = 'DtObsTime' | 'DtChangeTime';

const UrlDtoOrderByMap = new Map([
  ['changeTime', 'DtChangeTime'],
  ['obsTime', 'DtObsTime'],
]);

const DEBUG_TAG = 'SearchCriteriaService';
const URL_PARAM_GEOHAZARD = 'hazard';
const URL_PARAM_GEOHAZARDS_OLD = 'GeoHazards';
const URL_PARAM_DAYSBACK = 'daysBack';
const URL_PARAM_FROMDATE = 'fromDate';
const URL_PARAM_TODATE = 'toDate';
const URL_PARAM_NICKNAME = 'nick';
const URL_PARAM_TYPE = 'type';
const URL_PARAM_ORDER_BY = 'orderBy';
const URL_PARAM_ARRAY_DELIMITER = '~'; //https://www.rfc-editor.org/rfc/rfc3986#section-2.3

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

//DtObsTime => obsTime
function convertApiOrderByToUrl(value: SearchCriteriaOrderBy): string {
  if (value) {
    return [...UrlDtoOrderByMap].find(([, val]) => val == value)[0];
  }
  return null;
}

function numberArrayToSeparatedString(numbers: number[]): string {
  if (numbers?.length) {
    return numbers.join(URL_PARAM_ARRAY_DELIMITER);
  }
  return '';
}

function isRegTypeValid(type: string) {
  //accepts only two digits or two digits with coma, and optional tilde as delimiter
  const regex = /^((\b\d{2}\b~?)|(\b\d{2}\.\d{2}\b~?))*$/g;
  const found = type.match(regex);
  return found;
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

function isArraysEqual(array1: number[], array2: number[]): boolean {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

function isoDateTimeToLocalDate(isoDateTime: string): string {
  if (isoDateTime) {
    const offset = new Date().getTimezoneOffset();
    const localTime = new Date(Date.parse(isoDateTime) - offset * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }
  return null;
}

function shorthandDateToIsoDateTime(date: string): string {
  return moment(date).startOf('day').toISOString(true);
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
  private useMapExtent: true; //TODO: Trenger vi en funksjon for å skru av filter på kartutsnitt?

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

    this.searchCriteriaChanges
      .pipe(scan((history, currentCriteriaChange) => [...history, currentCriteriaChange], []))
      // Log last 10 choices made
      .subscribe((history) => this.logger.debug('Change history (last 10)', DEBUG_TAG, history.slice(-10)));

    this.searchCriteria$ = combineLatest([
      this.searchCriteriaChanges.pipe(
        startWith(criteria),
        // Akkumuler alle søkekriterier vi setter via searchCriteria-subjecten
        scan((allSearchCriteria, newSearchCriteria) => ({ ...allSearchCriteria, ...newSearchCriteria }), {})
      ),
      this.userSettingService.language$,
      this.userSettingService.currentGeoHazard$,
      this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
        map((daysBack) => isoDateTimeToLocalDate(this.daysBackToIsoDateTime(daysBack)))
      ),
      this.mapService.mapView$.pipe(map((mapView) => this.createExtentCriteria(mapView))),
    ]).pipe(
      // Kombiner søkerekriterer som ligger utenfor denne servicen med de vi har i denne servicen, feks valgt språk.
      // Vi overskriver utvalgte søkekriterier med de som settes manuelt i filtermenyen:
      // - FromDtObsTime: fromDate URL param
      map(([criteria, langKey, geoHazards, fromObsTime, extent]) => {
        const _criteria = { ...criteria } as SearchCriteriaRequestDto;
        return {
          ...criteria,
          LangKey: langKey,
          SelectedGeoHazards: geoHazards,
          FromDtObsTime: shorthandDateToIsoDateTime(_criteria.FromDtObsTime || fromObsTime),
          Extent: extent,
        } as SearchCriteriaRequestDto;
      }),
      // Hver gang vi får nye søkekriterier, sett url-parametere. NB - fint å bruke shareReplay sammen med denne
      // siden dette er en bi-effekt det er unødvendig å kjøre flere ganger.
      tap((newCriteria) => this.setUrlParams(newCriteria)),
      // Jeg tror vi trenger en shareReplay her for at de som subscriber sent
      // skal få alle søkekriteriene når vi bruker scan, men er ikke sikker.
      // Uansett kjekt med en shareReplay her, se kommentar over.
      tap((currentCriteria) => this.logger.debug('Current combined criteria', DEBUG_TAG, currentCriteria)),
      shareReplay(1)
    );
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
      fromObsTime = shorthandDateToIsoDateTime(url.searchParams.get(URL_PARAM_FROMDATE));
    }
    if (daysBackNumeric != null) {
      fromObsTime = this.daysBackToIsoDateTime(daysBackNumeric);
    }

    let toObsTime: string;
    if (url.searchParams.get(URL_PARAM_TODATE)) {
      toObsTime = shorthandDateToIsoDateTime(url.searchParams.get(URL_PARAM_TODATE));
    }

    const nickName = url.searchParams.get(URL_PARAM_NICKNAME);
    const type = url.searchParams.get(URL_PARAM_TYPE);
    const convertTypeFromUrlToCriteria = type != null ? this.convertRegTypeFromUrlToDto(type) : null;

    const criteria = {
      SelectedGeoHazards: geoHazards,
      FromDtObsTime: fromObsTime,
      ObserverNickName: nickName,
      SelectedRegistrationTypes: convertTypeFromUrlToCriteria,
      ToDtObsTime: toObsTime,
      OrderBy: orderBy,
    } as SearchCriteriaRequestDto;

    this.saveGeoHazardsAndDaysBackInSettings(geoHazards, daysBackNumeric);
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
      new UrlParams().delete(URL_PARAM_GEOHAZARDS_OLD).apply; //we will create url params in new format instead
    }

    //read param on new format
    const geoHazardsParamValue = searchParams.get(URL_PARAM_GEOHAZARD);
    if (geoHazardsParamValue?.length > 0) {
      geoHazards = separatedStringToNumberArray(geoHazardsParamValue);
    }

    return geoHazards;
  }

  private setUrlParams(criteria: SearchCriteriaRequestDto) {
    const params = new UrlParams();
    params.set(URL_PARAM_GEOHAZARD, numberArrayToSeparatedString(criteria.SelectedGeoHazards));
    params.set(URL_PARAM_FROMDATE, isoDateTimeToLocalDate(criteria.FromDtObsTime));
    params.set(URL_PARAM_TODATE, isoDateTimeToLocalDate(criteria.ToDtObsTime));
    params.set(URL_PARAM_NICKNAME, criteria.ObserverNickName);
    params.set(URL_PARAM_TYPE, convertRegTypeDtoToUrl(criteria.SelectedRegistrationTypes));
    params.set(URL_PARAM_ORDER_BY, convertApiOrderByToUrl(criteria.OrderBy as SearchCriteriaOrderBy));
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

  //81.15~81.26 => [{Id: 81, SubTypes: [15,26]}]
  convertRegTypeFromUrlToDto(type: string): RegistrationTypeCriteriaDto[] {
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

  setObserverNickName(nickName: string) {
    this.searchCriteriaChanges.next({ ObserverNickName: nickName });
  }

  setFromDate(fromDate: string, removeToDate = false) {
    const returnObj = {} as SearchCriteriaRequestDto;
    if (fromDate) {
      returnObj.FromDtObsTime = fromDate;
      if (removeToDate) returnObj.ToDtObsTime = null;
    }
    this.searchCriteriaChanges.next(returnObj);
  }

  setToDate(toDate: string) {
    if (toDate) {
      this.searchCriteriaChanges.next({ ToDtObsTime: toDate });
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

  private daysBackToIsoDateTime(daysBack: number): string {
    return moment().subtract(daysBack, 'days').startOf('day').toISOString();
  }

  private createExtentCriteria(mapView: IMapView): WithinExtentCriteriaDto {
    if (mapView?.bounds) {
      return {
        BottomRight: latLngToPositionDto(mapView.bounds.getSouthEast()),
        TopLeft: latLngToPositionDto(mapView.bounds.getNorthWest()),
      };
    }
    return null;
  }

  private async saveGeoHazardsAndDaysBackInSettings(geoHazards: number[], daysBack: number): Promise<void> {
    //TODO: Snarfet fra ObservationDaysBackComponent: Legg et felles sted hvis vi skal bruke dette!
    let userSetting = await firstValueFrom(this.userSettingService.userSetting$);
    let changed = false;
    if (geoHazards != null) {
      if (!isArraysEqual(geoHazards, userSetting.currentGeoHazard)) {
        userSetting = {
          ...userSetting,
          currentGeoHazard: geoHazards,
        };
        changed = true;
      }
    }
    if (daysBack != null) {
      for (const geoHazard of userSetting.currentGeoHazard) {
        //check and eventually set days back for every selected geo hazard
        const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === geoHazard);
        if (existingValue.daysBack !== daysBack) {
          existingValue.daysBack = daysBack;
          changed = true;
        }
      }
    }
    if (changed) {
      this.userSettingService.saveUserSettings(userSetting);
    }
  }
}
