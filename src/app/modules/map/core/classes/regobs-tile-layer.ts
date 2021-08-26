import * as L from 'leaflet';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { Feature, GeometryObject } from '@turf/turf';

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
  private minOfflineZoomLevel = 8;
  private maxOfflineZoomLevel = 14;
  private offlineTilesRegistry : Map<string, string>;

  constructor(
    url: string,
    options: IRegObsTileLayerOptions,
    tileMap: Map<string, string>
  ) {
    super(url, options);
    this.offlineTilesRegistry = tileMap;

    this.on('tileerror', (event?: L.TileErrorEvent) => {
      console.log('tileerror', event);
      if (event.coords.z > this.maxOfflineZoomLevel) {
        //show error message if we zoom in too much on the offline map
        const tileKey = this.computeOfflineRootTileKey(event.coords);
        if (this.offlineTilesRegistry.has(tileKey)) {
          event.tile.src = '/assets/icon/map/no-tile-here.png'; //TODO: Show error text in current language
        }
      }
    });
  }

  /**
   * @returns url to an offline tile if available, or else default online tile url
   */
  getTileUrl(coords: L.Coords): string {
    if (coords.z < this.minOfflineZoomLevel || coords.z > this.maxOfflineZoomLevel || this.offlineTilesRegistry?.size === 0) {
      const url = super.getTileUrl(coords);
      console.log('Tile url:', coords.x, coords.y, coords.z, url);
      return url;
    }

    let url: string;
    const tileKey = this.computeOfflineRootTileKey(coords);
    if (this.offlineTilesRegistry.has(tileKey)) {
        const offlineMapUrl = this.offlineTilesRegistry.get(tileKey);
        url = `${offlineMapUrl}/${coords.z}/${coords.x}/${coords.y}.png`;
    } else {
        url = super.getTileUrl(coords);
    }

    console.log('Tile url:', coords.x, coords.y, coords.z, url);
    return url;
  }

  private findTopmostTileCoords(coords: L.Coords): { x, y, z} { 
    let { x, y, z } = coords;   
    
    //find topmost tile x and y
    while (z > this.minOfflineZoomLevel) {
        z--;
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
    }
    return { x, y, z };
  }

  private computeOfflineRootTileKey(coords: L.Coords): string {
    const { x, y, z } = this.findTopmostTileCoords(coords);   
    return `${x}_${y}`; //TODO: Tilemap should control key format. Maybe hide tilemap in own class?
  }
}
