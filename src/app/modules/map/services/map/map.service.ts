import { Injectable } from '@angular/core';
import { IMapView } from './map-view.interface';
import { Observable, combineLatest, BehaviorSubject, Subject, of } from 'rxjs';
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
  take
} from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { fromWorker } from 'observable-webworker';
import {
  IRegionInViewInput,
  IRegionInViewOutput
} from '../../web-workers/region-in-view-models';

const DEBUG_TAG = 'MapService';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _mapViewAndAreaObservable: Observable<IMapViewAndArea>;
  private _followModeSubject: BehaviorSubject<boolean>;
  private _followModeObservable: Observable<boolean>;
  private _centerMapToUserSubject: Subject<void>;
  private _centerMapToUserObservable: Observable<void>;
  private _mapViewSubject: Subject<IMapView>;
  private _mapView$: Observable<IMapView>;
  private _relevantMapChange$: Observable<IMapView>;

  get mapView$(): Observable<IMapView> {
    return this._mapView$;
  }

  get mapViewAndAreaObservable$(): Observable<IMapViewAndArea> {
    return this._mapViewAndAreaObservable;
  }

  get relevantMapChange$(): Observable<IMapView> {
    return this._relevantMapChange$;
  }

  get followMode$(): Observable<boolean> {
    return this._followModeObservable;
  }

  get centerMapToUser$(): Observable<void> {
    return this._centerMapToUserObservable;
  }

  set followMode(val: boolean) {
    this._followModeSubject.next(val);
  }

  constructor(
    private userSettingService: UserSettingService,
    private loggingService: LoggingService
  ) {
    this._followModeSubject = new BehaviorSubject<boolean>(true);
    this._followModeObservable = this._followModeSubject
      .asObservable()
      .pipe(distinctUntilChanged(), shareReplay(1));
    this._centerMapToUserSubject = new Subject<void>();
    this._centerMapToUserObservable = this._centerMapToUserSubject
      .asObservable()
      .pipe(shareReplay(1));
    this._mapViewSubject = new BehaviorSubject<IMapView>(null);
    this._mapView$ = this._mapViewSubject.asObservable().pipe(
      debounceTime(200),
      tap((val) =>
        this.loggingService.debug('MapView updated', DEBUG_TAG, val)
      ),
      shareReplay(1)
    );
    this._relevantMapChange$ = this.getMapViewThatHasRelevantChange();
    this._mapViewAndAreaObservable = this.getMapViewAreaObservable();
  }

  centerMapToUser(): void {
    this.followMode = true;
    this._centerMapToUserSubject.next();
  }

  updateMapView(mapView: IMapView): void {
    if (mapView) {
      this._mapViewSubject.next(mapView);
    }
  }

  private getMapMetersChanged() {
    return this.mapView$.pipe(
      debounceTime(500),
      pairwise(),
      map(([prev, next]) => {
        if (!prev) {
          return 9999;
        }
        return prev.center.distance(next.center);
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
        buffer.length > 0 && !!buffer[buffer.length - 1]
          ? of(buffer[buffer.length - 1])
          : this.mapView$.pipe(take(1))
      ),
      tap((val) =>
        this.loggingService.debug(
          'MapView has relevant change!',
          DEBUG_TAG,
          val
        )
      ),
      shareReplay(1)
    );
  }

  private getMapViewAreaObservable(): Observable<IMapViewAndArea> {
    const currenteMapViewAndGeoHazards = combineLatest([
      this.relevantMapChange$,
      this.userSettingService.currentGeoHazard$
    ]).pipe(
      map(([mapView, geoHazards]) => ({
        mapView,
        bounds: [
          mapView.bounds.xmin,
          mapView.bounds.ymin,
          mapView.bounds.xmax,
          mapView.bounds.ymax
        ],
        center: mapView.center,
        geoHazards
      }))
    );

    return currenteMapViewAndGeoHazards.pipe(
      switchMap((cvg) =>
        fromWorker<IRegionInViewInput, IRegionInViewOutput>(
          () =>
            new Worker('../../web-workers/region-in-view.worker', {
              type: 'module'
            }),
          currenteMapViewAndGeoHazards
        ).pipe(
          map((result) => ({
            ...cvg.mapView,
            ...result
          }))
        )
      ),
      tap((val) =>
        this.loggingService.debug('MapViewArea changed', DEBUG_TAG, val)
      ),
      shareReplay(1)
    );
  }
}
