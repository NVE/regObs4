import { Injectable } from '@angular/core';
import cloneDeep from 'clone-deep';
import { firstValueFrom, map, Observable, of, Subject } from 'rxjs';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import * as L from 'leaflet'

// eslint-disable-next-line @typescript-eslint/ban-types
// If we want to make RegistrationEditModel immutable, use Immutable<RegistrationEditModel>
type ImmutablePrimitive = undefined | null | boolean | string | number | Function;
type Immutable<T> =
  T extends ImmutablePrimitive ? T :
  T extends Array<infer U> ? ImmutableArray<U> :
  ImmutableObject<T>;
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {

  private searchCriteria = new Subject<SearchCriteriaRequestDto>();

  constructor(url) {
    this.searchCriteria.next(...)
  }

  // TODO: Add public methods for updating search criteria..
  updateSearchCriteria(searchCriteria: SearchCriteriaRequestDto) {
    this.searchCriteria.next(searchCriteria);
  }

  updateLangKey()


  searchCriteria$ = of({

  });

  searchCriteria$: Observable<Immutable<SearchCriteriaRequestDto>> = this.searchCriteria.asObservable();

  async updateFromSideMenu() {
    const criteria = await firstValueFrom(this.searchCriteria$);
    (criteria as SearchCriteriaRequestDto).LangKey = 2;

  }
}
