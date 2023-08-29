import { Injectable } from '@angular/core';
import L from 'leaflet';
import moment from 'moment';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  Observable,
  ReplaySubject,
  scan,
  shareReplay,
  skip,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { Immutable } from 'src/app/core/models/immutable';
import {
  PositionDto,
  PropertyFilter,
  RegistrationTypeCriteriaDto,
  SearchCriteriaRequestDto,
  WithinExtentCriteriaDto,
} from 'src/app/modules/common-regobs-api';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import {
  separatedStringToNumberArray,
  URL_PARAM_ARRAY_DELIMITER,
  URL_PARAM_COMPETENCE,
  URL_PARAM_DAYSBACK,
  URL_PARAM_FROMDATE,
  URL_PARAM_GEOHAZARD,
  URL_PARAM_NICKNAME,
  URL_PARAM_NW_LAT,
  URL_PARAM_NW_LON,
  URL_PARAM_ORDER_BY,
  URL_PARAM_REGION,
  URL_PARAM_REGISTRATION_TYPE,
  URL_PARAM_SE_LAT,
  URL_PARAM_SE_LON,
  URL_PARAM_SLUSH_FLOW,
  URL_PARAM_TODATE,
  UrlParams,
} from './url-params';
import { isoDateTimeToLocalDate, convertToIsoDateTime } from '../../../modules/common-core/helpers/date-converters';
import { SearchCriteria } from '../../models/search-criteria';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';

export type SearchCriteriaOrderBy = 'DtObsTime' | 'DtChangeTime';

const UrlDtoOrderByMap = new Map([
  ['changeTime', 'DtChangeTime'],
  ['obsTime', 'DtObsTime'],
]);

const DEBUG_TAG = 'SearchCriteriaService';

const ULR_COORDS_PRECISION = 4;

export const SLUSH_FLOW_ID = 30;
export const CRITERIA_SLUSH_FLOW: PropertyFilter = {
  Name: 'AvalancheObs.AvalancheTID',
  Operator: 0,
  Value: SLUSH_FLOW_ID.toString(),
};
const REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN = 80;

