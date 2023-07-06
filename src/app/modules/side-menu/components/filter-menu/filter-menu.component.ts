import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { CheckboxCustomEvent, Platform, SearchbarCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import {
  RegistrationTypeCriteriaDto,
  RegistrationTypeDto,
  RegistrationTypeSubTypeDto,
} from 'src/app/modules/common-regobs-api';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { SearchCriteriaModelService } from 'src/app/core/services/search-criteria/search-criteria-model.service';
import { CompetenceOption, CompetenceOptions } from './competenceOptions';
import { Immutable } from 'src/app/core/models/immutable';

interface ObservationTypeView {
  name: string;
  id: number;
  isChecked: boolean;
  parentId: number;
}

type PlatformType = 'app' | 'web';
type FilterType = 'observationType' | 'competence' | 'nickName' | 'region';

type FilterSupportPerPlatform = {
  [platformType in PlatformType]: { [filter in FilterType]: boolean };
};

interface AvalancheRegion {
  id: number;
  name: string;
  type: 'A' | 'B';
  polygon: any; // TODO: Fix polygon;
  checked?: boolean;
}

function obsTypeTrackById(t: ObservationTypeView) {
  return t.id;
}

const avalancheRegionTrackById: TrackByFunction<AvalancheRegion> = (index: number, r: AvalancheRegion) => {
  return r.id;
};

const competenceOptionTrackById: TrackByFunction<CompetenceOption> = (index: number, c: CompetenceOption) => {
  return c.ids.join('-');
};

const DEBUG_TAG = 'FilterMenuComponent';

//create view model
function mapRegistrationSubtypes(subtypes: RegistrationTypeSubTypeDto[], parentId: number): ObservationTypeView[] {
  return subtypes.map((st) => {
    return { name: st.Name, parentId: parentId, id: st.Id, isChecked: false };
  });
}

function mapRegistrationType(type: RegistrationTypeDto): ObservationTypeView[] {
  return [{ name: type.Name, parentId: type.Id, id: type.Id, isChecked: false }];
}

function removeDuplicatesFromObservationTypes(arr: ObservationTypeView[]): ObservationTypeView[] {
  return arr.reduce((cur, element) => {
    if (cur && cur.filter((i) => i.id === element.id).length > 0) {
      return cur;
    } else {
      cur.push(element);
      return cur;
    }
  }, [] as ObservationTypeView[]);
}

// Return true if not changed
export function arrayHasNotChanged<T>(prev: Immutable<Array<T>>, curr: Immutable<Array<T>>) {
  if (prev.length !== curr.length) {
    return false;
  }

  // Length is the same, check if any items has changed
  return !prev.some((p, i) => curr[i] !== p);
}

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent extends NgDestoryBase implements OnInit {
  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;
  platformType: PlatformType;
  nickName: string | null = null;

  competenceItems$: Observable<CompetenceOption[]>;

  currentGeoHazard: GeoHazard[];
  observationTypes$: Observable<ObservationTypeView[]>;
  observationTypesSelectedCount = 0;

  filterSupportPerPlatform: FilterSupportPerPlatform = {
    app: {
      observationType: false,
      competence: true,
      nickName: true,
      region: false,
    },
    web: {
      observationType: true,
      competence: true,
      nickName: true,
      region: true,
    },
  };

  regions$: Observable<{ a: AvalancheRegion[]; b: AvalancheRegion[] }>;
  nRegionsSelected$: Observable<number>;

  get competenceOptionTrackById() {
    return competenceOptionTrackById;
  }

  get avalancheRegionTrackById() {
    return avalancheRegionTrackById;
  }

  get obsTypeTrackById() {
    return obsTypeTrackById;
  }

  slushFlowFilterIsActive = false;

  constructor(
    private platform: Platform,
    private userSettingService: UserSettingService,
    private searchCriteriaService: SearchCriteriaService,
    private kdv: KdvService,
    private http: HttpClient,
    private logger: LoggingService,
    private searchCriteriaModelService: SearchCriteriaModelService
  ) {
    super();
    this.regions$ = this.userSettingService.currentGeoHazard$.pipe(
      switchMap((geoHazards) => (geoHazards.includes(GeoHazard.Snow) ? this.getSnowRegions() : of(null))),
      shareReplay(1, 500)
    );
    this.nRegionsSelected$ = this.regions$.pipe(
      map((regions) => {
        if (regions) {
          return [...regions.a.filter((r) => r.checked), ...regions.b.filter((r) => r.checked)].length;
        }
        return 0;
      })
    );
  }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
    this.platformType = this.isIosOrAndroid ? 'app' : 'web';

    this.userSettingService.currentGeoHazard$.subscribe((curGeohazard) => (this.currentGeoHazard = curGeohazard));

    this.observationTypes$ = combineLatest([
      this.kdv.getViewRepositoryByKeyObservable('RegistrationTypesV'),
      this.searchCriteriaService.searchCriteria$.pipe(
        distinctUntilChanged((prev, curr) => prev.SelectedRegistrationTypes === curr.SelectedRegistrationTypes)
      ),
      this.userSettingService.currentGeoHazard$,
    ]).pipe(
      map(([options, criteria, geoHazard]) => {
        const registrationTypesByGeoHazard = geoHazard.map((typesByGeoHazard) => options[typesByGeoHazard]).flat();
        const optionsFiltered = this.convertObservationTypesDtoToView(registrationTypesByGeoHazard);
        return this.mapObservationTypesToView(
          optionsFiltered,
          criteria.SelectedRegistrationTypes as RegistrationTypeCriteriaDto[]
        );
      })
    );

    this.competenceItems$ = combineLatest([
      this.searchCriteriaModelService.getCompetenceFilterOptions$().pipe(
        // The values in this pipe starts as arrays of ObserverCompetenceLevelDto for all selected geohazards.
        // So we can have two ObserverCompetenceLevelDto for three stars, etc.

        // Group competence by Id and Name so they are easier to work with
        map((competenceList) => new CompetenceOptions(competenceList))
      ),

      // Get search criteria changes for observer competence
      this.searchCriteriaService.searchCriteria$.pipe(
        map((searchCriteria) => searchCriteria.ObserverCompetence || []),
        distinctUntilChanged((prev, curr) => arrayHasNotChanged(prev, curr))
      ),
    ]).pipe(
      map(([competenceOptions, competences]) => {
        // Set all active competences to checked
        for (const competence of competences) {
          competenceOptions.idToItem.get(competence).checked = true;
        }

        return competenceOptions.options;
      })
    );

    this.searchCriteriaService.searchCriteria$.subscribe((criteria) => {
      this.nickName = criteria.ObserverNickName;
      this.slushFlowFilterIsActive = this.searchCriteriaService.isSlushFlow(criteria);
    });
  }

  competenceCheckboxChanged(event: CheckboxCustomEvent<CompetenceOption>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addCompetence(event.detail.value.ids);
    } else {
      this.searchCriteriaService.removeCompetence(event.detail.value.ids);
    }
  }

  regionCheckBoxChanged(event: CheckboxCustomEvent<AvalancheRegion>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addToRegionFilter(event.detail.value.id);
    } else {
      this.searchCriteriaService.removeFromRegionFilter(event.detail.value.id);
    }
  }

  isSupported(filterType: FilterType): boolean {
    return this.filterSupportPerPlatform[this.platformType][filterType];
  }

  async onResetFilters() {
    this.observationTypesSelectedCount = 0;
    this.searchCriteriaService.resetSearchCriteria();
  }

  setNewType(event, parentId: number, typeId?: number) {
    //if parentid and subtypeid are the same it means there is no subtypes
    let obsType: RegistrationTypeCriteriaDto;
    if (parentId == typeId) obsType = { Id: parentId, SubTypes: [] };
    else obsType = { Id: parentId, SubTypes: [typeId] };
    if (!event.currentTarget.checked) this.searchCriteriaService.setObservationType(obsType);
    else this.searchCriteriaService.removeObservationType(obsType);
  }

  setNickName(newNick: SearchbarCustomEvent | null) {
    let nickName = null;
    newNick?.target?.value && (nickName = newNick.target.value.toLowerCase());
    this.searchCriteriaService.setObserverNickName(nickName);
  }

  private mapObservationTypesToView(
    observationTypesOptions: ObservationTypeView[],
    searchCriteriaRegType: RegistrationTypeCriteriaDto[]
  ): ObservationTypeView[] {
    if (!searchCriteriaRegType) {
      observationTypesOptions.forEach((type) => (type.isChecked = false));
      return observationTypesOptions;
    }

    const subtypes = [];
    searchCriteriaRegType.forEach((type) => {
      if (type.SubTypes.length > 0) {
        type.SubTypes.forEach((subtype) => subtypes.push({ parentId: type.Id, id: subtype }));
      } else {
        subtypes.push({ parentId: type.Id, id: type.Id });
      }
    });
    observationTypesOptions.forEach((obsType) => {
      const has = subtypes.some((s) => s.parentId == obsType.parentId && s.id == obsType.id);
      has ? (obsType.isChecked = true) : (obsType.isChecked = false);
    });

    this.observationTypesSelectedCount = observationTypesOptions.filter((ot) => ot.isChecked === true).length;
    return observationTypesOptions;
  }

  //combine subtypes and types into one array
  private convertObservationTypesDtoToView(registrationTypesByGeoHazard: RegistrationTypeDto[]): ObservationTypeView[] {
    let arrToReturn: ObservationTypeView[] = [];
    registrationTypesByGeoHazard.map((type) => {
      const subtypestoReturn =
        type.SubTypes.length > 0 ? mapRegistrationSubtypes(type.SubTypes, type.Id) : mapRegistrationType(type);
      arrToReturn = [...arrToReturn, ...subtypestoReturn];
    });

    const noDuplicates = removeDuplicatesFromObservationTypes(arrToReturn);
    return noDuplicates;
  }

  private getSnowRegions() {
    // Fetch avalanche regions from assets
    return this.http.get<AvalancheRegion[]>('./assets/json/avalancheRegions.json').pipe(
      tap(() => this.logger.debug('Fetched regions from assets', DEBUG_TAG)),
      // Use search criteria to mark what regions are checked
      switchMap((regions) =>
        this.searchCriteriaService.searchCriteria$.pipe(
          distinctUntilChanged((prev, curr) => prev.SelectedRegions === curr.SelectedRegions),
          map((searchCriteria) => {
            const markChecked = (r: AvalancheRegion) => ({
              ...r,
              checked: (searchCriteria.SelectedRegions || []).includes(r.id),
            });

            return {
              a: regions.filter((r) => r.type === 'A').map((r) => markChecked(r)),
              b: regions.filter((r) => r.type === 'B').map((r) => markChecked(r)),
            };
          })
        )
      )
    );
  }
}
