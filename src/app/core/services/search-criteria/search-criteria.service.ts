import { Injectable } from '@angular/core';
import cloneDeep from 'clone-deep';
import { BehaviorSubject, combineLatest, map, Observable, skipWhile, tap } from 'rxjs';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { UserSettingService } from '../user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import moment from 'moment';

// this is to make the search criteria immutable
// eslint-disable-next-line @typescript-eslint/ban-types
type ImmutablePrimitive = undefined | null | boolean | string | number | Function;
type Immutable<T> =
  T extends ImmutablePrimitive ? T :
  T extends Array<infer U> ? ImmutableArray<U> :
  ImmutableObject<T>;
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

const DEBUG_TAG = 'SearchCriteriaService';

/**
 * Contains current filter for registrations
 * Use this to change which registrations you want to find
 */
@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  private searchCriteria = new BehaviorSubject<SearchCriteriaRequestDto>(null);

  /**
   * Current filter. Current language and geo hazards are always included
   */
  readonly searchCriteria$: Observable<Immutable<SearchCriteriaRequestDto>>;

  constructor(
    private userSettingsService: UserSettingService,
    private mapService: MapService,
    private logger: LoggingService
  ) {
    //TODO: Les url og sett kriteria fra denne
    //TODO: Hver gang et filter settes/endres, lagre dette i URL (uten å trigge sideskift)

    this.searchCriteria$ = this.searchCriteria.asObservable();

    this.searchCriteria$.pipe(
      tap(criteria => this.logger.debug('criteria changed', DEBUG_TAG, criteria))
    );

    this.searchCriteria$ = this.searchCriteria.pipe(
      skipWhile((criteria) => criteria == null),
    );

    //apply current language and geo hazards to search criteria automatically
    //TODO: Er det riktig å sette gjeldende kriteria rett fra innstillingene på denne måten i stedet for at filterpanelet gjør det?
    combineLatest([
      userSettingsService.language$,
      userSettingsService.currentGeoHazard$,
      userSettingsService.daysBackForCurrentGeoHazard$
    ]).pipe(
      map(([langKey, geoHazards, daysBack]) => {
        const currentCriteria = this.searchCriteria.value;
        const fromObsTime = this.convertToIsoDate(daysBack);
        const newCriteria = {
          ...cloneDeep(currentCriteria),
          LangKey: langKey,
          SelectedGeoHazards: geoHazards,
          FromDtObsTime: fromObsTime,
          ToDtObsTime: null
        } as SearchCriteriaRequestDto;
        this.searchCriteria.next(newCriteria);
        //TODO: Sett url-parametre
      }),
      tap((criteria) => this.logger.debug('criteria changed', DEBUG_TAG, criteria)) //TODO: Hvorfor logger denne tomme kriteria (undefined)?
    ).subscribe();
  }

  setObsTime(fromTime: string, toTime: string) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = {
      ...cloneDeep(currentCriteria),
      FromDtObsTime: fromTime != null ? fromTime : null,
      ToDtObsTime: toTime != null ? toTime : null
    } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  setObserverNickName(nickName: string) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), ObserverNickName: nickName } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  private convertToIsoDate(daysBack: number): string {
    return moment().subtract(daysBack, 'days').startOf('day').toISOString();
  }

  //TODO: Trenger også funksjon for å deaktivere denne. Kanskje ha et flagg som setter denne av og på?
  //Turn on filter by current map extent. The filter will reflect the map extent automatically afterwords
  setExtentByCurrentMapView() {
    this.mapService.mapView$.pipe(
      map((mapView) => {
        const currentCriteria = this.searchCriteria.value;
        const extent = {
          Type: 'MapExtentBounds',
          BottomRight: mapView.bounds.getSouthEast(),
          TopLeft: mapView.bounds.getNorthWest()
        };

        const newCriteria = {
          ...cloneDeep(currentCriteria),
          Extent: extent,
        } as SearchCriteriaRequestDto;
        this.searchCriteria.next(newCriteria);
        //TODO: Sett url-parameter
      })
    );
  }

  setNumberOfRecords(numberOfRecords: number) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), NumberOfRecords: numberOfRecords } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  setOffset(offset: number) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), Offset: offset } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  //TODO: Er ikke sikkert vi trenger denne, siden vi setter dette filteret automatisk
  private setLangKey(langKey: number) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), LangKey: langKey } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  //TODO: Er ikke sikkert vi trenger denne, siden vi setter dette filteret automatisk
  private setGeoHazards(geoHazards: GeoHazard[]) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), SelectedGeoHazards: geoHazards } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  //TODO: Er ikke sikkert vi trenger denne, siden vi setter dette filteret automatisk
  private setDaysBack(daysBack: number) {
    const fromDate = this.convertToIsoDate(daysBack);
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = {
      ...cloneDeep(currentCriteria),
      FromDtObsTime: fromDate,
      ToDtObsTime: null
    } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }
}
