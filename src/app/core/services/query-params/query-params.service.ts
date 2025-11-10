import { DOCUMENT, inject, Injectable } from '@angular/core';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { readParamsFromDoc, toUrlParams } from '../search-criteria/url-params';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchCriteria } from '../../models/search-criteria';

/**
 * Kan parse query-parametere fra oppstarts-urlen, og legge til/oppdatere query-parametere basert på søke-kriterier.
 */
@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  startup = readParamsFromDoc(inject(DOCUMENT));

  /**
   * Oppdater query-parametere som vises i gjeldende url.
   *
   * daysBack avgjør om dager tilbake eller fra-til-dato legges til.
   */
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
