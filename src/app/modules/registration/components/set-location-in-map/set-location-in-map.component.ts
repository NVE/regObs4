//TODO: Remove Leaflet usage
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
import { MapService } from '../../../map/services/map/map.service';
import { HelperService } from '../../../../core/services/helpers/helper.service';
import { MapSearchService } from '../../../map/services/map-search/map-search.service';
import { take, switchMap, filter, takeUntil } from 'rxjs/operators';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Subject } from 'rxjs';
import { LocationName } from '../../../map/services/map-search/location-name.model';
import {
  ObsLocationsResponseDtoV2,
  ObsLocationDto
} from '../../../regobs-api/models';
import { LocationService } from '../../../../core/services/location/location.service';
import { UtmSource } from '../../pages/obs-location/utm-source.enum';
import { ViewInfo } from '../../../map/services/map-search/view-info.model';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { IonInput } from '@ionic/angular';
import { LeafletClusterHelper } from '../../../map/helpers/leaflet-cluser.helper';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { Point, Polyline } from '@arcgis/core/geometry';
import MapView from '@arcgis/core/views/MapView';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import L from 'leaflet';

//TODO: Sjekk om vi trenger dette:
// const defaultIcon = L.icon({
//   iconUrl: 'leaflet/marker-icon.png',
//   shadowUrl: 'leaflet/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41]
// });

const previousUsedPlaceIconUrl = '/assets/icon/map/prev-used-place.svg';
//TODO: Trenger vi noe av dette?
// const previousUsedPlaceIcon = L.icon({
//   iconUrl: previousUsedPlaceIconUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   shadowUrl: 'leaflet/marker-shadow.png',
//   shadowSize: [41, 41]
// });

@Component({
  selector: 'app-set-location-in-map',
  templateUrl: './set-location-in-map.component.html',
  styleUrls: ['./set-location-in-map.component.scss']
})
export class SetLocationInMapComponent implements OnInit, OnDestroy {
  @Input() geoHazard: GeoHazard;
  @Input() fromMarker: Graphic;
  @Input() fromMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Input() locationMarker: Graphic;
  @Input() locationMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Output() locationSet = new EventEmitter<ObsLocationDto>();
  @Input() showPreviousUsedLocations = true;
  @Input() showUserPosition = true;
  @Input() confirmLocationText = 'REGISTRATION.OBS_LOCATION.CONFIRM_TEXT';
  @Input() fromLocationText = 'REGISTRATION.OBS_LOCATION.CURRENT_LOCATION';
  @Input() locationTitle = 'REGISTRATION.OBS_LOCATION.TITLE';
  @Input() selectedLocation: ObsLocationsResponseDtoV2;
  @Output() mapReady = new EventEmitter<MapView>();
  @Input() showPolyline = true;
  @Input() showFromMarkerInDetails = true;
  @Input() allowEditLocationName = false;
  @Input() isSaveDisabled = false;

  private mapView: MapView; //TODO: Vurder om denne trenger å være global
  private markerLayer = new GraphicsLayer({
    id: 'LOCATIONS-FOR-SINGLE-OBSERVATION'
  }); //TODO: Vurder om denne trenger å være global
  followMode = false;
  private userposition: Geoposition;
  private pathLine: Graphic;
  showDetails = false;
  distanceToObservationText = '';
  viewInfo: ViewInfo;
  isLoading = false;
  private locations: ObsLocationsResponseDtoV2[] = [];
  private ngDestroy$ = new Subject();

  private locationGroup = LeafletClusterHelper.createMarkerClusterGroup();
  editLocationName = false;
  locationName: string;

  @ViewChild('editLocationNameInput') editLocationNameInput: IonInput;

  get canEditLocationName(): boolean {
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
  ) {}

