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
import MapView from '@arcgis/core/views/MapView';
import config from '@arcgis/core/config.js';
import { BehaviorSubject } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

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

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  constructor(private zone: NgZone, private logger: LoggingService) {}

  ngOnInit(): void {
    config.assetsPath = 'assets/';

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
            'https://services.geodataonline.no/arcgis/rest/services/GeocacheVector/GeocacheBasis/VectorTileServer'
        })
      ],
      id: 'vektorkart'
    });

    const map = new Map({
      basemap: basemap
      // layers: layers
    });

    // const map = new WebMap({
    //   portalItem: {
    //     id: 'aa1d3f80270146208328cf66d022e09c'
    //   }
    // });

    const view = new MapView({
      map,
      container
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

    this.mapView = view;
    this.mapView
      .when(() => {
        this.loading = false;
      })
      .catch((reason) => {
        this.logger.log(`Error in initializeMap due to ${reason}`);
      });
  }

  componentIsActive(isActive: boolean) {
    this.isActive.next(isActive);
  }
}
