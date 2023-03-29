import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CheckboxCustomEvent, Platform, SearchbarCustomEvent, SelectCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { map, share, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  AUTOMATIC_STATIONS,
  SearchCriteriaService,
} from 'src/app/core/services/search-criteria/search-criteria.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { KdvElement } from 'src/app/modules/common-regobs-api';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import {
  RegistrationTypeCriteriaDto,
  RegistrationTypeDto,
  RegistrationTypeSubTypeDto,
} from 'src/app/modules/common-regobs-api';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

interface ObservationTypeView {
  name: string;
  id: number;
  isChecked: boolean;
  parentId: number;
}

type PlatformType = 'app' | 'web';
type FilterType = 'observationType' | 'competence' | 'nickName';

type FilterSupportPerPlatform = {
  [platformType in PlatformType]: { [filter in FilterType]: boolean };
};

interface CompetenceItem {
  name: string;
  value: string;
  ids: number[];
}

interface AvalancheRegion {
  id: number;
  name: string;
  type: 'A' | 'B';
  polygon: any; // TODO: Fix polygon;
  checked?: boolean;
}

function avalancheRegionTrackById(r: AvalancheRegion) {
  return r.id;
}

const DEBUG_TAG = 'FilterMenuComponent';

const COMPETANCE_FILTER = {
  [GeoHazard.Snow]: (kdv: KdvElement) => kdv.Id >= 100 && kdv.Id < 200,
  [GeoHazard.Ice]: (kdv: KdvElement) => kdv.Id >= 700 && kdv.Id < 800,
  [GeoHazard.Soil]: (kdv: KdvElement) => kdv.Id >= 600 && kdv.Id < 700,
  [GeoHazard.Water]: (kdv: KdvElement) => kdv.Id >= 200 && kdv.Id < 300,
};
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
  observationTypesOptions: ObservationTypeView[] = [];
  competenceOptions: CompetenceItem[] = [];
  automaticStationCompetenceItem: CompetenceItem;
  isAutomaticStationChecked: boolean;
  currentGeoHazard: GeoHazard[];
  chosenCompetenceValue: CompetenceItem;
  observationTypesSelectedCount = 0;

  filterSupportPerPlatform: FilterSupportPerPlatform = {
    app: {
      observationType: false,
      competence: true,
      nickName: true,
    },
    web: {
      observationType: true,
      competence: true,
      nickName: true,
    },
  };

  regions$: Observable<{ a: AvalancheRegion[]; b: AvalancheRegion[] }>;
  nRegionsSelected$: Observable<number>;

  get avalancheRegionTrackById() {
    return avalancheRegionTrackById;
  }

  constructor(
    private platform: Platform,
    private userSettingService: UserSettingService,
    private searchCriteriaService: SearchCriteriaService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private kdv: KdvService,
    private http: HttpClient,
    private logger: LoggingService
  ) {
    super();
    this.regions$ = this.userSettingService.currentGeoHazard$.pipe(
      switchMap((geoHazards) => (geoHazards.includes(GeoHazard.Snow) ? this.getSnowRegions() : of(null))),
      share()
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

  private getSnowRegions() {
    // Fetch avalanche regions from assets
    return this.http.get<AvalancheRegion[]>('./assets/json/avalancheRegions.json').pipe(
      tap(() => this.logger.debug('Fetched regions from assets', DEBUG_TAG)),
      // Use search criteria to mark what regions are checked
      switchMap((regions) =>
        this.searchCriteriaService.searchCriteria$.pipe(
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

  regionCheckBoxChanged(event: CheckboxCustomEvent<AvalancheRegion>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addToRegionFilter(event.detail.value.id);
    } else {
      this.searchCriteriaService.removeFromRegionFilter(event.detail.value.id);
    }
  }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
    this.platformType = this.isIosOrAndroid ? 'app' : 'web';

    combineLatest([
      //combining both searchCriteria and currentGeoHazard to ensure they both are being resolved in a proper order
      this.searchCriteriaService.searchCriteria$,
      this.userSettingService.currentGeoHazard$.pipe(
        takeUntil(this.ngDestroy$),
        tap((geoHazard) => {
          this.isAutomaticStationChecked = true;
          this.currentGeoHazard = geoHazard;
          //KdvViewRepositoryKey -> ObservationTypeView[]
          this.kdv.getViewRepositoryByKeyObservable('RegistrationTypesV').subscribe((regTypes) => {
            const registrationTypesByGeoHazard = geoHazard.map((typesByGeoHazard) => regTypes[typesByGeoHazard]).flat();
            this.observationTypesOptions = this.convertObservationTypesDtoToView(registrationTypesByGeoHazard);
          });
          //KdvElement[] -> CompetenceItem[]
          this.kdv.getKdvRepositoryByKeyObservable('CompetenceLevelKDV').subscribe(async (competenceLevels) => {
            const competenceLevelsByGeoHazard = geoHazard
              .map((geoHazard) => COMPETANCE_FILTER[geoHazard])
              .map((f) => competenceLevels.filter(f));
            this.competenceOptions = await this.mapCompetences(competenceLevelsByGeoHazard);
          });
        })
      ),
    ]).subscribe(([criteria]) => {
      //check boxes of chosen observation types in view
      this.mapObservationTypesToView(criteria.SelectedRegistrationTypes as RegistrationTypeCriteriaDto[]);
      //select chosen observer competence
      this.setObserverCompetence(criteria.ObserverCompetence as number[]);
      //set chosen nickname
      this.nickName = criteria.ObserverNickName;
      this.cdr.markForCheck();
    });
  }

  isSupported(filterType: FilterType): boolean {
    return this.filterSupportPerPlatform[this.platformType][filterType];
  }

  async onResetFilters() {
    this.observationTypesSelectedCount = 0;
    this.searchCriteriaService.resetSearchCriteria();
  }

  onSelectCompetenceChange(event: SelectCustomEvent) {
    if (!event.detail.value) {
      return;
    }

    this.chosenCompetenceValue = event.detail.value;
    const ids = event.detail.value.ids;

    if (
      this.currentGeoHazard.includes(GeoHazard.Snow) &&
      !this.isAutomaticStationChecked &&
      event.detail.value.value === 'All'
    ) {
      this.searchCriteriaService.setCompetence(ids);
    } else if (event.detail.value.value === 'All') {
      this.searchCriteriaService.setCompetence(null);
    } else if (this.isAutomaticStationChecked) {
      ids.push(AUTOMATIC_STATIONS);
      this.searchCriteriaService.setCompetence(ids);
    } else {
      this.searchCriteriaService.setCompetence(ids);
    }
  }

  async onCheckAutomaticStations(event: CustomEvent) {
    this.isAutomaticStationChecked = event.detail.checked;
    //all ids are set on competenceOption 'All'
    const allIds = this.competenceOptions.find((option) => option.value === 'All');
    if (event.detail.checked) {
      this.chosenCompetenceValue.value === 'All'
        ? this.searchCriteriaService.setCompetence(null)
        : this.searchCriteriaService.setAutomaticStations();
    } else {
      //on removeAutomaticStations if 'All' is a selected option we add allIds to criteria except for AUTOMATIC_STATIONS
      this.chosenCompetenceValue.value === 'All'
        ? this.searchCriteriaService.setCompetence(allIds.ids)
        : this.searchCriteriaService.removeAutomaticStations();
    }
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

  private async setObserverCompetence(searchCriteriaObserverCompetence: number[]) {
    this.chosenCompetenceValue = this.setActiveObserverCompetence(searchCriteriaObserverCompetence);
  }

  private mapObservationTypesToView(searchCriteriaRegType: RegistrationTypeCriteriaDto[]) {
    if (!this.observationTypesOptions) return;

    if (!searchCriteriaRegType) {
      this.observationTypesOptions.forEach((type) => (type.isChecked = false));
      return;
    }

    const subtypes = [];
    searchCriteriaRegType.forEach((type) => {
      if (type.SubTypes.length > 0) {
        type.SubTypes.forEach((subtype) => subtypes.push({ parentId: type.Id, id: subtype }));
      } else {
        subtypes.push({ parentId: type.Id, id: type.Id });
      }
    });
    this.observationTypesOptions.forEach((obsType) => {
      const has = subtypes.some((s) => s.parentId == obsType.parentId && s.id == obsType.id);
      has ? (obsType.isChecked = true) : (obsType.isChecked = false);
    });
    this.observationTypesSelectedCount = this.observationTypesOptions.filter((ot) => ot.isChecked === true).length;
  }

  private setActiveObserverCompetence(ids: number[]): CompetenceItem {
    if (!this.competenceOptions) return;

    if (ids) {
      let newIds = ids.sort((id1, id2) => id1 - id2);
      if (ids.includes(AUTOMATIC_STATIONS)) {
        newIds = ids.filter((i) => i !== AUTOMATIC_STATIONS);
        //fetch out AUTOMATIC_STATIONS and set checkbox
        this.isAutomaticStationChecked = true;
      } else {
        this.isAutomaticStationChecked = false;
      }
      let competenceOptionToSet;
      const compareArrays = (a, b) => a.length === b.length && a.every((element, index) => element === b[index]);
      for (let i = 0; i < this.competenceOptions.length; i++) {
        if (
          compareArrays(
            this.competenceOptions[i].ids.filter((i) => i != AUTOMATIC_STATIONS),
            newIds
          )
        ) {
          competenceOptionToSet = this.competenceOptions[i];
          break;
        }
      }
      return competenceOptionToSet;
    } else {
      this.isAutomaticStationChecked = this.currentGeoHazard.includes(GeoHazard.Snow) ? true : false;
      return this.competenceOptions.find((option) => option.value == 'All');
    }
  }

  //set automatic station on as default in both view and searchCriteria
  private setAutomaticStationsOnInit(filteredCompetance: KdvElement) {
    this.isAutomaticStationChecked = true;
    this.automaticStationCompetenceItem = {
      name: filteredCompetance.Name,
      value: filteredCompetance.Name,
      ids: [filteredCompetance.Id],
    };
  }

  private async mapCompetences(unsortedCompetences: KdvElement[][]): Promise<CompetenceItem[]> {
    this.automaticStationCompetenceItem = null;
    this.isAutomaticStationChecked = false;
    const competencesSorted: { [name: string]: CompetenceItem } = {};
    const allIds = unsortedCompetences
      .flat()
      .map((item) => item.Id)
      .filter((id) => id !== AUTOMATIC_STATIONS);
    unsortedCompetences.map((arrOfFilteredCompetances) => {
      //create an array of all competnece ids available per geohazard
      arrOfFilteredCompetances.map((filteredCompetance) => {
        //exclude automatic station id (check const AUTOMATIC_STATIONS)
        const filteredIds = allIds.filter(
          (id) => +id.toString().slice(1) >= +filteredCompetance.Id.toString().slice(1)
        );
        if (filteredCompetance.Name == 'A') {
          this.setAutomaticStationsOnInit(filteredCompetance);
        }
        //add 0 to 'unknown' competence array of ids and change name to All
        else if (filteredCompetance.Name == '-') {
          competencesSorted['All'] = { name: filteredCompetance.Name, value: 'All', ids: [0, ...filteredIds] };
        }
        //check if object contains key already and add extra ids (water and soil)
        else {
          competencesSorted[filteredCompetance.Name] = {
            name: filteredCompetance.Name,
            value: filteredCompetance.Name,
            ids: filteredIds,
          };
        }
      });
    });
    this.translateCompetenceOptions(competencesSorted);
    this.chosenCompetenceValue = competencesSorted['All'];
    return Object.values(competencesSorted).reverse();
  }

  private async translateCompetenceOptions(options: {
    [name: string]: CompetenceItem;
  }): Promise<{ [name: string]: CompetenceItem }> {
    //currently option 'All' is the only option that requires translation
    options['All'].name = await firstValueFrom(this.translateService.get('OBSERVATION_FILTER.COMPETANCE_FILTER.ALL'));
    return options;
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
}
