import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Platform, SearchbarCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, firstValueFrom } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { KdvElement, SearchCriteriaRequestDto, SearchService } from 'src/app/modules/common-regobs-api';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import {
  RegistrationTypeCriteriaDto,
  RegistrationTypeDto,
  RegistrationTypeSubTypeDto,
} from 'src/app/modules/common-regobs-api';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { TranslateService } from '@ngx-translate/core';
import { initializeAnalyticService } from 'src/app/modules/analytics/analytics.module';

interface ObservationTypeView {
  name: string;
  id: number;
  isChecked: boolean;
  parentId: number;
}

interface CompetenceItem {
  name: string;
  value: string;
  ids: number[];
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
  nickName: string;
  observationTypesOptions: ObservationTypeView[];
  competenceOptions: CompetenceItem[];
  chosenCompetenceValue: CompetenceItem;
  automaticStationCompetenceItem: CompetenceItem;
  isAutomaticStationChecked: boolean;
  currentGeoHazard: GeoHazard[];

  constructor(
    private platform: Platform,
    private userSettingService: UserSettingService,
    private searchCriteriaService: SearchCriteriaService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private kdv: KdvService
  ) {
    super();
  }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');

    combineLatest([
      this.searchCriteriaService.searchCriteria$,
      this.userSettingService.currentGeoHazard$.pipe(
        takeUntil(this.ngDestroy$),
        tap((geoHazard) => {
          this.isAutomaticStationChecked = true;
          this.currentGeoHazard = geoHazard;
          this.kdv.getViewRepositoryByKeyObservable('RegistrationTypesV').subscribe((regTypes) => {
            const registrationTypesByGeoHazard = geoHazard.map((typesByGeoHazard) => regTypes[typesByGeoHazard]).flat();
            this.observationTypesOptions = this.convertTypesDtoToView(registrationTypesByGeoHazard);
          });
          this.kdv.getKdvRepositoryByKeyObservable('CompetenceLevelKDV').subscribe(async (competenceLevels) => {
            const competenceLevelsByGeoHazard = geoHazard
              .map((geoHazard) => COMPETANCE_FILTER[geoHazard])
              .map((f) => competenceLevels.filter(f));
            this.competenceOptions = await this.sortCompetences(competenceLevelsByGeoHazard);
          });
        })
      ),
    ]).subscribe(([criteria]) => {
      this.observationTypesOptions &&
        this.mapRegistrationTypesToView(criteria.SelectedRegistrationTypes as RegistrationTypeCriteriaDto[]);
      this.competenceOptions && this.isObserverCompetence(criteria.ObserverCompetence as number[]);
      this.nickName = criteria.ObserverNickName;
      this.cdr.markForCheck();
    });
  }

  async onRestartFilters() {
    this.searchCriteriaService.restartSearchCriteria();
  }

  onSelectCompetenceChange(event) {
    if (!event.detail.value) {
      return;
    }

    this.chosenCompetenceValue = event.detail.value;
    const ids = event.detail.value.ids;

    if (event.detail.value.value === 'All') {
      this.searchCriteriaService.setCompetence(null);
    } else if (this.isAutomaticStationChecked) {
      ids.push(105);
      this.searchCriteriaService.setCompetence(ids);
    } else {
      this.searchCriteriaService.setCompetence(ids);
    }
  }

  async onCheckAutomaticStations(event) {
    this.isAutomaticStationChecked = event.detail.checked;
    //all ids are set on competenceOption 'All'
    const allIds = this.competenceOptions.find((option) => option.value === 'All');
    if (event.detail.checked) {
      this.chosenCompetenceValue.value === 'All'
        ? this.searchCriteriaService.setCompetence(null)
        : this.searchCriteriaService.setAutomaticStations();
    } else {
      //on removeAutomaticStations if 'All' is a selected option we add allIds to criteria except for 105
      this.chosenCompetenceValue.value === 'All'
        ? this.searchCriteriaService.setCompetence(allIds.ids)
        : this.searchCriteriaService.removeAtomaticStations();
    }
  }

  setNewType(event: CustomEvent, parentId: number, typeId?: number) {
    //if parentid and subtypeid are the same it means there is no subtypes
    let obsType: RegistrationTypeCriteriaDto;
    if (parentId == typeId) obsType = { Id: parentId, SubTypes: [] };
    else obsType = { Id: parentId, SubTypes: [typeId] };
    if (event.detail.checked) this.searchCriteriaService.setObservationType(obsType);
    else this.searchCriteriaService.removeObservationType(obsType);
  }

  setNickName(newNick: SearchbarCustomEvent | null) {
    let nickName = null;
    newNick?.target?.value && (nickName = newNick.target.value.toLowerCase());
    this.searchCriteriaService.setObserverNickName(nickName);
  }

  private async isObserverCompetence(searchCriteriaObserverCompetence: number[]) {
    this.chosenCompetenceValue = this.formatUrlToViewModel(searchCriteriaObserverCompetence);
  }

  private mapRegistrationTypesToView(searchCriteriaRegType: RegistrationTypeCriteriaDto[]) {
    if (searchCriteriaRegType) {
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
    } else {
      this.observationTypesOptions.forEach((type) => (type.isChecked = false));
    }
  }

  private formatUrlToViewModel(ids: number[]): CompetenceItem {
    if (ids) {
      let newIds = ids.sort((id1, id2) => id1 - id2);
      if (ids.includes(105)) {
        newIds = ids.filter((i) => i !== 105);
        //fetch out 105 and set checkbox
        this.isAutomaticStationChecked = true;
      } else {
        this.isAutomaticStationChecked = false;
      }
      let competenceOptionToSet;
      const compareArrays = (a, b) => a.length === b.length && a.every((element, index) => element === b[index]);
      for (let i = 0; i < this.competenceOptions.length; i++) {
        if (
          compareArrays(
            this.competenceOptions[i].ids.filter((i) => i != 105),
            newIds
          )
        ) {
          competenceOptionToSet = this.competenceOptions[i];
          break;
        }
      }
      return competenceOptionToSet;
    } else {
      this.isAutomaticStationChecked = this.currentGeoHazard.includes(10) ? true : false;
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

  private async sortCompetences(unsortedCompetences: KdvElement[][]): Promise<CompetenceItem[]> {
    this.automaticStationCompetenceItem = null;
    this.isAutomaticStationChecked = false;
    const competanceSorted: { [name: string]: CompetenceItem } = {};
    const allIds = unsortedCompetences
      .flat()
      .map((item) => item.Id)
      .filter((id) => id !== 105);
    unsortedCompetences.map((arrOfFilteredCompetances) => {
      //create an array of all competnece ids available per geohazard
      arrOfFilteredCompetances.map((filteredCompetance) => {
        //exclude automatic station id 105
        const filteredIds = allIds.filter(
          (id) => +id.toString().slice(1) >= +filteredCompetance.Id.toString().slice(1)
        );
        if (filteredCompetance.Name == 'A') {
          this.setAutomaticStationsOnInit(filteredCompetance);
        }
        //add 0 to 'unknown' competence array of ids and change name to All
        else if (filteredCompetance.Name == '-') {
          competanceSorted['All'] = { name: filteredCompetance.Name, value: 'All', ids: [0, ...filteredIds] };
        }
        //check if object contains key already and add extra ids (water and soil)
        else {
          competanceSorted[filteredCompetance.Name] = {
            name: filteredCompetance.Name,
            value: filteredCompetance.Name,
            ids: filteredIds,
          };
        }
      });
    });
    competanceSorted['All'].name = await firstValueFrom(
      this.translateService.get('OBSERVATION_FILTER.COMPETANCE_FILTER.ALL')
    );
    this.chosenCompetenceValue = competanceSorted['All'];
    return Object.values(competanceSorted).reverse();
  }
  //combine subtypes and types into one array
  private convertTypesDtoToView(registrationTypesByGeoHazard: RegistrationTypeDto[]): ObservationTypeView[] {
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
