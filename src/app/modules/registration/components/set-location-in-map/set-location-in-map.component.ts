import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, NgZone, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../map/services/map/map.service';
import { HelperService } from '../../../../core/services/helpers/helper.service';
import { MapSearchService } from '../../../map/services/map-search/map-search.service';
import { debounceTime, take, switchMap } from 'rxjs/operators';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { LocationName } from '../../../map/services/map-search/location-name.model';
import { ObsLocationsResponseDtoV2, ObsLocationDto } from '../../../regobs-api/models';
import { LocationService } from '../../../../core/services/location/location.service';
import { UtmSource } from '../../pages/obs-location/utm-source.enum';
import { ViewInfo } from '../../../map/services/map-search/view-info.model';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ObsLocation } from '../../models/obs-location.model';
import { IonInput } from '@ionic/angular';
import { LeafletClusterHelper } from '../../../map/helpers/leaflet-cluser.helper';

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
  @Input() canEditLocationName = false;

  private map: L.Map;
  followMode = false;
  private userposition: Geoposition;
  private pathLine: L.Polyline;
  showDetails = false;
  distanceToObservationText = '';
  viewInfo: ViewInfo;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  private locationGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 60,
    iconCreateFunction: LeafletClusterHelper.createClusterIcon,
  });
  editLocationName = false;
  locationName: string;

  @ViewChild('editLocationNameInput') editLocationNameInput: IonInput;

  constructor(
    private mapService: MapService,
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
    this.mapService.followMode = !this.locationMarker && !this.fromMarker;
    if (!this.locationMarker) {
      if (this.fromMarker) {
        this.locationMarker = L.marker(this.fromMarker.getLatLng(), { icon: locationMarkerIcon });
      } else {
        const lastView = await this.mapService.mapView$.pipe(take(1)).toPromise();
        if (lastView) {
          this.locationMarker = L.marker(lastView.center, { icon: locationMarkerIcon });
        } else {
          this.locationMarker = L.marker(L.latLng(59.1, 10.3), { icon: locationMarkerIcon });
        }
      }
    }
    this.updateMapViewInfo();

    this.subscriptions.push(this.mapService.mapView$.pipe(debounceTime(1000)).
      subscribe((mapView) => {
        if (mapView.zoom > 7) { // Do not update when zoom level is too low, we get too much records
          const range = Math.round(mapView.bounds.getNorthWest().distanceTo(mapView.bounds.getSouthEast()) / 2);
          this.locationService.updateLocationWithinRadius(this.geoHazard, mapView.center.lat, mapView.center.lng, range);
        }
      }));
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  onMapReady(m: L.Map) {
    this.map = m;
    this.locationMarker.setZIndexOffset(100).addTo(this.map);
    if (this.fromMarker) {
      this.fromMarker.addTo(this.map);
    }
    this.locationGroup.addTo(this.map);
    if (this.locationMarker) {
      this.map.setView(this.locationMarker.getLatLng(), 15);
    }
    this.map.on('dragstart', () => {
      this.ngZone.run(() => {
        this.isLoading = true;
      });
    });
    this.map.on('dragend', () => this.updateMapViewInfo());
    this.map.on('drag', () => this.moveLocationMarkerToCenter());

    const previousUsedPlaceIcon = L.icon({
      iconUrl: '/assets/icon/map/prev-used-place.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });

    if (this.showPreviousUsedLocations) {
      this.subscriptions.push(this.locationService.getLocationsAsObservable(this.geoHazard)
        .subscribe((locations) => {
          this.locationGroup.clearLayers();
          for (const location of locations) {
            const marker = L.marker(L.latLng(location.LatLngObject.Latitude, location.LatLngObject.Longitude),
              { icon: previousUsedPlaceIcon })
              .addTo(this.locationGroup);
            marker.on('click', () => this.setToPrevouslyUsedLocation(location));
          }
        }));
    }

    this.subscriptions.push(this.mapService.followMode$.subscribe((val) => {
      this.followMode = val;
      if (this.followMode && this.userposition) {
        this.locationMarker.setLatLng({
          lat: this.userposition.coords.latitude,
          lng: this.userposition.coords.longitude
        });
        if (this.map) {
          this.updatePathAndDistance();
        }
      }
    }));

    this.mapReady.emit(this.map);
    this.updatePathAndDistance();
  }

  private setToPrevouslyUsedLocation(location: ObsLocationsResponseDtoV2) {
    this.ngZone.run(() => {
      this.mapService.followMode = false;
      this.selectedLocation = location;
      this.locationMarker.setLatLng(L.latLng(location.LatLngObject.Latitude,
        location.LatLngObject.Longitude));
      this.map.panTo(this.locationMarker.getLatLng());
      this.updatePathAndDistance();
      this.showDetails = true;
    });
  }

  private moveLocationMarkerToCenter() {
    this.mapService.followMode = false;
    this.selectedLocation = null;
    const center = this.map.getCenter();
    this.locationMarker.setLatLng(center);
    this.updatePathAndDistance();
  }

  private updateMapViewInfo() {
    const latLng = this.locationMarker.getLatLng();
    this.mapSearchService.getViewInfo(
      { center: latLng, bounds: null, zoom: 0 },
    ).subscribe((val) => {
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
    const obsLocation: ObsLocation = {
      Latitude: this.locationMarker.getLatLng().lat,
      Longitude: this.locationMarker.getLatLng().lng,
      Uncertainty: 0,
      UTMSourceTID: UtmSource.SelectedInMap,
    };
    if (this.selectedLocation) {
      obsLocation.ObsLocationID = this.selectedLocation.Id;
      obsLocation.LocationName = this.selectedLocation.Name;
    } else if (this.editLocationName && this.locationName && this.locationName.length > 0) {
      obsLocation.LocationName = this.locationName.substring(0, 60);
    } else if (this.viewInfo && this.viewInfo.location) {
      obsLocation.calculatedLocationName = this.getLocationName(this.viewInfo.location);
    }
    if (this.followMode && this.userposition) {
      obsLocation.UTMSourceTID = UtmSource.GPS;
      obsLocation.Uncertainty = Math.round(this.userposition.coords.accuracy);
    }

    this.locationSet.emit(obsLocation);
  }

  editLocation() {
    this.editLocationName = true;
    setTimeout(() => {
      if (this.editLocationNameInput) {
        this.editLocationNameInput.setFocus();
      }
    }, 50);
  }

}
