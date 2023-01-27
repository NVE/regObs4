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
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
  TrackByFunction,
  HostListener,
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
import { ImageLocation } from '../../components/img-swiper/image-location.model';
import { settings } from '../../../settings';
import { RegobsGeoHazardMarker } from '../map/core/classes/regobs-geohazard-marker';
import { ITopoMapLayerOptions } from 'src/settings.model';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { isPlatform } from '@ionic/angular';
import SphericalMercator from '@mapbox/sphericalmercator';
import { MapLayersService, OfflineCapableMapLayersService } from './static-tiles.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { Feature, Polygon } from '@turf/turf';
import { END_ICON, START_ICON } from '../map-image/map-image.component';
import { LoggingService } from '../shared/services/logging/logging.service';

interface TileProps {
  src: SafeUrl;
  top: string;
  left: string;
}

interface Graphic {
  id: string;
  svg: SafeHtml;
  style: { [styleDesc: string]: number };
}

const trackByImgProps: TrackByFunction<TileProps> = (index, item) => item.src;
const trackByGraphic: TrackByFunction<Graphic> = (index, item) => item.id;

// We only have map services with 256px tiles at the moment.
const TILE_SIZE = 256;
const PADDING = 15;

interface PositionToPlot {
  pos: ImageLocation['latLng'];
  type: 'start' | 'stop' | 'damage' | 'obs';
  px?: { x: number; y: number };
}

interface LatLngBounds {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

// n, s, e, w in pixels from top left of world
interface MercatorBounds {
  n: number;
  s: number;
  e: number;
  w: number;
  zoom: number;
}

const createGeojsonBounds = ({ minLng, minLat, maxLng, maxLat }: LatLngBounds): Feature<Polygon> => ({
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
})
export class StaticMapImageComponent extends NgDestoryBase implements AfterViewInit {
  @Input() location: ImageLocation;
  @Input() allowZoom: boolean;

  @ViewChild('container', { static: true })
  container: ElementRef<HTMLDivElement>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.componentCreatedOrResized.next();
  }

  tiles: TileProps[] = null;
  graphics: Graphic[] = [];

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

  get trackByImgProps() {
    return trackByImgProps;
  }

  get trackByGraphic() {
    return trackByGraphic;
  }

