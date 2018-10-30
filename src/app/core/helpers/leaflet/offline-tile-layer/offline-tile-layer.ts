import * as L from 'leaflet';
import { settings } from '../../../../../settings';
import { BorderHelper } from '../border-helper';
import { NgZone } from '@angular/core';
import { OfflineMapService } from '../../../services/offline-map/offline-map.service';
import { Platform } from '@ionic/angular';
import { MapService } from '../../../../modules/map/services/map/map.service';

interface ExtendedCoords extends L.Coords {
    fallback: boolean;
}

export class OfflineTileLayer extends L.TileLayer {

    constructor(
        private name: string,
        private zone: NgZone,
        private offlineMapService: OfflineMapService,
        private mapService: MapService,
        private plaform: Platform,
    ) {
        super(settings.map.tiles.defaultMapUrl, {
            name, maxZoom: 18, minZoom: 1,
        });
    }

    createTile(coords, done) {
        return this.zone.runOutsideAngular(() => {
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
        });
    }


    /**
     * Returns whether tile coords is inside norwegian border
     * @param coords tile coords
     */
    private isInsideBorders(coords: L.Coords): Promise<boolean> {
        const latLngBounds: L.LatLngBounds = (<any>this)._tileCoordsToBounds(coords);
        return this.mapService.isTileInsideNorway(coords, latLngBounds);
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

    async getTileUrl(coords: ExtendedCoords, save = true): Promise<string> {
        if (coords.z <= settings.map.tiles.embeddedUrlMaxZoom) {
            // console.log(`zoom is under ${settings.map.tiles.embeddedUrlMaxZoom} so using embedded map url`,
            //     coords, settings.map.tiles.embeddedUrl);
            return this.getOriginalTileUrl(coords, settings.map.tiles.embeddedUrl);
        }
        // console.log('[DEBUG][OfflineTileLayer] getTileUrl. Try offline first', coords);
        const offlineUrl = await this.offlineMapService.getTileUrl(this.name, coords.x, coords.y, coords.z);
        if (offlineUrl) {
            // console.log('[DEBUG][OfflineTileLayer] got offline url', offlineUrl);
            return offlineUrl;
        } else {
            const url = await this.getTileUrlOrFallbackMap(coords);
            // console.log('[DEBUG][OfflineTileLayer] got tile url', url);
            const coordsCopy = { ...coords }; // Create a copy because coords reference might get changed on error
            if (this.downloadTileToCache() && save) {
                // console.log('[DEBUG][OfflineTileLayer] saving tile ' + name, coordsCopy, url);
                this.offlineMapService.saveTileAsBlob(this.name, coordsCopy.x, coordsCopy.y, coordsCopy.z, url);
            }
            return url;
        }
    }

    private downloadTileToCache() {
        return this.plaform.is('cordova') && (this.plaform.is('ios') || this.plaform.is('android'));
    }

    private async getTileUrlOrFallbackMap(coords: ExtendedCoords): Promise<string> {
        if (coords.z <= settings.map.tiles.zoomToShowBeforeNorwegianDetailsMap) {
            return this.getOriginalTileUrl(coords, settings.map.tiles.defaultMapUrl);
        }
        // TODO: Implement tile in norway cache, use https://github.com/rsms/js-lru
        // no need to store in db, because tiles is allready cached offline
        // but it will improve performance on support tiles?
        const isInsideNorway = await this.isInsideBorders(coords);
        if (!isInsideNorway) {
            return this.getOriginalTileUrl(coords, settings.map.tiles.defaultMapUrl);
        } else {
            return this.getOriginalTileUrl(coords, settings.map.tiles.nowegianDetailsMapUrl);
        }
    }

    _tileOnError(done, tile, e) {
        const originalCoords = tile._originalCoords,
            currentCoords: ExtendedCoords = tile._currentCoords = tile._currentCoords || this.createCurrentCoords(originalCoords),
            fallbackZoom = tile._fallbackZoom = (tile._fallbackZoom || originalCoords.z) - 1,
            scale = tile._fallbackScale = (tile._fallbackScale || 1) * 2,
            tileSize = this.getTileSize(),
            style = tile.style;

        // TODO: Check if tile url is local cahced file://, then fallback to original url

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
        this.getTileUrl(currentCoords, false).then((newUrl) => {
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
