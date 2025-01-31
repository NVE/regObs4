import {
  Component,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  inject,
  viewChild,
  input,
  model,
  computed,
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Position } from '@capacitor/geolocation';
import {
  IonButton,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSpinner,
  IonToggle,
  Platform,
} from '@ionic/angular/standalone';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import moment from 'moment';
import { concat, firstValueFrom, fromEventPattern, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ObsLocationEditModel, ObsLocationsResponseDtoV2 } from 'src/app/modules/common-regobs-api/models';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { SelectOption } from 'src/app/modules/shared/components/input/select/select-option.model';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { HelperService } from '../../../../core/services/helpers/helper.service';
import { LocationService } from '../../../../core/services/location/location.service';
import { LeafletClusterHelper } from '../../../map/helpers/leaflet-cluser.helper';
import { LocationName } from '../../../map/services/map-search/location-name.model';
import { MapSearchService } from '../../../map/services/map-search/map-search.service';
import { ViewInfo } from '../../../map/services/map-search/view-info.model';
import { MapService } from '../../../map/services/map/map.service';
import { IPolygon } from '../../models/polygon';
import { UtmSource } from '../../pages/obs-location/utm-source.enum';
import { settings } from 'src/settings';
import { NgIf, NgClass, NgFor, DecimalPipe } from '@angular/common';
import { MapComponent } from '../../../map/components/map/map.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { KdvSelectComponent } from '../../../../components/kdv-select/kdv-select.component';
import { SelectComponent } from '../../../shared/components/input/select/select.component';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { calendarOutline, createOutline, radioButtonOn, timeOutline } from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';

export interface LocationTime {
  location: ObsLocationEditModel;
  datetime?: string;
  source?: number;
  spatialAccuracy?: number;
}

const INITIAL_ZOOM_MINIMUM = 15;