  async ngOnInit(): Promise<void> {
    //TODO: Trenger vi noe av dette?
    //L.Marker.prototype.options.icon = defaultIcon;
    //
    // const locationMarkerIcon = L.icon({
    //   iconUrl: this.locationMarkerIconUrl,
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   shadowUrl: 'leaflet/marker-shadow.png',
    //   shadowSize: [41, 41]
    // });
    if (this.fromMarker) {
      this.fromMarker = this.convertFromLeafletMarkerToArcgisMarkerIfNeeded(
        this.fromMarker
      );
    }
    this.followMode = !this.locationMarker && !this.fromMarker;
    this.mapService.followMode = this.followMode;
    if (!this.locationMarker) {
      if (this.fromMarker) {
        this.locationMarker = this.createMarker(
          this.fromMarker.geometry as Point, //TODO: Er dette trygt?
          this.locationMarkerIconUrl
        );
      } else {
        const lastView = await this.mapService.mapView$
          .pipe(take(1))
          .toPromise();
        if (lastView) {
          this.locationMarker = this.createMarker(
            lastView.center,
            this.locationMarkerIconUrl
          );
        } else {
          this.locationMarker = this.createMarker(
            new Point({ latitude: 59.1, longitude: 10.3 }),
            this.locationMarkerIconUrl
          );
        }
      }
    } else {
      //TODO: Remove this when input markers are based on ArcGis
      this.locationMarker = this.convertFromLeafletMarkerToArcgisMarkerIfNeeded(
        this.locationMarker
      );
      // if (this.locationMarker instanceof L.Marker) {
      //   const leafletMarker = this.locationMarker as L.Marker;
      //   const latLng = leafletMarker.getLatLng();
      //   this.locationMarker = this.createMarker(
      //     new Point({ latitude: latLng.lat, longitude: latLng.lng }),
      //     this.locationMarkerIconUrl
      //   );
      // }
    }
    this.updateMapViewInfo();
  }

