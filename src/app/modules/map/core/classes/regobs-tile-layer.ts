import * as L from 'leaflet';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { GeometryObject } from '@turf/turf';

export interface IRegObsTileLayerOptions extends L.TileLayerOptions {
    edgeBufferTiles?: number;
    excludeBounds?: GeometryObject;
    saveTilesToCache?: boolean;
    saveCacheTileFunc?: (id: string, tile: HTMLImageElement) => void | Promise<any>;
    getCacheTileFunc?: (id: string) => Promise<string>;
}

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
}

export class RegObsTileLayer extends L.TileLayer {
    private _url: string;

    constructor(
        private name: string,
        url: string,
        options: IRegObsTileLayerOptions,
    ) {
        super(url, options);
        this._url = url;
    }

    createTile(coords: ExtendedCoords, done: L.DoneCallback): HTMLElement {
        const tile = new Image() as RegObsTile;

        L.DomEvent.on(tile, 'load', L.Util.bind((<any>this).saveTileOffline, this, done, tile));
        L.DomEvent.on(tile, 'error', L.Util.bind((<any>this)._tileOnError, this, done, tile));

        tile.crossOrigin = 'anonymous';
        tile.alt = '';
        tile.originalCoords = coords;

        tile.setAttribute('role', 'presentation');

        const url = (<any>this).getTileUrl(coords);
        tile.src = url;
        tile.originalSrc = url;
        tile.id = this.getTileId(coords);

        return tile;
    }

    private getTileId(coords: ExtendedCoords) {
        return `${this.name}_${coords.z}_${coords.x}_${coords.y}`;
    }

    _tileOnError(done: L.DoneCallback, tile: RegObsTile, e: Error) {
        const opt = (<IRegObsTileLayerOptions>this.options);
        if (!tile.hasTriedOffline && tile.id && tile.id !== '' && opt.getCacheTileFunc) {
            opt.getCacheTileFunc(tile.id).then((result) => {
                tile.hasTriedOffline = true;
                if (result) {
                    const oldSrc = tile.src;
                    tile.src = result;
                    this.fire('tilefallback',
                        {
                            tile: tile,
                            url: tile.originalSrc,
                            urlMissing: oldSrc,
                            urlFallback: result
                        });
                } else {
                    this.tryScaleImage(done, tile, e);
                }
            });
        } else {
            this.tryScaleImage(done, tile, e);
        }
    }

    private saveTileOffline(done: L.DoneCallback, tile: RegObsTile) {
        const opt = (<IRegObsTileLayerOptions>this.options);
        if (opt.saveTilesToCache && opt.saveCacheTileFunc
            && tile && tile.id && tile.id !== '' && tile.src.startsWith('http')) {
            opt.saveCacheTileFunc(`${tile.id}`, tile.cloneNode(true) as HTMLImageElement);
        }
        done(null, tile);
    }


    _pruneTiles() {
        if (!this._map) {
            return;
        }

        let tile;

        if (!this.options.detectRetina) {
            const zoom = this._map.getZoom();
            if (zoom > this.options.maxZoom ||
                zoom < this.options.minZoom) {
                (<any>this)._removeAllTiles();
                return;
            }
        }

        // tslint:disable-next-line:forin
        for (const key in (<any>this)._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
        }

        // tslint:disable-next-line:forin
        for (const key in (<any>this)._tiles) {
            tile = (<any>this)._tiles[key];
            if (tile.current && !tile.active) {
                const coords = tile.coords;
                if (!(<any>this)._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                    (<any>this)._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
            }
        }

        for (const key in (<any>this)._tiles) {
            if (!(<any>this)._tiles[key].retain) {
                (<any>this)._removeTile(key);
            }
        }
    }

    _isValidTile(coords: L.Coords) {
        const valid = (<any>L.GridLayer.prototype)._isValidTile.call(this, coords);
        if (!valid) {
            return false;
        }
        if ((<IRegObsTileLayerOptions>this.options).excludeBounds) {
            const tileBounds = (<any>L.GridLayer.prototype)._tileCoordsToBounds.call(this, coords);
            return !BorderHelper.isInside(tileBounds, (<IRegObsTileLayerOptions>this.options).excludeBounds);
        }
        return true;
    }

    private getNewZoomTileUrl(coords: ExtendedCoords) {
        const data = {
            r: L.Browser.retina ? '@2x' : '',
            s: (<any>L.TileLayer.prototype)._getSubdomain.call(this, coords),
            x: coords.x,
            y: coords.y,
            z: coords.z,
        };
        return L.Util.template(this._url, L.Util.extend(data, this.options));
    }

    private tryScaleImage(done: L.DoneCallback, tile: RegObsTile, e: Error) {
        const originalCoords = tile.originalCoords,
            currentCoords: ExtendedCoords = tile.currentCoords = tile.currentCoords || this.createCurrentCoords(originalCoords),
            fallbackZoom = tile.fallbackZoom = (tile.fallbackZoom || originalCoords.z) - 1,
            scale = tile.fallbackScale = (tile.fallbackScale || 1) * 2,
            tileSize = this.getTileSize(),
            style = tile.style;

        // Only fallback one zoom level or return error
        if (fallbackZoom < (originalCoords.z - 1)) {
            return (<any>L.TileLayer.prototype)._tileOnError.call(this, done, tile, e);
        }

        // Modify tilePoint for replacement img.
        currentCoords.z = fallbackZoom;
        currentCoords.x = Math.floor(currentCoords.x / 2);
        currentCoords.y = Math.floor(currentCoords.y / 2);

        // Generate new src path.
        const newUrl = this.getNewZoomTileUrl(currentCoords);
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
        tile.id = this.getTileId(currentCoords);
        tile.hasTriedOffline = false;

        this.fire('tilefallback',
            {
                tile: tile,
                url: tile.originalSrc,
                urlMissing: tile.src,
                urlFallback: newUrl
            });
    }

    private createCurrentCoords(originalCoords: L.Coords): ExtendedCoords {
        const currentCoords: ExtendedCoords = (<any>this)._wrapCoords(originalCoords);
        currentCoords.fallback = true;
        return currentCoords;
    }
}
