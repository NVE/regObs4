import { OfflineMapPackage } from "./offline-map.model";

interface RootTile {url: string; zMin: number; zMax: number}

/**
 * Offline map register, one for each type of offline map
 */
 export class OfflineTilesRegistry {
  private registry: Map<string, Map<string, RootTile>> = new Map();
  private lowestRootTileZ: number;
  private highestRootTileZ: number;
  private highestZmax: number = 0;

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
      if (!this.lowestRootTileZ || map.rootTile.z < this.lowestRootTileZ) {
        this.lowestRootTileZ = map.rootTile.z;
      }
      if (!this.highestRootTileZ || map.rootTile.z > this.highestRootTileZ) {
        this.highestRootTileZ = map.rootTile.z;
      }
      if (map.zMax > this.highestZmax) {
        this.highestZmax = map.zMax;
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
    if (z > this.highestZmax) {
      return undefined;
    }
    const rootTile = this.findRootTile(mapType, x, y, z);
    if (rootTile && rootTile.zMax >= z) {
      return rootTile.url;
    }
    return undefined;
  }

  getZmax(mapType: string, x: number, y: number, z: number): number {
    const rootTile = this.findRootTile(mapType, x, y, z);
    if (rootTile) {
      return rootTile.zMax;
    }
    return null;
  }

  private findRootTile(mapType: string, x: number, y: number, z: number): RootTile { 
    let _x = x;
    let _y = y;
    let _z = z;
    
    if (!this.registry.has(mapType)) {
      return undefined;
    }

    //find topmost tile x and y
    while (_z > this.highestRootTileZ) {
        _z--;
        _x = Math.floor(_x / 2);
        _y = Math.floor(_y / 2);
    }
    while (_z >= this.lowestRootTileZ) {
      const registryKey = this.getKey(_x, _y);
      const rootTileInfo = this.registry.get(mapType).get(registryKey);
      if (rootTileInfo) {
        return rootTileInfo;
      }
      _x = Math.floor(_x / 2);
      _y = Math.floor(_y / 2);
      _z--;
    }
    return undefined; //we didn't find any topmost tile
  }

  private getKey(x: number, y: number): string {
    return `${x}_${y}`;
  }
}