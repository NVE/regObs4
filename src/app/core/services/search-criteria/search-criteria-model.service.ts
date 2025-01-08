import { Injectable, inject } from '@angular/core';
import { Observable, catchError, combineLatest, map, switchMap, timeout } from 'rxjs';
import {
  ObserverCompetenceLevelDto,
  RegistrationTypeDto,
  SearchService,
  SearchSideBarDto,
} from 'src/app/modules/common-regobs-api';
import { UserSettingService } from '../user-setting/user-setting.service';
import { HttpClient } from '@angular/common/http';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

type CompetenceLevelKey = keyof NonNullable<SearchSideBarDto['ObserverCompetenceLevels']>;

// Search criteria model from API uses other geohazard names than the app.
// This object maps from the apps geohazard names to API geohazard names.
const GEOHAZARDMAP: { [property in GeoHazard]: CompetenceLevelKey } = {
  [GeoHazard.NotSpecified]: 'NotSpecified',
  [GeoHazard.Snow]: 'Avalanche',
  [GeoHazard.Ice]: 'Ice',
  [GeoHazard.Soil]: 'EarthFlow',
  [GeoHazard.WetSoil]: 'LandSlide',
  [GeoHazard.Rock]: 'RockFall',
  [GeoHazard.Water]: 'Flooding',
  [GeoHazard.IceFall]: 'IceFall',
  [GeoHazard.EventOnGlacier]: 'EventOnGlacier',
  [GeoHazard.Jøkulhlaup]: 'Jøkulhaup',
  [GeoHazard.Drought]: 'Drought',
  [GeoHazard.Unknown]: 'Unknown',
};

const DEBUG_TAG = 'SearchCriteriaModelService';

/**
 * A service that can provide "models" for search criteria.
 * Currently only implemented for competence, but can be extended for registration types and regions.
 *
 * If the API request fails or times out, cached files from assets are used.
 * These files can be updated using the translation:update-fallback npm script.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchCriteriaModelService {
  private searchService = inject(SearchService);
  private userSettings = inject(UserSettingService);
  private http = inject(HttpClient);
  private logger = inject(LoggingService);

  /**
   * The API request needs langKey and geoHazards as parameters
   */
  private getParams$() {
    return combineLatest([this.userSettings.language$, this.userSettings.currentGeoHazard$]).pipe(
      map(([langKey, geoHazards]) => ({
        langKey,
        geoHazards,
      }))
    );
  }

  /**
   * Try to fetch the search criteria models from the API, but use cached files if request fails.
   */
  private getModel$(params: { langKey: LangKey; geoHazards: GeoHazard[] }): Observable<SearchSideBarDto> {
    return this.searchService
      .SearchGetSearchCriteria({ langKey: params.langKey, geoHazards: params.geoHazards.join(',') })
      .pipe(
        timeout(5000),
        catchError((err) => {
          this.logger.error(err, DEBUG_TAG, 'Could not fetch search criteria model from api');
          return this.getFallback$(params.langKey);
        })
      );
  }

  /**
   * Get competence filter model from API.
   */
  getCompetenceFilterOptions$(): Observable<ObserverCompetenceLevelDto[]> {
    return this.getParams$().pipe(
      switchMap((params) =>
        this.getModel$(params).pipe(
          map((result) => result.ObserverCompetenceLevels || {}),
          map((result) => {
            const apiGeoHazardNames = params.geoHazards.map((g) => GEOHAZARDMAP[g]);
            return apiGeoHazardNames
              .map((g) => result[g])
              .filter((comp) => comp != null)
              .flat();
          })
        )
      )
    );
  }

  /**
   * Get observation types filter model from API.
   */
  getObservationTypesFilterOptions$(): Observable<RegistrationTypeDto[]> {
    return this.getParams$().pipe(
      switchMap((params) =>
        this.getModel$(params).pipe(
          map((result) => result.RegistrationTypes || {}),
          map((result) => {
            const apiGeoHazardNames = params.geoHazards.map((g) => GEOHAZARDMAP[g]);
            return apiGeoHazardNames
              .map((g) => result[g])
              .filter((names) => names != null)
              .flat();
          })
        )
      )
    );
  }

  // NB! Does not filter on geohazard, assets has all geohazards in a single file
  private getFallback$(langKey: LangKey): Observable<SearchSideBarDto> {
    const langKeyText = LangKey[langKey];
    return this.http.get<SearchSideBarDto>(`./assets/json/searchcriteria.${langKeyText}.json`);
  }
}
