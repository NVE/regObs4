import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LangKey } from 'src/app/modules/common-core/models';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { SearchCriteriaService } from '../search-criteria/search-criteria.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ObservationBaseService {

  // NEW, but private..
  // A service that can provide relevant search criteria
  // Should be used to apply filtering when searching for observations.
  protected abstract readonly searchCriteriaService: SearchCriteriaService;

  // OLD
  // Contains filtered observations. Should listen to searchCriteriaService.searchCriteria$
  // and emit a new list of observations when it updates.
  public abstract readonly observations$: Observable<RegistrationViewModel[]>;

  // NEW
  // Emits the datetime for when data for the current search criteria was last fetched from the regobs API
  public abstract readonly lastUpdated$: Observable<Date>;

  // OLD
  // TODO: We may possibly need this to support the same API as the old ObservationService
  // abstract readonly dataLoad$: Observable<string>;

  // OLD
  // Force update of data. Should always try fetching fresh data from regobs API.
  // Old ObservationService has two public methods with this purpose (se below),
  // but we should try to eliminate one of them.
  // If possible we should also remove the cancel promise, not sure why that is needed.
  public abstract updateObservations(cancel?: Promise<any>): Promise<void>

  // OLD
  // TODO: Se comment above, remove this one?
  // public abstract forceUpdateObservationsForCurrentGeoHazard(cancel?: Promise<any>): Promise<void>

  // OLD
  // TODO: Can we use a property for this one? See lastUpdated$ above. If so, remove it?
  // public abstract getLastUpdatedForCurrentGeoHazardAsObservable(): Observable<Date>;

  // OLD, but renamed from "uniqueObservation" - not specific enough
  // TODO: Not using any class functionality, this could also be moved to stand alone utility function
  public getUniqueObservationKey(obs: RegistrationViewModel, langKey: LangKey): string {
    return `${obs.RegId}_${langKey}_${obs.DtChangeTime}`;
  }

  // OLD
  // TODO: Can this be removed?
  //   A custom search criteria with the current user can be provided to my observations
  // public getObservationsForCurrentUser(
  //   langKey: LangKey,
  //   pageNr?: number,
  //   numberOfRecords?: number  // NB: Default 10 in old implementation
  // ): Observable<RegistrationViewModel>

  // OLD
  // TODO: Can this be removed?
  //  A custom search criteria with RegID set can be provided to the observation detail page
  // async getObservationById(id: number, appMode: AppMode): Promise<RegistrationViewModel>

}
