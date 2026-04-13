import { Injectable, computed, effect, inject, linkedSignal, signal, untracked } from '@angular/core';
import L from 'leaflet';
import moment from 'moment';
import { debounceTime, map } from 'rxjs';
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
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { removeEmpty } from '../../helpers/remove-empty';
import { CRITERIA_SLUSH_FLOW } from './slush-flow';
import { QueryParamsService } from '../query-params/query-params.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';

export type SearchCriteriaOrderBy = keyof Pick<RegistrationViewModel, 'DtObsTime' | 'DtChangeTime'>;

const DEBUG_TAG = 'SearchCriteriaService';
const REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN = 80;
const DEFAULT_SEARCH_CRITERIA = {
  OrderBy: 'DtChangeTime',
  SnowCompetence: [100, 0, 110, 115, 120, 130, 150],
} as const;

/**
 * Contains current filter for registrations.
 * Use this to change which registrations you want to find.
 *
 * Initializes filter from url query params on startup.
 * The URL should be short, easily readable for the user and easy to type.
 * Multi-select parameters, like geoHazard and type should be represented as a delimited list, example:
 * geoHazard=20~60&type=21~22~36
 */
@Injectable({
  providedIn: 'root',
})
export class SearchCriteriaService {
  private userSettingService = inject(UserSettingService);
  private mapService = inject(MapService);
  private logger = inject(LoggingService);
  private queryParams = inject(QueryParamsService);

