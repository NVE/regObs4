import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  NgZone,
  ViewChild
} from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../map/services/map/map.service';
import { HelperService } from '../../../../core/services/helpers/helper.service';
import { MapSearchService } from '../../../map/services/map-search/map-search.service';
import { take, switchMap, filter, takeUntil } from 'rxjs/operators';
import { Position } from '@capacitor/geolocation';
import { Observable, Subject } from 'rxjs';
import { LocationName } from '../../../map/services/map-search/location-name.model';
import {
  ObsLocationsResponseDtoV2,
  ObsLocationEditModel
} from 'src/app/modules/common-regobs-api/models';
import { LocationService } from '../../../../core/services/location/location.service';
import { UtmSource } from '../../pages/obs-location/utm-source.enum';
import { ViewInfo } from '../../../map/services/map-search/view-info.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IonInput } from '@ionic/angular';
import { LeafletClusterHelper } from '../../../map/helpers/leaflet-cluser.helper';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import moment from 'moment';

export interface LocationTime {
  location: ObsLocationEditModel,
  datetime: string,
}

const defaultIcon = L.icon({
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const previousUsedPlaceIcon = L.icon({
  iconUrl: '/assets/icon/map/prev-used-place.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: 'leaflet/marker-shadow.png',
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-set-location-in-map',
  templateUrl: './set-location-in-map.component.html',
  styleUrls: ['./set-location-in-map.component.scss']
})
export class SetLocationInMapComponent implements OnInit, OnDestroy {
  @Input() geoHazard: GeoHazard;
  @Input() fromMarker: L.Marker;
  @Input() fromMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Input() locationMarker: L.Marker;
  @Input() locationMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Output() locationTimeSet = new EventEmitter<LocationTime>();
  @Input() showPreviousUsedLocations = true;
  @Input() showUserPosition = true;
  @Input() confirmLocationText = 'REGISTRATION.OBS_LOCATION.CONFIRM_TEXT';
  @Input() fromLocationText = 'REGISTRATION.OBS_LOCATION.CURRENT_LOCATION';
  @Input() locationTitle = 'REGISTRATION.OBS_LOCATION.TITLE';
  @Input() selectedLocation: ObsLocationsResponseDtoV2;
  @Output() mapReady = new EventEmitter<L.Map>();
  @Input() showPolyline = true;
  @Input() allowEditLocationName = false;
  @Input() setObsTime = false;
  @Input() localDate: string;

  private map: L.Map;
  followMode = false;
  private userposition: Position;
  private pathLine: L.Polyline;
  distanceToObservationText = '';
  viewInfo: ViewInfo;
  isLoading = false;
  private locations: ObsLocationsResponseDtoV2[] = [];
  private ngDestroy$ = new Subject<void>();

  private locationGroup = LeafletClusterHelper.createMarkerClusterGroup();
  editLocationName = false;
  locationName: string;
  
  maxDate: string;

  @ViewChild('editLocationNameInput') editLocationNameInput: IonInput;

  get canEditLocationName() {
    return (
      this.allowEditLocationName &&
      !(this.selectedLocation && this.selectedLocation.Id)
    );
  }

  constructor(
    private mapService: MapService,
    private helperService: HelperService,
    private ngZone: NgZone,
    private mapSearchService: MapSearchService,
    private geoPositionService: GeoPositionService,
    private locationService: LocationService
  ) {
    this.setToNow();
  }

  async ngOnInit(): Promise<void> {
    L.Marker.prototype.options.icon = defaultIcon;

    if (!this.localDate) {
      this.setToNow()
    }

    const locationMarkerIcon = L.icon({
      iconUrl: this.locationMarkerIconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41]
    });
    this.followMode = !this.locationMarker && !this.fromMarker;
    this.mapService.followMode = this.followMode;
    if (!this.locationMarker) {
      if (this.fromMarker) {
        this.locationMarker = L.marker(this.fromMarker.getLatLng(), {
          icon: locationMarkerIcon
        });
      } else {
        const lastView = await this.mapService.mapView$
          .pipe(take(1))
          .toPromise();
        if (lastView) {
          this.locationMarker = L.marker(lastView.center, {
            icon: locationMarkerIcon
          });
        } else {
          this.locationMarker = L.marker(L.latLng(59.1, 10.3), {
            icon: locationMarkerIcon
          });
        }
      }
    }
    this.updateMapViewInfo();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private getLocationsObservable(): Observable<ObsLocationsResponseDtoV2[]> {
    return this.mapService.mapView$.pipe(
      filter(
        (mapView) =>
          mapView &&
          mapView.center !== undefined &&
          mapView.bounds !== undefined
      ),
      switchMap((mapView) =>
        this.locationService.getLocationWithinRadiusObservable(
          this.geoHazard,
          mapView.center.lat,
          mapView.center.lng,
          Math.round(
            mapView.bounds
              .getNorthWest()
              .distanceTo(mapView.bounds.getSouthEast()) / 2
          )
        )
      )
    );
  }

  private addLocationIfNotExists(loc: ObsLocationsResponseDtoV2): void {
    const existing = this.locations.some((location) => loc.Id === location.Id);
    if (!existing) {
      this.locations.push(loc);
      const marker = L.marker(
        L.latLng(loc.LatLngObject.Latitude, loc.LatLngObject.Longitude),
        { icon: previousUsedPlaceIcon }
      ).addTo(this.locationGroup);
      marker.on('click', () => this.setToPrevouslyUsedLocation(loc));
    }
  }

  onMapReady(m: L.Map): void {
    this.map = m;
    this.locationMarker.setZIndexOffset(100).addTo(this.map);
    if (this.fromMarker) {
      this.fromMarker.addTo(this.map);
    }
    this.locationGroup.addTo(this.map);
    this.map.on('dragstart', () => {
      this.ngZone.run(() => {
        this.isLoading = true;
      });
    });
    this.map.on('dragend', () => this.updateMapViewInfo());
    this.map.on('drag', () => this.moveLocationMarkerToCenter());

    if (this.showPreviousUsedLocations) {
      this.getLocationsObservable()
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((locations) => {
          locations.forEach((loc) => this.addLocationIfNotExists(loc));
        });
    }

    this.mapService.followMode$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.followMode = val;
        if (this.followMode && this.userposition) {
          this.setLocationMarkerLatLng({
            lat: this.userposition.coords.latitude,
            lng: this.userposition.coords.longitude
          });
        }
      });

    this.mapSearchService.mapSearchClick$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((item) => {
        const latLng = item instanceof L.LatLng ? item : item.latlng;
        this.setLocationMarkerLatLng(latLng);
      });

    this.geoPositionService.currentPosition$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((pos) => this.positionChange(pos));

    if (!this.followMode) {
      this.map.setView(this.locationMarker.getLatLng(), 15);
    }

    this.mapReady.emit(this.map);
    this.updatePathAndDistance();
  }

  private setLocationMarkerLatLng(latLng: L.LatLngExpression): void {
    this.locationMarker.setLatLng(latLng);
    this.updatePathAndDistance();
    this.updateMapViewInfo();
  }

  private setToPrevouslyUsedLocation(location: ObsLocationsResponseDtoV2): void {
    this.ngZone.run(() => {
      this.mapService.followMode = false;
      this.selectedLocation = location;
      this.setLocationMarkerLatLng(
        L.latLng(
          location.LatLngObject.Latitude,
          location.LatLngObject.Longitude
        )
      );
      this.map.panTo(this.locationMarker.getLatLng());
    });
  }

  private moveLocationMarkerToCenter(): void {
    this.mapService.followMode = false;
    this.selectedLocation = null;
    const center = this.map.getCenter();
    this.locationMarker.setLatLng(center);
    this.updatePathAndDistance();
  }

  private updateMapViewInfo(): void {
    const latLng = this.locationMarker.getLatLng();
    this.mapSearchService
      .getViewInfo(latLng, this.geoHazard)
      .subscribe(
        (val) => {
          this.ngZone.run(() => {
            this.viewInfo = val;
            this.isLoading = false;
          });
        },
        (_) => {
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
        lng: position.coords.longitude
      });
    } else {
      this.updatePathAndDistance();
    }
  }

  updatePathAndDistance(): void {
    const from = this.fromMarker
      ? this.fromMarker.getLatLng()
      : this.userposition
        ? L.latLng(
          this.userposition.coords.latitude,
          this.userposition.coords.longitude
        )
        : this.locationMarker.getLatLng();
    const locationMarkerLatLng = this.locationMarker.getLatLng();
    const path = [locationMarkerLatLng, from];
    if (this.map) {
      if (!this.pathLine) {
        this.pathLine = L.polyline(path, {
          color: 'black',
          weight: 6,
          opacity: 0.9,
          dashArray: '1,12'
        });
        if (this.showPolyline) {
          this.pathLine.addTo(this.map);
        }
      } else {
        this.pathLine.setLatLngs(path);
      }
      if (this.fromMarker) {
        if (
          this.fromMarker.getLatLng().equals(this.locationMarker.getLatLng())
        ) {
          this.fromMarker.setOpacity(0);
          this.pathLine.setStyle({ opacity: 0 });
        } else {
          this.fromMarker.setOpacity(1);
          this.pathLine.setStyle({ opacity: 0.9 });
        }
      }
    }
    this.ngZone.run(() => {
      this.distanceToObservationText = this.helperService.getDistanceText(
        locationMarkerLatLng.distanceTo(from)
      );
    });
  }

  getLocationName(location: LocationName): string {
    if (location) {
      return location.adminName !== location.name
        ? `${location.name} / ${location.adminName}`
        : location.name;
    }
    return '';
  }

  confirm(): void {
    const obsLocation = this.getLocation();
    let obsTime: string = undefined;
    if (this.setObsTime) {
     obsTime = this.localDate || moment().toISOString(true);
    }
    let locationTime = {location: obsLocation, datetime: obsTime}
    this.locationTimeSet.emit(locationTime);
  }

  getLocation(): ObsLocationEditModel {
    const obsLocation: ObsLocationEditModel = {
      Latitude: this.locationMarker.getLatLng().lat,
      Longitude: this.locationMarker.getLatLng().lng,
      Uncertainty: 0,
      UTMSourceTID: UtmSource.SelectedInMap
    };
    if (
      this.editLocationName &&
      this.locationName &&
      this.locationName.length > 0
    ) {
      obsLocation.ObsLocationID = undefined;
      obsLocation.LocationName = this.locationName.substring(0, 60);
    } else if (this.selectedLocation) {
      obsLocation.ObsLocationID = this.selectedLocation.Id;
      obsLocation.LocationName = this.selectedLocation.Name;
    }
    if (this.viewInfo && this.viewInfo.location) {
      obsLocation.LocationDescription = this.getLocationName(
        this.viewInfo.location
      );
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
        if (this.editLocationNameInput) {
          this.editLocationNameInput.setFocus();
        }
      }, 50);
    }
  }

  onLocationEditComplete(): void {
    if (this.editLocationNameInput.value?.toString().length === 0) {
      // User has deleted all text
      this.editLocationName = false;
      this.updateMapViewInfo();
    }
  }

  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = this.getMaxDateForNow();
    this.localDate = now;
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }
}
