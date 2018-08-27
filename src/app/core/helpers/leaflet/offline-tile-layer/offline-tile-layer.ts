import * as L from 'leaflet';
import * as leafletPip from '@mapbox/leaflet-pip';
import * as norwegianBorder from '../../../assets/norway-borders2.json';

const NORWEGIAN_BORDER = L.geoJSON(norwegianBorder.default);

export class OfflineTileLayer extends L.TileLayer {

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


    /**
     * Returns whether tile coords is inside norwegian border
     * @param coords tile coords
     */
    private isInsideBorders(coords: [number, number, number]): boolean {
        const latLngBounds: L.LatLngBounds = (<any>this)._tileCoordsToBounds();
        return leafletPip.pointInLayer(latLngBounds.getCenter(), NORWEGIAN_BORDER).length > 0;
    }


    private getOriginalTileUrl(coords): string {
        return (<any>L.TileLayer.prototype).getTileUrl.call(this, coords);
    }

    getTileUrl(coords) {
        const url = this.getOriginalTileUrl(coords);
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

        return Promise.resolve(url);
    }

    _tileOnError(done, tile, e) {
        const originalCoords = tile._originalCoords,
            currentCoords = tile._currentCoords = tile._currentCoords || this.createCurrentCoords(originalCoords),
            fallbackZoom = tile._fallbackZoom = (tile._fallbackZoom || originalCoords.z) - 1,
            scale = tile._fallbackScale = (tile._fallbackScale || 1) * 2,
            tileSize = this.getTileSize(),
            style = tile.style;

        // If no lower zoom tiles are available, fallback to errorTile.
        if (fallbackZoom < 1) {
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

    private createCurrentCoords(originalCoords) {
        const currentCoords = (<any>this)._wrapCoords(originalCoords);
        currentCoords.fallback = true;
        return currentCoords;
    }

}
