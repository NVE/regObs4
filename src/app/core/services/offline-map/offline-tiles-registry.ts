import { Url } from "node:url";
import { OfflineMapPackage } from "./offline-map.model";

interface RootTile {url: string; zMin: number; zMax: number}

/**
 * Offline map register, one for each type of offline map
 */
 export class OfflineTilesRegistry {
  private registry: Map<string, Map<string, RootTile>> = new Map();

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
    }
  }

  has(mapType: string, x: number, y: number, z: number): boolean {
    const registryKey = this.getKey(x, y);
    if (this.registry.has(mapType)) {
      return this.registry.get(mapType).has(registryKey);
    }
    return false;
  }

  getUrl(mapType: string, x: number, y: number, z: number): string {
    const registryKey = this.getKey(x, y);
    return this.registry.get(mapType)?.get(registryKey)?.url;
  }

  getZmin(mapType: string, x: number, y: number, z: number): number {
    const registryKey = this.getKey(x, y);
    if (this.registry.has(mapType)) {
      return this.registry.get(mapType).get(registryKey)?.zMin;
    }
    return undefined;
  }

  getZmax(mapType: string, x: number, y: number, z: number): number {
    const registryKey = this.getKey(x, y);
    if (this.registry.has(mapType)) {
      return this.registry.get(mapType).get(registryKey)?.zMax;
    }
    return undefined;
  }

  
  findTopmostTileCoords(coords: L.Coords, minZ: number): { x, y, z} { 
    let { x, y, z } = coords;   
    
    //find topmost tile x and y
    while (z > minZ) {
        z--;
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
    }
    return { x, y, z };
  }

  private getKey(x: number, y: number): string {
    return `${x}_${y}`;
  }
}