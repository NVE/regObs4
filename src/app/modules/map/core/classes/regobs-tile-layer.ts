import * as L from 'leaflet';
import { settings } from '../../../../../settings';
import { NgZone } from '@angular/core';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { RegObsMapOption } from './regobs-map-option';

interface ExtendedCoords extends L.Coords {
    fallback: boolean;
}

class RegObsTile extends HTMLImageElement {
    originalCoords?: ExtendedCoords;
    currentCoords?: ExtendedCoords;
    originalSrc: string;
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
        private tileOptions: RegObsMapOption[]
    ) {
        super(tileOptions[0].url, {
            minZoom: settings.map.tiles.minZoom,
            maxZoom: settings.map.tiles.maxZoom,
        });
    }

    createTile(coords: ExtendedCoords, done: L.DoneCallback): HTMLElement {
        return this.zone.runOutsideAngular(() => {
            const tile = new Image() as RegObsTile;

            L.DomEvent.on(tile, 'load', L.Util.bind((<any>this)._tileOnLoad, this, done, tile));
            L.DomEvent.on(tile, 'error', L.Util.bind((<any>this)._tileOnError, this, done, tile));

            if (this.options.crossOrigin) {
                tile.crossOrigin = '';
            }

            tile.alt = '';
            tile.originalCoords = coords;

            tile.setAttribute('role', 'presentation');

            this.getTileUrl(coords).then(function (url) {
                tile.src = url;
                tile.originalSrc = tile.src;
            }).catch(function (err) {
                throw err;
            });

            return tile;
        });
    }

    private getOriginalTileUrl(coords: L.Coords, urlTemplate: string): string {
        const data = {
            r: L.Browser.retina ? '@2x' : '',
            s: (<any>this)._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: coords.z,
        };
        return L.Util.template(urlTemplate, L.Util.extend(data, this.options));
    }

    async getTileUrl(coords: ExtendedCoords): Promise<string> {
        for (const map of this.tileOptions) {
            let valid = true;
            if (map.validFunc) {
                valid = await Promise.resolve(map.validFunc(coords, (<any>this)._tileCoordsToBounds(coords)));
            }
            if (valid) {
                if (map.isEmbedded && coords.z >= map.embeddedMinZoom && coords.z <= map.embeddedMaxZoom) {
                    return this.getOriginalTileUrl(coords, map.embeddedUrl);
                } else if (!this.bufferOffline) {
                    return this.getOriginalTileUrl(coords, map.url);
                } else {
                    const offlineUrl = await this.offlineMapService.getTileUrl(map.name, coords.x, coords.y, coords.z);
                    if (offlineUrl) {
                        return offlineUrl;
                    } else {
                        const url = this.getOriginalTileUrl(coords, map.url);
                        this.offlineMapService.saveTileAsBlob(map.name, coords.x, coords.y, coords.z, url);
                        return url;
                    }
                }
            }
        }
        return this.getBlankUrl();
    }

    private getBlankUrl() {
        return '/assets/map/blank.png';
    }

    _tileOnError(done: L.DoneCallback, tile: RegObsTile, e: Error) {
        const originalCoords = tile.originalCoords,
            currentCoords: ExtendedCoords = tile.currentCoords = tile.currentCoords || this.createCurrentCoords(originalCoords),
            fallbackZoom = tile.fallbackZoom = (tile.fallbackZoom || originalCoords.z) - 1,
            scale = tile.fallbackScale = (tile.fallbackScale || 1) * 2,
            tileSize = this.getTileSize(),
            style = tile.style;

        // TODO: Check if tile url is local cahced file://, then fallback to original url

        // If no lower zoom tiles are available, fallback to errorTile.
        if (fallbackZoom < 1) {
            // console.log('Max fallback reached. Return original error handling');
            return (<any>L.TileLayer.prototype)._tileOnError(done, tile, e);
        }

        // Modify tilePoint for replacement img.
        currentCoords.z = fallbackZoom;
        currentCoords.x = Math.floor(currentCoords.x / 2);
        currentCoords.y = Math.floor(currentCoords.y / 2);

        // Generate new src path.
        this.getTileUrl(currentCoords).then((newUrl) => {
            // tslint:disable-next-line:max-line-length
            // console.log('Fallback to next zoom level: ' + fallbackZoom + ' for zoom: ' + originalCoords.z + ' original: ' + JSON.stringify(originalCoords) + ' new coords: ' + JSON.stringify(currentCoords));
            // console.log('New url: ' + newUrl);
            // Zoom replacement img.
            style.width = (tileSize.x * scale) + 'px';
            style.height = (tileSize.y * scale) + 'px';

            // Compute margins to adjust position.
            const top = (originalCoords.y - currentCoords.y * scale) * tileSize.y;
            style.marginTop = (-top) + 'px';
            const left = (originalCoords.x - currentCoords.x * scale) * tileSize.x;
            style.marginLeft = (-left) + 'px';

            // Crop (clip) image.
            // `clip` is deprecated, but browsers support for `clip-path: inset()` is far behind.
            // http://caniuse.com/#feat=css-clip-path
            style.clip = 'rect(' +
                top +
                'px ' +
                (left + tileSize.x) +
                'px ' +
                (top + tileSize.y) +
                'px ' +
                left +
                'px)';

            tile.src = newUrl;

            this.fire('tilefallback',
                {
                    tile: tile,
                    url: tile.originalSrc,
                    urlMissing: tile.src,
                    urlFallback: newUrl
                });
        });
    }

    private createCurrentCoords(originalCoords: L.Coords): ExtendedCoords {
        const currentCoords: ExtendedCoords = (<any>this)._wrapCoords(originalCoords);
        currentCoords.fallback = true;
        return currentCoords;
    }

}
