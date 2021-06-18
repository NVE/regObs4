import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { MapComponent, FeatureLayerType } from '../../modules/map/components/map/map.component';
import 'leaflet.markercluster';
import { combineLatest, Observable, race, Subject } from 'rxjs';
import { distinctUntilChanged, map, take, takeUntil } from 'rxjs/operators';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { enterZone } from '../../core/helpers/observable-helper';
import { RouterPage } from '../../core/helpers/routed-page';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { ObservationService } from '../../core/services/observation/observation.service';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';

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

  private markerLayer = new GraphicsLayer({ id: 'OBSERVATIONS' });
  //TODO: Støtte clustering av observasjons-symboler
  // private markerLayer = LeafletClusterHelper.createMarkerClusterGroup({
  //   spiderfyOnMaxZoom: false,
  //   zoomToBoundsOnClick: false
  // });
  private geoCoachMarksClosedSubject = new Subject();

  fullscreen$: Observable<boolean>;
  private selectedMarker: MapItemMarker;
  showGeoSelectInfo = false;
  dataLoadIds$: Observable<string[]>;
  private ngDestroy$ = new Subject();
  private mapDataInitialized: boolean;

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
    this.loggingService.debug('ngOnInit()...', DEBUG_TAG)
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
    this.dataLoadIds$ = this.observationService.dataLoad$.pipe(
      map((val) => [val]),
      enterZone(this.ngZone)
    );
    this.checkForFirstStartup();
    this.loggingService.debug('ngOnInit() ferdig', DEBUG_TAG)
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

  onMapReady(mapComponent: MapComponent): void {
    this.loggingService.debug(`onMapReady(). Map data already initialized = ${this.mapDataInitialized}`, DEBUG_TAG)
    if (!this.mapDataInitialized) {
      this.mapDataInitialized = true;
      mapComponent.addFeatureLayer(this.markerLayer, FeatureLayerType.OBSERVATIONS);
      
      this.createObservationMarkerClickEventHandler(mapComponent, this.markerLayer, this.mapItemBar);

      const observationObservable = combineLatest([
        this.observationService.observations$,
        this.userSettingService.showObservations$
      ]);
      observationObservable
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(([regObservations, showObservations]) => {
          this.redrawObservationMarkers(showObservations ? regObservations : []);
        });
    }
    this.loggingService.debug(`onMapReady() ferdig. Map data initialized = ${this.mapDataInitialized}`, DEBUG_TAG)
  }

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

  private redrawObservationMarkers(regObservations: RegistrationViewModel[]) {
    this.markerLayer.removeAll();
    for (const regObservation of regObservations) {
      const marker = new MapItemMarker(regObservation);
      this.markerLayer.add(marker);
    }
  }

  private createObservationMarkerClickEventHandler(mapComponent: MapComponent, layer: GraphicsLayer, mapItemBar: MapItemBarComponent): void {
    //TODO: Handle click on registration cluster
    // this.markerLayer.on('clusterclick', (a: any) => {
    //   const groupLatLng: L.LatLng = a.latlng;
    //   const currentZoom = this.map.getZoom();
    //   const newZoom = currentZoom + 2;
    //   if (newZoom >= settings.map.tiles.maxZoom) {
    //     a.layer.spiderfy();
    //   } else {
    //     this.map.setView(
    //       groupLatLng,
    //       Math.min(newZoom, settings.map.tiles.maxZoom)
    //     );
    //   }
    // });

    this.loggingService.debug(`createClickEventHandler for layer ${layer.id}`, DEBUG_TAG);
    mapComponent.createGraphicClickEventHandler(layer)
    .pipe(takeUntil(this.ngDestroy$))
    .subscribe((clickOnGraphic) => {
      if (clickOnGraphic) {
        if (clickOnGraphic instanceof MapItemMarker) {
          const marker = clickOnGraphic as MapItemMarker;
          this.loggingService.debug(`graphic was clicked: layer = ${layer.id}, marker = ${marker.id}`, DEBUG_TAG);
          if (marker.isSelected) {
            marker.deselect();
            mapItemBar.hide();
          } else {
            this.selectedMarker?.deselect(); //deselect last marker
            marker.setSelected();
            this.selectedMarker = marker;
            mapItemBar.show(marker.item);
          }
        }
      } else {
        //click outside of graphic
        this.selectedMarker?.deselect();
        mapItemBar.hide();
      }
    });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
