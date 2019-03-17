import * as L from 'leaflet';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { GeometryObject } from '@turf/turf';

export interface IRegObsTileLayerOptions extends L.TileLayerOptions {
    edgeBufferTiles?: number;
    excludeBounds?: GeometryObject;
}

export class RegObsTileLayer extends L.TileLayer {

    constructor(
        url: string,
        options: IRegObsTileLayerOptions,
    ) {
        super(url, options);
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

        for (const key of (<any>this)._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
        }

        for (const key of (<any>this)._tiles) {
            tile = (<any>this)._tiles[key];
            if (tile.current && !tile.active) {
                const coords = tile.coords;
                if (!(<any>this)._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                    (<any>this)._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
            }
        }

        for (const key of (<any>this)._tiles) {
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
}
