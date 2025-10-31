import { Injectable, inject } from '@angular/core';
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
  RegistrationTypeCriteriaDto,
  RegistrationViewModel,
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
  URL_PARAM_FROMDATE,
  URL_PARAM_NICKNAME,
  URL_PARAM_ORDER_BY,
  URL_PARAM_REGION,
  URL_PARAM_REGISTRATION_TYPE,
  URL_PARAM_SLUSH_FLOW,
  URL_PARAM_TODATE,
  UrlDtoOrderByMap,
} from './url-params';
import { convertToIsoDateTime } from '../../../modules/common-core/helpers/date-converters';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { removeNullOrUndefined } from '../../helpers/remove-empty';
import { CRITERIA_SLUSH_FLOW } from './slush-flow';
import { QueryParamsService } from '../query-params/query-params.service';

export type SearchCriteriaOrderBy = keyof Pick<RegistrationViewModel, 'DtObsTime' | 'DtChangeTime'>;

const DEBUG_TAG = 'SearchCriteriaService';

const REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN = 80;

const latLngToPositionDto = (latLng: L.LatLng): PositionDto => ({
  Latitude: latLng.lat,
  Longitude: latLng.lng,
});

function competenceFromUrlToDto(competence: string | null): number[] {
  if (competence == null) {
    return [];
  }
  if (!isCompetenceUrlValid(competence)) {
    return [];
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

const DEFAULT_SEARCH_CRITERIA: SearchCriteriaRequestDto = {
  OrderBy: 'DtChangeTime',
};

/**
 * Contains current filter for registrations.
 * Use this to change which registrations you want to find.
 *
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
  private userSettingService = inject(UserSettingService);
  private mapService = inject(MapService);
  private logger = inject(LoggingService);
  private queryParams = inject(QueryParamsService);

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
  get useMapExtent$(): Observable<boolean> {
    return this.useMapExtent.asObservable().pipe(distinctUntilChanged());
  }

  resetEvent: Subject<void> = new Subject();
  /**
   * Current filter. Current language and geo hazards are always included
   */
  readonly searchCriteria$: Observable<Immutable<SearchCriteriaRequestDto>>;

  /**
   * NB: Does not parse map extent. MapService does that.
   */
  getInitialCriteria() {
    const criteriaFromUrl = this.readUrlParams();
    this.logger.debug('Criteria from URL params: ', DEBUG_TAG, { criteria: criteriaFromUrl });
    return {
      ...DEFAULT_SEARCH_CRITERIA,
      ...criteriaFromUrl,
    };
  }

  constructor() {
    const criteria = this.getInitialCriteria();

    // Log last 10 changes made (nb, does not include langKey, extent etc, and only logs the change, not entire critera)
    this.searchCriteriaChanges
      .pipe(
        scan(
          (history, currentCriteriaChange) => [...history, currentCriteriaChange].slice(-10),
          [] as SearchCriteriaRequestDto[]
        )
      )
      .subscribe((history) => this.logger.debug('Change history (last 10)', DEBUG_TAG, history));

    // When days-back changes, set dates in search criteria
    combineLatest([
      this.userSettingService.daysBackForCurrentGeoHazard$,
      this.useDaysBack$.pipe(filter((useDaysBack) => useDaysBack)),
    ]).subscribe(([daysBack]) => {
      this.searchCriteriaChanges.next({ FromDtObsTime: this.daysBackToIsoDateTime(daysBack), ToDtObsTime: undefined });
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
        Extent: useMapExtent && (criteria.SelectedRegions || []).length === 0 ? extent : undefined,
      })),
      map((criteria) => removeNullOrUndefined(criteria)),
      tap((currentCriteria) => this.logger.debug('Current combined criteria', DEBUG_TAG, currentCriteria)),
      shareReplay(1)
    );
  }

  async resetSearchCriteria() {
    const criteria: SearchCriteriaRequestDto = {
      ObserverCompetence: undefined,
      SelectedRegistrationTypes: undefined,
      SelectedRegions: undefined,
      ObserverNickName: undefined,
      PropertyFilters: undefined,
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

    let fromObsTime: string | undefined;
    let toObsTime: string | undefined;

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
    const regTypes = regTypesRaw != null ? convertRegTypeFromUrlToDto(regTypesRaw) : [];
    const selectedRegions = this.readRegionsFromUrl(url.searchParams);

    const criteria: SearchCriteriaRequestDto = {};

    if (fromObsTime) {
      criteria.FromDtObsTime = fromObsTime;
    }

    if (nickName) {
      criteria.ObserverNickName = nickName;
    }

    if (observerCompetence.length > 0) {
      criteria.ObserverCompetence = observerCompetence;
    }

    if (regTypes.length > 0) {
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

    if (selectedRegions.length > 0) {
      criteria.SelectedRegions = selectedRegions;
    }

    return criteria;
  }

  private readOrderBy(orderBy: string | null): string | undefined {
    if (!orderBy) {
      return;
    }
    return UrlDtoOrderByMap.get(orderBy);
  }

  private readRegionsFromUrl(searchParams: URLSearchParams): number[] {
    const regionsRaw = searchParams.get(URL_PARAM_REGION);
    if (regionsRaw && regionsRaw.length > 0) {
      return separatedStringToNumberArray(regionsRaw);
    }
    return [];
  }

  async applyQueryParams() {
    const criteria = await firstValueFrom(this.searchCriteria$);
    const daysBack = await firstValueFrom(this.userSettingService.daysBackForCurrentGeoHazard$);
    const useDaysBack = this.useDaysBack.value;
    await this.queryParams.apply({ criteria, daysBack: useDaysBack ? daysBack : undefined });
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

  setObserverNickName(nickName?: string) {
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

  setFromDate(fromDate: string | undefined, removeToDate = false) {
    if (fromDate) {
      const dateCriteria: Pick<SearchCriteriaRequestDto, 'FromDtObsTime' | 'ToDtObsTime'> = {
        FromDtObsTime: moment(fromDate).startOf('day').toISOString(true),
      };
      if (removeToDate) {
        dateCriteria.ToDtObsTime = undefined;
      }
      this.searchCriteriaChanges.next(dateCriteria);
      this.setUseDaysBack(false);
    }
  }

  setToDate(toDate: string | undefined) {
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
          ...(copyCriteria[criteriaToUpdateIndex].SubTypes || []),
          ...(newType.SubTypes || []),
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
      // vi har filter på type, som vi da må oppdatere
      const newCriteria = currentTypesCriteria
        .map((type) => {
          if (type.Id === typeToRemove.Id) {
            // det kan være typen har noen under-typer som fortsatt skal være med
            const subtypesLeft = type.SubTypes?.filter((subType) => !typeToRemove.SubTypes?.includes(subType)) || [];
            if (subtypesLeft.length > 0) {
              return { Id: type.Id, SubTypes: subtypesLeft };
            }
            return null; // vi fjerner hele typen hvis det ikke er noen under-typer igjen
          }
          // denne typen skal ikke fjernes, så vi returnerer den uendret
          return { Id: type.Id, SubTypes: type.SubTypes ? [...type.SubTypes] : [] };
        })
        .filter(Boolean) as RegistrationTypeCriteriaDto[];

      this.searchCriteriaChanges.next({ SelectedRegistrationTypes: newCriteria });
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
      this.searchCriteriaChanges.next({
        PropertyFilters: [CRITERIA_SLUSH_FLOW],
        SelectedRegistrationTypes: [avalacheObsType], //Fjerner alt annet bortsett fra skredhendelse
      });
    } else {
      this.searchCriteriaChanges.next({ PropertyFilters: undefined });

      // turn off avalancheObs automatically since slush flow is a type of avalancheObs
      await this.removeObservationType(avalacheObsType);
    }
  }

  private removeSlushFlowFilterIfFilterByAvalancheIsRemoved(typeToRemove: RegistrationTypeCriteriaDto) {
    if (
      typeToRemove.Id === REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN &&
      typeToRemove.SubTypes?.includes(RegistrationTid.AvalancheObs)
    ) {
      this.searchCriteriaChanges.next({ PropertyFilters: undefined });
    }
  }

  private daysBackToIsoDateTime(daysBack: number): string {
    return moment().subtract(daysBack, 'days').startOf('day').toISOString(true);
  }

  private createExtentCriteria(mapView: IMapView | undefined): WithinExtentCriteriaDto | undefined {
    if (mapView?.bounds) {
      const extent: WithinExtentCriteriaDto = {
        BottomRight: latLngToPositionDto(mapView.bounds.getSouthEast()),
        TopLeft: latLngToPositionDto(mapView.bounds.getNorthWest()),
      };
      return extent;
    }
    return;
  }
}
