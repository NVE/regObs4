import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { point } from '@turf/turf';
import L from 'leaflet';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../settings';
import { ImageLocation, ImageLocationStartStop } from '../../core/models/image-location.model';
import { RegobsGeoHazardMarker } from '../map/core/classes/regobs-geohazard-marker';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { TranslateService } from '@ngx-translate/core';
import { map, Subject, switchMap, takeWhile, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MapLayersService, OfflineCapableMapLayersService } from '../static-map-image/static-tiles.service';
import { isPlatform } from '@ionic/angular/standalone';

export const START_ICON = '/assets/icon/map/GPS_start.svg';
export const END_ICON = '/assets/icon/map/GPS_stop.svg';
export const DAMAGE_ICON = '/assets/icon/map/damage-location.svg';

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
  private translations = inject(TranslateService);
  private mapLayers = inject(MapLayersService);

  readonly locationInfo = input<ImageLocation>();

  settings = computed(() => {
    const loc = this.locationInfo();

    if (!loc) return undefined;

    const feature = point([loc.latLng.lng, loc.latLng.lat]);
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
      center: loc.latLng,
      layers,
    };
    return mapSettings;
  });

  markers = computed(() => {
    const markers: L.Layer[] = [];
    const locationInfo = this.locationInfo();
    if (locationInfo?.latLng) {
      markers.push(createObsLocationMarker(locationInfo.latLng, locationInfo.geoHazard));
    }

    if (locationInfo?.startStopLocation) {
      markers.push(
        ...createStartStopMarkers(locationInfo.startStopLocation, locationInfo.geoHazard, this.translations)
      );
    }

    if (locationInfo?.damageLocations) {
      markers.push(...createDamageLocationMarkers(locationInfo.damageLocations));
    }

    return markers;
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
  }
}

function createObsLocationMarker(pos: L.LatLng, geoHazard: GeoHazard) {
  return L.marker(pos, {
    icon: new RegobsGeoHazardMarker(geoHazard),
    interactive: false,
  });
}

function createStartStopIcon(iconUrl: string) {
  return L.icon({
    iconUrl,
    iconSize: [27, 42],
    iconAnchor: [13.5, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
}

function createStartStopMarkers(
  location: ImageLocationStartStop,
  geoHazard: GeoHazard,
  translations: TranslateService
): L.Layer[] {
  const markers = [];

  if (location.start) {
    markers.push(
      L.marker(location.start, {
        icon: createStartStopIcon(START_ICON),
        interactive: false,
      })
    );
  }

  if (location.stop) {
    markers.push(
      L.marker(location.stop, {
        icon: createStartStopIcon(END_ICON),
        interactive: false,
      })
    );
  }

  if (location.start && location.stop) {
    markers.push(
      L.polyline([location.start, location.stop], {
        color: 'red',
        weight: 6,
        opacity: 0.9,
        interactive: false,
      })
    );
  }

  if (location.totalPolygon) {
    let label = '';
    switch (geoHazard) {
      case GeoHazard.Snow:
        label = translations.instant('REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_AREA');
        break;
      case GeoHazard.Soil:
        label = translations.instant('REGISTRATION.DIRT.LAND_SLIDE_OBS.AREA_TOTAL');
        break;
      case GeoHazard.Water:
        label = translations.instant('REGISTRATION.WATER.WATER_LEVEL.FLOOD_AREA');
        break;
    }
    markers.push(location.totalPolygon.bindTooltip(label));
  }

  if (location.startPolygon) {
    const label = translations.instant('REGISTRATION.SNOW.AVALANCHE_OBS.AREA_START');
    markers.push(location.startPolygon.bindTooltip(label));
  }

  if (location.endPolygon) {
    const label = translations.instant('REGISTRATION.SNOW.AVALANCHE_OBS.AREA_END');
    markers.push(location.endPolygon.bindTooltip(label));
  }

  return markers;
}

function createDamageIcon() {
  return L.icon({
    iconUrl: DAMAGE_ICON,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
}

function createDamageLocationMarkers(locations: L.LatLng[]): L.Layer[] {
  const graphics: L.Layer[] = [];

  if (locations && locations.length > 0) {
    for (const location of locations) {
      graphics.push(
        L.marker(location, {
          icon: createDamageIcon(),
          interactive: false,
        })
      );
    }
  }

  return graphics;
}
