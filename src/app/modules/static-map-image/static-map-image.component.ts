/**
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
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
  TrackByFunction,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImageLocation } from '../../components/img-swiper/image-location.model';
import { settings } from '../../../settings';
import { RegobsGeoHazardMarker } from '../map/core/classes/regobs-geohazard-marker';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { ITopoMapLayerOptions } from 'src/settings.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


interface TileProps {
  src: string;
  top: string;
  left: string;
}

interface Graphic {
  svg: SafeHtml;
  style: { [styleDesc: string]: number; };
}

const getTileProps = (
  config: ITopoMapLayerOptions,
  x0: number, y0: number, w: number, h: number, z: number,
  tileSize: number
): TileProps[] => {
  const result: TileProps[] = [];
  const cornerTileX = Math.floor(x0 / tileSize);
  const cornerTileY = Math.floor(y0 / tileSize);


  for (let tileY = cornerTileY; tileY * tileSize < y0 + h; tileY++) {
    for (let tileX = cornerTileX; tileX * tileSize < x0 + w; tileX++) {

      const url = config.url
        .replace("{x}", tileX.toString())
        .replace("{y}", tileY.toString())
        .replace("{z}", z.toString());

      result.push({
        src: url,
        left: `${tileX * tileSize - x0}px`,
        top: `${tileY * tileSize - y0}px`
      });
    }
  }

  return result;
}

const trackByImgProps: TrackByFunction<TileProps> = (index, item) => {
  return item.src;
};


// TODO: Retina map -> userSetting.useRetinaMap

@Component({
  selector: 'app-static-map-image',
  templateUrl: './static-map-image.component.html',
  styleUrls: ['./static-map-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticMapImageComponent implements OnDestroy, AfterViewInit {

  @Input() location: ImageLocation;
  @Input() allowZoom: boolean;

  @ViewChild('container', {static: true})
  container: ElementRef<HTMLDivElement>;

  tiles: TileProps[];
  graphics: Graphic[] = [];
  private getSizeInterval;

  get trackByImgProps() {
    return trackByImgProps;
  }

  constructor(
    private userSettingService: UserSettingService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  private getSize(): Promise<{w: number; h: number}> {
    // Sometimes the size is 0 if the component is hidden right after init.
    // Use an interval to ask for the container size repeatadly until we have a valid size.

    if (this.getSizeInterval) {
      throw new Error('Already getting size');
    }

    return new Promise((resolve) => {
      this.getSizeInterval = setInterval(() => {
        if (this.container?.nativeElement) {
          const { width: w, height: h } = this.container.nativeElement.getBoundingClientRect();

          if (w && h) {
            // We have a valid size, stop interval and return
            clearInterval(this.getSizeInterval);
            this.getSizeInterval = null;
            resolve({ w, h});
          }
        }
      }, 50);
    });
  }

  private async createMap() {
    const { w, h } = await this.getSize();
    const z = settings.map.tiles.zoomLevelObservationList;  // Zoom level
    // TODO: Do we need to support other tile sizes, what about retina map?
    const tileSize = 256;
    const tilesAcross = Math.pow(2, z);
    const worldSize = tileSize * tilesAcross;
    const { lng, lat } = this.location.latLng;

    // Mercator coordinates for provided location
    const x = worldSize * (lng / 360 + 0.5);
    const y = worldSize * (1 - Math.log(Math.tan(Math.PI * (0.25 + lat / 360))) / Math.PI) / 2;

    const x0 = Math.floor(x - w / 2);  // Mercator x for top left corner of map
    const y0 = Math.floor(y - h / 2);  // Mercator y for top left corner of map

    // Get config and properties for map tiles
    const { topoMap } = await firstValueFrom(this.userSettingService.userSetting$)
    const mapConfig = settings.map.tiles.topoMaps[topoMap];
    this.tiles = mapConfig
      .map((topoMap) => settings.map.tiles.topoMapLayers[topoMap.layer])
      // TODO: Remove map layers we should not show, use excludeBounds maybe?
      // TODO: Include layers from offline maps if possible
      .sort((a, b) => a.options.zIndex - b.options.zIndex)
      .map(mapLayer => getTileProps(mapLayer, x0, y0, w, h, z, tileSize))
      .flat();

    // Create markers
    // TODO: Create other markers, start stop avalanche etc
    const svg = this.sanitizer.bypassSecurityTrustHtml(RegobsGeoHazardMarker.getIconSvg(this.location.geoHazard));
    // TODO: Can we extract width and height from svg?
    const svgWidth = 26;
    const svgHeight = 37;
    const style = {'left.px': x - x0 - svgWidth / 2, 'top.px': y - y0 - svgHeight};
    this.graphics.push({ svg, style });

    // Async operation, so we must notify angular that changes has occured
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    // Create map after view has been initialized, we need the component to be in the dom
    // to figure out the container size
    this.createMap();
  }


  ngOnDestroy(): void {
    // Clear get size interval if component is destroyed while interval is running
    if (this.getSizeInterval) {
      clearInterval(this.getSizeInterval);
    }
  }

}