const defaultIcon = L.icon({
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const previousUsedPlaceIcon = L.icon({
  iconUrl: '/assets/icon/map/prev-used-place.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: 'leaflet/marker-shadow.png',
  shadowSize: [41, 41],
});

/**
 * @returns true hvis currentView.center ikke er satt eller er nesten lik previousView.center
 */
export function mapCenterIsStableOrNotAvailable(previousView: IMapView, currentView: IMapView): boolean {
  if (currentView == null || currentView.center == null) {
    return true;
  }
  if (previousView == null || previousView.center == null || currentView.center.distanceTo(previousView.center) > 5) {
    return false; // første gang vi får kartsenter eller kartsenter er flyttet
  }
  return true;
}

/**
 * @returns radius in m for given bounds or default radius if bounds have no extent
 */
function computeMapViewRadius(bounds: L.LatLngBounds): number {
  const radius = Math.round(bounds.getNorthWest().distanceTo(bounds.getSouthEast()) / 2);
  if (radius) {
    return radius;
  }
  return 3000;
}

@Component({
  selector: 'app-set-location-in-map',
  templateUrl: './set-location-in-map.component.html',
  styleUrls: ['./set-location-in-map.component.scss'],
  imports: [
    DecimalPipe,
    FormsModule,
    IonButton,
    IonCol,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonSpinner,
    IonToggle,
    KdvSelectComponent,
    MapComponent,
    NgClass,
    NgFor,
    NgIf,
    SelectComponent,
    SvgIconComponent,
    TranslatePipe,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
  ],
})
export class SetLocationInMapComponent implements OnInit, OnDestroy {
  private mapService = inject(MapService);
  private helperService = inject(HelperService);
  private ngZone = inject(NgZone);
  private mapSearchService = inject(MapSearchService);
  private geoPositionService = inject(GeoPositionService);
  private locationService = inject(LocationService);
  private translateService = inject(TranslateService);
  private platform = inject(Platform);

  // TODO: For mange måter denne komponenten kommuniserer med omverdenen på...
  readonly geoHazard = input.required<GeoHazard>();
  readonly fromMarker = input<L.Marker>();
  readonly fromMarkerIconUrl = input('/assets/icon/map/obs-location.svg');
  readonly locationMarkerIconUrl = input('/assets/icon/map/obs-location.svg');
  readonly locationMarkerInput = input<L.Marker>(undefined, { alias: 'locationMarker' }); // TODO: Change to just lat lng
  readonly locationPolygon = input<Observable<IPolygon>>();

  @Output() locationTimeSet = new EventEmitter<LocationTime>();
  readonly showPreviousUsedLocations = input(true);
  readonly showUserPosition = input(true);
  readonly confirmLocationText = input('REGISTRATION.OBS_LOCATION.CONFIRM_TEXT');
  readonly fromLocationText = input('REGISTRATION.OBS_LOCATION.CURRENT_LOCATION');
  readonly locationTitle = input('REGISTRATION.OBS_LOCATION.TITLE');
  readonly selectedLocation = model<ObsLocationsResponseDtoV2 | undefined>(undefined); // TODO: Trengs denne i tillegg til locationTimeSet? Kan én av de fjernes?
  @Output() mapReady = new EventEmitter<L.Map>();

  /**
   * Show a dotted line between the location you choose and the location of the device. Defaults to true in native mode.
   */
  readonly showPolyline = input(Capacitor.isNativePlatform());
  readonly allowEditLocationName = model<boolean>(); // TODO: Hvorfor er dette en input/model ? Hvordan bruker forelder komp denne?
  readonly setObsTime = input(false);
  readonly localDate = model(moment().toISOString(true));
  readonly sourceTid = model<ObsLocationEditModel['UTMSourceTID']>();
  readonly spatialAccuracy = model<ObsLocationEditModel['Uncertainty']>();

  locationMarker = computed(() => {
    const markerInput = this.locationMarkerInput();
    if (markerInput != null) {
      return markerInput;
    }
    return L.marker(settings.map.unknownMapCenter, {
      icon: L.icon({
        iconUrl: this.locationMarkerIconUrl(),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41],
      }),
    });
  });

  private map?: L.Map;
  followMode = false;
  private userposition?: Position;
  private pathLine?: L.Polyline; // line between observation location and device location
  distanceToObservationText = '';
  viewInfo: ViewInfo | null = null;
  isLoading = false;
  private locations: ObsLocationsResponseDtoV2[] = [];
  private ngDestroy$ = new Subject<void>();
  private mapView$?: Observable<IMapView>;

  initialZoom = toSignal(
    this.mapService.mapView$.pipe(
      take(1),
      map((mapView) =>
        mapView.zoom != null && mapView.zoom > INITIAL_ZOOM_MINIMUM ? mapView.zoom : INITIAL_ZOOM_MINIMUM
      )
    ),
    { initialValue: INITIAL_ZOOM_MINIMUM }
  );

  isDesktop = this.platform.is('desktop');
  spatialAccuracyOptions: SelectOption[] = [];
  locationPolygons: IPolygon[] = [];
  locationPolygonEditIdx = -1;
  toggleEditingMode?: () => void;

  private locationGroup = LeafletClusterHelper.createMarkerClusterGroup();
  editLocationName = false;
  locationName?: string;
  maxDate = moment().minutes(59).toISOString(true);
  locale = this.translateService.currentLang;

  readonly editLocationNameInput = viewChild<IonInput>('editLocationNameInput');

  get canEditLocationName() {
    return this.allowEditLocationName();
  }

  constructor() {
    this.setTranslatedAccuracies();
    addIcons({ calendarOutline, radioButtonOn, createOutline, timeOutline });
    L.Marker.prototype.options.icon = defaultIcon;
  }

  async ngOnInit(): Promise<void> {
    const hasDefaultPos = markerHasDefaultSettingsPos(this.locationMarker());
    this.followMode = hasDefaultPos && !this.fromMarker();
    this.mapService.followMode = this.followMode;

    if (hasDefaultPos) {
      let latLng: L.LatLngExpression = settings.map.unknownMapCenter;
      const fromMarker = this.fromMarker();
      if (fromMarker) {
        latLng = fromMarker.getLatLng();
      } else {
        const initialMapView = await firstValueFrom(this.mapService.mapView$);
        if (initialMapView) {
          latLng = initialMapView.center;
        }
      }
      this.locationMarker().setLatLng(latLng);
    }
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private getLocationsObservable(mapView$: Observable<IMapView>): Observable<ObsLocationsResponseDtoV2[]> {
    return mapView$.pipe(
      filter((mapView) => mapView && mapView.center != null && mapView.bounds != null),
      switchMap((mapView) =>
        this.locationService.getLocationWithinRadiusObservable(
          this.geoHazard(),
          mapView.center.lat,
          mapView.center.lng,
          computeMapViewRadius(mapView.bounds)
        )
      )
    );
  }

  private addLocationIfNotExists(loc: ObsLocationsResponseDtoV2, map: L.Map): void {
    const existing = this.locations.some((location) => loc.Id === location.Id);
    if (!existing && loc.LatLngObject?.Latitude && loc.LatLngObject.Longitude) {
      this.locations.push(loc);
      const marker = L.marker(L.latLng(loc.LatLngObject.Latitude, loc.LatLngObject.Longitude), {
        icon: previousUsedPlaceIcon,
      }).addTo(this.locationGroup);
      marker.on('click', () => this.setToPrevouslyUsedLocation(loc, map));
    }
  }

  // bounds, center and zoom for this map
  private getCurrentMapView(map: L.Map): IMapView {
    return {
      bounds: map.getBounds(),
      center: map.getCenter(),
      zoom: map.getZoom(),
    };
  }

  onMapReady(m: L.Map): void {
    this.mapView$ = concat(
      // Start with mapview from mapservice
      this.mapService.mapView$.pipe(take(1)),

      // Listen to events that can change the map view
      fromEventPattern(
        (handler) => m.on('resize moveend dragend', handler),
        (handler) => m.off('resize moveend dragend', handler)
      ).pipe(
        takeUntil(this.ngDestroy$),
        debounceTime(200),
        map(() => this.getCurrentMapView(m))
      )
    ).pipe(shareReplay(1));

    const locationMarker = this.locationMarker();
    if (locationMarker) {
      // TODO: Ikke ha locationMarker som input... dette blir rart
      locationMarker.setZIndexOffset(100).addTo(m);
    } else {
      throw new Error('No location marker supplied or initialized');
    }
    const fromMarker = this.fromMarker();
    if (fromMarker) {
      fromMarker.addTo(m);
    }
    this.locationGroup.addTo(m);
    m.on('dragstart', () => {
      this.ngZone.run(() => {
        this.isLoading = true;
      });
    });
    m.on('drag', () => this.moveLocationMarkerToCenter(m));

    if (this.showPreviousUsedLocations()) {
      this.getLocationsObservable(this.mapView$)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((locations) => {
          locations.forEach((loc) => this.addLocationIfNotExists(loc, m));
        });
    }

    this.mapView$
      .pipe(
        // ikke søke på nytt hvis kartsenter ikke flytter seg nevneverdig (f.eks. ved zoom)
        distinctUntilChanged((prev, curr) => mapCenterIsStableOrNotAvailable(prev, curr)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(() => {
        this.updateMapViewInfo();
      });

    this.mapService.followMode$.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      this.followMode = val;
      if (this.followMode && this.userposition) {
        this.setLocationMarkerLatLng({
          lat: this.userposition.coords.latitude,
          lng: this.userposition.coords.longitude,
        });
      }
    });

    this.mapSearchService.mapSearchClick$.pipe(takeUntil(this.ngDestroy$)).subscribe((item) => {
      const latLng = item instanceof L.LatLng ? item : item.latlng;
      this.setLocationMarkerLatLng(latLng);
    });

    this.geoPositionService.currentPosition$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((pos) => this.positionChange(pos));

    if (!this.followMode) {
      m.setView(locationMarker.getLatLng());
    }

    this.initPolygons(m);
    this.mapReady.emit(m);
    this.updatePathAndDistance();
  }

  initPolygons(map: L.Map) {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItems.bringToFront();

    new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: false,
        edit: {
          selectedPathOptions: {
            dashArray: '10, 10',
            fill: true,
            fillOpacity: 0.1,
          },
        },
      },
      draw: {
        polyline: false,
        polygon: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    });

    const locationPolygons = this.locationPolygons;
    let lastToggled: Date;
    this.toggleEditingMode = function () {
      const now = new Date();
      if (lastToggled && now.getTime() - lastToggled.getTime() < 100) return;
      lastToggled = now;

      let foundEnabled = false;
      let setEnabled = false;
      locationPolygons.forEach((polygon) => {
        if (foundEnabled && !setEnabled && polygon.active) {
          setEnabled = true;
          polygon.polygon?.editing?.enable();
        } else if (polygon.polygon?.editing?.enabled()) {
          foundEnabled = true;
          polygon.polygon.editing.disable();
        } else {
          polygon.polygon?.editing?.disable();
        }
      });
      if (!foundEnabled || !setEnabled) {
        const idx = locationPolygons.map((p) => p.active).indexOf(true);
        if (idx > -1) {
          locationPolygons[idx].polygon?.editing?.enable();
        }
      }
    };
    drawnItems.on('click', this.toggleEditingMode);
    this.locationPolygon()?.subscribe((p) => {
      if (p.polygon) {
        p.polygon.setStyle({ color: p.active ? p.color : 'rgb(0,0,0,0)' });
        drawnItems.addLayer(p.polygon);
      }
      this.locationPolygons.push(p);

      if (locationPolygons.length == 1 && this.toggleEditingMode) {
        this.toggleEditingMode();
      }
    });
  }

  togglePolygon(index: number): void {
    const polygon = this.locationPolygons[index];
    const currentState = polygon.active;
    polygon.active = !currentState;
    if (currentState) {
      polygon.polygon?.setStyle({ color: 'rgb(0,0,0,0)' });
      if (polygon.polygon?.editing?.enabled() && this.toggleEditingMode) {
        this.toggleEditingMode();
      }
    } else {
      polygon.polygon?.setStyle({ color: polygon.color });
      const isOtherActive =
        this.locationPolygons
          .map((p) => p.active)
          .slice(0, index)
          .concat(this.locationPolygons.map((p) => p.active).slice(index + 1))
          .indexOf(true) == -1;
      if (isOtherActive && this.toggleEditingMode) {
        this.toggleEditingMode();
      }
    }
  }

  private setLocationMarkerLatLng(latLng: L.LatLngExpression): void {
    this.locationMarker().setLatLng(latLng);
    this.updatePathAndDistance();
    this.updateMapViewInfo();
  }

  private setToPrevouslyUsedLocation(location: ObsLocationsResponseDtoV2, map: L.Map): void {
    this.mapService.followMode = false;
    this.selectedLocation.set(location);
    this.allowEditLocationName.set(false);
    if (location.LatLngObject?.Latitude != null && location.LatLngObject.Longitude != null) {
      const latLng = L.latLng(location.LatLngObject.Latitude, location.LatLngObject.Longitude);
      this.setLocationMarkerLatLng(latLng);
      map.panTo(latLng);
    } else {
      throw new Error('No LatLngObject on ObsLocationsResponseDtoV2, can not set to prevously used location');
    }
  }

  private moveLocationMarkerToCenter(map: L.Map): void {
    this.mapService.followMode = false;
    this.selectedLocation.set(undefined);
    this.allowEditLocationName.set(true);
    const center = map.getCenter();
    this.locationMarker().setLatLng(center);
    this.updatePathAndDistance();
  }

  private updateMapViewInfo(): void {
    const latLng = this.locationMarker().getLatLng();
    this.mapSearchService.getViewInfo(latLng, this.geoHazard()).subscribe(
      (val) => {
        this.ngZone.run(() => {
          this.viewInfo = val;
          this.isLoading = false;
        });
      },
      () => {
        this.ngZone.run(() => {
          this.viewInfo = null;
          this.isLoading = false;
        });
      }
    );
  }

  private positionChange(position: Position) {
    this.userposition = position;
    if (this.followMode) {
      this.setLocationMarkerLatLng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } else {
      this.updatePathAndDistance();
    }
  }

  updatePathAndDistance(): void {
    const fromMarker = this.fromMarker();
    const from = fromMarker
      ? fromMarker.getLatLng()
      : this.userposition
        ? L.latLng(this.userposition.coords.latitude, this.userposition.coords.longitude)
        : this.locationMarker()?.getLatLng();

    const locationMarkerLatLng = this.locationMarker()?.getLatLng();

    if (this.map) {
      const path = [locationMarkerLatLng, from];

      if (!this.pathLine) {
        this.pathLine = L.polyline(path, {
          color: 'black',
          weight: 6,
          opacity: 0.9,
          dashArray: '1,12',
        });
        if (this.showPolyline()) {
          this.pathLine.addTo(this.map);
        }
      } else {
        this.pathLine.setLatLngs(path);
      }
      const fromMarkerValue = this.fromMarker();
      if (fromMarkerValue) {
        if (fromMarkerValue.getLatLng().equals(this.locationMarker().getLatLng())) {
          fromMarkerValue.setOpacity(0);
          this.pathLine.setStyle({ opacity: 0 });
        } else {
          fromMarkerValue.setOpacity(1);
          this.pathLine.setStyle({ opacity: 0.9 });
        }
      }
    }
    this.ngZone.run(() => {
      this.distanceToObservationText = this.helperService.getDistanceText(locationMarkerLatLng.distanceTo(from));
    });
  }

  getLocationName(location: LocationName): string {
    if (location) {
      return location.adminName !== location.name ? `${location.name} / ${location.adminName}` : location.name;
    }
    return '';
  }

  confirm(): void {
    const obsLocation = this.getLocation();
    const locationTime: LocationTime = {
      location: obsLocation,
      source: this.sourceTid(),
      spatialAccuracy: this.spatialAccuracy(),
    };
    if (this.setObsTime()) {
      locationTime.datetime = this.localDate() || moment().toISOString(true);
    }
    this.locationTimeSet.emit(locationTime);
  }

  getLocation(): ObsLocationEditModel {
    const obsLocation: ObsLocationEditModel = {
      Latitude: this.locationMarker().getLatLng().lat,
      Longitude: this.locationMarker().getLatLng().lng,
      UTMSourceTID: UtmSource.SelectedInMap,
    };
    // check if location name is the same as location description if yes then allow edition
    const selectedLocation = this.selectedLocation();
    if (this.editLocationName && this.locationName && this.locationName.length > 0) {
      obsLocation.ObsLocationID = undefined;
      obsLocation.LocationName = this.locationName.substring(0, 60);
    } else if (selectedLocation && selectedLocation?.Name !== selectedLocation?.LocationDescription) {
      obsLocation.ObsLocationID = selectedLocation.Id;
      obsLocation.LocationName = selectedLocation.Name;
    }
    if (this.viewInfo && this.viewInfo.location) {
      obsLocation.LocationDescription = this.getLocationName(this.viewInfo.location);
    }
    if (this.followMode && this.userposition) {
      obsLocation.UTMSourceTID = UtmSource.GPS;
      obsLocation.Uncertainty = Math.round(this.userposition.coords.accuracy);
    }
    return obsLocation;
  }

  editLocation(): void {
    if (this.canEditLocationName) {
      this.editLocationName = true;
      setTimeout(() => {
        const editLocationNameInput = this.editLocationNameInput();
        if (editLocationNameInput) {
          editLocationNameInput.setFocus();
        }
      }, 50);
    }
  }

  onLocationEditComplete(): void {
    const locNameInput = this.editLocationNameInput();
    if (!locNameInput) {
      return;
    }
    if (locNameInput.value?.toString().length === 0) {
      // User has deleted all text
      this.editLocationName = false;
      this.updateMapViewInfo();
    }
  }

  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = this.getMaxDateForNow();
    this.localDate.set(now);
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  setTranslatedAccuracies() {
    this.translateService.get(['REGISTRATION.OBS_LOCATION.EXACT', 'REGISTRATION.OBS_LOCATION.MORETHANONEKM']).subscribe(
      (translations) =>
        (this.spatialAccuracyOptions = [
          { id: 0, text: translations['REGISTRATION.OBS_LOCATION.EXACT'] },
          { id: 100, text: '100 m' },
          { id: 500, text: '500 m' },
          { id: 1000, text: '1000 m' },
          { id: -1, text: translations['REGISTRATION.OBS_LOCATION.MORETHANONEKM'] },
        ])
    );
  }
}

function markerHasDefaultSettingsPos(marker: L.Marker) {
  return marker.getLatLng().distanceTo(L.latLng(settings.map.unknownMapCenter)) < 2;
}
