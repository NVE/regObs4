/**
 * This code was added to the project as a workaround for bug, see
 * https://nveprojects.atlassian.net/browse/RO-2083.
 * The bug is in webkit, when webkit has been fixed, this code can be removed.
 *
 * Some of this code has been copied and modified from
 * https://observablehq.com/@mourner/simple-web-map created by Vladimir Agafonkin.
 *
 * Copyright 2020 Vladimir Agafonkin
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  inject,
  viewChild,
  input,
  signal,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  interval,
  map,
  race,
  ReplaySubject,
  share,
  skipWhile,
  Subject,
  takeUntil,
} from 'rxjs';
import { settings } from '../../../settings';
import { RegobsGeoHazardMarker } from '../map/core/classes/regobs-geohazard-marker';
import { ITopoMapLayerOptions } from 'src/settings.model';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { isPlatform } from '@ionic/angular/standalone';
import { MapLayersService, OfflineCapableMapLayersService } from './static-tiles.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { LoggingService } from '../shared/services/logging/logging.service';
import { CRS, latLngBounds, LatLng, LatLngBounds } from 'leaflet';
import type { Feature, FeatureCollection, Geometry, Point, Polygon } from 'geojson';
import type { GeoHazard } from 'src/app/modules/common-core/models';
import {
  END_ICON,
  START_ICON,
} from 'src/app/components/observation/observation-location-map/observation-location-map.component';

/**
 * Element in static map, either a tile or a graphic
 */
interface MapElement {
  /**
   * Position in pixels from top
   */
  top: number;

  /**
   * Position in pixels from left
   */
  left: number;
}

interface TileProps extends MapElement {
  /**
   * Map tile img src
   */
  src: SafeUrl;
}

interface Graphic extends MapElement {
  /**
   * Id used for change detection tracking in for loop
   */
  id: string;

  /**
   * Svg to display in map
   */
  svg: SafeHtml;
}

// We only have map services with 256px tiles at the moment.
const TILE_SIZE = 256;
const PADDING = 15;
const SVG_PADDING = 20;
interface PositionToPlot {
  pos: LatLng;
  type: 'start' | 'stop' | 'damage' | 'obs';
  px?: { x: number; y: number };
}

interface PolygonsToPlot {
  totalPolygon?: LatLng[];
  startPolygon?: LatLng[];
  endPolygon?: LatLng[];
}

// n, s, e, w in pixels from top left of world
interface MercatorBounds {
  n: number;
  s: number;
  e: number;
  w: number;
  zoom: number;
}
interface PixelPoint {
  x: number;
  y: number;
}

const createGeojsonBounds = ({
  minLng,
  minLat,
  maxLng,
  maxLat,
}: {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}): Feature<Polygon> => ({
  type: 'Feature',
  properties: {},
  bbox: [minLng, minLat, maxLng, maxLat],
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [minLng, minLat],
        [maxLng, minLat],
        [maxLng, maxLat],
        [minLng, maxLat],
        [minLng, minLat],
      ],
    ],
  },
});

