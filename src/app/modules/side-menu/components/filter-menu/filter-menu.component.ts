import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationTypeCriteriaDto, RegistrationTypeDto, RegistrationTypeSubTypeDto } from 'src/app/modules/common-regobs-api';
import { captureMessage } from '@sentry/browser';

interface ObservationTypeView {
  name: string,
  id: number,
  isChecked: boolean,
  parentId: number
}

const DEBUG_TAG = 'FilterMenuComponent';

//create view model
function mapRegistrationSubtypes(subtypes: RegistrationTypeSubTypeDto[], parentId: number): ObservationTypeView[] {
  return subtypes.map(
    st => {return {name: st.Name, parentId: parentId, id: st.Id, isChecked: false};});
}

function mapRegistrationType(type: RegistrationTypeDto): ObservationTypeView[] {
  return [{name: type.Name, parentId: type.Id, id: type.Id, isChecked: false}];
}

function removeDuplicatesFromObservationTypes(arr: ObservationTypeView[]): ObservationTypeView[] {
  return arr.reduce((cur, element) => {
    if (cur && cur.filter(i => i.id === element.id).length > 0) {
      return cur;
    } else {
      cur.push(element);
      return cur;
    }
  },[] as ObservationTypeView[] );
}

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
  isIndeterminate: boolean;
  masterCheck: boolean;
  nickName: string;

  observationTypesOptions : ObservationTypeView[];

  constructor(private platform: Platform,
              private userSettingService: UserSettingService,
              private searchCriteriaService: SearchCriteriaService,
              private cdr: ChangeDetectorRef,
              private kdv: KdvService,
              private logger: LoggingService) {
    super();
  }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');

    const hasObservationsTypesOptions = new Subject<void>();

    combineLatest([
      this.searchCriteriaService.searchCriteria$,
      hasObservationsTypesOptions.pipe(take(1))
    ]).pipe(
      takeUntil(this.ngDestroy$),
      tap(([criteria]) => {
        if (criteria.SelectedRegistrationTypes != null){
          //this one runs just as many times as the number of checkboxes selected...
          this.mapSelectedRegTypesFromSearchCriteria(
            this.observationTypesOptions, criteria.SelectedRegistrationTypes as RegistrationTypeCriteriaDto[]);}
        this.cdr.markForCheck();
      })
    ).subscribe();

    combineLatest([
      this.userSettingService.currentGeoHazard$.pipe(map(result => result)),
      this.kdv.getViewRepositoryByKeyObservable('RegistrationTypesV')]).pipe(
      map(([geoHazard, registrationTypes]) => {
        const registrationTypesByGeoHazard = geoHazard.map(typesByGeoHazard =>
          registrationTypes[typesByGeoHazard]).flat();
        return this.convertTypesDtoToView(registrationTypesByGeoHazard);
      }))
      .subscribe(c => {
        this.observationTypesOptions = c;
        hasObservationsTypesOptions.next();
        this.cdr.markForCheck();
      });

    this.searchCriteriaService.searchCriteria$.pipe(
      takeUntil(this.ngDestroy$),
      tap((criteria) => {
        this.nickName = criteria.ObserverNickName;
        this.cdr.markForCheck();
      })
    ).subscribe();
  }

  mapSelectedRegTypesFromSearchCriteria(
    emptyForm: ObservationTypeView[],
    criteria: RegistrationTypeCriteriaDto[]): ObservationTypeView[]
  {
    criteria.forEach(selectedType => {
      if (selectedType.SubTypes.length > 0) {
        selectedType.SubTypes.forEach(subtype =>
        {
          const subTypeToChangeIndex = emptyForm.findIndex(type => type.id === subtype);
          emptyForm[subTypeToChangeIndex] ? emptyForm[subTypeToChangeIndex].isChecked = true : null;
        });
      } else {
        const typeToChangeIndex = emptyForm.findIndex(type => type.id === selectedType.Id);
        emptyForm[typeToChangeIndex].isChecked = true;
      }
    });
    return emptyForm;
  }
  //combine subtypes and types into one array
  convertTypesDtoToView(registrationTypesByGeoHazard: RegistrationTypeDto[]): ObservationTypeView[] {
    let arrToReturn: ObservationTypeView[] = [];
    registrationTypesByGeoHazard.map(type => {
      const subtypestoReturn = type.SubTypes.length > 0 ?
        mapRegistrationSubtypes(type.SubTypes, type.Id) :
        mapRegistrationType(type);
      arrToReturn = [...arrToReturn, ...subtypestoReturn];
    });

    const noDuplicates = removeDuplicatesFromObservationTypes(arrToReturn);
    return noDuplicates;
  }

  setNewType(event: CustomEvent, parentId: number, typeId?: number) {
    //if parentid and subtypeid are the same it means there is no subtypes
    let obsType: RegistrationTypeCriteriaDto;
    if (parentId == typeId) obsType = { Id: parentId, SubTypes:[]};
    else obsType = { Id: parentId, SubTypes:[typeId]};
    if (event.detail.checked) this.searchCriteriaService.setObservationType(obsType);
    else  this.searchCriteriaService.removeObservationType(obsType);
  }

  setNickName(event) {
    const nickName = event.target.value?.toLowerCase();
    if (nickName) {
      this.searchCriteriaService.setObserverNickName(nickName);
    }
  }
}
