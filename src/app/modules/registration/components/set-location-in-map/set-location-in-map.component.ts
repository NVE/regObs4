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
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import L from 'leaflet'; //TODO: Remove Leaflet usage
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { MapComponent, FeatureLayerType } from 'src/app/modules/map/components/map/map.component';

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
  @Input() location: Point;
  @Input() locationMarker: Graphic; //TODO: Can we have position instead of marker?
  @Input() locationMarkerIconUrl = '/assets/icon/map/obs-location.svg';
  @Output() locationSet = new EventEmitter<ObsLocationDto>();
  @Input() showPreviousUsedLocations = true;
  @Input() showUserPosition = true;
  @Input() confirmLocationText = 'REGISTRATION.OBS_LOCATION.CONFIRM_TEXT';
  @Input() fromLocationText = 'REGISTRATION.OBS_LOCATION.CURRENT_LOCATION';
  @Input() locationTitle = 'REGISTRATION.OBS_LOCATION.TITLE';
  @Input() selectedLocation: ObsLocationsResponseDtoV2;
  @Output() mapReady = new EventEmitter<MapComponent>();
  @Input() showPolyline = true;
  @Input() showFromMarkerInDetails = true;
  @Input() allowEditLocationName = false;
  @Input() isSaveDisabled = false;
  @Output() markerLayerReady = new EventEmitter<GraphicsLayer>();

  private mapComponent: MapComponent;
  private markerLayer = new GraphicsLayer({
    id: 'LOCATIONS-FOR-SINGLE-OBSERVATION'
  });
  followMode = false;
  private userposition: Geoposition;
  private pathLine: Graphic;
  showDetails = false;
  distanceToObservationText = '';
  viewInfo: ViewInfo;
  isLoading = false;
  private locations: ObsLocationsResponseDtoV2[] = [];
  private ngDestroy$ = new Subject();

  private locationGroup = LeafletClusterHelper.createMarkerClusterGroup(); //TODO: Support clustering
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
    
    //TODO: Rydd opp i hvordan vi bestemmer followMode
    this.followMode = !this.locationMarker && !this.fromMarker;
    this.mapService.followMode = this.followMode;
    if (!this.locationMarker) {
      if (this.fromMarker) {
        this.locationMarker = this.createMarker(
          this.fromMarker.geometry as Point //TODO: Er dette trygt?
        );
      } else {
        if (this.location) {
          //we got a location from outside
          this.followMode = false;
          this.mapService.followMode = this.followMode;
          this.locationMarker = this.createMarker(
            this.location,
            this.locationMarkerIconUrl
          );
        } else {
          const lastView = await this.mapService.mapView$
            .pipe(take(1))
            .toPromise();
          if (lastView) {
            this.locationMarker = this.createMarker(lastView.center); //set marker in map center
          } else {
            this.locationMarker = this.createMarkerFromLatLng(59.1, 10.3); //mark a default/fallback location
          }
        }
      }
    }

    this.mapService.followMode$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((mode) => {
        this.followMode = mode;
        if (this.followMode && this.userposition) {
          this.setLocationMarkerLatLng(
            this.userposition.coords.latitude,
            this.userposition.coords.longitude
          );
        }
      });

    this.geoPositionService.currentPosition$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((pos) => this.positionChange(pos));

    this.updateMapViewInfo();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private createMarker(point: Point, symbolPath?: string): Graphic {
    return new Graphic({
      geometry: point,
      symbol: new PictureMarkerSymbol({
        url: symbolPath ? symbolPath : this.locationMarkerIconUrl,
        width: '25px',
        height: '41px',
        yoffset: '20px',
        xoffset: '3px'
      })
    });
  }

  private createMarkerFromLatLng(
    lat: number,
    lng: number,
    symbolPath?: string
  ): Graphic {
    const point = new Point({
      latitude: lat,
      longitude: lng
    });
    return this.createMarker(point, symbolPath);
  }

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

  private addLocationIfNotExists(
    loc: ObsLocationsResponseDtoV2,
    layer: GraphicsLayer
  ) {
    const existing = this.locations.some((location) => loc.Id === location.Id);
    if (!existing) {
      this.locations.push(loc);
      const marker = this.createMarkerFromLatLng(
        loc.LatLngObject.Latitude,
        loc.LatLngObject.Longitude,
        previousUsedPlaceIconUrl
      );
      layer.add(marker);
      //TODO: Få tidligere brukte lokasjoner til å legge seg under lokasjonen man jobber med
      //TODO: Handle click on previously used location marker.on('click', () => this.setToPrevouslyUsedLocation(loc));
      //TODO: Fjern lokasjoner som ikke er innenfor utsnittet lengre, for å unngå minnelekkasje
    }
  }

  onMapReady(mapComponent: MapComponent): void {
    this.mapComponent = mapComponent;

    this.markerLayer.removeAll(); //TODO: Trenger vi denne?
    mapComponent.addFeatureLayer(this.markerLayer, FeatureLayerType.LOCALIZING);

    // this.locationMarker.setZIndexOffset(100).addTo(this.markerLayer); //TODO: Kræsjer når man skal velge posisjon for observasjon
    this.markerLayer.add(this.locationMarker);
    if (this.fromMarker) {
      this.markerLayer.add(this.fromMarker);
    }

    mapComponent.drag$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((event) => {
        this.ngZone.run(() => {
          this.isLoading = true;
        });
        
        this.moveLocationMarkerToCenter();

        if (event && event.action && event.action === 'end') {
          this.updateMapViewInfo();  
        }
      });

    if (this.showPreviousUsedLocations) {
      const layer = new GraphicsLayer({
        id: 'PREVIOUSLY-USED-LOCATIONS'
      });
      mapComponent.addFeatureLayer(layer, FeatureLayerType.PREVIOUSLY_USED_LOCATIONS);
      this.getLocationsObservable()
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((locations) => {
          locations.forEach((loc) => this.addLocationIfNotExists(loc, layer));
        });
    }

    this.mapSearchService.mapSearchClick$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((item) => {
        const latLng = item instanceof L.LatLng ? item : item.latlng; //TODO: Fjern Leaflet-referanse
        this.setLocationMarkerLatLng(latLng.lat, latLng.lng);
      });

    if (!this.followMode) {
      mapComponent.goToPoint(this.locationMarker.geometry as Point)
    }

    this.mapReady.emit(mapComponent);
    this.markerLayerReady.emit(this.markerLayer);
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
      this.mapComponent.goToPoint(this.locationMarker.geometry as Point);
      this.showDetails = true;
    });
  }

  private moveLocationMarkerToCenter() {
    this.mapService.followMode = false;
    this.selectedLocation = null;
    const center = this.mapComponent.getCenter();
    this.locationMarker.geometry = center;
    this.updatePathAndDistance();
  }

  //fetch height, steepness and name for current location
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
      } else {
        this.fromMarker.visible = true;
        this.pathLine.visible = true;
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
