import {
  CheckboxCustomEvent,
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToggle,
  IonToolbar,
  Platform,
  SearchbarCustomEvent,
  ToggleCustomEvent,
  IonContent,
} from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { SelectInterface } from '@ionic/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { RegistrationTypeCriteriaDto } from 'src/app/modules/common-regobs-api';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { SearchCriteriaModelService } from 'src/app/core/services/search-criteria/search-criteria-model.service';
import { CompetenceOption, CompetenceOptions } from './competenceOptions';
import { Immutable } from 'src/app/core/models/immutable';
import { ObservationTypeOptions, ObservationTypeView } from './observationTypeOptions';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ObservationsDaysBackComponent } from '../observations-days-back/observations-days-back.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { UpdateObservationsComponent } from '../update-observations/update-observations.component';
import { SelectedItemsCounterLabelComponent } from '../selected-items-counter-label/selected-items-counter-label.component';
import { SlushFlowFilterComponent } from '../slush-flow-filter/slush-flow-filter.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { HeaderColorDirective } from 'src/app/modules/shared/directives/header-color/header-color.directive';
import { RegionFilterComponent } from '../region-filter/region-filter.component';

type PlatformType = 'app' | 'web';
type FilterType = 'observationType' | 'competence' | 'nickName' | 'region';

type FilterSupportPerPlatform = {
  [platformType in PlatformType]: { [filter in FilterType]: boolean };
};

const obsTypeTrackById: TrackByFunction<ObservationTypeView> = (index: number, t: ObservationTypeView) => {
  return t.id;
};

const competenceOptionTrackById: TrackByFunction<CompetenceOption> = (index: number, c: CompetenceOption) => {
  return c.ids.join('-');
};