@Component({
  selector: 'app-static-map-image',
  templateUrl: './static-map-image.component.html',
  styleUrls: ['./static-map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MapLayersService,
      useClass: isPlatform('hybrid') ? OfflineCapableMapLayersService : MapLayersService,
    },
  ],
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class StaticMapImageComponent extends NgDestoryBase implements AfterViewInit {
  private sanitizer = inject(DomSanitizer);
  private mapLayerService = inject(MapLayersService);
  private logger = inject(LoggingService);

  readonly featureCollection = input.required<FeatureCollection<Geometry, { type?: string }>>();
  readonly geoHazard = input.required<GeoHazard>();
  readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  onResize() {
    this.componentCreatedOrResized.next();
  }

  tiles = signal([] as TileProps[]);
  graphics = signal([] as Graphic[]);

  private componentCreatedOrResized = new Subject<void>();
  private size = new ReplaySubject<{ w: number; h: number }>(1);
  size$ = this.size.pipe(
    // NB! The debounceTime here must be lower than the interval time
    // specified in startSizeFinder, if not this may not emit.
    debounceTime(50),
    skipWhile(({ w, h }) => w === 0 || h === 0),
    map(({ w, h }) => ({
      w: w.toFixed(0),
      h: h.toFixed(0),
    })),
    distinctUntilChanged((prev, curr) => prev.h === curr.h && prev.w === curr.w),
    map(({ w, h }) => ({ w: +w, h: +h })),
    share()
  );

  constructor() {
    super();

    this.componentCreatedOrResized
      .pipe(
        takeUntil(this.ngDestroy$),
        // Use a large debounceTime. If the user is resizing the window, we want to recreate the
        // map after resizing is finished.
        debounceTime(500)
      )
      .subscribe(() => this.updateContainerSize());

    this.size$.pipe(takeUntil(this.ngDestroy$)).subscribe(({ w, h }) => this.createMap(w, h));
  }

  ngAfterViewInit(): void {
    // Create map after view has been initialized, we need the component to be in the dom
    // to figure out the container size
    this.startSizeFinder();
  }

  private getTileProperties(
    mapId: string,
    config: ITopoMapLayerOptions,
    { w: x0, n: y0, zoom }: MercatorBounds, // x0, y0 = top left corner of map
    w: number, // Map width
    h: number, // Map height
    tileSize: number
  ): TileProps[] {
    const result: TileProps[] = [];
    const cornerTileX = Math.floor(x0 / tileSize);
    const cornerTileY = Math.floor(y0 / tileSize);

    for (let tileY = cornerTileY; tileY * tileSize < y0 + h; tileY++) {
      for (let tileX = cornerTileX; tileX * tileSize < x0 + w; tileX++) {
        const url = this.mapLayerService.getUrlForTile(mapId, config, tileX, tileY, zoom);

        result.push({
          src: this.sanitizer.bypassSecurityTrustUrl(url),
          left: tileX * tileSize - x0,
          top: tileY * tileSize - y0,
        });
      }
    }

    return result;
  }

  private getStartZoom() {
    // If start / stop avalanche or an extent polygon should be plotted, start more zoomed in.
    const features = this.featureCollection().features;
    const types = features.map((f) => (f.properties as { type?: string } | undefined)?.type);
    const hasStart = types.includes('AvalancheStart');
    const hasStop = types.includes('AvalancheStop');
    const hasExtent =
      types.includes('AvalancheExtent') ||
      types.includes('AvalancheExtentStart') ||
      types.includes('AvalancheExtentStop') ||
      types.includes('WaterLevelExtent');

    if ((hasStart && hasStop) || hasExtent) {
      return 14;
    }
    return settings.map.tiles.zoomLevelObservationList;
  }
  private getMercatorBounds(
    bounds: LatLngBounds,
    width: number, // Map width in px
    height: number // Map height in px
  ): MercatorBounds {
    let zoom = this.getStartZoom();

    let n = 0;
    let s = 0;
    let e = 0;
    let w = 0;
    let diffWidth = 0;
    let diffHeight = 0;
    let boundsWidth = 0;
    let boundsHeight = 0;
    while (zoom) {
      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();

      const northWestPoint = CRS.EPSG3857.latLngToPoint(northWest, zoom);
      const southEastPoint = CRS.EPSG3857.latLngToPoint(southEast, zoom);

      w = northWestPoint.x;
      n = northWestPoint.y;
      e = southEastPoint.x;
      s = southEastPoint.y;

      boundsHeight = s - n + PADDING * 2;
      boundsWidth = e - w + PADDING * 2;
      diffWidth = width - boundsWidth;
      diffHeight = height - boundsHeight;

      if (diffWidth > 0 && diffHeight > 0) {
        break;
      }

      zoom = zoom - 1;
    }

    n = n - diffHeight / 2 - PADDING;
    s = s + diffHeight / 2;
    w = w - diffWidth / 2 - PADDING;
    e = e + diffWidth / 2;

    return { zoom, n, s, e, w };
  }

  private getDataFromGeojson(): { positions: PositionToPlot[]; polygons: PolygonsToPlot } {
    const positions: PositionToPlot[] = [];
    const polygons: PolygonsToPlot = {};

    for (const feature of this.featureCollection().features) {
      const type = (feature.properties as { type?: string } | undefined)?.type;

      if (feature.geometry.type === 'Point') {
        const [lng, lat] = (feature.geometry as Point).coordinates;
        const pos = new LatLng(lat, lng);

        if (type === 'ObsLocation') {
          positions.push({ pos, type: 'obs' });
        } else if (type === 'AvalancheStart') {
          positions.push({ pos, type: 'start' });
        } else if (type === 'AvalancheStop') {
          positions.push({ pos, type: 'stop' });
        } else if (type === 'DamagePos') {
          positions.push({ pos, type: 'damage' });
        }
      } else if (feature.geometry.type === 'Polygon') {
        const coords = (feature.geometry as Polygon).coordinates[0] ?? [];
        const ring = coords.map(([lng, lat]) => new LatLng(lat, lng));

        if (type === 'AvalancheExtent' || type === 'WaterLevelExtent') {
          polygons.totalPolygon = ring;
        } else if (type === 'AvalancheExtentStart') {
          polygons.startPolygon = ring;
        } else if (type === 'AvalancheExtentStop') {
          polygons.endPolygon = ring;
        }
      }
    }

    return { positions, polygons };
  }

  private createMap(w: number, h: number) {
    const { positions, polygons } = this.getDataFromGeojson();
    //add all positions together to find max and min latlng
    const positionsDestructured = positions.map((p) => p.pos);
    const positionsAndPolygonsLatLngs = [
      ...positionsDestructured,
      ...(polygons.totalPolygon ? polygons.totalPolygon : []),
      ...(polygons.startPolygon ? polygons.startPolygon : []),
      ...(polygons.endPolygon ? polygons.endPolygon : []),
    ];

    if (!positionsAndPolygonsLatLngs.length) {
      this.logger.debug('no positions or polygons to plot', 'StaticMapImage');
      return;
    }

    const bounds = latLngBounds(positionsAndPolygonsLatLngs);
    const geojsonBounds = createGeojsonBounds({
      minLng: bounds.getWest(),
      minLat: bounds.getSouth(),
      maxLng: bounds.getEast(),
      maxLat: bounds.getNorth(),
    });

    const mapLayers = this.mapLayerService.getMapLayerForLocation(geojsonBounds);
    const mercatorBounds = this.getMercatorBounds(bounds, w, h);

    // Map tiles
    this.tiles.set(
      mapLayers
        .map(({ layerId, layerConfig }) =>
          this.getTileProperties(layerId, layerConfig, mercatorBounds, w, h, TILE_SIZE)
        )
        .flat()
    );

    this.createGraphics(positions, polygons, mercatorBounds);
  }

  private createGraphics(
    positions: PositionToPlot[],
    polygons: PolygonsToPlot,
    { w: worldX0, n: worldY0, zoom }: MercatorBounds
  ) {
    // Reset map graphics
    this.graphics.set([]);
    let start = null;
    let stop = null;
    let obsMarker: { topPx: number; leftPx: number } | null = null;
    for (const { pos, type } of positions) {
      const point = CRS.EPSG3857.latLngToPoint(pos, zoom);
      const topPx = point.y - worldY0;
      const leftPx = point.x - worldX0;

      if (type === 'obs') {
        obsMarker = { topPx, leftPx };
      } else if (type === 'start') {
        this.createStartGraphic(topPx, leftPx);
        start = { x: point.x, y: point.y };
      } else if (type === 'stop') {
        this.createStopGraphic(topPx, leftPx);
        stop = { x: point.x, y: point.y };
      } else if (type === 'damage') {
        this.createDamageGraphic();
      } else {
        throw new Error('Type not implemented');
      }
    }

    if (start && stop) {
      this.createStartStopLine(start, stop, worldX0, worldY0);
    }
    if (polygons.totalPolygon) {
      this.createPolygons(polygons.totalPolygon, worldX0, worldY0, zoom, '#3344bb', 'total');
    }
    if (polygons.startPolygon) {
      this.createPolygons(polygons.startPolygon, worldX0, worldY0, zoom, '#33bb44', 'start');
    }
    if (polygons.endPolygon) {
      this.createPolygons(polygons.endPolygon, worldX0, worldY0, zoom, '#bb3344', 'end');
    }

    // Draw ObsLocation marker last so it appears on top
    if (obsMarker) {
      this.createCenterMarker(obsMarker.topPx, obsMarker.leftPx);
    }
  }

  private createPolygons(
    polygon: LatLng[],
    mapWorldX0: number,
    mapWorldY0: number,
    zoom: number,
    fill: string,
    id: string
  ) {
    if (!polygon.length) {
      return;
    }

    const pixelPoints: PixelPoint[] = polygon.map((vertex) => {
      const point = CRS.EPSG3857.latLngToPoint(vertex, zoom);
      return { x: point.x, y: point.y };
    });

    // Close the polygon by repeating the first point at the end
    pixelPoints.push({ ...pixelPoints[0] });

    const xs = pixelPoints.map((p) => p.x);
    const ys = pixelPoints.map((p) => p.y);

    const minX = Math.min(...xs) - SVG_PADDING;
    const minY = Math.min(...ys) - SVG_PADDING;
    const maxX = Math.max(...xs) + SVG_PADDING;
    const maxY = Math.max(...ys) + SVG_PADDING;

    const width = maxX - minX;
    const height = maxY - minY;

    const pointsAttribute = pixelPoints.map((p) => `${p.x - minX},${p.y - minY}`).join(' ');

    this.graphics.update((graphics) => [
      {
        id: `polygon-${id}`,
        svg: this.sanitizer.bypassSecurityTrustHtml(`
      <svg pointer-events="none" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <polyline points="${pointsAttribute}"
          stroke="${fill}"
          stroke-opacity="1"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="${fill}"
          fill-opacity="0.2"
          fill-rule="evenodd" />
      </svg>`),
        left: minX - mapWorldX0,
        top: minY - mapWorldY0,
      },
      ...graphics,
    ]);
  }

  private createCenterMarker(topPx: number, leftPx: number) {
    const svg = this.sanitizer.bypassSecurityTrustHtml(RegobsGeoHazardMarker.getIconSvg(this.geoHazard()));
    // TODO: Can we extract width and height from svg?
    const svgWidth = 26;
    const svgHeight = 37;
    const style = { left: leftPx - svgWidth / 2, top: topPx - svgHeight };

    this.graphics.update((graphics) => [...graphics, { svg, ...style, id: 'centerMarker' }]);
  }

  private createStartGraphic(topPx: number, leftPx: number) {
    const w = 18;
    const h = 28;

    this.graphics.update((graphics) => [
      ...graphics,
      {
        id: 'start',
        svg: `<img src="${START_ICON}">`,
        left: leftPx - w / 2,
        top: topPx - h,
      },
    ]);
  }
  private createStopGraphic(topPx: number, leftPx: number) {
    const w = 18;
    const h = 28;

    this.graphics.update((graphics) => [
      ...graphics,
      {
        id: 'stop',
        svg: `<img src="${END_ICON}">`,
        left: leftPx - w / 2,
        top: topPx - h,
      },
    ]);
  }

  private createStartStopLine(start: { x: number; y: number }, stop: { x: number; y: number }, x0: number, y0: number) {
    const svg_x0 = Math.min(start.x, stop.x) - SVG_PADDING;
    const svg_y0 = Math.min(start.y, stop.y) - SVG_PADDING;
    const w = Math.ceil(Math.abs(start.x - stop.x)) + SVG_PADDING * 2;
    const h = Math.ceil(Math.abs(start.y - stop.y)) + SVG_PADDING * 2;

    this.graphics.update((graphics) => [
      {
        id: 'start-stop-line',
        // width and height on svg?
        svg: this.sanitizer.bypassSecurityTrustHtml(`
      <svg pointer-events="none" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
        <path
          stroke="red"
          stroke-opacity="0.9"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          d="M${start.x - svg_x0} ${start.y - svg_y0}L${stop.x - svg_x0} ${stop.y - svg_y0}"></path>
      </svg>`),
        left: svg_x0 - x0,
        top: svg_y0 - y0,
      },
      ...graphics,
    ]);
  }

  private createDamageGraphic() {
    this.logger.debug('WARNING! Damage graphics not implemented in obs card');
  }

  private updateContainerSize() {
    const { width: w, height: h } = this.container().nativeElement.getBoundingClientRect();
    this.size.next({ w, h });
  }

  private startSizeFinder() {
    // Read map container size
    interval(500)
      .pipe(
        // When we have a valid size emitted on size$, stop the interval
        takeUntil(race(this.size$, this.ngDestroy$))
      )
      .subscribe(() => this.updateContainerSize());
  }
}