  //TODO: Remove this when input markers are based on ArcGis
  private convertFromLeafletMarkerToArcgisMarkerIfNeeded(
    marker: L.Marker | Graphic
  ): Graphic {
    if (marker instanceof L.Marker) {
      const leafletMarker = marker as L.Marker;
      const latLng = leafletMarker.getLatLng();
      return this.createMarker(
        new Point({ latitude: latLng.lat, longitude: latLng.lng }),
        this.locationMarkerIconUrl
      );
    }
    return marker as Graphic;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private createMarker(point: Point, symbolPath: string): Graphic {
    return new Graphic({
      geometry: point,
      //TODO: Få SVG-til å virke! symbol: new SimpleMarkerSymbol({ path: symbolPath })
      symbol: new SimpleMarkerSymbol()
    });
  }

  //TODO: Trenger vi denne?
  // private createMarker(lat: number, lng: number, symbolPath: string): Graphic {
  //   return new Graphic({
  //     geometry: new Point({
  //       latitude: lat,
  //       longitude: lng
  //     }),
  //     symbol: new SimpleMarkerSymbol({ path: symbolPath })
  //   });
  // }

  private getLocationsObservable() {
    return this.mapService.mapView$.pipe(
      filter(
        (mapView) =>
          mapView &&
          mapView.center !== undefined &&
          mapView.bounds !== undefined
      ),
      switchMap((mapView) => {
        const nwCorner = new Point({
          latitude: mapView.bounds.xmin,
          longitude: mapView.bounds.ymin
        });
        const seCorner = new Point({
          latitude: mapView.bounds.xmax,
          longitude: mapView.bounds.ymax
        });
        const radius = Math.round(nwCorner.distance(seCorner)) / 2;
        return this.locationService.getLocationWithinRadiusObservable(
          this.geoHazard,
          mapView.center.latitude,
          mapView.center.longitude,
          radius
        );
      })
    );
  }

  private addLocationIfNotExists(loc: ObsLocationsResponseDtoV2) {
    const existing = this.locations.some((location) => loc.Id === location.Id);
    if (!existing) {
      this.locations.push(loc);
      const marker = this.createMarker(
        new Point({
          latitude: loc.LatLngObject.Latitude,
          longitude: loc.LatLngObject.Longitude
        }),
        previousUsedPlaceIconUrl
      );
      this.markerLayer.add(marker);
      //TODO: Sjekk om vi kan slette dette
      // const marker = L.marker(
      //   L.latLng(loc.LatLngObject.Latitude, loc.LatLngObject.Longitude),
      //   { icon: previousUsedPlaceIcon }
      // ).addTo(this.locationGroup);

      //TODO: Handle click on previously used location marker.on('click', () => this.setToPrevouslyUsedLocation(loc));
    }
  }

  onMapReady(mapView: MapView): void {
    this.mapView = mapView;
    this.markerLayer.removeAll(); //TODO: Trenger vi denne?
    this.mapView.map.add(this.markerLayer);

    // this.locationMarker.setZIndexOffset(100).addTo(this.markerLayer); //TODO: Kræsjer når man skal velge posisjon for observasjon
    this.markerLayer.add(this.locationMarker);
    if (this.fromMarker) {
      this.markerLayer.add(this.fromMarker);
    }
    // this.locationGroup.addTo(this.map); //TODO: Cluster
    this.mapView.on('drag', () => {
      this.ngZone.run(() => {
        this.isLoading = true;
      });
    });
    this.mapView.on('drag', (event) => {
      if (event.action === 'end') {
        this.updateMapViewInfo();
      }
    });
    this.mapView.on('drag', () => this.moveLocationMarkerToCenter());

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
          this.setLocationMarkerLatLng(
            this.userposition.coords.latitude,
            this.userposition.coords.longitude
          );
        }
      });

    this.mapSearchService.mapSearchClick$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((item) => {
        const latLng = item instanceof L.LatLng ? item : item.latlng; //TODO: Fjern Leaflet-referanse
        this.setLocationMarkerLatLng(latLng.lat, latLng.lng);
      });

    this.geoPositionService.currentPosition$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((pos) => this.positionChange(pos));

    if (!this.followMode) {
      // this.map.setView(this.locationMarker.getLatLng(), 15); //TODO: Check what 15 was used for
      this.mapView.goTo(this.locationMarker.geometry);
    }

    this.mapReady.emit(this.mapView);
    this.updatePathAndDistance();
  }

  private setLocationMarkerLatLng(lat: number, lng: number) {
    this.locationMarker.geometry = new Point({ latitude: lat, longitude: lng });
    this.updatePathAndDistance();
    this.updateMapViewInfo();
  }

  private setToPrevouslyUsedLocation(location: ObsLocationsResponseDtoV2) {
    this.ngZone.run(() => {
      this.mapService.followMode = false;
      this.selectedLocation = location;
      this.setLocationMarkerLatLng(
        location.LatLngObject.Latitude,
        location.LatLngObject.Longitude
      );
      this.mapView.goTo(this.locationMarker.geometry);
      this.showDetails = true;
    });
  }

  private moveLocationMarkerToCenter() {
    this.mapService.followMode = false;
    this.selectedLocation = null;
    const center = this.mapView.center;
    this.locationMarker.geometry = center;
    this.updatePathAndDistance();
  }

  private updateMapViewInfo() {
    const center = this.locationMarker.geometry as Point; //TODO: Is this safe
    this.mapSearchService
      .getViewInfo(
        {
          center: center,
          bounds: null,
          zoom: 0
        },
        this.geoHazard
      )
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

  private positionChange(position: Geoposition) {
    this.userposition = position;
    if (this.followMode) {
      this.setLocationMarkerLatLng(
        position.coords.latitude,
        position.coords.longitude
      );
    } else {
      this.updatePathAndDistance();
    }
  }

  private getFromPosition(): Point {
    if (this.fromMarker) {
      return this.fromMarker.geometry as Point;
    }
    if (this.userposition) {
      return new Point({
        latitude: this.userposition.coords.latitude,
        longitude: this.userposition.coords.longitude
      });
    }
    return this.locationMarker.geometry as Point;
  }

  updatePathAndDistance(): void {
    const start = this.locationMarker.geometry as Point;
    const stop = this.getFromPosition();
    if (this.mapView) {
      const path = [
        [start.latitude, start.longitude],
        [stop.latitude, stop.longitude]
      ];
      const line = new Polyline({ paths: [path] });
      if (!this.pathLine) {
        this.pathLine = new Graphic(
          { geometry: line, symbol: new SimpleLineSymbol() }
          //TODO: gjøre streken penere:
          // color: 'black',
          // weight: 6,
          // opacity: 0.9,
          // dashArray: '1,12'
        );
        if (this.showPolyline) {
          this.markerLayer.add(this.pathLine);
        }
      } else {
        this.pathLine.geometry = line;
      }
      if (this.fromMarker) {
        if (
          this.fromMarker.geometry === this.locationMarker.geometry //TODO: Check if this is possible
        ) {
          this.fromMarker.visible = false;
          this.pathLine.visible = false;
          // this.fromMarker.setOpacity(0);
          // this.pathLine.setStyle({ opacity: 0 });
        } else {
          this.fromMarker.visible = true;
          this.pathLine.visible = true;
          // this.fromMarker.setOpacity(1);
          // this.pathLine.setStyle({ opacity: 0.9 }); TODO: Sjekk om vi må ha dette
        }
      }
    }
    this.ngZone.run(() => {
      this.distanceToObservationText = this.helperService.getDistanceText(
        start.distance(stop)
      );
    });
  }

  toggleDetails(): void {
    this.ngZone.run(() => {
      this.showDetails = !this.showDetails;
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

  confirmLocation(): void {
    const obsLocation = this.getLocation();
    this.locationSet.emit(obsLocation);
  }

  getLocation(): ObsLocationDto {
    const location = this.locationMarker.geometry as Point;
    const obsLocation: ObsLocationDto = {
      Latitude: location.latitude,
      Longitude: location.longitude,
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
}
