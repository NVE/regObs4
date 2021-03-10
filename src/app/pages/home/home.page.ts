import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { combineLatest, Observable, Subject, race, of } from 'rxjs';
import { ObservationService } from '../../core/services/observation/observation.service';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LeafletClusterHelper } from '../../modules/map/helpers/leaflet-cluser.helper';
import { Router, ActivatedRoute } from '@angular/router';
import {
  map,
  distinctUntilChanged,
  takeUntil,
  tap,
  take,
  switchMap
} from 'rxjs/operators';
import { settings } from '../../../settings';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';
import { RouterPage } from '../../core/helpers/routed-page';
import { enterZone } from '../../core/helpers/observable-helper';
import { Map } from 'mapbox-gl';

const DEBUG_TAG = 'HomePage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends RouterPage implements OnInit {
  @ViewChild(MapItemBarComponent, { static: true })
  mapItemBar: MapItemBarComponent;
  @ViewChild(MapComponent, { static: true }) mapComponent: MapComponent;
  private map: Map;
  // private markerLayer = LeafletClusterHelper.createMarkerClusterGroup({
  //   spiderfyOnMaxZoom: false,
  //   zoomToBoundsOnClick: false
  // });
  private geoCoachMarksClosedSubject = new Subject();

  fullscreen$: Observable<boolean>;
  selectedMarker: MapItemMarker;
  showGeoSelectInfo = false;
  dataLoadIds$: Observable<string[]>;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private observationService: ObservationService,
    private fullscreenService: FullscreenService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone,
    private loggingService: LoggingService,
    private usageAnalyticsConsentService: UsageAnalyticsConsentService
  ) {
    super(router, route);
  }

  ngOnInit() {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
    this.dataLoadIds$ = this.observationService.dataLoad$.pipe(
      map((val) => [val]),
      enterZone(this.ngZone)
    );
    this.checkForFirstStartup();
  }

  checkForFirstStartup() {
    this.userSettingService.userSetting$
      .pipe(
        map((us) => us.showGeoSelectInfo),
        distinctUntilChanged(),
        takeUntil(race(this.ngUnsubscribe, this.geoCoachMarksClosedSubject)),
        enterZone(this.ngZone)
      )
      .subscribe((showGeoSelectInfo) => {
        this.showGeoSelectInfo = showGeoSelectInfo;
        if (!showGeoSelectInfo) {
          this.geoCoachMarksClosedSubject.next();
          this.geoCoachMarksClosedSubject.complete();
          this.showUsageAnalyticsDialog();
        }
      });
  }

  async showUsageAnalyticsDialog() {
    await this.usageAnalyticsConsentService.checkUserDataConsentDialog();
    this.mapComponent.componentIsActive(true);
  }

  mapLoaded(map: Map) {
    this.map = map;
    this.getObservations$().subscribe((obs) => this.createObservationClusters(obs));
  }

  private getObservations$() {
    return this.userSettingService.showObservations$.pipe(switchMap((showObservations) => 
    showObservations ? this.observationService.observations$ : of([])),
    takeUntil(this.ngUnsubscribe));
  }


  // onMapReady(leafletMap: L.Map) {
  //   this.map = leafletMap;
  //   this.markerLayer.addTo(this.map);
  //   this.markerLayer.on('clusterclick', (a: any) => {
  //     const groupLatLng: L.LatLng = a.latlng;
  //     const currentZoom = this.map.getZoom();
  //     const newZoom = currentZoom + 2;
  //     if (newZoom >= settings.map.tiles.maxZoom) {
  //       a.layer.spiderfy();
  //     } else {
  //       this.map.setView(
  //         groupLatLng,
  //         Math.min(newZoom, settings.map.tiles.maxZoom)
  //       );
  //     }
  //   });
  //   this.map.on('click', () => {
  //     if (this.selectedMarker) {
  //       this.selectedMarker.deselect();
  //     }
  //     this.selectedMarker = null;
  //     this.mapItemBar.hide();
  //   });
  //   // TODO: Move this to custom marker layer?
  //   const observationObservable = combineLatest([
  //     this.observationService.observations$,
  //     this.userSettingService.showObservations$
  //   ]);
  //   observationObservable
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(([regObservations, showObservations]) => {
  //       this.redrawObservationMarkers(showObservations ? regObservations : []);
  //     });
  // }

  async onEnter() {
    this.loggingService.debug('Home page ionViewDidEnter.', DEBUG_TAG);
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    if (userSettings.showGeoSelectInfo) {
      this.loggingService.debug(
        'Display coachmarks, wait with starting geopostion',
        DEBUG_TAG
      );
      return;
    }
    this.loggingService.debug(
      'Activate map updates and GeoLocation',
      DEBUG_TAG
    );
    this.mapComponent.componentIsActive(true);
  }

  onLeave() {
    this.loggingService.debug(
      'Home page onLeave. Disable map updates and GeoLocation',
      DEBUG_TAG
    );
    this.mapComponent.componentIsActive(false);
  }

  // async ionViewDidEnter() {
  // Use tab page workaround from:
  // https://github.com/ionic-team/ionic/issues/15260
  // }

  // ionViewWillLeave() {
  //   this.loggingService.debug(`Home page ionViewWillLeave. Disable map updates and GeoLocation.`, DEBUG_TAG);
  //   this.mapComponent.stopGeoPositionUpdates();
  // }

  private createObservationClusters(observations: RegistrationViewModel[]) {
    // this.markerLayer.clearLayers();
    // for (const regObservation of regObservations) {
    //   const latLng = L.latLng(
    //     regObservation.ObsLocation.Latitude,
    //     regObservation.ObsLocation.Longitude
    //   );
    //   const marker = new MapItemMarker(regObservation, latLng, {});
    //   marker.on('click', (event: L.LeafletEvent) => {
    //     const m: MapItemMarker = event.target;
    //     if (this.selectedMarker) {
    //       this.selectedMarker.deselect();
    //     }

    //     this.selectedMarker = m;
    //     m.setSelected();
    //     this.mapItemBar.show(m.item);
    //   });
    //   marker.addTo(this.markerLayer);
    // }

    // Follow example from: https://docs.mapbox.com/mapbox-gl-js/example/cluster/
    this.map.addSource('observations', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: this.convertObservationsToGeoJsonFeatures(observations),
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'observations',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': ['step',['get', 'point_count'],'#51bbd6',100,'#f1f075',750,'#f28cb1'],
          'circle-radius': ['step',['get', 'point_count'], 20, 100, 30, 750, 40]
          }
        });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'observations',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 12
        }
        });
         
        this.map.addLayer({
        id: 'observation-point',
        type: 'circle',
        source: 'observations',
        filter: ['!', ['has', 'point_count']],
        paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
        }
        });
  }

  private convertObservationsToGeoJsonFeatures(observations: RegistrationViewModel[]): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
    return { 
      type: 'FeatureCollection', 
      features:  observations.map((obs) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [obs.ObsLocation.Longitude, obs.ObsLocation.Latitude]
        },
        properties: {
          obs
        }
      }))
    } 
  };
}
