import { OfflineMapPackage } from "./offline-map.model";

interface RegisteredPackageInfo {url: string; zMin: number; zMax: number}
type RegisterForMapType = Map<string, RegisteredPackageInfo>;


/**
 * Registry structure (map of maps):
 * 
 *   statensKartverk       // First map
 *       152_48_8          // Nested map, x_y_z key (root tile)
 *         url: "..."
 *         zMin: 14
 *         zMax: 8
 * 
 *       152_49_8
 *         ...
 *
 *   steepness-outlet
 *       152_49_8
 *         ...
 */
 export class OfflineTilesRegistry {
  private registry: Map<string, RegisterForMapType> = new Map();
  private lowestRootTileZ: number;
  private highestRootTileZ: number;
  private highestZmax: number = 0;

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
      const registryKey = this.getKey(map.rootTile.x, map.rootTile.y, map.rootTile.z);
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
   * Return a url template to an offline map package valid for the provided 
   * coordinates and map type. If there is no match between the coordinates
   * / map types and registered packages, undefined is returned. 
   * 
   * @param mapType example: statensKartverk
   */
  getUrl(mapType: string, x: number, y: number, z: number): string | undefined {
    if (z > this.highestZmax) {
      return undefined;
    }
    const packageInfo = this.findRegisteredPackage(mapType, x, y, z);
    if (packageInfo && packageInfo.zMax >= z) {
      return packageInfo.url;
    }
    return undefined;
  }

  /**
   * Finds registered packages that overlaps with the search x,y coordinates.
   * The returned package does not need to overlap in z axis.
   */
  findRegisteredPackage(mapType: string, x: number, y: number, z: number): RegisteredPackageInfo | undefined { 
    if (!this.registry.has(mapType)) {
      return undefined;
    }

    let _x = x;
    let _y = y;
    let _z = z;

    //find topmost tile x and y
    while (_z > this.highestRootTileZ) {
        _z--;
        _x = Math.floor(_x / 2);
        _y = Math.floor(_y / 2);
    }
    while (_z >= this.lowestRootTileZ) {
      const registryKey = this.getKey(_x, _y, _z);
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

  private getKey(x: number, y: number, z: number): string {
    return `${x}_${y}_${z}`;
  }
}