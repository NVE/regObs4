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
import { ChangeDetectionStrategy, Component, OnInit, Signal, TrackByFunction, computed, inject } from '@angular/core';
import { SelectInterface } from '@ionic/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { RegistrationTypeCriteriaDto, RegistrationTypeDto } from 'src/app/modules/common-regobs-api';
import { SearchCriteriaModelService } from 'src/app/core/services/search-criteria/search-criteria-model.service';
import { CompetenceOption, CompetenceOptions } from './competenceOptions';
import { Immutable } from 'src/app/core/models/immutable';
import { ObservationTypeView } from './observationTypeOptions';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ObservationsDaysBackComponent } from '../observations-days-back/observations-days-back.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { UpdateObservationsComponent } from '../update-observations/update-observations.component';
import { SlushFlowFilterComponent } from '../slush-flow-filter/slush-flow-filter.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { HeaderColorDirective } from 'src/app/modules/shared/directives/header-color/header-color.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderWithSelectedItemsComponent } from '../header-with-selected-items/header-with-selected-items.component';
import { RegionFilterComponent } from '../region-filter/region-filter.component';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { Capacitor } from '@capacitor/core';

const obsTypeTrackById: TrackByFunction<ObservationTypeView> = (index: number, t: ObservationTypeView) => {
  return t.id;
};

const competenceOptionTrackById: TrackByFunction<CompetenceOption> = (index: number, c: CompetenceOption) => {
  return c.ids.join('-');
};

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
    SlushFlowFilterComponent,
    TranslatePipe,
    UpdateObservationsComponent,
    HeaderColorDirective,
    HeaderWithSelectedItemsComponent,
    RegionFilterComponent,
  ],
})
export class FilterMenuComponent extends NgDestoryBase implements OnInit {
  private userSettingService = inject(UserSettingService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private searchCriteriaModelService = inject(SearchCriteriaModelService);
  observationTypeGroups = toSignal(this.searchCriteriaModelService.getObservationTypeGroups$());

  private currentGeoHazard = toSignal(this.userSettingService.currentGeoHazard$, { initialValue: [GeoHazard.Snow] });
  isGeohazardSnow = computed(() => this.currentGeoHazard().includes(GeoHazard.Snow));

  // returnerer søkekriteria: gruppe id - nøkkel, subtype id [] - verdi
  criteriasObject = toSignal(
    this.searchCriteriaService.searchCriteria$.pipe(
      map((searchCriteria) => searchCriteria.SelectedRegistrationTypes || []),
      map((selectedRegistrationTypes) => {
        const result: Record<number, number[]> = {};

        selectedRegistrationTypes.forEach((item) => {
          const key = item.Id;
          if (!result[key]) {
            result[key] = [];
          }
          if (item.SubTypes !== undefined) {
            result[key] = [...item.SubTypes];
          }
        });

        return result;
      })
    )
  );

  isWebPlatform = !Capacitor.isNativePlatform();
  nickName?: string | null = null;

  competenceItems$?: Observable<CompetenceOption[]>;

  showObservations$?: Observable<boolean>;
  observationTypes$?: Observable<ObservationTypeView[]>;
  noCompetenceFilterActive$?: Observable<boolean>;

  get competenceOptionTrackById() {
    return competenceOptionTrackById;
  }

  get obsTypeTrackById() {
    return obsTypeTrackById;
  }

  slushFlowFilterIsActive = false;

  // returnerer observasjonstyper med evt. grupper
  groupsWithIsCheckedComputed = computed(() => {
    const groups = this.observationTypeGroups() || [];
    const criterias = this.criteriasObject();

    return groups
      .filter((group): group is RegistrationTypeDto => group?.Id !== undefined) // Filter out any undefined groups
      .map((group) => {
        const subtypes = group?.SubTypes?.map((subType) => ({
          id: subType.Id,
          name: subType.Name,
          isChecked: criterias ? criterias[group.Id]?.includes(subType.Id) : false,
          parentId: group.Id,
        }));

        return {
          id: group.Id,
          name: group?.Name,
          isChecked: criterias ? criterias[group.Id]?.length === subtypes?.length : false,
          subTypes: subtypes,
        };
      });
  });

  // Returnerer navn på valgte observasjonstyper
  selectedObservationTypes: Signal<string[]> = computed(() => {
    const result: string[] = [];
    const groups = this.groupsWithIsCheckedComputed();
    for (const group of groups) {
      if (group.subTypes?.length) {
        for (const subType of group.subTypes) {
          if (subType.isChecked && subType.name !== undefined) {
            result.push(subType.name);
          }
        }
      } else {
        // hvis valgt gruppe ikke har subtyper, returnerer vi gruppenavnet
        if (group.isChecked && group.name !== undefined) {
          result.push(group.name);
        }
      }
    }
    return result;
  });

  constructor() {
    super();
    addIcons({ closeCircleOutline });
  }

  async ngOnInit() {
    this.showObservations$ = this.userSettingService.showObservations$;

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

  async onResetFilters() {
    this.searchCriteriaService.resetSearchCriteria();
  }

  async toggleObservationType(checked: boolean, parentId: number, typeId?: number) {
    //if parentid and subtypeid are the same it means there is no subtypes
    let obsType: RegistrationTypeCriteriaDto;
    if (parentId == typeId) obsType = { Id: parentId, SubTypes: [] };
    else obsType = { Id: parentId, SubTypes: typeId ? [typeId] : [] };
    if (checked) await this.searchCriteriaService.setObservationType(obsType);
    else await this.searchCriteriaService.removeObservationType(obsType);
  }

  async toggleObservationGroup(checked: boolean, groupId: number, subtypes: ObservationTypeView[] | undefined) {
    const obsGroup = { Id: groupId, SubTypes: subtypes ? subtypes.map((m) => m.id) : [] };
    if (checked) {
      await this.searchCriteriaService.setObservationType(obsGroup);
    } else {
      await this.searchCriteriaService.removeObservationType(obsGroup);
    }
  }

  setNickName(newNick: SearchbarCustomEvent) {
    let nickName = undefined;
    newNick?.target?.value && (nickName = newNick.target.value.toLowerCase());
    this.searchCriteriaService.setObserverNickName(nickName);
  }
}
