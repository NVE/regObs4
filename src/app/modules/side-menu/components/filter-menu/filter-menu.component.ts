import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

export interface ObservationTypeFilterItem {
  value: string,
  geohazardTid: GeoHazard[],
  isChecked: boolean
}

const DEBUG_TAG = 'FilterMenuComponent';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent extends NgDestoryBase implements OnInit {

  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;
  showObservationTypes = false;
  isIndeterminate: boolean;
  masterCheck: boolean;

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

  constructor(private platform: Platform,
              private userSettingService: UserSettingService,
              private searchCriteriaService: SearchCriteriaService,
              private logger: LoggingService) {
    super();

    // this.searchCriteriaService.searchCriteria$.pipe(
    //   takeUntil(this.ngDestroy$)
    // ).subscribe();
  }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
    this.userSettingService.currentGeoHazard$.pipe(
      switchMap( currentGeoHazard => of(this.filterObservationTypesByGeohazard(currentGeoHazard))))
      .subscribe(items => this.filteredObservationTypes = items);
  }

  filterObservationTypesByGeohazard(currentGeoHazard: GeoHazard[]) {
    return this.observationTypes.filter(
      observationType => observationType.geohazardTid.some(
        (observationGeoHazardTid) => currentGeoHazard.indexOf(observationGeoHazardTid) >= 0));
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
    const nickName = event.target.value.toLowerCase();
    this.searchCriteriaService.setObserverNickName(nickName);
  }
}
