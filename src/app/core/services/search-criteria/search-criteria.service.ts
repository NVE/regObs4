import { Injectable } from '@angular/core';
import {
  combineLatest,
  firstValueFrom,
  map,
  Observable,
  ReplaySubject,
  scan,
  shareReplay,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { PositionDto, SearchCriteriaRequestDto, WithinExtentCriteriaDto } from 'src/app/modules/common-regobs-api';
import { UserSettingService } from '../user-setting/user-setting.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import moment from 'moment';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { Immutable } from 'src/app/core/models/immutable';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { UrlParams } from './url-params';

const DEBUG_TAG = 'SearchCriteriaService';
const URL_PARAM_GEOHAZARD = 'hazard';
const URL_PARAM_GEOHAZARDS_OLD = 'GeoHazards';
const URL_PARAM_DAYSBACK = 'daysBack';
const URL_PARAM_FROMDATE = 'fromDate';
const URL_PARAM_TODATE = 'toDate';
const URL_PARAM_NICKNAME = 'nick';
const URL_PARAM_ARRAY_DELIMITER = '~'; //https://www.rfc-editor.org/rfc/rfc3986#section-2.3

const latLngToPositionDto = (latLng: L.LatLng): PositionDto => ({
  Latitude: latLng.lat,
  Longitude: latLng.lng,
});

export function separatedStringToNumberArray(separatedString: string): number[] {
  if (separatedString?.length) {
    const textWithoutDelimiter = separatedString.replace(URL_PARAM_ARRAY_DELIMITER, '');
    const textContainsOnlyNumbers = !isNaN(+textWithoutDelimiter);
    if (textContainsOnlyNumbers) {
      return separatedString
        .split(URL_PARAM_ARRAY_DELIMITER)
        .filter((x) => x.trim().length && !isNaN(parseInt(x)))
        .map(Number);
    }
  }
  return [];
}

function numberArrayToSeparatedString(numbers: number[]): string {
  if (numbers?.length) {
    return numbers.join(URL_PARAM_ARRAY_DELIMITER);
  }
  return '';
}

function isArraysEqual(array1: number[], array2: number[]): boolean {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

function isoDateTimeToLocalDate(isoDateTime: string): string {
  if (isoDateTime) {
    const offset = new Date().getTimezoneOffset();
    const localTime = new Date(Date.parse(isoDateTime) - offset * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }
  return null;
}

/**
 * Contains current filter for registrations.
 * Use this to change which registrations you want to find.
 *
 * Also responsible for saving the filter as query params in the url.
 * Initializes filter from url query params on startup.
 * The URL should be short, easily readable for the user and easy to type.
 * Multi-select parameters, like geoHazard and type should be represented as a delimited list, example:
 * geoHazard=20~60&type=21~22~36
 *
 * TODO: Vi håndterer ikke alle URL-parametre ennå
 */
@Injectable({
  providedIn: 'root',
})
export class SearchCriteriaService {
  // Jeg tror searchCriteria må være en ReplaySubject for at vi skal være sikre på at scan fungerer som tenkt,
  // i tillfelle noen subscriber sent på searchCriteria$, og vi i mellomtiden har oppdatert søkrekriterier via
  // this.searchCriteria.next(...).
  // Fordelen med å bruke en replaysubject her er faktisk at historikken for søkrekriteriene huskes, som kan være
  // interessant å logge hvis man får en error feks.
  // For å logge alle valg brukeren har gjort som påvirker searchCriteria-subjecten kan man
  // feks gjøre som på linje 60 - 64
  private searchCriteriaChanges: Subject<SearchCriteriaRequestDto> = new ReplaySubject<SearchCriteriaRequestDto>();
  private useMapExtent: true; //TODO: Trenger vi en funksjon for å skru av filter på kartutsnitt?

  /**
   * Current filter. Current language and geo hazards are always included
   */
  readonly searchCriteria$: Observable<Immutable<SearchCriteriaRequestDto>>;

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private logger: LoggingService
  ) {
    const criteria = this.readUrlParams();
    this.logger.debug('Criteria from URL params: ', DEBUG_TAG, criteria);

    this.searchCriteriaChanges
      .pipe(scan((history, currentCriteriaChange) => [...history, currentCriteriaChange], []))
      // Log last 10 choices made
      .subscribe((history) => this.logger.debug('Change history (last 10)', DEBUG_TAG, history.slice(-10)));

    this.searchCriteria$ = combineLatest([
      this.searchCriteriaChanges.pipe(
        startWith(criteria),
        // Akkumuler alle søkekriterier vi setter via searchCriteria-subjecten
        scan((allSearchCriteria, newSearchCriteria) => ({ ...allSearchCriteria, ...newSearchCriteria }), {})
      ),
      this.userSettingService.language$,
      this.userSettingService.currentGeoHazard$,
      this.mapService.mapView$.pipe(map((mapView) => this.createExtentCriteria(mapView))),
    ]).pipe(
      // Kombiner søkerekriterer som ligger utenfor denne servicen med de vi har i denne servicen, feks valgt språk.
      map(([criteria, langKey, geoHazards, extent]) => ({
        ...criteria,
        LangKey: langKey,
        SelectedGeoHazards: geoHazards,
        Extent: extent,
        // TODO: Bytte criteria hit for å overskrive brukerinstillinger fra url
      })),
      // Hver gang vi får nye søkekriterier, sett url-parametere. NB - fint å bruke shareReplay sammen med denne
      // siden dette er en bi-effekt det er unødvendig å kjøre flere ganger.
      tap((newCriteria) => this.setUrlParams(newCriteria)),
      // Jeg tror vi trenger en shareReplay her for at de som subscriber sent
      // skal få alle søkekriteriene når vi bruker scan, men er ikke sikker.
      // Uansett kjekt med en shareReplay her, se kommentar over.
      tap((currentCriteria) => this.logger.debug('Current combined criteria', DEBUG_TAG, currentCriteria)),
      shareReplay(1)
    );
  }

  // build search criteria from url parameters. Some params are stored in user settings
  private readUrlParams(): SearchCriteriaRequestDto {
    const url = new URL(document.location.href);

    const geoHazards = this.readGeoHazardsFromUrl(url.searchParams);

    const daysBack = url.searchParams.get(URL_PARAM_DAYSBACK);
    const daysBackNumeric = this.convertToPositiveInteger(daysBack);
    const fromObsTime: string = this.daysBackToIsoDateTime(daysBackNumeric);
    const toObsTime: string = this.daysBackToIsoDateTime(
      this.convertToPositiveInteger(url.searchParams.get(URL_PARAM_TODATE))
    );

    const nickName = url.searchParams.get(URL_PARAM_NICKNAME);

    const criteria = {
      SelectedGeoHazards: geoHazards,
      FromDtObsTime: fromObsTime,
      ObserverNickName: nickName,
      ToDtObsTime: toObsTime,
    } as SearchCriteriaRequestDto;

    this.saveGeoHazardsAndDaysBackInSettings(geoHazards, daysBackNumeric);
    return criteria;
  }

  private readGeoHazardsFromUrl(searchParams: URLSearchParams): number[] {
    let geoHazards: number[] = [GeoHazard.Snow];

    //read param used in (old) regobs.no
    const geoHazardsParamValueOld = searchParams.getAll(URL_PARAM_GEOHAZARDS_OLD);
    if (geoHazardsParamValueOld?.length) {
      geoHazards = geoHazardsParamValueOld.filter((x) => x.trim().length && !isNaN(parseInt(x))).map(Number);
      new UrlParams().delete(URL_PARAM_GEOHAZARDS_OLD).apply; //we will create url params in new format instead
    }

    //read param on new format
    const geoHazardsParamValue = searchParams.get(URL_PARAM_GEOHAZARD);
    if (geoHazardsParamValue?.length > 0) {
      geoHazards = separatedStringToNumberArray(geoHazardsParamValue);
    }

    return geoHazards;
  }

  private setUrlParams(criteria: SearchCriteriaRequestDto) {
    const params = new UrlParams();
    params.set(URL_PARAM_GEOHAZARD, numberArrayToSeparatedString(criteria.SelectedGeoHazards));
    params.set(URL_PARAM_FROMDATE, isoDateTimeToLocalDate(criteria.FromDtObsTime));
    params.set(URL_PARAM_TODATE, isoDateTimeToLocalDate(criteria.ToDtObsTime));
    params.set(URL_PARAM_NICKNAME, criteria.ObserverNickName);
    params.apply();
  }

  private convertToPositiveInteger(value: string): number {
    if (typeof value !== 'string') {
      return null;
    }
    const numericValue = Number(value);
    if (Number.isInteger(numericValue) && numericValue > 0) {
      return numericValue;
    }
    return null;
  }

  setObserverNickName(nickName: string) {
    this.searchCriteriaChanges.next({ ObserverNickName: nickName });
  }

  setFromDate(fromDate: string) {
    this.searchCriteriaChanges.next({ FromDtObsTime: isoDateTimeToLocalDate(fromDate) });
  }

  setToDate(toDate: string) {
    this.searchCriteriaChanges.next({ ToDtObsTime: isoDateTimeToLocalDate(toDate) });
  }

  private daysBackToIsoDateTime(daysBack: number): string {
    return moment().subtract(daysBack, 'days').startOf('day').toISOString();
  }

  private createExtentCriteria(mapView: IMapView): WithinExtentCriteriaDto {
    if (mapView?.bounds) {
      return {
        BottomRight: latLngToPositionDto(mapView.bounds.getSouthEast()),
        TopLeft: latLngToPositionDto(mapView.bounds.getNorthWest()),
      };
    }
    return null;
  }

  private async saveGeoHazardsAndDaysBackInSettings(geoHazards: number[], daysBack: number): Promise<void> {
    //TODO: Snarfet fra ObservationDaysBackComponent: Legg et felles sted hvis vi skal bruke dette!
    let userSetting = await firstValueFrom(this.userSettingService.userSetting$);
    let changed = false;
    if (geoHazards != null) {
      if (!isArraysEqual(geoHazards, userSetting.currentGeoHazard)) {
        userSetting = {
          ...userSetting,
          currentGeoHazard: geoHazards,
        };
        changed = true;
      }
    }
    if (daysBack != null) {
      for (const geoHazard of userSetting.currentGeoHazard) {
        //check and eventually set days back for every selected geo hazard
        const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === geoHazard);
        if (existingValue.daysBack !== daysBack) {
          existingValue.daysBack = daysBack;
          changed = true;
        }
      }
    }
    if (changed) {
      this.userSettingService.saveUserSettings(userSetting);
    }
  }
}
