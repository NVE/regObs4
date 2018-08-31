import * as L from 'leaflet';
import * as leafletPip from '@mapbox/leaflet-pip';
import * as norwegianBorder from '../../../../../assets/norway-borders2.json';
import { settings } from '../../../../../settings';

const NORWEGIAN_BORDER = L.geoJSON(norwegianBorder.default);

interface ExtendedCoords extends L.Coords {
    fallback: boolean;
}

export class OfflineTileLayer extends L.TileLayer {

    constructor() {
        super(settings.map.tiles.fallbackMapUrl, {
            name: 'topo', maxZoom: 18, minZoom: 1,
        });
    }

    createTile(coords, done) {
        const tile = document.createElement('img');

        L.DomEvent.on(tile, 'load', L.Util.bind((<any>this)._tileOnLoad, this, done, tile));
        L.DomEvent.on(tile, 'error', L.Util.bind((<any>this)._tileOnError, this, done, tile));

        if (this.options.crossOrigin) {
            tile.crossOrigin = '';
        }

        tile.alt = '';
        (<any>tile)._originalCoords = coords;

        tile.setAttribute('role', 'presentation');

        this.getTileUrl(coords).then(function (url) {
            tile.src = url;
            (<any>tile)._originalSrc = tile.src;
        }).catch(function (err) {
            throw err;
        });

        return tile;
    }

    private pointInLayerInsideBounds(latLng: L.LatLng): 0 | 1 {
        return leafletPip.pointInLayer(latLng, NORWEGIAN_BORDER).length > 0 ? 1 : 0;
    }


    /**
     * Returns whether tile coords is inside norwegian border
     * @param coords tile coords
     */
    private isInsideBorders(coords: L.Coords): boolean {
        const latLngBounds: L.LatLngBounds = (<any>this)._tileCoordsToBounds(coords);
        let hits = 0;
        hits += this.pointInLayerInsideBounds(latLngBounds.getNorthWest());
        hits += this.pointInLayerInsideBounds(latLngBounds.getNorthEast());
        hits += this.pointInLayerInsideBounds(latLngBounds.getSouthEast());
        hits += this.pointInLayerInsideBounds(latLngBounds.getSouthWest());
        hits += this.pointInLayerInsideBounds(latLngBounds.getCenter());
        return hits >= 3;
    }


    private getOriginalTileUrl(coords: L.Coords, urlTemplate: string): string {
        this.setUrl(urlTemplate, true);
        return (<any>L.TileLayer.prototype).getTileUrl.call(this, coords);
    }

    private getOfflineTileUrl(coords: L.Coords): Promise<{ success: boolean, url?: string }> {
        // TODO: Implement get tile from offline storage
        // var dbStorageKey = this._getStorageKey(url);

        // var resultPromise = this._tilesDb.getItem(dbStorageKey).then(function (data) {
        //     if (data && typeof data === 'object') {
        //         return URL.createObjectURL(data);
        //     }
        //     return url;
        // }).catch(function (err) {
        //     throw err;
        // });
        return Promise.resolve({ success: false });
    }

    async getTileUrl(coords: ExtendedCoords): Promise<string> {
        const isInsideNorway = this.isInsideBorders(coords);

        if (!isInsideNorway) {
            return this.getOriginalTileUrl(coords, settings.map.tiles.fallbackMapUrl);
        } else {
            if (coords.z > settings.map.tiles.embeddedUrlMaxZoom) {
                const offlineUrlResult = await this.getOfflineTileUrl(coords);
                if (offlineUrlResult.success) {
                    return offlineUrlResult.url;
                }
                const hasNetwork = true; // TODO: test for offline
                if (hasNetwork) {
                    return this.getOriginalTileUrl(coords, settings.map.tiles.defaultMapUrl);
                }
            }
            return this.getOriginalTileUrl(coords, settings.map.tiles.embeddedUrl);
        }
    }

    _tileOnError(done, tile, e) {
        const originalCoords = tile._originalCoords,
            currentCoords: ExtendedCoords = tile._currentCoords = tile._currentCoords || this.createCurrentCoords(originalCoords),
            fallbackZoom = tile._fallbackZoom = (tile._fallbackZoom || originalCoords.z) - 1,
            scale = tile._fallbackScale = (tile._fallbackScale || 1) * 2,
            tileSize = this.getTileSize(),
            style = tile.style;
        const isInsideNorway = this.isInsideBorders(tile._originalCoords);

        // If no lower zoom tiles are available, fallback to errorTile.
        if (fallbackZoom < 1 || !isInsideNorway) {
            console.log('Max fallback reached. Return original error handling');
            return (<any>L.TileLayer.prototype)._tileOnError(done, tile, e);
        }

        // Modify tilePoint for replacement img.
        currentCoords.z = fallbackZoom;
        currentCoords.x = Math.floor(currentCoords.x / 2);
        currentCoords.y = Math.floor(currentCoords.y / 2);

        // Generate new src path.
        this.getTileUrl(currentCoords).then((newUrl) => {
            // tslint:disable-next-line:max-line-length
            console.log('Fallback to next zoom level: ' + fallbackZoom + ' for zoom: ' + originalCoords.z + ' original: ' + JSON.stringify(originalCoords) + ' new coords: ' + JSON.stringify(currentCoords));

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
                    url: tile._originalSrc,
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
