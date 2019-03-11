import * as L from 'leaflet';
import { settings } from '../../../../../settings';
import { NgZone } from '@angular/core';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { RegObsMapOption } from './regobs-map-option';
import { DataUrlHelper } from '../../../../core/helpers/data-url.helper';

interface ExtendedCoords extends L.Coords {
    fallback: boolean;
}

class RegObsTile extends HTMLImageElement {
    originalCoords?: ExtendedCoords;
    currentCoords?: ExtendedCoords;
    originalSrc: string;
    hasTriedOffline: boolean;
    fallbackZoom?: number;
    fallbackScale?: number;
    constructor() {
        super();
    }
}

export class RegObsTileLayer extends L.TileLayer {

    constructor(
        private zone: NgZone,
        private offlineMapService: OfflineMapService,
        private bufferOffline: boolean,
        private url: string,
        private name: string,
        private bounds: L.LatLngBounds,
    ) {
        super(url, {
            minZoom: settings.map.tiles.minZoom,
            maxZoom: settings.map.tiles.maxZoom,
            bounds: bounds,
        });
    }

    createTile(coords: ExtendedCoords, done: L.DoneCallback): HTMLElement {
        return this.zone.runOutsideAngular(() => {
            const tile = new Image() as RegObsTile;

            L.DomEvent.on(tile, 'load', L.Util.bind((<any>this)._tileOnLoad, this, done, tile));
            L.DomEvent.on(tile, 'error', L.Util.bind((<any>this)._tileOnError, this, done, tile));

            tile.crossOrigin = 'anonymous';
            tile.alt = '';
            tile.originalCoords = coords;

            tile.setAttribute('role', 'presentation');

            // (<any>this).getTileUrl(coords).then((result) => {
            //     tile.src = result.url;
            //     tile.id = result.id;
            //     tile.originalSrc = tile.src;
            // });
            const url = (<any>this).getTileUrl(coords);
            tile.src = url;
            tile.originalSrc = url;
            // tile.id = `${map.name}_${coords.z}_${coords.x}_${coords.y}`;

            return tile;
        });
    }

    // private getOriginalTileUrl(coords: L.Coords, urlTemplate: string): string {
    //     const data = {
    //         r: L.Browser.retina ? '@2x' : '',
    //         s: (<any>this)._getSubdomain(coords),
    //         x: coords.x,
    //         y: coords.y,
    //         z: coords.z,
    //     };
    //     return L.Util.template(urlTemplate, L.Util.extend(data, this.options));
    // }

    // async getTileUrl(coords: ExtendedCoords): Promise<{ id: string, url: string }> {
    //     for (const map of this.tileOptions) {
    //         const id = `${map.name}_${coords.z}_${coords.x}_${coords.y}`;
    //         let valid = true;
    //         if (map.validFunc) {
    //             valid = await Promise.resolve(map.validFunc(coords, (<any>this)._tileCoordsToBounds(coords)));
    //         }
    //         if (valid) {
    //             return { id, url: this.getOriginalTileUrl(coords, map.url) };
    //         }
    //     }
    //     return { id: '', url: this.getBlankUrl() };
    // }

    // private getBlankUrl() {
    //     return '/assets/map/blank.png';
    // }

    _tileOnLoad(done: L.DoneCallback, tile: RegObsTile) {
        // this.saveTileOffline(tile);
        (<any>L.TileLayer.prototype)._tileOnLoad(done, tile);
    }

    private saveTileOffline(tile: RegObsTile) {
        if (this.bufferOffline && tile.id && tile.id !== '' && tile.src.startsWith('http')) {
            const dataUrl = DataUrlHelper.getDataUrlFromImage(tile, 'image/png');
            this.offlineMapService.saveTileDataUrlToDbCache(tile.id, dataUrl);
        }
    }

    _tileOnError(done: L.DoneCallback, tile: RegObsTile, e: Error) {
        if (!tile.hasTriedOffline && tile.id && tile.id !== '') {
            this.offlineMapService.getTileFromDb(tile.id).then((result) => {
                tile.hasTriedOffline = true;
                if (result) {
                    this.fire('tilefallback',
                        {
                            tile: tile,
                            url: tile.originalSrc,
                            urlMissing: tile.src,
                            urlFallback: result.dataUrl
                        });
                } else {
                    (<any>L.TileLayer.prototype)._tileOnError(done, tile, e);
                }
                // } else {
                //     this.tryScaleImage(done, tile, e);
                // }
            });
        }
    }

    // private tryScaleImage(done: L.DoneCallback, tile: RegObsTile, e: Error) {
    //     const originalCoords = tile.originalCoords,
    //         currentCoords: ExtendedCoords = tile.currentCoords = tile.currentCoords || this.createCurrentCoords(originalCoords),
    //         fallbackZoom = tile.fallbackZoom = (tile.fallbackZoom || originalCoords.z) - 1,
    //         scale = tile.fallbackScale = (tile.fallbackScale || 1) * 2,
    //         tileSize = this.getTileSize(),
    //         style = tile.style;

    //     // If no lower zoom tiles are available, fallback to errorTile.
    //     if (fallbackZoom < 1) {
    //         // console.log('Max fallback reached. Return original error handling');
    //         return (<any>L.TileLayer.prototype)._tileOnError(done, tile, e);
    //     }

    //     // Modify tilePoint for replacement img.
    //     currentCoords.z = fallbackZoom;
    //     currentCoords.x = Math.floor(currentCoords.x / 2);
    //     currentCoords.y = Math.floor(currentCoords.y / 2);

    //     // Generate new src path.
    //     this.getTileUrl(currentCoords).then((newUrl) => {
    //         // Zoom replacement img.
    //         style.width = (tileSize.x * scale) + 'px';
    //         style.height = (tileSize.y * scale) + 'px';

    //         // Compute margins to adjust position.
    //         const top = (originalCoords.y - currentCoords.y * scale) * tileSize.y;
    //         style.marginTop = (-top) + 'px';
    //         const left = (originalCoords.x - currentCoords.x * scale) * tileSize.x;
    //         style.marginLeft = (-left) + 'px';

    //         // Crop (clip) image.
    //         // `clip` is deprecated, but browsers support for `clip-path: inset()` is far behind.
    //         // http://caniuse.com/#feat=css-clip-path
    //         style.clip = 'rect(' +
    //             top +
    //             'px ' +
    //             (left + tileSize.x) +
    //             'px ' +
    //             (top + tileSize.y) +
    //             'px ' +
    //             left +
    //             'px)';

    //         tile.src = newUrl.url;

    //         this.fire('tilefallback',
    //             {
    //                 tile: tile,
    //                 url: tile.originalSrc,
    //                 urlMissing: tile.src,
    //                 urlFallback: newUrl
    //             });
    //     });
    // }

    private createCurrentCoords(originalCoords: L.Coords): ExtendedCoords {
        const currentCoords: ExtendedCoords = (<any>this)._wrapCoords(originalCoords);
        currentCoords.fallback = true;
        return currentCoords;
    }

}
