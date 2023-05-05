import { Injectable } from '@angular/core';
import { IMapView } from './map-view.interface';
import { Observable, combineLatest, BehaviorSubject, Subject, of, concat } from 'rxjs';
import {
  switchMap,
  shareReplay,
  debounceTime,
  distinctUntilChanged,
  tap,
  pairwise,
  map,
  bufferWhen,
  scan,
  skipWhile,
  take,
  filter,
} from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { fromWorker } from 'observable-webworker';
import { IRegionInViewInput, IRegionInViewOutput } from '../../web-workers/region-in-view-models';
import L from 'leaflet';
import {
  URL_PARAM_NW_LAT,
  URL_PARAM_NW_LON,
  URL_PARAM_SE_LAT,
  URL_PARAM_SE_LON,
} from 'src/app/core/services/search-criteria/coordinatesUrl';

type WithMargin = (ob: L.LatLngBoundsExpression, maxMargin: number) => boolean;

const DEBUG_TAG = 'MapService';

export const createMapView = (nwLat: number, nwLon: number, seLat: number, seLon: number): IMapView => {
  const bounds = L.latLngBounds([nwLat, nwLon], [seLat, seLon]);
  const mapView: IMapView = { bounds, center: null, zoom: null };
  return mapView;
};

export const parseCoordinatesFromUrl = (url: URL): IMapView => {
  const nwLat = url.searchParams.get(URL_PARAM_NW_LAT);
  const nwLon = url.searchParams.get(URL_PARAM_NW_LON);
  const seLat = url.searchParams.get(URL_PARAM_SE_LAT);
  const seLon = url.searchParams.get(URL_PARAM_SE_LON);
  if (nwLat && nwLon && seLat && seLon) {
    const formatedMapView = createMapView(+nwLat, +nwLon, +seLat, +seLon);
    return formatedMapView;
  } else {
    return null;
  }
};

