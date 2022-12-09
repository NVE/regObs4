import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { KdvElement, SearchService } from 'src/app/modules/common-regobs-api';
import { KdvService } from 'src/app/modules/common-registration/registration.services';

export interface ObservationTypeFilterItem {
  value: string,
  geohazardTid: GeoHazard[],
  isChecked: boolean
}

interface CompetenceItem {
  name: string,
  ids: number[]
}

const DEBUG_TAG = 'FilterMenuComponent';

const COMPETANCE_FILTER = {
  [GeoHazard.Snow]: (kdv: KdvElement) => kdv.Id >= 100 && kdv.Id < 200,
  [GeoHazard.Ice]: (kdv: KdvElement) => kdv.Id >= 700 && kdv.Id < 800,
  [GeoHazard.Soil]: (kdv: KdvElement) => kdv.Id >= 600 && kdv.Id < 700,
  [GeoHazard.Water]: (kdv: KdvElement) => kdv.Id >= 200 && kdv.Id < 300,
};

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMenuComponent extends NgDestoryBase implements OnInit {

  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;
  showObservationTypes = false;
  showCompetances = false;
  isIndeterminate: boolean;
  masterCheck: boolean;
  nickName: string;

  filteredObservationTypes: ObservationTypeFilterItem[];

  observationTypes : ObservationTypeFilterItem[] = [
    {
      value: 'Ulykker',
      geohazardTid: [GeoHazard.Snow, GeoHazard.Ice],
      isChecked: false
    },
    {
      value: 'Skredhendelser',
      geohazardTid: [GeoHazard.Snow, GeoHazard.Soil],
      isChecked: false
    },
    {
      value: 'Faretegn',
      geohazardTid: [GeoHazard.Snow, GeoHazard.Ice, GeoHazard.Soil],
      isChecked: false
    },
    {
      value: 'Isdekning',
      geohazardTid: [GeoHazard.Ice],
      isChecked: false
    },
    {
      value: 'Istykkelse',
      geohazardTid: [GeoHazard.Ice],
      isChecked: false
    },
    {
      value: 'Snødekke',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Skredaktiviter',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Vær',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Tester',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Snøprofil',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Skredproblem',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Skredfarevurdering',
      geohazardTid: [GeoHazard.Snow],
      isChecked: false
    },
    {
      value: 'Vannstand',
      geohazardTid: [GeoHazard.Water],
      isChecked: false
    },
    {
      value: 'Skader',
      geohazardTid: [GeoHazard.Water],
      isChecked: false
    },
    {
      value: 'Notater',
      geohazardTid: [GeoHazard.Snow, GeoHazard.Soil, GeoHazard.Water, GeoHazard.Ice],
      isChecked: false
    }
  ];

  selectedVal: string;
  competenceOptions: CompetenceItem[];
  automaticStation: CompetenceItem;
  isShowAutomaticStation = false;
  isAutomaticStationChecked = true;
  chosenValue = 'all';
  constructor(private platform: Platform,
              private userSettingService: UserSettingService,
              private searchCriteriaService: SearchCriteriaService,
              private searchService: SearchService,
              private cdr: ChangeDetectorRef,
              private kdv: KdvService,
              private logger: LoggingService) {
    super();

  }
  /*
    ukjent 0, 100
    * 110
    ** 115
    *** 120
    **** 130
    ***** 150
  */

  //get elements like
  // all []
  //{ name: *, ids: [110, 115 120 130 150] } ids >= current id from a list of all ids
  //{ name: **, ids: [115 120 130 150] } ids >= current id from a list of all ids

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
    this.userSettingService.currentGeoHazard$.pipe(
      switchMap( currentGeoHazard => of(this.filterObservationTypesByGeohazard(currentGeoHazard))))
      .subscribe(items => this.filteredObservationTypes = items);
    const hasCompetenceTypesLoaded = new Subject<void>();
    combineLatest([
      this.userSettingService.currentGeoHazard$.pipe(
        map(geoHazards => geoHazards.map(geoHazard => COMPETANCE_FILTER[geoHazard]))
      ),
      this.kdv.getKdvRepositoryByKeyObservable('CompetenceLevelKDV')
    ]).pipe(
      map(([competanceFilters, competance]) => competanceFilters.map(f => competance.filter(f))),
      //KdvElement[][] -> {KdvElement.Name: [ids]}
      map(filteredList => {
        return this.sortCompetences(filteredList);
      })).subscribe(c => {this.competenceOptions = c; hasCompetenceTypesLoaded.next(); this.cdr.markForCheck();});

    //ADJUST VIEW TO URL
    combineLatest([this.searchCriteriaService.searchCriteria$, hasCompetenceTypesLoaded.pipe(take(1))]).pipe(
      take(1),
      tap(([criteria]) => {
        this.nickName = criteria.ObserverNickName;
        if(criteria.ObserverCompetence) {
          this.chosenValue = this.formatUrlToViewModel(criteria.ObserverCompetence as number[]);
        }
        //[105,140,0] => remove 0 and 105 and then compare array to any other arrays in competenceOptions and ok
        //this.competenceOptions = criteria.ObserverCompetence;
        this.cdr.markForCheck();
      })
    ).subscribe();
  }

  formatUrlToViewModel(ids: number[]){
    let newIds = ids;
    if(ids.includes(105)) {
      newIds = ids.filter(i => i !== 105);
      //fetch out 105 and set checkbox
      this.isAutomaticStationChecked = true;
    } else {
      this.isAutomaticStationChecked = false;
    }
    let competenceOptionToSet;
    const compareArrays = (a, b) =>
      a.length === b.length &&
      a.every((element, index) => element === b[index]);

    for (let i = 0; i < this.competenceOptions.length; i++){
      if(compareArrays(this.competenceOptions[i].ids, newIds)){
        competenceOptionToSet = this.competenceOptions[i];
        break;
      }
    }
    console.log('format', competenceOptionToSet);
    return competenceOptionToSet;
  }

  /*formatNames(keyName: string): string{
    if(keyName.includes('*')){
      const numOfStars = keyName.split('*').length - 1;
      return `${numOfStars} star`;
    } else if (keyName == '-'){
      return 'Unkown';
    } else if (keyName == 'A') {
      return 'Automatic station';
    } else return keyName;
  }*/

  //set automatic station on as default in both view and searchCriteria
  setAutomaticStationsOnInit(filteredCompetance: KdvElement) {
    this.isShowAutomaticStation = true;
    this.automaticStation = {name: filteredCompetance.Name, ids: [filteredCompetance.Id]};
  }

  sortCompetences(unsortedCompetences: KdvElement[][]): CompetenceItem[] {
    const competanceSorted: {[name: string]: CompetenceItem}= {};
    //since the filter menu component is not re rendered on geo hazard change
    //we have to set showAutomaticStation to false here
    this.isShowAutomaticStation = false;
    unsortedCompetences.map(arrOfFilteredCompetances => {
      //create an array of all competnece ids available per geohazard
      const allIds = arrOfFilteredCompetances.map(item => item.Id);
      arrOfFilteredCompetances.map(filteredCompetance => {
        //exclude automatic station id 105
        const filteredIds = allIds.filter(id => id>=filteredCompetance.Id && id != 105);
        if(filteredCompetance.Name == 'A') {
          this.setAutomaticStationsOnInit(filteredCompetance);
        }
        //add 0 to 'unknown' competence array of ids
        else if (filteredCompetance.Name == '-') {
          competanceSorted[filteredCompetance.Name] = {name: filteredCompetance.Name, ids:[...filteredIds, 0]};
        }
        //check if object contains key already and add extra ids (water and soil)
        else if(Object.prototype.hasOwnProperty.call(competanceSorted, filteredCompetance.Name)){
          const existing = competanceSorted[filteredCompetance.Name];
          competanceSorted[filteredCompetance.Name] = {...existing, ids: [...existing.ids, ...filteredIds]};
        } else {
          competanceSorted[filteredCompetance.Name] = {name:filteredCompetance.Name, ids: filteredIds};
        }
      });
    });
    return Object.values(competanceSorted).reverse();
  }

  onSelectCompetenceChange(event) {
    console.log(event);
    this.chosenValue = event.detail.value;
    const ids = event.detail.value.ids;
    //check if isAutomaticStationChecked and then add 105 to filters
    if(this.isAutomaticStationChecked && ids) ids.push(105);
    this.searchCriteriaService.setCompetence(ids);
  }

  onCheckAutomaticStations(event) {
    this.isAutomaticStationChecked = event.detail.checked;
    if (this.isAutomaticStationChecked) this.searchCriteriaService.addAutomaticStationFilter(event.detail.value.ids);
    else this.searchCriteriaService.removeAutomaticStationFilter(event.detail.value.ids);
  }

  filterObservationTypesByGeohazard(currentGeoHazard: GeoHazard[]) {
    return this.observationTypes.filter(
      observationType => observationType.geohazardTid.some(
        (observationGeoHazardTid) => currentGeoHazard.indexOf(observationGeoHazardTid) >= 0));
  }

  toggleShowCompetances() {
    this.showCompetances = !this.showCompetances;
  }

  toggleAllObservationTypes() {
    this.showObservationTypes = !this.showObservationTypes;
  }

  checkMaster(event){
    setTimeout(() => {
      this.observationTypes.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.observationTypes.length;
    let checked = 0;
    this.observationTypes.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  setNickName(event) {
    const nickName = event.target.value?.toLowerCase();
    if (nickName) {
      this.searchCriteriaService.setObserverNickName(nickName);
    }
  }
}
