import * as L from 'leaflet';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { Feature, GeometryObject } from '@turf/turf';

export interface IRegObsTileLayerOptions extends L.TileLayerOptions {
  edgeBufferTiles?: number;
  excludeBounds?: Feature<GeometryObject>;
}

export class RegObsOfflineAwareTileLayer extends L.TileLayer {
  private minZoomLevel: number;
  private tileMap : Map<string, string>;

  constructor(
    url: string,
    options: IRegObsTileLayerOptions,
    tileMap: Map<string, string>,
    minZoomLevel: number
  ) {
    super(url, options);
    this.minZoomLevel = minZoomLevel;
    this.tileMap = tileMap;
  }

  /**
   * @returns url to an offline tile if available, or else default online tile url
   */
  getTileUrl(coords: L.Coords): string {
    if (coords.z < this.minZoomLevel || this.tileMap?.size === 0) {
      return super.getTileUrl(coords);
    }

    //find topmost tile x and y
    let { x, y, z } = coords;   
    while (z > this.minZoomLevel) {
        z--;
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
    }

    const tileKey = `${x}_${y}`; //TODO: Tilemap should control key format. Maybe hide tilemap in own class?
    if (this.tileMap.has(tileKey)) {
        const offlineMapUrl = this.tileMap.get(tileKey);
        return `${offlineMapUrl}/${coords.z}/${coords.x}/${coords.y}.png`;
    } else {
        return super.getTileUrl(coords);
    }
  }
}

export class RegObsTileLayer extends RegObsOfflineAwareTileLayer {

  constructor(
    url: string,
    options: IRegObsTileLayerOptions,
    tileMap: Map<string, string>,
    minZoomLevel: number
  ) {
    super(url, options, tileMap, minZoomLevel);
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
