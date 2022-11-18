import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationViewModel, RegobsApiConfiguration, SearchCriteriaRequestDto, SearchService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';


const DEBUG_TAG = 'OfflineCapableSearchService';

/**
 * Will search for observations in the offline database instead of searching online through the Regobs API
 */
@Injectable()
export class OfflineCapableSearchService extends SearchService {

  constructor(
    config: RegobsApiConfiguration,
    http: HttpClient,
    private logger: LoggingService,
  ) {
    super(config, http);
  }

  SearchSearch(criteria: SearchCriteriaRequestDto): Observable<RegistrationViewModel[]> {
    this.logger.debug('Searching in offline capable service', DEBUG_TAG);
    return super.SearchSearch(criteria);
  }
}