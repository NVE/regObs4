import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { point } from '@turf/turf';
import L from 'leaflet';
import { settings } from '../../../settings';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { map, Subject, switchMap, takeWhile, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MapLayersService, OfflineCapableMapLayersService } from '../static-map-image/static-tiles.service';
import { isPlatform } from '@ionic/angular/standalone';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeafletModule],
  providers: [
    {
      provide: MapLayersService,
      useClass: isPlatform('hybrid') ? OfflineCapableMapLayersService : MapLayersService,
    },
  ],
})
export class MapImageComponent {
  private mapLayers = inject(MapLayersService);

  readonly geojson = input.required<L.GeoJSON>();

  settings = computed(() => {
    if (!this.geojson()) {
      return;
    }

    const center = this.geojson().getBounds().getCenter();
    const feature = point([center.lng, center.lat]);
    const layersConfig = this.mapLayers.getMapLayerForLocation(feature);
    const layers = layersConfig.map((x) =>
      L.tileLayer(x.layerConfig.url, {
        minZoom: settings.map.tiles.minZoom,
        maxZoom: settings.map.tiles.maxZoom,
        updateWhenIdle: settings.map.tiles.updateWhenIdle,
        ...x.layerConfig.options,
      })
    );

    const mapSettings: L.MapOptions = {
      zoom: settings.map.tiles.zoomLevelObservationList,
      maxZoom: settings.map.tiles.maxZoom,
      minZoom: 8,
      bounceAtZoomLimits: false,
      attributionControl: false,
      zoomControl: false,
      // trackResize: false,
      center,
      layers,
    };
    return mapSettings;
  });

  private map$ = new Subject<L.Map>();

  constructor() {
    this.invalidateSize();
  }

  // Når denne komponenten initieres i en modal, er ikke høyden og bredden på containeren riktig fra starten.
  // Kartet tegnes derfor ikke riktig opp.
  // invalidateSize sier fra til leaflet at containeren er forandret og at kartet bør tegnes på nytt.
  // Metoden starter en timer så fort kartet er klart som kaller invalidateSize 10 ganger med 50 ms mellomrom.
  private invalidateSize() {
    let counter = 10;
    this.map$
      .pipe(
        takeUntilDestroyed(),
        switchMap((leafletMap) => timer(0, 50).pipe(map(() => leafletMap))),
        tap(() => counter--),
        takeWhile(() => counter > 0)
      )
      .subscribe((map) => map.invalidateSize({ debounceMoveend: true, noMoveStart: true, animate: false }));
  }

  onLeafletMapReady(map: L.Map) {
    this.map$.next(map);
    if (this.geojson()) {
      this.geojson().addTo(map);
    }
  }
}
