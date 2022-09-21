import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {

  // TODO: Add public methods for updating search criteria..

  searchCriteria$: Observable<SearchCriteriaRequestDto>;
}
