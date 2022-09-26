import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AtAGlanceViewModel, RegistrationViewModel, SearchCriteriaRequestDto, SearchService } from 'src/app/modules/common-regobs-api';

export interface SearchResultWithLastUpdatedDate<TViewModel> {
  result: TViewModel[],
  lastUpdatedDate: Date
}

/**
 * By encapsulating the registration search here, this can easily be extended by an offline capable search.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchWithLastUpdatedDateService {

  constructor(private api: SearchService) {}

  search(
    searchCriteria: SearchCriteriaRequestDto
  ): Observable<SearchResultWithLastUpdatedDate<RegistrationViewModel>> {
    return this.api.SearchSearch(searchCriteria).pipe(
      map(result => ({ result, lastUpdatedDate: new Date() }))
    );
  }

  count(
    searchCriteria: SearchCriteriaRequestDto
  ): Observable<number> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Offset, NumberOfRecords, ...criteriaWithoutPaging } = searchCriteria;
    return this.api.SearchCount(criteriaWithoutPaging).pipe(
      map(result => result.TotalMatches)
    );
  }

  atAGlanceSearch(
    searchCriteria: SearchCriteriaRequestDto
  ): Observable<SearchResultWithLastUpdatedDate<AtAGlanceViewModel>> {
    return this.api.SearchAtAGlance(searchCriteria).pipe(
      map(result => ({ result, lastUpdatedDate: new Date() }))
    );
  }

}