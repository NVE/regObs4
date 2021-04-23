import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import Map from '@arcgis/core/Map';
import Basemap from '@arcgis/core/Basemap';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import LOD from '@arcgis/core/layers/support/LOD';
import MapView from '@arcgis/core/views/MapView';
import config from '@arcgis/core/config.js';
import { BehaviorSubject, of } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { OfflineMap } from 'src/app/core/services/offline-map/offline-map.model';
import { Point, SpatialReference } from '@arcgis/core/geometry';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { Platform } from '@ionic/angular';

const DEBUG_TAG = 'MapComponent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() showMapControls = true;
  @Input() showUserLocation = true;
  @Input() showScale = true;
  @Input() showSupportMaps = true;
  @Input() center: L.LatLng;
  @Input() zoom: number;
  @Output() mapReady: EventEmitter<L.Map> = new EventEmitter();
  @Input() autoActivate = true;
  @Input() geoTag = DEBUG_TAG;
  mapView: MapView;
  loading: boolean;
  private isActive: BehaviorSubject<boolean>;
  private view: any = null;
  private map: Map;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  constructor(
    private zone: NgZone,
    private logger: LoggingService,
    private offlineMapService: OfflineMapService,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    config.assetsPath = 'assets';

    this.zone.runOutsideAngular(() => {
      // Initialize MapView and return an instance of MapView
      const start = performance.now();
      this.initializeMap().then(() => {
        // The map has been initialized
        this.zone.run(() => {
          this.logger.debug(
            'Map loaded in ' + (performance.now() - start) + ' ms'
          );
          this.onMapReady();
        });
      });
    });
    this.isActive = new BehaviorSubject(this.autoActivate);
  }

  private onMapReady(): void {
    if (this.showScale) {
      const scaleBar = new ScaleBar({
        view: this.mapView,
        unit: 'metric'
      });
      // Add the widget to the bottom left corner of the view
      this.mapView.ui.add(scaleBar, {
        position: 'bottom-left'
      });
    }
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy(); // destroy the map view
    }
  }

  async initializeMap(): Promise<void> {
    const container = this.mapViewEl.nativeElement;

    const basemap = new Basemap({
      baseLayers: [
        new VectorTileLayer({
          url:
            'https://services.geodataonline.no/arcgis/rest/services/GeocacheVector/GeocacheGraatoneTerreng_WM/VectorTileServer'
        })
      ],
      id: 'vektorkart'
    });

    this.map = new Map({
      basemap: basemap
      // layers: layers
    });

    // const map = new WebMap({
    //   portalItem: {
    //     id: 'aa1d3f80270146208328cf66d022e09c'
    //   }
    // });

    const view = new MapView({
      map: this.map,
      container,
      zoom: 7,
      center: [10.5, 60]
      // center: initialView.target, //TODO: Get from URL
      // zoom: initialView.zoom, //TODO: Get from URL
      // constraints: {
      //   minZoom: 2,
      //   geometry: new Extent({
      //     xmin: -2500000,
      //     ymin: 5500000,
      //     xmax: 3000000,
      //     ymax: 9000000,
      //     spatialReference: { wkid: 25833 }
      //   })
      // }
    });

    if (isAndroidOrIos(this.platform)) {
      this.initOfflineMaps();
    }

    this.mapView = view;
    this.mapView
      .when(() => {
        this.loading = false;
        this.mapReady.emit(null);
      })
      .catch((reason) => {
        this.logger.log(`Error in initializeMap due to ${reason}`);
      });
  }

  componentIsActive(isActive: boolean) {
    this.isActive.next(isActive);
  }

  private async initOfflineMaps() {
    this.logger.debug('initOfflineMaps(): ', DEBUG_TAG);
    this.offlineMapService.initWebServer();
    (await this.offlineMapService.getOfflineMaps$()).subscribe(
      (offlineMaps) => {
        for (const offlineMap of offlineMaps) {
          if (offlineMap.downloadComplete) {
            this.addOfflineLayer(offlineMap);
          }
        }
      }
    );
  }

  private async addOfflineLayer(offlineMap: OfflineMap) {
    this.logger.debug(`laster offline kartlag: ${offlineMap.name}`);
    const vLayer = new VectorTileLayer({
      url: `http://localhost:8080/${offlineMap.name}/root.json`
    });
    this.map.layers.add(vLayer);
    const constraints = this.mapView.constraints;
    constraints.maxZoom = 13;
  }
}
