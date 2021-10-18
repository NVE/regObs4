import * as L from 'leaflet';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { Feature, GeometryObject } from '@turf/turf';
import { OfflineTilesRegistry } from 'src/app/core/services/offline-map/offline-tiles-registry';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'RegObsOfflineAwareTileLayer';

export interface IRegObsTileLayerOptions extends L.TileLayerOptions {
  edgeBufferTiles?: number;
  excludeBounds?: Feature<GeometryObject>;
}

export class RegObsTileLayer extends L.TileLayer {

  constructor(
    url: string,
    options: IRegObsTileLayerOptions
  ) {
    super(url, options);
  }

  _isValidTile(coords: L.Coords) {
    const valid = (<any>L.GridLayer.prototype)._isValidTile.call(this, coords);
    if (!valid) {
      return false;
    }
    if ((<IRegObsTileLayerOptions>this.options).excludeBounds) {
      const tileBounds = (<any>L.GridLayer.prototype)._tileCoordsToBounds.call(
        this,
        coords
      );
      return !BorderHelper.isInside(
        tileBounds,
        (<IRegObsTileLayerOptions>this.options).excludeBounds
      );
    }
    return true;
  }
}

export class RegObsOfflineAwareTileLayer extends RegObsTileLayer {
  constructor(
    private mapType: string,
    url: string,
    options: IRegObsTileLayerOptions,
    private offlineTilesRegistry: OfflineTilesRegistry,
    private loggingService: LoggingService
  ) {
    super(url, options);
    
    this.on('tileerror', (event?: L.TileErrorEvent) => {
      // this.loggingService.debug('TileError', 'RegObsOfflineAwareTileLayer', event);

      // Check if there is a registered offline package above
      // this tile
      const { x, y, z } = event.coords;
      const packageInfo = this.offlineTilesRegistry.findRegisteredPackage(this.mapType, x, y, z);
      if (packageInfo?.zMax < z) {
        //show error message if we zoom in too much on the offline map
        event.tile.src = '/assets/icon/map/no-tile-here.png'; //TODO: Show error text in current language
      }
    });
  }

  /**
   * @returns url to an offline tile if available
   */
  getTileUrl(coords: L.Coords): string {
    let url: string;
    const offlineMapUrl = this.offlineTilesRegistry.getUrl(this.mapType, coords.x, coords.y, coords.z);
    if (offlineMapUrl) {
      url = `${offlineMapUrl}/${coords.z}/${coords.x}/${coords.y}.png`;
    }
    this.loggingService.debug('Tile url:', DEBUG_TAG, coords.x, coords.y, coords.z, url);
    return url;
  }
}
