import { inject, Injectable } from '@angular/core';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { toUrlParams } from '../search-criteria/url-params';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchCriteria } from '../../models/search-criteria';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  async apply({ criteria, daysBack }: { criteria: SearchCriteria; daysBack?: number }) {
    const params = toUrlParams(criteria as SearchCriteriaRequestDto, daysBack);
    const queryParams = params.entries();
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      replaceUrl: true,
    });
  }
}
