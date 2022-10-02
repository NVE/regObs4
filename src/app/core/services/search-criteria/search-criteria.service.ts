import { Injectable } from '@angular/core';
import { combineLatest, firstValueFrom, map, Observable, ReplaySubject, scan, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { PositionDto, SearchCriteriaRequestDto, WithinExtentCriteriaDto } from 'src/app/modules/common-regobs-api';
import { UserSettingService } from '../user-setting/user-setting.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import moment from 'moment';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { Immutable } from 'src/app/core/models/immutable';

const DEBUG_TAG = 'SearchCriteriaService';
const URL_PARAM_GEOHAZARDS = 'hazards';
const URL_PARAM_GEOHAZARDS_OLD = 'GeoHazards';
const URL_PARAM_DAYSBACK = 'daysBack';
const URL_PARAM_FROMTIME = 'fromTime';
const URL_PARAM_TOTIME = 'toTime';
const URL_PARAM_NICKNAME = 'nick';

const latLngToPositionDto = (latLng: L.LatLng): PositionDto => ({
  Latitude: latLng.lat,
  Longitude: latLng.lng
});

function commaSeparatedStringToNumberArray(commaSeparatedString : string): number[] {
  if(commaSeparatedString?.trim().length) {
    return commaSeparatedString.split(',').filter(x => x.trim().length && !isNaN(parseInt(x))).map(Number);
  }
  return [];
}

/**
 * Contains current filter for registrations.
 * Use this to change which registrations you want to find.
 * Also responsible for saving the filter as query params in the url.
 * Initializes filter from url query params on startup.
 * TODO: Vi håndterer ikke alle URL-parametre ennå
 */
@Injectable({
  providedIn: 'root'
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

    this.searchCriteriaChanges.pipe(
      scan((history, currentCriteriaChange) => [...history, currentCriteriaChange], []),
    )
      // Log last 10 choices made
      .subscribe(history => this.logger.debug('Change history (last 10)', DEBUG_TAG, history.slice(-10)));

    this.searchCriteria$ = combineLatest([
      this.searchCriteriaChanges.pipe(
        startWith(criteria),
        // Akkumuler alle søkekriterier vi setter via searchCriteria-subjecten
        scan((allSearchCriteria, newSearchCriteria) => ({ ...allSearchCriteria, ...newSearchCriteria }), {})
      ),
      this.userSettingService.language$,
      this.userSettingService.currentGeoHazard$,
      this.userSettingService.daysBackForCurrentGeoHazard$.pipe(map(daysBack => this.convertToIsoDate(daysBack))),
      this.mapService.mapView$.pipe(map(mapView => this.createExtentCriteria(mapView)))
    ]).pipe(
      // Kombiner søkerekriterer som ligger utenfor denne servicen med de vi har i denne servicen, feks valgt språk.
      map(([criteria, langKey, geoHazards, fromObsTime, extent]) => ({
        ...criteria,
        LangKey: langKey,
        SelectedGeoHazards: geoHazards,
        FromDtObsTime: fromObsTime,
        ToDtObsTime: null,
        Extent: extent
      })),
      // Hver gang vi får nye søkekriterier, sett url-parametere. NB - fint å bruke shareReplay sammen med denne
      // siden dette er en bi-effekt det er unødvendig å kjøre flere ganger.
      tap(newCriteria => this.setUrlParams(newCriteria)),
      // Jeg tror vi trenger en shareReplay her for at de som subscriber sent
      // skal få alle søkekriteriene når vi bruker scan, men er ikke sikker.
      // Uansett kjekt med en shareReplay her, se kommentar over.
      tap(currentCriteria => this.logger.debug('Current combined criteria', DEBUG_TAG, currentCriteria)),
      shareReplay(1)
    );
  }

  // build search criteria from url parameters. Some params are stored in user settings
  private readUrlParams(): SearchCriteriaRequestDto {
    const url = new URL(document.location.href);

    const geoHazards = this.readGeoHazardsFromUrl(url.searchParams);

    const daysBack = url.searchParams.get(URL_PARAM_DAYSBACK);
    const daysBackNumeric = this.convertToPositiveInteger(daysBack);
    let fromObsTime: string = null;
    if (daysBackNumeric != null) {
      fromObsTime = this.convertToIsoDate(daysBackNumeric);
    }

    const nickName = url.searchParams.get(URL_PARAM_NICKNAME);

    const criteria = {
      FromDtObsTime: fromObsTime,
      ObserverNickName: nickName
    } as SearchCriteriaRequestDto;

    this.saveGeoHazardsAndDaysBackInSettings(geoHazards, daysBackNumeric);
    return criteria;
  }

  private readGeoHazardsFromUrl(searchParams: URLSearchParams): number[] {
    let geoHazards: number[];

    //read old param format used in (old) regobs.no
    const geoHazardsParamValueOld = searchParams.getAll(URL_PARAM_GEOHAZARDS_OLD);
    if (geoHazardsParamValueOld?.length) {
      geoHazards = geoHazardsParamValueOld.filter(x => x.trim().length && !isNaN(parseInt(x))).map(Number);
      this.setUrlParam(URL_PARAM_GEOHAZARDS_OLD, null); //remove old param
    }

    //read params on new format
    const geoHazardsParamValue = searchParams.get(URL_PARAM_GEOHAZARDS);
    if (geoHazardsParamValue != null) {
      geoHazards = commaSeparatedStringToNumberArray(geoHazardsParamValue);
    }
    return geoHazards;
  }

  private setUrlParams(criteria: SearchCriteriaRequestDto) {
    this.setUrlParam(URL_PARAM_GEOHAZARDS, criteria.SelectedGeoHazards);
    this.setUrlParam(URL_PARAM_FROMTIME, criteria.FromDtObsTime);
    this.setUrlParam(URL_PARAM_TOTIME, criteria.ToDtObsTime);
    this.setUrlParam(URL_PARAM_NICKNAME, criteria.ObserverNickName);

    //TODO:Når skal daysBack overstyre fromObsTime?
    //Lettest å lagre kun FromDtObsTime, men hvis bruker har valgt daysBack, gir det en mer fleksibel spørring som kan funke over tid
    //Blir dette riktig? Hvis fromObsTime er satt, fjern daysBack fra url
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

  setObsTime(fromTime: string, toTime: string) {
    // const currentCriteria = this.searchCriteria.value;
    // const newCriteria = {
    //   ...cloneDeep(currentCriteria),
    //   FromDtObsTime: fromTime != null ? fromTime : null,
    //   ToDtObsTime: toTime != null ? toTime : null
    // } as SearchCriteriaRequestDto;
    // this.searchCriteria.next(newCriteria);
    // this.setUrlParam(URL_PARAM_DAYSBACK, null);
  }

  setObserverNickName(nickName: string) {
    this.searchCriteriaChanges.next({ ObserverNickName: nickName });
  }

  private setUrlParam(key: string, value: unknown) {
    const params = new URLSearchParams(document.location.search);
    if (value) {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, '' + value); //TODO: Handle datetime
      }
    } else {
      params.delete(key);
    }
    const newRelativePathQuery = window.location.pathname + '?' + params.toString();
    history.pushState(null, '', newRelativePathQuery); //TODO: Mulig vi burde neste flere url-endringer etter hverandre før vi pusha
  }

  private convertToIsoDate(daysBack: number): string {
    //TODO: Feilhåndtering
    return moment().subtract(daysBack, 'days').startOf('day').toISOString();
  }

  private createExtentCriteria(mapView: IMapView): WithinExtentCriteriaDto {
    if (mapView?.bounds) {
      const extent: WithinExtentCriteriaDto = {
        BottomRight: latLngToPositionDto(mapView.bounds.getSouthEast()),
        TopLeft: latLngToPositionDto(mapView.bounds.getNorthWest())
      };
      return extent;
    }
    return null;
  }

  private async saveGeoHazardsAndDaysBackInSettings(geoHazards: number[], daysBack: number): Promise<void> {
    //TODO: Snarfet fra ObservationDaysBackComponent: Legg et felles sted hvis vi skal bruke dette!
    const userSetting = await firstValueFrom(this.userSettingService.userSetting$);
    let changed = false;
    if (geoHazards != null) {
      if (geoHazards != userSetting.currentGeoHazard) {
        changed = true;
        userSetting.currentGeoHazard = geoHazards;
      }
    }
    if (daysBack != null) {
      for (const geoHazard of userSetting.currentGeoHazard) {
      //check and eventually set days back for every selected geo hazard
        const existingValue = userSetting.observationDaysBack.find(
          (x) => x.geoHazard === geoHazard
        );
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