import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../map/services/map/map.service';
import { HelperService } from '../../../../core/services/helpers/helper.service';
import { MapSearchService } from '../../../map/services/map-search/map-search.service';
import { tap, debounceTime, switchMap, map, take, timeout } from 'rxjs/operators';
import { IRegistration } from '../../models/registration.model';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription } from 'rxjs';
import { LocationName } from '../../../map/services/map-search/location-name.model';
import { ObsLocationsResponseDtoV2, ObsLocationDto } from '../../../regobs-api/models';
import { IMapView } from '../../../map/services/map/map-view.interface';
import { LocationService } from '../../../../core/services/location/location.service';
import { settings } from '../../../../../settings';
import { UtmSource } from '../../pages/obs-location/utm-source.enum';
import { Events } from '@ionic/angular';
import { IconHelper } from '../../../map/helpers/icon.helper';

@Component({
  selector: 'app-set-location-in-map',
  templateUrl: './set-location-in-map.component.html',
  styleUrls: ['./set-location-in-map.component.scss']
})
export class SetLocationInMapComponent implements OnInit, OnDestroy {
  @Input() fromMarker: L.Marker;
  @Input() fromMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Input() locationMarker: L.Marker;
  @Input() locationMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Output() locationSet = new EventEmitter<ObsLocationDto>();
  @Input() showPreviousUsedLocations = true;
  @Input() showUserPosition = true;
  @Input() confirmLocationText = 'REGISTRATION.OBS_LOCATION.CONFIRM_TEXT';
  @Input() fromLocationText = 'REGISTRATION.OBS_LOCATION.CURRENT_LOCATION';
  @Input() locationTitle = 'REGISTRATION.OBS_LOCATION.TITLE';
  @Input() selectedLocation: ObsLocationsResponseDtoV2;
  @Output() selectedLocationChange = new EventEmitter<ObsLocationsResponseDtoV2>();
  @Output() mapReady = new EventEmitter<L.Map>();