  // TODO: bør kunne slettes etter hvert når vi får over til signals flere steder
  private daysBackUserSettings = toSignal(this.userSettingService.daysBackForCurrentGeoHazard$, { initialValue: 2 });
  daysBack = linkedSignal(() => this.daysBackUserSettings());
  private langKey = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });
  private geoHazards = toSignal(
    // Vis alltid vær-observasjoner sammen med andre naturfarer
    this.userSettingService.currentGeoHazard$.pipe(map((geohazards) => [...geohazards, GeoHazard.Weather]))
  ); // TODO: Move to usersettings

  /**
   * Om dager tilbake, eller fra og til-dato skal ligge til grunn for
   * FromDtObsTime og ToDtObsTime.
   */
  useDaysBack = signal(this.queryParams.startup.fromTime() == undefined);

  private _fromDate = linkedSignal<
    { useDaysBack: boolean; daysBack: number },
    SearchCriteriaRequestDto['FromDtObsTime']
  >({
    // Det ser kanskje litt rart ut at det er satt opp "enda en" computed her, men
    // det er bare for å kombinere useDaysBack og daysBack til én kilde man kan lytte på
    source: computed(() => ({ useDaysBack: this.useDaysBack(), daysBack: this.daysBack() })),
    computation: ({ useDaysBack, daysBack }, previous) => {
      if (useDaysBack) {
        return daysBackToIsoDateTime(daysBack);
      }

      if (!previous) {
        return this.queryParams.startup.fromTime();
      }

      // Hvis endringer på daysBack eller useDaysBack har fått computation til å kjøre,
      // men vi ikke skal beregne ny dato basert på daysBack, kan vi bare gjenbruke forrige verdi.
      // Siden vi har en egen setter for tid (setToDate), så kan det godt hende man kan endre på rekkefølgen av
      // kallene der for å kunne fjerne denne. Men det virker tryggest å ha den med.
      if (previous.value) {
        return previous.value;
      }

      // Bruk daysBack som fallbackverdi om ikke annet er satt
      return daysBackToIsoDateTime(daysBack);
    },
  });

  /**
   * FromDtObsTime - Tidspunkt man skal søke fra og med.
   *
   * Bruk `setFromDate` for å endre.
   */
  fromDate = this._fromDate.asReadonly();

  private _toDate = linkedSignal<boolean, SearchCriteriaRequestDto['ToDtObsTime']>({
    source: this.useDaysBack,
    computation: (useDaysBack, previous) => {
      if (useDaysBack) {
        return undefined;
      }
      if (!previous) {
        return this.queryParams.startup.toTime();
      }
      return previous.value;
    },
  });

  /**
   * ToDtObsTime - Tidspunkt man skal søke til.
   *
   * Bruk `setToDate` for å endre.
   */
  toDate = this._toDate.asReadonly();

  private _slushFlow = signal<boolean>(this.queryParams.startup.slushFlow());

  /**
   * Om filter på sørpeskred er påskrudd eller ikke. Dette legger til `PropertyFilters` som sendes til apiet.
   *
   * Bruk `setSlushFlow` for å endre.
   */
  slushFlow = this._slushFlow.asReadonly();

  /**
   * ObserverNickName
   *
   * Kan endres direkte med `nickName.set('Nick')`.
   */
  nickName = signal<SearchCriteriaRequestDto['ObserverNickName']>(this.queryParams.startup.nick());

  /**
   * OrderBy - sorter på endret eller observert tidspunkt.
   *
   * Kan endres direkte med `orderBy.set('DtChangeTime')`.
   */
  orderBy = signal<SearchCriteriaOrderBy>(this.queryParams.startup.orderBy() || DEFAULT_SEARCH_CRITERIA['OrderBy']);

  /**
   * SelectedRegistrationTypes - Hvilke "skjema" / observasjonstyper en observasjon må ha for å bli inkludert i et søk.
   *
   * Kan endres direkte, men `setObservationType` og `removeObservationType` eksisterer som hjelp.
   */
  regTypes = signal<SearchCriteriaRequestDto['SelectedRegistrationTypes']>(this.queryParams.startup.regTypes());

  /**
   * SelectedRegions - Hvilke regioner som skal inkluderes i et søk.
   *
   * Fungerer som geografisk avgrensning i tillegg til `Extent`.
   *
   * Kan endres direkte, men `addRegion` og `removeRegion` eksisterer som hjelp.
   */
  regions = signal<SearchCriteriaRequestDto['SelectedRegions']>(this.queryParams.startup.regions());

  /**
   * ObserverCompetence - Hvilken kompetanse en observatør må ha for at hens observasjoner skal inkluderes i et søk.
   *
   * Kan endres direkte, men `addCompetence` og `removeCompetence` eksisterer som hjelp.
   */
  competence = linkedSignal<SearchCriteriaRequestDto['ObserverCompetence']>(() => {
    // Query parameter fra oppstarten har alltid førstepri
    const initComp = this.queryParams.startup.competence();
    if (initComp && initComp.length > 0) {
      return initComp;
    }

    // Hvis ingen url-parameter, bruk default verdier eller undefined
    const geoHazards = this.geoHazards();
    if (geoHazards?.includes(GeoHazard.Snow)) {
      return [...DEFAULT_SEARCH_CRITERIA.SnowCompetence];
    }

    return undefined;
  });

  /**
   * Avledet egenskap basert på sørpeskredfilter
   */
  private propertyFilters = computed<SearchCriteriaRequestDto['PropertyFilters']>(() => {
    if (this.slushFlow()) {
      return [CRITERIA_SLUSH_FLOW];
    }
    return undefined;
  });

  private mapView = toSignal(this.mapService.mapView$.pipe(debounceTime(50)));

  /**
   * Extent - Filter på kartutsnitt basert på `mapView` i `mapService`.
   */
  extent = computed<SearchCriteriaRequestDto['Extent']>(() => createExtentCriteria(this.mapView()));

  private hasExtent = computed(() => this.extent() !== undefined);
  private hasRegions = computed(() => (this.regions() || []).length > 0);
  isExtentCriteriaDisabled = computed(() => !this.hasExtent() || this.hasRegions());
  isExtentCriteriaActive = linkedSignal(() => {
    if (this.isExtentCriteriaDisabled()) {
      return false;
    }
    return true;
  });

  private criteriaNoExtent = computed<SearchCriteriaRequestDto>(() => ({
    SelectedGeoHazards: this.geoHazards(),
    ObserverNickName: this.nickName(),
    ObserverCompetence: this.competence(),
    PropertyFilters: this.propertyFilters(),
    LangKey: this.langKey(),
    OrderBy: this.orderBy(),
    SelectedRegistrationTypes: this.regTypes(),
    SelectedRegions: this.regions(),
    FromDtObsTime: this._fromDate(),
    ToDtObsTime: this._toDate(),
  }));

  /**
   * SearchCriteriaRequestDto - kan sendes til apiet for søk.
   *
   * NB! Inkluderer kun kartutsnitt hvis `isExtentCriteriaActive` er `true`.
   *
   * Brukes i listevisninga og bildesøket.
   */
  criteria = computed<SearchCriteriaRequestDto>(() =>
    removeEmpty({
      ...this.criteriaNoExtent(),
      Extent: this.isExtentCriteriaActive() ? this.extent() : undefined,
    })
  );

  /**
   * SearchCriteriaRequestDto - alltid med kartutsnitt (dersom det finnes).
   *
   * Brukes på forsiden der man alltid er interessert i kartutsnitt.
   */
  criteriaWithExtent = computed(() =>
    removeEmpty({
      ...this.criteriaNoExtent(),
      Extent: this.extent(),
    })
  );

  /**
   * @deprecated Bruk heller `criteria` eller `criteriaWithExtent`.
   */
  searchCriteria$ = toObservable(this.criteriaWithExtent);

  constructor() {
    effect(() => {
      const criteria = this.criteria();
      untracked(() => {
        this.logger.debug('Search criteria', DEBUG_TAG, criteria);
      });
    });
  }

  resetSearchCriteria() {
    this.competence.set(undefined);
    this.regions.set(undefined);
    this.regTypes.set(undefined);
    this.nickName.set(undefined);
    this._slushFlow.set(false);
    this.userSettingService.resetDaysBackForCurrentGeoHazard();
    this.useDaysBack.set(true);
  }

  async applyQueryParams(withExtent = true) {
    const criteria = withExtent ? this.criteriaWithExtent() : this.criteria();
    const daysBack = this.daysBack();
    const useDaysBack = this.useDaysBack();
    await this.queryParams.apply({ criteria, daysBack: useDaysBack ? daysBack : undefined });
  }

  addRegion(region: number) {
    this.regions.update((regions) => {
      if (!regions || regions.length === 0) {
        return [region];
      }
      return regions.includes(region) ? regions : [...regions, region];
    });
  }

  removeRegion(region: number) {
    this.regions.update((regions) => regions && regions.filter((r) => r !== region));
  }

  addCompetence(competenceIds: number[]) {
    this.competence.update((competence) => {
      const current = competence ?? [];
      return [...new Set([...current, ...competenceIds])];
    });
  }

  removeCompetence(competenceIds: number[]) {
    this.competence.update((competence) => competence?.filter((x) => !competenceIds.includes(x)));
  }

  setFromDate(fromDate: string | undefined, removeToDate = false) {
    if (fromDate) {
      this._fromDate.set(moment(fromDate).startOf('day').toISOString(true));
      this.useDaysBack.set(false);
      if (removeToDate) {
        this._toDate.set(undefined);
      }
    }
  }

  setToDate(toDate: string | undefined) {
    if (toDate) {
      this._toDate.set(moment(toDate).endOf('day').toISOString(true));
      this.useDaysBack.set(false);
    }
  }

  setObservationType(newType: RegistrationTypeCriteriaDto) {
    this.regTypes.update((regTypes) => {
      if (!regTypes || regTypes.length === 0) {
        return [newType];
      }

      const { Id } = newType;
      const regTypeToUpdate = regTypes.find((x) => x.Id === Id);
      const otherRegTypes = regTypes.filter((x) => x.Id !== Id);

      const newOrUpdatedRegType: RegistrationTypeCriteriaDto = {
        Id,
        SubTypes: [...(regTypeToUpdate?.SubTypes || []), ...(newType.SubTypes || [])],
      };

      return [...otherRegTypes, newOrUpdatedRegType];
    });
  }

  removeObservationType(typeToRemove: RegistrationTypeCriteriaDto) {
    this.removeSlushFlowFilterIfFilterByAvalancheIsRemoved(typeToRemove);
    this.regTypes.update((regTypes) => {
      if (!regTypes) {
        return undefined;
      }

      const toRemoveOrUpdate = regTypes.find((x) => x.Id === typeToRemove.Id);
      const other = regTypes.filter((x) => x.Id !== typeToRemove.Id);
      if (
        toRemoveOrUpdate == undefined ||
        toRemoveOrUpdate.SubTypes == undefined ||
        toRemoveOrUpdate.SubTypes?.length === 0
      ) {
        return other;
      }

      const updated = {
        Id: typeToRemove.Id,
        SubTypes: toRemoveOrUpdate.SubTypes.filter((x) => !typeToRemove.SubTypes?.includes(x)),
      };

      if (updated.SubTypes.length === 0) {
        return other;
      }

      return [...other, updated];
    });
  }

  /** Filter by slush flow */
  setSlushFlow(slushFlow = true) {
    const avalacheObsType = {
      Id: REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN,
      SubTypes: [RegistrationTid.AvalancheObs],
    };

    if (slushFlow) {
      this._slushFlow.set(true);
      this.regTypes.set([avalacheObsType]); //Fjerner alt annet bortsett fra skredhendelse
    } else {
      this._slushFlow.set(false);
      // turn off avalancheObs automatically since slush flow is a type of avalancheObs
      this.removeObservationType(avalacheObsType);
    }
  }

  private removeSlushFlowFilterIfFilterByAvalancheIsRemoved(typeToRemove: RegistrationTypeCriteriaDto) {
    if (
      typeToRemove.Id === REGISTRATION_TYPE_AVALANCHE_AND_DANGER_SIGN &&
      typeToRemove.SubTypes?.includes(RegistrationTid.AvalancheObs)
    ) {
      this._slushFlow.set(false);
    }
  }
}

function daysBackToIsoDateTime(daysBack: number): string {
  return moment().subtract(daysBack, 'days').startOf('day').toISOString(true);
}

const latLngToPositionDto = (latLng: L.LatLng): PositionDto => ({
  Latitude: latLng.lat,
  Longitude: latLng.lng,
});

function createExtentCriteria(mapView: IMapView | undefined): WithinExtentCriteriaDto | undefined {
  if (mapView?.bounds) {
    const extent: WithinExtentCriteriaDto = {
      BottomRight: latLngToPositionDto(mapView.bounds.getSouthEast()),
      TopLeft: latLngToPositionDto(mapView.bounds.getNorthWest()),
    };
    return extent;
  }
  return;
}
