import { OfflineMapPackage } from "./offline-map.model";

interface RootTile {url: string; zMin: number; zMax: number}

/**
 * Offline map register, one for each type of offline map
 */
 export class OfflineTilesRegistry {
  private registry: Map<string, Map<string, RootTile>> = new Map();
  private lowestZmin: number;
  private highestZmin: number;

  // statensKartverk
  //   x_y: url + Zmin + Zmax

  clear(): void {
    this.registry.clear();
  }
  
  add(mapPackage: OfflineMapPackage): void {
    for (const mapType in mapPackage.maps) {
      const map = mapPackage.maps[mapType];
      if (!this.registry.has(mapType)) {
        this.registry.set(mapType, new Map());
      }
      const registryForMapType = this.registry.get(mapType);
      const registryKey = this.getKey(map.rootTile.x, map.rootTile.y);
      registryForMapType.set(registryKey, { url: map.url, zMin: map.rootTile.z, zMax: map.zMax});
      if (!this.lowestZmin || map.rootTile.z < this.lowestZmin) {
        this.lowestZmin = map.rootTile.z;
      }
      if (!this.highestZmin || map.rootTile.z > this.highestZmin) {
        this.highestZmin = map.rootTile.z;
      }
    }
  }

  /**
   * TODO!
   * @param mapType example: statensKartverk
   * @param x 
   * @param y 
   * @param z 
   * @returns TODO!
   */
  getUrl(mapType: string, x: number, y: number, z: number): string {
    const topMostCoords = this.findTopmostTileCoords(mapType, x, y, z);
    if (topMostCoords) {
      const registryKey = this.getKey(topMostCoords.x, topMostCoords.y);
      return this.registry.get(mapType)?.get(registryKey)?.url;  
    }
    return undefined;
  }

  getZmax(mapType: string, x: number, y: number, z: number): number {
    const topMostCoords = this.findTopmostTileCoords(mapType, x, y, z);
    if (topMostCoords) {
      const registryKey = this.getKey(topMostCoords.x, topMostCoords.y);
      return this.registry.get(mapType).get(registryKey)?.zMax;
    }
    return undefined;
  }


  private findTopmostTileCoords(mapType: string, x: number, y: number, z: number): { x: number, y: number, z: number} { 
    let _x = x;
    let _y = y;
    let _z = z;
    
    //find topmost tile x and y
    while (_z > this.highestZmin) {
        _z--;
        _x = Math.floor(_x / 2);
        _y = Math.floor(_y / 2);
    }
    while (_z >= this.lowestZmin) {
      const registryKey = this.getKey(_x, _y);
      if (this.registry.has(mapType)) {
        if (this.registry.get(mapType).has(registryKey)) {
          return { x: _x, y: _y, z: _z };
        }
      }
      _z--;
    }
    return undefined; //we didn't find any topmost tile
  }

  private getKey(x: number, y: number): string {
    return `${x}_${y}`;
  }
}