/**
 * Common data and functions for MapComponent.
 * Some functions and data are based on the map on HomePage only
 */
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private _mapViewAndAreaObservable: Observable<IMapViewAndArea>;
  private _followModeSubject: BehaviorSubject<boolean>;
  private _followModeObservable: Observable<boolean>;
  private _showUserLocationSubject: BehaviorSubject<boolean>;
  private _showUserLocationObservable: Observable<boolean>;
  private _centerMapToUserSubject: Subject<void>;
  private _centerMapToUserObservable: Observable<void>;
  private _mapViewSubject: Subject<IMapView>;
  private _mapView$: Observable<IMapView>;
  private _mapMoveStartSubject: any;
  private _mapMoveStart$: Observable<IMapView>;
  private _relevantMapChange$: Observable<IMapView>;

  /**
   * Extent, center and zoom for the map in HomePage
   */
  get mapView$(): Observable<IMapView> {
    return this._mapView$;
  }

  /**
   * Extent, center, zoom and area info for the map in HomePage
   */
  get mapViewAndAreaObservable$(): Observable<IMapViewAndArea> {
    return this._mapViewAndAreaObservable;
  }

  /**
   * Noticeable changes in extent, center and zoom for the map in HomePage
   */
  get relevantMapChange$(): Observable<IMapView> {
    return this._relevantMapChange$;
  }

  get mapMoveStart$(): Observable<IMapView> {
    return this._mapMoveStart$;
  }

  /**
   * @return as relevantMapChange$, but starts with current mapView
   */
  get relevantMapChangeWithInitialView$(): Observable<IMapView> {
    return concat(
      this._mapView$.pipe(
        filter((mapView) => mapView != null),
        filter((mapView) => mapView.center != null),
        take(1)
      ),
      this._relevantMapChange$
    );
  }

  get followMode$(): Observable<boolean> {
    return this._followModeObservable;
  }

  get centerMapToUser$(): Observable<void> {
    return this._centerMapToUserObservable;
  }

  get showUserLocation$(): Observable<boolean> {
    return this._showUserLocationObservable;
  }

  set followMode(val: boolean) {
    this._followModeSubject.next(val);
  }

  set showUserLocation(value: boolean) {
    this._showUserLocationSubject.next(value);
  }

  constructor(private userSettingService: UserSettingService, private loggingService: LoggingService) {
    this._showUserLocationSubject = new BehaviorSubject<boolean>(true);
    this._showUserLocationObservable = this._showUserLocationSubject.asObservable();
    this._followModeSubject = new BehaviorSubject<boolean>(false);
    this._followModeObservable = this._followModeSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
    this._centerMapToUserSubject = new Subject<void>();
    this._centerMapToUserObservable = this._centerMapToUserSubject.asObservable().pipe(shareReplay(1));
    const mapViewFromUrl = parseCoordinatesFromUrl(new URL(document.location.href));
    this._mapViewSubject = new BehaviorSubject<IMapView>(mapViewFromUrl);
    this._mapView$ = this._mapViewSubject.asObservable().pipe(
      distinctUntilChanged((prev, curr) => {
        if (prev == null) {
          return false;
        }

        if (prev.zoom !== curr.zoom) {
          return false;
        }

        if (prev.center.distanceTo(curr.center) > 10) {
          return false;
        }

        // 5 decimal places = 1.1112 m at equator.
        // See https://wiki.openstreetmap.org/wiki/Precision_of_coordinates
        return (prev.bounds.equals as WithMargin)(curr.bounds, 0.00001);
      }),
      tap((val) => this.loggingService.debug('MapView updated', DEBUG_TAG, val)),
      shareReplay(1)
    );
    this._relevantMapChange$ = this.getMapViewThatHasRelevantChange();
    this._mapMoveStartSubject = new BehaviorSubject<void>(null);
    this._mapMoveStart$ = this._mapMoveStartSubject.asObservable();
    this._mapViewAndAreaObservable = this.getMapViewAreaObservable();
  }

  centerMapToUser(): void {
    this.followMode = true;
    this._centerMapToUserSubject.next();
    this.showUserLocation = true;
  }

  updateMapView(mapView: IMapView): void {
    if (mapView) {
      this._mapViewSubject.next(mapView);
    }
  }

  sendMapMoveStart(): void {
    this._mapMoveStartSubject.next(null);
  }

  private getMapMetersChanged() {
    return this.mapView$.pipe(
      debounceTime(500),
      pairwise(),
      map(([prev, next]) => {
        // If coming from list view, center may be null if
        // app started on list view with bounds
        if (!prev?.center) {
          return 9999;
        }
        return prev.center.distanceTo(next.center);
      }),
      scan((acc, val) => acc + val, 0)
    );
  }

  private triggerWhenMetersReached(metersBuffer = 10) {
    return this.getMapMetersChanged().pipe(
      skipWhile((val) => {
        return val < metersBuffer;
      })
    );
  }

  private getMapViewThatHasRelevantChange(metersBuffer = 10) {
    return this.mapView$.pipe(
      bufferWhen(() => this.triggerWhenMetersReached(metersBuffer)),
      switchMap((buffer) =>
        buffer.length > 0 && !!buffer[buffer.length - 1] ? of(buffer[buffer.length - 1]) : this.mapView$.pipe(take(1))
      ),
      tap((val) => this.loggingService.debug('MapView has relevant change!', DEBUG_TAG, val)),
      shareReplay(1)
    );
  }

  private getMapViewAreaObservable(): Observable<IMapViewAndArea> {
    const currenteMapViewAndGeoHazards = combineLatest([
      this.relevantMapChange$,
      this.userSettingService.currentGeoHazard$,
    ]).pipe(
      map(([mapView, geoHazards]) => ({
        mapView,
        bounds: [
          mapView.bounds.getSouthWest().lng, // minx
          mapView.bounds.getSouthWest().lat, // miny
          mapView.bounds.getNorthEast().lng, // maxx
          mapView.bounds.getNorthEast().lat, // maxy
        ],
        center: { lat: mapView.center.lat, lng: mapView.center.lng },
        geoHazards,
      }))
    );

    return currenteMapViewAndGeoHazards.pipe(
      switchMap((cvg) =>
        fromWorker<IRegionInViewInput, IRegionInViewOutput>(
          () =>
            new Worker(new URL('../../web-workers/region-in-view.worker', import.meta.url), {
              type: 'module',
            }),
          currenteMapViewAndGeoHazards
        ).pipe(
          map((result) => ({
            ...cvg.mapView,
            ...result,
          }))
        )
      ),
      tap((val) => this.loggingService.debug('MapViewArea changed', DEBUG_TAG, val)),
      shareReplay(1)
    );
  }
}
