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
    private offlineMapService: OfflineMapService
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
        });
      });
    });
    this.isActive = new BehaviorSubject(this.autoActivate);
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

    this.initOfflineMaps();

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

  private initOfflineMaps() {
    this.logger.debug('initOfflineMaps(): ', DEBUG_TAG);
    this.offlineMapService
      .createDownloadedOfflineMaps$()
      .subscribe((offlineMaps) => {
        for (const offlineMap of offlineMaps) {
          if (offlineMap.downloadComplete) {
            this.addOfflineLayer(offlineMap);
          }
        }
      });
  }

  private async addOfflineLayer(offlineMap: OfflineMap) {
    const style = await this.offlineMapService.getStyleJson(offlineMap);
    // const url = await this.offlineMapService.getRootJsonUrl(offlineMap);
    console.log(`laster offline kartlag: ${offlineMap.name}`);
    const vLayer = new VectorTileLayer({
      style
    });
    // vLayer.tileInfo = new TileInfo({
    //   dpi: 96,
    //   // format: 'pbf',
    //   origin: new Point({
    //     x: -20037508.34278700128,
    //     y: 20037508.34278700128,
    //     spatialReference: { wkid: 102100 }
    //   }),
    //   // spatialReference: { wkid: 102100, latestWkid: 3857 },
    //   lods: [
    //     { level: 0, resolution: 156543.0339280001353, scale: 591396864 },
    //     { level: 1, resolution: 78271.51696399993671, scale: 295698432 },
    //     { level: 2, resolution: 39135.758482000092, scale: 147849216 },
    //     { level: 3, resolution: 19567.87924099991869, scale: 73924608 },
    //     { level: 4, resolution: 9783.939620499959346, scale: 36962304 },
    //     { level: 5, resolution: 4891.969810249979673, scale: 18481152 },
    //     { level: 6, resolution: 2445.984905124989837, scale: 9240576 },
    //     { level: 7, resolution: 1222.992452562494918, scale: 4620288 },
    //     { level: 8, resolution: 611.4962262813796769, scale: 2310144 },
    //     { level: 9, resolution: 305.7481131405575638, scale: 1155072 },
    //     { level: 10, resolution: 152.8740565704110566, scale: 577536 },
    //     { level: 11, resolution: 76.43702828507323943, scale: 288768 },
    //     { level: 12, resolution: 38.21851414253662, scale: 144384 },
    //     { level: 13, resolution: 19.10925707126831, scale: 72192 },
    //     { level: 14, resolution: 9.5546285356341549, scale: 36096 },
    //     { level: 15, resolution: 4.7773142679493699, scale: 18048 },
    //     { level: 16, resolution: 2.3886571339746849, scale: 9024 },
    //     { level: 17, resolution: 1.1943285668550503, scale: 4512 },
    //     { level: 18, resolution: 0.59716428355981721, scale: 2256 }
    //   ],
    //   size: [512, 512]
    // });

    this.map.layers.add(vLayer);
  }
}
