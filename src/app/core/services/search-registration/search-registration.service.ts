import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { SearchCriteriaService } from '../search-criteria/search-criteria.service';
import { BaseSearchRegistrationService } from './base-search.service';
import { SearchResultWithLastUpdatedDate, SearchWithLastUpdatedDateService } from './web-api.service';

/**
 * SearchRegistrationService
 */
@Injectable({
  providedIn: 'root'
})
export class SearchRegistrationService extends BaseSearchRegistrationService<RegistrationViewModel> {

  constructor(
    private searchService: SearchWithLastUpdatedDateService,
    searchCriteriaService: SearchCriteriaService
  ) {
    super(searchCriteriaService);
  }

  protected search(criteria: SearchCriteriaRequestDto): Observable<SearchResultWithLastUpdatedDate<RegistrationViewModel>> {
    return this.searchService.search(criteria);
  }

  async count(): Promise<number> {
    const criteria = await firstValueFrom(this.searchCriteriaService.searchCriteria$);
    return await firstValueFrom(this.searchService.count(criteria as SearchCriteriaRequestDto));
  }

}