const latLngToPositionDto = (latLng: L.LatLng): PositionDto => ({
  Latitude: latLng.lat,
  Longitude: latLng.lng,
});

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
    const keyValue = [...UrlDtoOrderByMap].find(([, val]) => val == value)[0];
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
  private searchCriteriaChanges: Subject<SearchCriteriaRequestDto> = new ReplaySubject<SearchCriteriaRequestDto>();

  private useDaysBack: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get useDaysBack$(): Observable<boolean> {
    return this.useDaysBack.asObservable();
  }

  /**
   * Bytt mellom å bruke filter på antall dager tilbake eller å velge fra- og til-dato
   * @param useDaysBack hvis true => bruk filter på antall dager tilbake, hvis false => velg fra- og til-dato
   */
  setUseDaysBack(useDaysBack: boolean) {
    if (this.useDaysBack.value != useDaysBack) {
      this.useDaysBack.next(useDaysBack);
    }
  }

  private useMapExtent: Subject<boolean> = new BehaviorSubject<boolean>(true);
  get useMapExtent$() {
    return this.useMapExtent.asObservable().pipe(distinctUntilChanged());
  }

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

    // When days-back changes, set dates in search criteria
    combineLatest([
      this.userSettingService.daysBackForCurrentGeoHazard$,
      this.useDaysBack$.pipe(filter((useDaysBack) => useDaysBack)),
    ]).subscribe(([daysBack]) => {
      this.searchCriteriaChanges.next({ FromDtObsTime: this.daysBackToIsoDateTime(daysBack), ToDtObsTime: null });
    });

    // Reset search criteria when geohazard changes
    this.userSettingService.currentGeoHazard$.pipe(skip(1)).subscribe(() => {
      this.resetSearchCriteria();
    });

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
      this.userSettingService.currentGeoHazard$,
      this.useMapExtent$,
      this.mapService.mapView$.pipe(
        distinctUntilChanged((prev, curr) => {
          if (prev?.bounds == null && curr?.bounds == null) {
            // If both are null or underfined
            return true;
          }

          // Compare only bounds, we create the extent from bounds
          if (prev?.bounds && curr?.bounds) {
            type WithMargin = (ob: L.LatLngBoundsExpression, maxMargin: number) => boolean;
            return (prev.bounds.equals as WithMargin)(curr.bounds, 0.0001);
          }

          return false;
        }),
        map((mapView) => {
          return this.createExtentCriteria(mapView);
        })
      ),
    ]).pipe(
      // Kombiner søkerekriterer som ligger utenfor denne servicen med de vi har i denne servicen, feks valgt språk.
      // Vi overskriver utvalgte søkekriterier med de som settes manuelt i filtermenyen:
      debounceTime(50),
      map(([criteria, langKey, geoHazards, useMapExtent, extent]) => ({
        ...criteria,
        LangKey: langKey,
        SelectedGeoHazards: geoHazards,
        // Remove extent if one or more regions are selected
        Extent: useMapExtent && (criteria.SelectedRegions || []).length === 0 ? extent : null,
      })),
      map((criteria) => removeEmpty(criteria)),
      tap((currentCriteria) => this.logger.debug('Current combined criteria', DEBUG_TAG, currentCriteria)),
      shareReplay(1)
    );
  }

  async resetSearchCriteria() {
    const criteria: SearchCriteriaRequestDto = {
      ObserverCompetence: null,
      SelectedRegistrationTypes: null,
      SelectedRegions: null,
      ObserverNickName: null,
      PropertyFilters: null,
      // FromDtObsTime: null, Do not remove FromDtObsTime filter, if so we would fetch all obs from dawn of time
      // ToDtObsTime: null,
    };
    this.setUseDaysBack(true);
    await this.userSettingService.resetDaysBackForCurrentGeoHazard();
    this.searchCriteriaChanges.next(criteria);
    this.resetEvent.next();
  }

  // build search criteria from url parameters. Some params are stored in user settings
  private readUrlParams(): SearchCriteriaRequestDto {
    const url = new URL(document.location.href);

    const slushFlow = url.searchParams.get(URL_PARAM_SLUSH_FLOW);
    const orderBy = this.readOrderBy(url.searchParams.get(URL_PARAM_ORDER_BY));

    let fromObsTime: string;
    let toObsTime: string;

    if (url.searchParams.get(URL_PARAM_FROMDATE)) {
      fromObsTime = convertToIsoDateTime(url.searchParams.get(URL_PARAM_FROMDATE));
    }

    if (url.searchParams.get(URL_PARAM_TODATE)) {
      toObsTime = convertToIsoDateTime(url.searchParams.get(URL_PARAM_TODATE), 'end');
    }

    this.setUseDaysBack(!fromObsTime);

    const nickName = url.searchParams.get(URL_PARAM_NICKNAME);
    const observerCompetence = competenceFromUrlToDto(url.searchParams.get(URL_PARAM_COMPETENCE));
    const regTypesRaw = url.searchParams.get(URL_PARAM_REGISTRATION_TYPE);
    const regTypes = regTypesRaw != null ? convertRegTypeFromUrlToDto(regTypesRaw) : null;
    const selectedRegions = this.readRegionsFromUrl(url.searchParams);

    const criteria: SearchCriteriaRequestDto = {};

    if (fromObsTime) {
      criteria.FromDtObsTime = fromObsTime;
    }

    if (nickName) {
      criteria.ObserverNickName = nickName;
    }

    if (observerCompetence) {
      criteria.ObserverCompetence = observerCompetence;
    }

    if (regTypes) {
      criteria.SelectedRegistrationTypes = regTypes;
    }

    if (toObsTime) {
      criteria.ToDtObsTime = toObsTime;
    }

    if (slushFlow && slushFlow === 'true') {
      criteria.PropertyFilters = [CRITERIA_SLUSH_FLOW];
    }

    if (orderBy) {
      criteria.OrderBy = orderBy;
    }

    if (selectedRegions?.length) {
      criteria.SelectedRegions = selectedRegions;
    }

    return criteria;
  }

  private readOrderBy(orderBy: string): string {
    return UrlDtoOrderByMap.get(orderBy);
  }

  private readRegionsFromUrl(searchParams: URLSearchParams): number[] {
    const regionsRaw = searchParams.get(URL_PARAM_REGION);
    if (regionsRaw?.length > 0) {
      return separatedStringToNumberArray(regionsRaw);
    }
    return null;
  }

  async applyQueryParams() {
    const criteria = await firstValueFrom(this.searchCriteria$);
    const daysBack = await firstValueFrom(this.userSettingService.daysBackForCurrentGeoHazard$);
    const useDaysBack = this.useDaysBack.value;

    this.setUrlParams(criteria as SearchCriteriaRequestDto, useDaysBack ? daysBack : null);
  }

  private setUrlParams(criteria: SearchCriteriaRequestDto, daysBack: number | null) {
    const params = new UrlParams();
    params.set(URL_PARAM_GEOHAZARD, numberArrayToSeparatedString(criteria.SelectedGeoHazards));
    if (daysBack != null) {
      params.set(URL_PARAM_DAYSBACK, daysBack.toString()); // Convert to string so that 0 is accepted as a value
      params.delete(URL_PARAM_FROMDATE);
      params.delete(URL_PARAM_TODATE);
    } else {
      params.delete(URL_PARAM_DAYSBACK);
      params.set(URL_PARAM_FROMDATE, isoDateTimeToLocalDate(criteria.FromDtObsTime));
      params.set(URL_PARAM_TODATE, isoDateTimeToLocalDate(criteria.ToDtObsTime));
    }
    params.set(URL_PARAM_NICKNAME, criteria.ObserverNickName);
    params.set(URL_PARAM_COMPETENCE, competenceFromDtoToUrl(criteria.ObserverCompetence));
    params.set(URL_PARAM_REGISTRATION_TYPE, convertRegTypeDtoToUrl(criteria.SelectedRegistrationTypes));
    params.set(URL_PARAM_ORDER_BY, convertApiOrderByToUrl(criteria.OrderBy as SearchCriteriaOrderBy));
    params.set(URL_PARAM_REGION, numberArrayToSeparatedString(criteria.SelectedRegions));

    if (this.isSlushFlow(criteria)) {
      params.set(URL_PARAM_SLUSH_FLOW, true);
    } else {
      params.delete(URL_PARAM_SLUSH_FLOW);
    }

    if (criteria.Extent != null) {
      params.set(URL_PARAM_NW_LAT, +criteria.Extent.TopLeft.Latitude.toFixed(ULR_COORDS_PRECISION));
      params.set(URL_PARAM_NW_LON, +criteria.Extent.TopLeft.Longitude.toFixed(ULR_COORDS_PRECISION));
      params.set(URL_PARAM_SE_LAT, +criteria.Extent.BottomRight.Latitude.toFixed(ULR_COORDS_PRECISION));
      params.set(URL_PARAM_SE_LON, +criteria.Extent.BottomRight.Longitude.toFixed(ULR_COORDS_PRECISION));
    } else {
      params.delete(URL_PARAM_NW_LAT);
      params.delete(URL_PARAM_NW_LON);
      params.delete(URL_PARAM_SE_LAT);
      params.delete(URL_PARAM_SE_LON);
    }
    params.apply();
  }

  async addToRegionFilter(regionId: number) {
    const { SelectedRegions } = await firstValueFrom(this.searchCriteria$);
    const existingRegions = SelectedRegions || [];
    this.searchCriteriaChanges.next({
      SelectedRegions: existingRegions.includes(regionId) ? [...existingRegions] : [...existingRegions, regionId],
    });
  }

  async removeFromRegionFilter(regionId: number) {
    const { SelectedRegions } = await firstValueFrom(this.searchCriteria$);
    if (!SelectedRegions || SelectedRegions?.length === 0) {
      return;
    }

    this.searchCriteriaChanges.next({
      SelectedRegions: SelectedRegions.filter((r) => r !== regionId),
    });
  }

  setObserverNickName(nickName: string) {
    this.searchCriteriaChanges.next({ ObserverNickName: nickName });
  }

  async addCompetence(competenceIds: number[]) {
    const { ObserverCompetence: currentCompetence } = await firstValueFrom(this.searchCriteria$);
    let newCompetence: number[];
    if (!currentCompetence) {
      newCompetence = [...competenceIds];
    } else {
      // Use a set to filter out duplicates
      newCompetence = [...new Set([...currentCompetence, ...competenceIds])];
    }
    this.searchCriteriaChanges.next({ ObserverCompetence: newCompetence });
  }

  async removeCompetence(competenceIds: number[]) {
    const { ObserverCompetence: currentCompetence } = await firstValueFrom(this.searchCriteria$);
    if (!currentCompetence) {
      return;
    }
    const newCompetence = currentCompetence.filter((c) => !competenceIds.includes(c));
    this.searchCriteriaChanges.next({ ObserverCompetence: newCompetence });
  }

  setFromDate(fromDate: string, removeToDate = false) {
    if (fromDate) {
      const dateCriteria: Pick<SearchCriteriaRequestDto, 'FromDtObsTime' | 'ToDtObsTime'> = {
        FromDtObsTime: moment(fromDate).startOf('day').toISOString(true),
      };
      if (removeToDate) {
        dateCriteria.ToDtObsTime = null;
      }
      this.searchCriteriaChanges.next(dateCriteria);
      this.setUseDaysBack(false);
    }
  }

  setToDate(toDate: string) {
    if (toDate) {
      this.searchCriteriaChanges.next({ ToDtObsTime: moment(toDate).endOf('day').toISOString(true) });
      this.setUseDaysBack(false);
    }
  }

  async setObservationType(newType: RegistrationTypeCriteriaDto) {
    const { SelectedRegistrationTypes: currentTypesCriteria } = await firstValueFrom(this.searchCriteria$);

    if (currentTypesCriteria) {
      const copyCriteria: RegistrationTypeCriteriaDto[] = JSON.parse(JSON.stringify(currentTypesCriteria));
      const criteriaToUpdateIndex = copyCriteria.findIndex((i) => i.Id === newType.Id);

      if (criteriaToUpdateIndex != -1) {
        copyCriteria[criteriaToUpdateIndex].SubTypes = [
          ...copyCriteria[criteriaToUpdateIndex].SubTypes,
          ...newType.SubTypes,
        ];
        this.searchCriteriaChanges.next({ SelectedRegistrationTypes: copyCriteria });
      } else
        this.searchCriteriaChanges.next({
          SelectedRegistrationTypes: [...copyCriteria, newType],
        });
    } else this.searchCriteriaChanges.next({ SelectedRegistrationTypes: [newType] });
  }

  async removeObservationType(typeToRemove: RegistrationTypeCriteriaDto) {
    this.removeSlushFlowFilterIfFilterByAvalancheIsRemoved(typeToRemove);
    const { SelectedRegistrationTypes: currentTypesCriteria } = await firstValueFrom(this.searchCriteria$);
    if (currentTypesCriteria) {
      const copyCriteria: RegistrationTypeCriteriaDto[] = JSON.parse(JSON.stringify(currentTypesCriteria));

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

  setExtentFilterActive(isExtentFilterActive: boolean) {
    this.useMapExtent.next(isExtentFilterActive);
  }

  /** Filter by slush flow */
  async setSlushFlow(slushFlow = true) {
    const avalacheObsType = {
      Id: REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN,
      SubTypes: [RegistrationTid.AvalancheObs],
    };
    if (slushFlow) {
      this.searchCriteriaChanges.next({ PropertyFilters: [CRITERIA_SLUSH_FLOW] });

      // turn on avalancheObs automatically since slush flow is a type of avalancheObs
      this.setObservationType(avalacheObsType);
    } else {
      this.searchCriteriaChanges.next({ PropertyFilters: null });

      // turn off avalancheObs automatically since slush flow is a type of avalancheObs
      this.removeObservationType(avalacheObsType);
    }
  }

  /**
   * @returns true if slush flow filter is on
   */
  isSlushFlow(criteria: SearchCriteria): boolean {
    return criteria.PropertyFilters?.length === 1 && criteria.PropertyFilters[0] === CRITERIA_SLUSH_FLOW;
  }

  private removeSlushFlowFilterIfFilterByAvalancheIsRemoved(typeToRemove: RegistrationTypeCriteriaDto) {
    if (
      typeToRemove.Id === REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN &&
      typeToRemove.SubTypes.includes(RegistrationTid.AvalancheObs)
    ) {
      this.searchCriteriaChanges.next({ PropertyFilters: null });
    }
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

function removeEmpty(criteria: SearchCriteriaRequestDto) {
  const entries = Object.entries(criteria);
  const notEmpty = entries.filter(([, value]) => value != null);
  return Object.fromEntries(notEmpty);
}
