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

export class RegobsOfflineTileLayer extends L.TileLayer {
  rootTileZ: number;

  constructor(
    url: string,
    options: L.TileLayerOptions
  ) {
    const { minZoom, ...optionsWithoutMinZoom } = options;
    super(url, optionsWithoutMinZoom);
    this.rootTileZ = minZoom;
  }

  getTileSize() {
    const zoom = this._tileZoom;
    const tileSize = super.getTileSize();
    if (zoom < this.rootTileZ) {
      const zoomScale = this._map.getZoomScale(this.rootTileZ, zoom);
      return tileSize.divideBy(zoomScale).round();
    }
    return tileSize;
  }

  _getZoomForUrl() {
    const zoom = this._tileZoom;
    return zoom < this.rootTileZ ? this.rootTileZ : zoom;
  }
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
    let valid = super._isValidTile(coords);
    if (valid && this.canUseOfflineTiles(coords)) {
      this.loggingService.debug(`Using offline tiles for ${this.mapType} - ${coords.x},${coords.y},${coords.z}`, DEBUG_TAG);
      return false;
    }
    return valid;
  }
}