  private mercator = new SphericalMercator({ size: TILE_SIZE });

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private mapLayerService: MapLayersService,
    private logger: LoggingService
  ) {
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
          left: `${tileX * tileSize - x0}px`,
          top: `${tileY * tileSize - y0}px`,
        });
      }
    }

    return result;
  }

  private getPositionsToPlot(): PositionToPlot[] {
    // This controls the draw order / z-index for graphics
    const positions = [];
    if (this.location.startStopLocation?.start) {
      positions.push({ pos: this.location.startStopLocation.start, type: 'start' });
    }
    if (this.location.startStopLocation?.stop) {
      positions.push({ pos: this.location.startStopLocation.stop, type: 'stop' });
    }
    if (this.location.damageLocations) {
      positions.push(...this.location.damageLocations.map((pos) => ({ pos, type: 'damage' })));
    }
    if (this.location.latLng) {
      positions.push({ pos: this.location.latLng, type: 'obs' });
    }
    return positions;
  }

  private getStartZoom() {
    // If start / stop avalanche should be plotted, start more zoomed in. If we are zoomed out we cant see the
    // avalanche path.
    if (this.location?.startStopLocation?.start && this.location?.startStopLocation?.stop) {
      return 14;
    }
    return settings.map.tiles.zoomLevelObservationList;
  }

  private getLatLngBounds(positions: PositionToPlot[]): {
    latLngBounds: LatLngBounds;
    geojsonBounds: Feature<Polygon>;
  } {
    const positionsForBoundsCheck = [...positions];
    const { pos } = positionsForBoundsCheck.shift();
    let minLat = pos.lat;
    let maxLat = pos.lat;
    let minLng = pos.lng;
    let maxLng = pos.lng;

    while (positionsForBoundsCheck.length) {
      const { pos } = positionsForBoundsCheck.shift();
      minLat = pos.lat < minLat ? pos.lat : minLat;
      maxLat = pos.lat > maxLat ? pos.lat : maxLat;
      minLng = pos.lng < minLng ? pos.lng : minLng;
      maxLng = pos.lng > maxLng ? pos.lng : maxLng;
    }

    const latLngBounds = { minLat, minLng, maxLat, maxLng };
    const geojsonBounds = createGeojsonBounds(latLngBounds);

    return { latLngBounds, geojsonBounds };
  }

  private getMercatorBounds(
    { minLat, maxLat, minLng, maxLng }: LatLngBounds,
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
      [w, n] = this.mercator.px([minLng, maxLat], zoom);
      [e, s] = this.mercator.px([maxLng, minLat], zoom);

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

  private async createMap(w: number, h: number) {
    const positions = this.getPositionsToPlot();
    const { latLngBounds, geojsonBounds } = this.getLatLngBounds(positions);
    const mapLayers = await this.mapLayerService.getMapLayerForLocation(geojsonBounds);
    const mercatorBounds = this.getMercatorBounds(latLngBounds, w, h);

    // Map tiles
    this.tiles = mapLayers
      .map(({ layerId, layerConfig }) => this.getTileProperties(layerId, layerConfig, mercatorBounds, w, h, TILE_SIZE))
      .flat();

    this.createGraphics(positions, mercatorBounds);

    this.cdr.detectChanges(); // Async operation, so we must notify angular that changes has occured
  }

  private createGraphics(positions: PositionToPlot[], { w: x0, n: y0, zoom }: MercatorBounds) {
    // Reset map graphics
    this.graphics = [];
    let start = null;
    let stop = null;
    for (const { pos, type } of positions) {
      const [x, y] = this.mercator.px([pos.lng, pos.lat], zoom);
      const topPx = y - y0;
      const leftPx = x - x0;

      if (type === 'obs') {
        this.createCenterMarker(topPx, leftPx);
      } else if (type === 'start') {
        this.createStartGraphic(topPx, leftPx);
        start = { x, y };
      } else if (type === 'stop') {
        this.createStopGraphic(topPx, leftPx);
        stop = { x, y };
      } else if (type === 'damage') {
        this.createDamageGraphic(topPx, leftPx);
      } else {
        throw new Error('Type not implemented');
      }
    }

    if (start && stop) {
      this.createStartStopLine(start, stop, x0, y0);
    }
  }

  private createCenterMarker(topPx: number, leftPx: number) {
    const svg = this.sanitizer.bypassSecurityTrustHtml(RegobsGeoHazardMarker.getIconSvg(this.location.geoHazard, false));
    // TODO: Can we extract width and height from svg?
    const svgWidth = 26;
    const svgHeight = 37;
    const style = { 'left.px': leftPx - svgWidth / 2, 'top.px': topPx - svgHeight };
    this.graphics.push({ svg, style, id: 'centerMarker' });
  }

  private createStartGraphic(topPx: number, leftPx: number) {
    const w = 18;
    const h = 28;

    this.graphics.push({
      id: 'start',
      svg: `<img src="${START_ICON}">`,
      style: {
        'left.px': leftPx - w / 2,
        'top.px': topPx - h,
      },
    });
  }
  private createStopGraphic(topPx: number, leftPx: number) {
    const w = 18;
    const h = 28;

    this.graphics.push({
      id: 'start',
      svg: `<img src="${END_ICON}">`,
      style: {
        'left.px': leftPx - w / 2,
        'top.px': topPx - h,
      },
    });
  }

  private createStartStopLine(start: { x: number; y: number }, stop: { x: number; y: number }, x0: number, y0: number) {
    const padding = 20; // px
    const svg_x0 = Math.min(start.x, stop.x) - padding;
    const svg_y0 = Math.min(start.y, stop.y) - padding;
    const w = Math.ceil(Math.abs(start.x - stop.x)) + padding * 2;
    const h = Math.ceil(Math.abs(start.y - stop.y)) + padding * 2;

    this.graphics.unshift({
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
      style: {
        'left.px': svg_x0 - x0,
        'top.px': svg_y0 - y0,
      },
    });
  }

  private createDamageGraphic(topPx: number, leftPx: number) {
    this.logger.debug('WARNING! Damage graphics not implemented in obs card');
  }

  private updateContainerSize() {
    if (this.container?.nativeElement) {
      const { width: w, height: h } = this.container.nativeElement.getBoundingClientRect();
      this.size.next({ w, h });
    }
  }

  private startSizeFinder() {
    // Read map container size
    interval(60)
      .pipe(
        // When we have a valid size emitted on size$, stop the interval
        takeUntil(race(this.size$, this.ngDestroy$, interval(500)))
      )
      .subscribe(() => this.updateContainerSize());
  }
}