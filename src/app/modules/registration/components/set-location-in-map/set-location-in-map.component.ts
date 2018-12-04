import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../map/services/map/map.service';
import { HelperService } from '../../../../core/services/helpers/helper.service';
import { MapSearchService } from '../../../map/services/map-search/map-search.service';
import { debounceTime, take, timeout, switchMap } from 'rxjs/operators';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { LocationName } from '../../../map/services/map-search/location-name.model';
import { ObsLocationsResponseDtoV2, ObsLocationDto } from '../../../regobs-api/models';
import { LocationService } from '../../../../core/services/location/location.service';
import { settings } from '../../../../../settings';
import { UtmSource } from '../../pages/obs-location/utm-source.enum';
import { Events } from '@ionic/angular';
import { IconHelper } from '../../../map/helpers/icon.helper';
import { ViewInfo } from '../../../map/services/map-search/view-info.model';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

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
  @Output() locationSet = new EventEmitter<ObsLocationDto>();
  @Input() showPreviousUsedLocations = true;
  @Input() showUserPosition = true;
  @Input() confirmLocationText = 'REGISTRATION.OBS_LOCATION.CONFIRM_TEXT';
  @Input() fromLocationText = 'REGISTRATION.OBS_LOCATION.CURRENT_LOCATION';
  @Input() locationTitle = 'REGISTRATION.OBS_LOCATION.TITLE';
  @Input() selectedLocation: ObsLocationsResponseDtoV2;
  @Output() selectedLocationChange = new EventEmitter<ObsLocationsResponseDtoV2>();
  @Output() mapReady = new EventEmitter<L.Map>();
  @Input() showPolyline = true;
  @Input() showFromMarkerInDetails = true;

  private map: L.Map;
  followMode = false;
  private userposition: Geoposition;
  private pathLine: L.Polyline;
  showDetails = false;
  distanceToObservationText = '';
  viewInfo: ViewInfo;
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
        if (lastView) {
          this.locationMarker = L.marker(lastView.center, { icon: locationMarkerIcon });
        } else {
          this.locationMarker = L.marker(L.latLng(59.1, 10.3), { icon: locationMarkerIcon });
        }
      }
    }
    this.updateMapViewInfo();

    this.mapViewObservableSubscription = this.mapService.mapViewObservable$.pipe(debounceTime(1000)).
      subscribe((mapView) => {
        if (mapView.zoom > 7) { // Do not update when zoom level is too low, we get too much records
          const range = Math.round(mapView.bounds.getNorthWest().distanceTo(mapView.bounds.getSouthEast()) / 2);
          this.locationService.updateLocationWithinRadius(this.geoHazard, mapView.center.lat, mapView.center.lng, range);
        }
      });
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
    this.map.on('dragstart', () => {
      this.ngZone.run(() => {
        this.isLoading = true;
      });
    });
    this.map.on('dragend', () => this.updateMapViewInfo());
    this.map.on('drag', () => this.moveLocationMarkerToCenter());
    this.events.subscribe(settings.events.centerMapToUser, () => this.centerMapToUser());

    const previousUsedPlaceIcon = L.icon({
      iconUrl: '/assets/icon/map/prev-used-place.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });

    if (this.showPreviousUsedLocations) {
      this.locationsSubscription = this.locationService.getLocationsAsObservable(this.geoHazard)
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

    this.mapReady.emit(this.map);
    this.updatePathAndDistance();
  }

  private setToPrevouslyUsedLocation(location: ObsLocationsResponseDtoV2) {
    this.ngZone.run(() => {
      this.followMode = false;
      this.selectedLocation = location;
      this.locationMarker.setLatLng(L.latLng(location.LatLngObject.Latitude,
        location.LatLngObject.Longitude));
      this.map.panTo(this.locationMarker.getLatLng());
      this.updatePathAndDistance();
      this.showDetails = true;
    });
  }

  private moveLocationMarkerToCenter() {
    this.followMode = false;
    this.selectedLocation = null;
    const center = this.map.getCenter();
    this.locationMarker.setLatLng(center);
    this.updatePathAndDistance();
  }

  private updateMapViewInfo() {
    const latLng = this.locationMarker.getLatLng();
    BorderHelper.isLatLngInNorwayAsObservable(latLng).pipe(switchMap((inNorway) =>
      this.mapSearchService.getViewInfo(
        latLng,
        inNorway
      ))).subscribe((val) => {
        this.ngZone.run(() => {
          this.viewInfo = val;
          this.isLoading = false;
        });
      }, (_) => {
        this.ngZone.run(() => {
          this.viewInfo = null;
          this.isLoading = false;
        });
      });
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
      if (this.map) {
        this.updatePathAndDistance();
      }
    }
  }

  updatePathAndDistance() {
    const from = this.fromMarker ? this.fromMarker.getLatLng() : (this.userposition ?
      L.latLng(this.userposition.coords.latitude, this.userposition.coords.longitude) : this.locationMarker.getLatLng());
    const locationMarkerLatLng = this.locationMarker.getLatLng();
    const path = [locationMarkerLatLng, from];
    if (this.map) {
      if (!this.pathLine) {
        this.pathLine = L.polyline(path, { color: 'black', weight: 6, opacity: .9, dashArray: '1,12' });
        if (this.showPolyline) {
          this.pathLine.addTo(this.map);
        }
      } else {
        this.pathLine.setLatLngs(path);
      }
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
      if (this.viewInfo && this.viewInfo.location) {
        obsLocation.LocationName = this.getLocationName(this.viewInfo.location);
      }
      if (this.followMode && this.userposition) {
        obsLocation.UTMSourceTID = UtmSource.GPS;
        obsLocation.Uncertainty = Math.round(this.userposition.coords.accuracy);
      }
    }

    this.locationSet.emit(obsLocation);
  }

}
