import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Platform, SearchbarCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, firstValueFrom } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
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
  automaticStation: CompetenceItem;
  isShowAutomaticStation = false;
  isAutomaticStationChecked = true;
  chosenCompetenceValue: CompetenceItem;

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
    this.searchCriteriaService.resetEvent.subscribe(() => {
      this.isAutomaticStationChecked = true;
      this.nickName = '';
    });
    const searchCriteria = await firstValueFrom(this.searchCriteriaService.searchCriteria$);

    combineLatest([
      this.userSettingService.currentGeoHazard$,
      this.kdv.getViewRepositoryByKeyObservable('RegistrationTypesV'),
      this.kdv.getKdvRepositoryByKeyObservable('CompetenceLevelKDV'),
    ])
      .pipe(
        takeUntil(this.ngDestroy$),
        map(([geoHazard, registrationTypes, competenceLevels]) => {
          const registrationTypesByGeoHazard = geoHazard
            .map((typesByGeoHazard) => registrationTypes[typesByGeoHazard])
            .flat();
          const competenceLevelsByGeoHazard = geoHazard
            .map((geoHazard) => COMPETANCE_FILTER[geoHazard])
            .map((f) => competenceLevels.filter(f));
          this.isSelectedRegistrationTypes(
            searchCriteria.SelectedRegistrationTypes as RegistrationTypeCriteriaDto[],
            registrationTypesByGeoHazard
          );
          this.isObserverCompetence(searchCriteria.ObserverCompetence as number[], competenceLevelsByGeoHazard);
          this.setNickNameFromSearchCriteria(searchCriteria.ObserverNickName);
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  onSelectCompetenceChange(event) {
    if (!event.detail.value) {
      return;
    }

    this.chosenCompetenceValue = event.detail.value;
    const ids = event.detail.value.ids;

    if (this.isAutomaticStationChecked && event.detail.value.value === 'All') {
      this.searchCriteriaService.setCompetence(null);
    } else if (this.isAutomaticStationChecked) {
      ids.push(105);
      this.searchCriteriaService.setCompetence(ids);
    } else {
      this.searchCriteriaService.setCompetence(ids);
    }
  }

  async onCheckAutomaticStations(event) {
    const { ObserverCompetence: existingCompetence } = await firstValueFrom(this.searchCriteriaService.searchCriteria$);
    this.isAutomaticStationChecked = event.detail.checked;
    const allIds = this.competenceOptions
      .map((co) => co.ids)
      .flat()
      .reduce((cur, id) => {
        if (!cur.includes(id)) cur.push(id);
        return cur;
      }, []);
    let competence = [];
    if (existingCompetence?.length == allIds.length && this.isAutomaticStationChecked) {
      competence = null;
    } else if (existingCompetence?.length && this.isAutomaticStationChecked) {
      competence = [...existingCompetence, ...event.detail.value.ids];
    } else if (existingCompetence?.length && !this.isAutomaticStationChecked) {
      competence = existingCompetence.filter((c) => event.detail.value.ids.indexOf(c) === -1);
    } else if (!this.isAutomaticStationChecked) {
      competence = allIds;
    }
    this.searchCriteriaService.setCompetence(competence);
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

  private async isObserverCompetence(searchCriteriaObserverCompetence: number[], compLevels: KdvElement[][]) {
    const emptyForm = await this.sortCompetences(compLevels);
    this.competenceOptions = emptyForm;
    if (searchCriteriaObserverCompetence != null && searchCriteriaObserverCompetence.length > 0) {
      this.chosenCompetenceValue = this.formatUrlToViewModel(emptyForm, searchCriteriaObserverCompetence);
    }
  }

  private setNickNameFromSearchCriteria(name: string) {
    this.nickName = name;
  }

  private isSelectedRegistrationTypes(searchCriteriaRegType: RegistrationTypeCriteriaDto[], regTypes) {
    const emptyForm = this.convertTypesDtoToView(regTypes);
    if (searchCriteriaRegType != null && searchCriteriaRegType.length > 0) {
      this.observationTypesOptions = this.mapSelectedRegTypesFromSearchCriteria(
        emptyForm,
        searchCriteriaRegType as RegistrationTypeCriteriaDto[]
      );
    } else {
      this.observationTypesOptions = emptyForm;
    }
  }

  private formatUrlToViewModel(emptyForm: CompetenceItem[], ids: number[]): CompetenceItem {
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

    for (let i = 0; i < emptyForm.length; i++) {
      if (compareArrays(emptyForm[i].ids, newIds)) {
        competenceOptionToSet = emptyForm[i];
        break;
      }
    }
    return competenceOptionToSet;
  }

  //set automatic station on as default in both view and searchCriteria
  private setAutomaticStationsOnInit(filteredCompetance: KdvElement) {
    this.isShowAutomaticStation = true;
    this.automaticStation = {
      name: filteredCompetance.Name,
      value: filteredCompetance.Name,
      ids: [filteredCompetance.Id],
    };
  }

  private async sortCompetences(unsortedCompetences: KdvElement[][]): Promise<CompetenceItem[]> {
    const competanceSorted: { [name: string]: CompetenceItem } = {};
    //since the filter menu component is not re rendered on geo hazard change
    //we have to set showAutomaticStation to false here
    const allIds = unsortedCompetences
      .flat()
      .map((item) => item.Id)
      .filter((id) => id !== 105);
    this.isShowAutomaticStation = false;
    unsortedCompetences.map((arrOfFilteredCompetances) => {
      //create an array of all competnece ids available per geohazard
      arrOfFilteredCompetances.map((filteredCompetance) => {
        //exclude automatic station id 105
        const filteredIds = allIds.filter((id) => id >= filteredCompetance.Id);
        if (filteredCompetance.Name == 'A') {
          this.setAutomaticStationsOnInit(filteredCompetance);
        }
        //add 0 to 'unknown' competence array of ids and change name to All
        else if (filteredCompetance.Name == '-') {
          competanceSorted['All'] = { name: filteredCompetance.Name, value: 'All', ids: [0, ...filteredIds] };
        }
        //check if object contains key already and add extra ids (water and soil)
        else if (Object.prototype.hasOwnProperty.call(competanceSorted, filteredCompetance.Name)) {
          const existing = competanceSorted[filteredCompetance.Name];
          competanceSorted[filteredCompetance.Name] = { ...existing, ids: [...existing.ids, ...filteredIds] };
        } else {
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

  private mapSelectedRegTypesFromSearchCriteria(
    emptyForm: ObservationTypeView[],
    criteria: RegistrationTypeCriteriaDto[]
  ): ObservationTypeView[] {
    criteria.forEach((selectedType) => {
      if (selectedType.SubTypes.length > 0) {
        selectedType.SubTypes.forEach((subtype) => {
          const subTypeToChangeIndex = emptyForm.findIndex((type) => type.id === subtype);
          emptyForm[subTypeToChangeIndex] ? (emptyForm[subTypeToChangeIndex].isChecked = true) : null;
        });
      } else {
        const typeToChangeIndex = emptyForm.findIndex((type) => type.id === selectedType.Id);
        emptyForm[typeToChangeIndex] ? (emptyForm[typeToChangeIndex].isChecked = true) : null;
      }
    });
    return emptyForm;
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
