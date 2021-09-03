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
      console.log('tileerror', event);
      const { x, y, z } = this.findTopmostTileCoords(event.coords); 
      const maxZ = this.offlineTilesRegistry.getZmax(this.mapType, x, y, z);
      if (maxZ && event.coords.z > maxZ) {
        //show error message if we zoom in too much on the offline map
        event.tile.src = '/assets/icon/map/no-tile-here.png'; //TODO: Show error text in current language
      }
    });
  }

  /**
   * @returns url to an offline tile if available, or else default online tile url
   */
  getTileUrl(coords: L.Coords): string {
    const { x, y, z } = this.findTopmostTileCoords(coords); 
    const minZ = this.offlineTilesRegistry.getZmin(this.mapType, x, y, z);
    const maxZ = this.offlineTilesRegistry.getZmax(this.mapType, x, y, z);
    let url: string;
    if (maxZ != null && minZ != null && coords.z >= minZ && coords.z <= maxZ) {      
      const offlineMapUrl = this.offlineTilesRegistry.getUrl(this.mapType, x, y, z);
      url = `${offlineMapUrl}/${coords.z}/${coords.x}/${coords.y}.png`;
    } else {
      url = super.getTileUrl(coords);
    }
    this.loggingService.debug('Tile url:', DEBUG_TAG, x, y, z, url);
    return url;
  }

  private findTopmostTileCoords(coords: L.Coords, minZ: number): { x, y, z} { 
    let { x, y, z } = coords;   
    
    //find topmost tile x and y
    while (z > minZ) {
        z--;
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
    }
    return { x, y, z };
  }

}