const DEBUG_TAG = 'FilterMenuComponent';

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
  imports: [
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    AsyncPipe,
    DateRangeComponent,
    IonAccordion,
    IonAccordionGroup,
    IonCheckbox,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSearchbar,
    IonToggle,
    NgFor,
    NgIf,
    ObservationsDaysBackComponent,
    SelectedItemsCounterLabelComponent,
    SlushFlowFilterComponent,
    TranslatePipe,
    UpdateObservationsComponent,
    HeaderColorDirective,
    RegionFilterComponent,
  ],
})
export class FilterMenuComponent extends NgDestoryBase implements OnInit {
  private platform = inject(Platform);
  private userSettingService = inject(UserSettingService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private searchCriteriaModelService = inject(SearchCriteriaModelService);

  popupType?: SelectInterface;
  isIosOrAndroid?: boolean;
  isMobileWeb: boolean;
  platformType: PlatformType;
  nickName?: string | null = null;

  competenceItems$?: Observable<CompetenceOption[]>;

  currentGeoHazard?: GeoHazard[];
  showObservations$?: Observable<boolean>;
  observationTypes$?: Observable<ObservationTypeView[]>;
  nTypesSelected$?: Observable<number>;
  noCompetenceFilterActive$?: Observable<boolean>;

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

  get competenceOptionTrackById() {
    return competenceOptionTrackById;
  }

  get obsTypeTrackById() {
    return obsTypeTrackById;
  }

  slushFlowFilterIsActive = false;

  constructor() {
    super();

    this.isMobileWeb = this.platform.is('mobileweb');
    this.platformType = this.isIosOrAndroid ? 'app' : 'web';
    addIcons({ closeCircleOutline });
  }

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
    this.platformType = this.isIosOrAndroid ? 'app' : 'web';
    this.showObservations$ = this.userSettingService.showObservations$;

    this.userSettingService.currentGeoHazard$.subscribe((curGeohazard) => (this.currentGeoHazard = curGeohazard));

    this.observationTypes$ = combineLatest([
      this.searchCriteriaModelService
        .getObservationTypesFilterOptions$()
        .pipe(map((obsTypesList) => new ObservationTypeOptions(obsTypesList))),

      this.searchCriteriaService.searchCriteria$.pipe(
        map((searchCriteria) => searchCriteria.SelectedRegistrationTypes || []),
        // Sort ids, so distinct check is easier
        map((regTypes) => [...regTypes].sort((a, b) => a.Id - b.Id)),
        distinctUntilChanged((prev, curr) => {
          if (prev.length !== curr.length) {
            return false;
          }

          // Length is the same, check if any items has changed
          if (prev.some((p, i) => curr[i].Id !== p.Id)) {
            return false;
          }

          // Check if any subTypes has changed
          return prev.every((p, i) => arrayHasNotChanged(p.SubTypes || [], curr[i].SubTypes || []));
        })
      ),
    ]).pipe(
      map(([obsTypesOptions, obsTypes]) => {
        // assure that we set boxes back to false since we dont handle proper isChecked => false mutation yet
        for (const v of obsTypesOptions.optionsToReturnMap.values()) {
          v.isChecked = false;
        }
        obsTypes.forEach((type) => {
          const subTypes = type.SubTypes || [];
          if (subTypes.length > 0) {
            subTypes.forEach((subtype) => {
              const obsTypeView = obsTypesOptions.optionsToReturnMap.get(+`${type.Id}.${subtype}`);
              if (obsTypeView) {
                obsTypeView.isChecked = true;
              }
            });
          } else {
            const obsTypeView = obsTypesOptions.optionsToReturnMap.get(type.Id);
            if (obsTypeView) {
              obsTypeView.isChecked = true;
            }
          }
        });
        return obsTypesOptions.options;
      })
    );

    this.nTypesSelected$ = this.observationTypes$.pipe(
      map((obsType) => {
        if (obsType) {
          return [...obsType.filter((ot) => ot.isChecked)].length;
        }
        return 0;
      })
    );

    const competenceCriteria$ = this.searchCriteriaService.searchCriteria$.pipe(
      map((searchCriteria) => searchCriteria.ObserverCompetence || []),
      distinctUntilChanged((prev, curr) => arrayHasNotChanged(prev, curr))
    );

    this.noCompetenceFilterActive$ = competenceCriteria$.pipe(map((c) => c.length === 0));

    this.competenceItems$ = combineLatest([
      this.searchCriteriaModelService.getCompetenceFilterOptions$().pipe(
        // The values in this pipe starts as arrays of ObserverCompetenceLevelDto for all selected geohazards.
        // So we can have two ObserverCompetenceLevelDto for three stars, etc.

        // Group competence by Id and Name so they are easier to work with
        map((competenceList) => new CompetenceOptions(competenceList))
      ),

      competenceCriteria$,
    ]).pipe(
      map(([competenceOptions, competences]) => {
        // Reset all checked properties before values from search criteria are applied
        for (const competence of competenceOptions.options) {
          competence.checked = false;
        }

        // Set all active competences to checked
        for (const competence of competences) {
          const compItem = competenceOptions.idToItem.get(competence);
          if (compItem) compItem.checked = true;
        }

        return competenceOptions.options;
      })
    );

    this.searchCriteriaService.searchCriteria$.subscribe((criteria) => {
      this.nickName = criteria.ObserverNickName;
      this.slushFlowFilterIsActive = this.searchCriteriaService.isSlushFlow(criteria);
    });
  }

  async saveShowObservation(value: ToggleCustomEvent) {
    const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
    userSettings.showObservations = value.detail.checked;
    this.userSettingService.saveUserSettings(userSettings);
  }

  competenceCheckboxChanged(event: CheckboxCustomEvent<CompetenceOption>) {
    if (event.detail.checked) {
      this.searchCriteriaService.addCompetence(event.detail.value.ids);
    } else {
      this.searchCriteriaService.removeCompetence(event.detail.value.ids);
    }
  }

  isSupported(filterType: FilterType): boolean {
    return this.filterSupportPerPlatform[this.platformType][filterType];
  }

  async onResetFilters() {
    this.searchCriteriaService.resetSearchCriteria();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNewType(event: any, parentId: number, typeId?: number) {
    //if parentid and subtypeid are the same it means there is no subtypes
    let obsType: RegistrationTypeCriteriaDto;
    if (parentId == typeId) obsType = { Id: parentId, SubTypes: [] };
    else obsType = { Id: parentId, SubTypes: typeId ? [typeId] : [] };
    if (!event.currentTarget.checked) this.searchCriteriaService.setObservationType(obsType);
    else this.searchCriteriaService.removeObservationType(obsType);
  }

  setNickName(newNick: SearchbarCustomEvent) {
    let nickName = undefined;
    newNick?.target?.value && (nickName = newNick.target.value.toLowerCase());
    this.searchCriteriaService.setObserverNickName(nickName);
  }
}