  private map: L.Map;
  registration: IRegistration;
  followMode = false;
  private userposition: Geoposition;
  private pathLine: L.Polyline;
  showDetails = false;
  distanceToObservationText = '';
  elevation$: Observable<number>;
  location$: Observable<LocationName>;
  isLoading = false;
  private mapViewObservableSubscription: Subscription;
  private locationsSubscription: Subscription;
  private locationGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 60,
    iconCreateFunction: (cluster) => IconHelper.getPreviousUsedPlacesIcon(cluster.getChildCount()),
  });

  constructor(
    private mapService: MapService,
    private events: Events,
    private helperService: HelperService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private mapSearchService: MapSearchService,
    private locationService: LocationService) { }

  async ngOnInit() {
    const defaultIcon = L.icon({
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;

    const previousUsedPlaceIcon = L.icon({
      iconUrl: '/assets/icon/map/prev-used-place.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });

    const locationMarkerIcon = L.icon({
      iconUrl: this.locationMarkerIconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });
    if (!this.locationMarker) {
      if (this.fromMarker) {
        this.locationMarker = L.marker(this.fromMarker.getLatLng(), { icon: locationMarkerIcon });
      } else {
        this.followMode = true;
        const lastView = await this.mapService.mapViewObservable$.pipe(take(1)).toPromise();
        this.ngZone.run(() => {
          if (lastView) {
            this.locationMarker = L.marker(lastView.center, { icon: locationMarkerIcon });
          } else {
            this.locationMarker = L.marker(L.latLng(59.1, 10.3), { icon: locationMarkerIcon }); // TODO: Implemet better default value
          }
        });
      }
    }

    const mapViewObservable = this.mapService.mapViewObservable$.pipe(tap(() => {
      this.ngZone.run(() => {
        this.isLoading = true;
      });
    }));
    this.mapViewObservableSubscription = mapViewObservable.pipe(debounceTime(5000)).
      subscribe((mapView) => {
        const range = Math.round(mapView.bounds.getNorthWest().distanceTo(mapView.bounds.getSouthEast()) / 2);
        this.locationService.updateLocationWithinRadius(mapView.center.lat, mapView.center.lng, range);
      });
    const mapViewInfoObservable = mapViewObservable
      .pipe(debounceTime(200), switchMap((mapView: IMapView) =>
        this.mapSearchService.getViewInfo(this.locationMarker.getLatLng(), true)),
        tap(() => {
          this.ngZone.run(() => {
            this.isLoading = false;
          });
        }));
    this.location$ = mapViewInfoObservable.pipe(map((val) => val.location), tap(() => this.cdr.detectChanges()));
    this.elevation$ = mapViewInfoObservable.pipe(map((val) => val.elevation), tap(() => this.cdr.detectChanges()));

    if (this.showPreviousUsedLocations) {
      this.locationsSubscription = this.locationService.getLocationsInViewAsObservable()
        .subscribe((locations) => {
          this.locationGroup.clearLayers();
          for (const location of locations) {
            const marker = L.marker(L.latLng(location.LatLngObject.Latitude, location.LatLngObject.Longitude),
              { icon: previousUsedPlaceIcon })
              .addTo(this.locationGroup);
            marker.on('click', () => this.setToPrevouslyUsedLocation(location));
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.mapViewObservableSubscription) {
      this.mapViewObservableSubscription.unsubscribe();
    }
    if (this.locationsSubscription) {
      this.locationsSubscription.unsubscribe();
    }
  }

  onMapReady(m: L.Map) {
    this.map = m;
    this.locationMarker.setZIndexOffset(100).addTo(this.map);
    if (this.fromMarker) {
      this.fromMarker.addTo(this.map);
    }
    this.locationGroup.addTo(this.map);
    this.map.setView(this.locationMarker.getLatLng(), 15);
    this.map.on('drag', () => this.moveLocationMarkerToCenter());
    this.events.subscribe(settings.events.centerMapToUser, () => this.centerMapToUser());
    this.mapReady.emit(this.map);
    this.updatePathAndDistance();
  }

  private setToPrevouslyUsedLocation(location: ObsLocationsResponseDtoV2) {
    this.followMode = false;
    this.selectedLocation = location;
    this.locationMarker.setLatLng(L.latLng(location.LatLngObject.Latitude,
      location.LatLngObject.Longitude));
    this.map.panTo(this.locationMarker.getLatLng());
    this.updatePathAndDistance();
  }

  private moveLocationMarkerToCenter() {
    this.followMode = false;
    this.selectedLocation = null;
    const center = this.map.getCenter();
    this.locationMarker.setLatLng(center);
    this.updatePathAndDistance();
  }

  centerMapToUser() {
    this.followMode = true;
    this.selectedLocation = null;
    if (this.userposition) {
      this.positionChange(this.userposition);
    }
  }

  positionChange(position: Geoposition) {
    if (position.coords) {
      this.userposition = position;
      if (this.followMode) {
        this.locationMarker.setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }
      this.updatePathAndDistance();
    }
  }

  updatePathAndDistance() {
    const from = this.fromMarker ? this.fromMarker.getLatLng() : (this.userposition ?
      L.latLng(this.userposition.coords.latitude, this.userposition.coords.longitude) : this.locationMarker.getLatLng());
    const locationMarkerLatLng = this.locationMarker.getLatLng();
    const path = [locationMarkerLatLng, from];
    if (!this.pathLine) {
      this.pathLine = L.polyline(path, { color: 'black', weight: 6, opacity: .9, dashArray: '1,12' }).addTo(this.map);
    } else {
      this.pathLine.setLatLngs(path);
    }
    if (this.fromMarker) {
      if (this.fromMarker.getLatLng().equals(this.locationMarker.getLatLng())) {
        this.fromMarker.setOpacity(0);
        this.pathLine.setStyle({ opacity: 0 });
      } else {
        this.fromMarker.setOpacity(1);
        this.pathLine.setStyle({ opacity: 0.9 });
      }
    }
    this.ngZone.run(() => {
      this.distanceToObservationText = this.helperService.getDistanceText(locationMarkerLatLng.distanceTo(from));
    });
  }

  toggleDetails() {
    this.ngZone.run(() => {
      this.showDetails = !this.showDetails;
    });
  }

  getLocationName(location: LocationName) {
    if (location) {
      return location.adminName !== location.name ? `${location.name} / ${location.adminName}` : location.name;
    }
    return '';
  }

  async confirmLocation() {
    const obsLocation: ObsLocationDto = {
      Latitude: this.locationMarker.getLatLng().lat,
      Longitude: this.locationMarker.getLatLng().lng,
      Uncertainty: 0,
      UTMSourceTID: UtmSource.SelectedInMap,
    };
    if (this.selectedLocation) {
      obsLocation.ObsLocationID = this.selectedLocation.Id;
      obsLocation.LocationName = this.selectedLocation.Name;
    } else {
      try {
        const location = await this.location$.pipe(take(1), timeout(1000)).toPromise();
        obsLocation.LocationName = this.getLocationName(location);
      } catch (ex) {
        console.warn('Could not get location name', ex);
      }
      if (this.followMode && this.userposition) {
        obsLocation.UTMSourceTID = UtmSource.GPS;
        obsLocation.Uncertainty = this.userposition.coords.accuracy;
      }
    }

    this.locationSet.emit(obsLocation);
  }

}
