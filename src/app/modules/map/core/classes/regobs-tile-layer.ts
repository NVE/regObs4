import * as L from 'leaflet';
import { OfflineTilesRegistry } from 'src/app/core/services/offline-map/offline-tiles-registry';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { Polygon } from 'geojson';
import { bboxPolygon, booleanWithin } from '@turf/turf';

const DEBUG_TAG = 'RegObsOfflineAwareTileLayer';

export interface IRegObsTileLayerOptions extends L.TileLayerOptions {
  edgeBufferTiles?: number;
  excludeBounds?: Polygon[];
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

    const excludeBounds = (<IRegObsTileLayerOptions>this.options).excludeBounds;
    if (excludeBounds) {
      const tileBounds: L.LatLngBounds = (<any>L.GridLayer.prototype)._tileCoordsToBounds.call(this, coords);
      const tileBBox = bboxPolygon([
        tileBounds.getSouthWest().lng, // minx
        tileBounds.getSouthWest().lat, // miny
        tileBounds.getNorthEast().lng, // maxx
        tileBounds.getNorthEast().lat // maxy
      ]);
      return !excludeBounds.some(geometry => booleanWithin(tileBBox, geometry));
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
  }

  canUseOfflineTiles(coords: L.Coords) {
    const offlineTiles = this.offlineTilesRegistry.findRegisteredPackage(this.mapType, coords.x, coords.y, coords.z);
    if (offlineTiles != null) {
      if (offlineTiles.zMin <= coords.z && coords.z <= offlineTiles.zMax) {
        return true;
      }
    }
    return false;
  }

  _isValidTile(coords: L.Coords) {
    const valid = super._isValidTile(coords);
    if (valid && this.canUseOfflineTiles(coords)) {
      this.loggingService.debug(`Using offline tiles for ${this.mapType} - ${coords.x},${coords.y},${coords.z}`, DEBUG_TAG);
      return false;
    }
    return valid;
  }
}
