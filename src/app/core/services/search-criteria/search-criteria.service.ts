import { Injectable } from '@angular/core';
import cloneDeep from 'clone-deep';
import { BehaviorSubject, combineLatest, firstValueFrom, map, Observable, skipWhile, tap } from 'rxjs';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { UserSettingService } from '../user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

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
const URL_PARAM_GEOHAZARD = 'hazard';
const URL_PARAM_DAYSBACK = 'daysBack';
const URL_PARAM_NICKNAME = 'nick';

/**
 * Contains current filter for registrations
 * Use this to change which registrations you want to find
 * Call init(ActivatedRoute) to initialize this service once!
 */
@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  private route: ActivatedRoute;
  private searchCriteria: BehaviorSubject<SearchCriteriaRequestDto>;

  /**
   * Current filter. Current language and geo hazards are always included
   */
  readonly searchCriteria$: Observable<Immutable<SearchCriteriaRequestDto>>;

  constructor(
    private router: Router,
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private logger: LoggingService
  ) {
    const criteria = this.readUrlParams();
    this.searchCriteria = new BehaviorSubject<SearchCriteriaRequestDto>(criteria);

    //TODO: Les url og sett kriteria fra denne
    //TODO: Hver gang et filter settes/endres, lagre dette i URL (uten å trigge sideskift)

    this.searchCriteria$ = combineLatest([
      this.searchCriteria.asObservable(),
      this.userSettingService.language$,
      this.userSettingService.currentGeoHazard$,
      this.userSettingService.daysBackForCurrentGeoHazard$
    ]).pipe(
      map(([criteria, langKey, geoHazards, daysBack]) => {
        const fromObsTime = this.convertToIsoDate(daysBack);
        return {
          ...criteria,
          LangKey: langKey,
          SelectedGeoHazards: geoHazards,
          FromDtObsTime: fromObsTime,
          ToDtObsTime: null
        } as SearchCriteriaRequestDto;
      })
    );
  }

  private readUrlParams(): SearchCriteriaRequestDto {
    return {};
  }

  private async setCriteriaFromUrlParams(route: ActivatedRoute) {
    this.route = route;
    const queryParams = this.route.snapshot.queryParamMap;
    const geoHazard = queryParams.get(URL_PARAM_GEOHAZARD);
    if (geoHazard != null) {
      //TODO: Lagre naturfare i innstillinger, kan med fordel gjøres i samme funksjon som vi lagrer daysBack og etterhvert langKey
    }

    const daysBack = queryParams.get(URL_PARAM_DAYSBACK);
    if (daysBack != null) {
      //TODO: Sjekk om det er et tall
      await this.saveDaysBackInSettings(parseInt(daysBack));
    }

    const nickName = queryParams.get(URL_PARAM_NICKNAME);
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = {
      ...cloneDeep(currentCriteria),
      ObserverNickName: nickName
    } as SearchCriteriaRequestDto;

    this.searchCriteria.next(newCriteria);
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
    const newCriteria = { ...currentCriteria, ObserverNickName: nickName } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    this.setUrlParam(URL_PARAM_NICKNAME, nickName);
  }

  private setUrlParam(key: string, value: unknown) {
    const queryParams: Params = { [key]: value };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge'
      });
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

  private setLangKey(langKey: number) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), LangKey: langKey } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  private setGeoHazards(geoHazards: GeoHazard[]) {
    const currentCriteria = this.searchCriteria.value;
    const newCriteria = { ...cloneDeep(currentCriteria), SelectedGeoHazards: geoHazards } as SearchCriteriaRequestDto;
    this.searchCriteria.next(newCriteria);
    //TODO: Sett url-parameter
  }

  private async saveDaysBackInSettings(daysBack: number): Promise<void> {
    //TODO: Snarfet fra ObservationDaysBackComponent: Legg et felles sted hvis vi skal bruke dette!
    const userSetting = await firstValueFrom(this.userSettingService.userSetting$);
    let changed = false;
    for (const geoHazard of userSetting.currentGeoHazard) {
      const existingValue = userSetting.observationDaysBack.find(
        (x) => x.geoHazard === geoHazard
      );
      if (existingValue.daysBack !== daysBack) {
        existingValue.daysBack = daysBack;
        changed = true;
      }
    }
    if (changed) {
      this.userSettingService.saveUserSettings(userSetting);
    }
  }

}