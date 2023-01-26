import { Injectable } from '@angular/core';
import { bbox, bboxPolygon, booleanWithin, lineString } from '@turf/turf';
import { Feature } from '@turf/turf';
import { LatLngTuple } from 'leaflet';
import { firstValueFrom } from 'rxjs';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { settings } from 'src/settings';
import { ITopoMapLayerOptions, ITopoMapSettings } from 'src/settings.model';

export function getMapLayersWithMatchingBoundsForLocation(maps: ITopoMapSettings[], location: Feature) {
  return (
    maps
      // A map layer may have one or more exclude bounds.
      // If we are inside one of the exclude bounds, we should not use the map layer.
      .filter((map) => {
        if (!map.excludeBounds) return true;
        if (map.excludeBounds.some((bounds) => booleanWithin(location, bounds))) return false;
        return true;
      })
      // Grab the map layer config for each map layer
      .map((map) => ({ layerId: map.layer, layerConfig: settings.map.tiles.topoMapLayers[map.layer] }))
      // A map layer may specify a bounds property as well, specifying what extent the map service has
      .filter(({ layerConfig }) => {
        // If bounds are not specified, assume the map layer is valid for this location
        if (layerConfig.options?.bounds == null) return true;

        // Check if we are inside the bounds.
        // turf needs lng lat and not lat lng.
        const lngLatBounds = [...(layerConfig.options.bounds as [LatLngTuple, LatLngTuple])].map((p) => [p[1], p[0]]);
        // We don't know what ordering options.bounds has, if it is [nw, se] or [sw, ne] etc, everything is allowed.
        // Create a line going from one side of the bounds to the other and find the bounds from that.
        const boundsLine = lineString(lngLatBounds);
        const boundsBox = bboxPolygon(bbox(boundsLine));
        return booleanWithin(location, boundsBox);
      })
      .sort((a, b) => (a.layerConfig.options?.zIndex || 0) - (b.layerConfig.options?.zIndex || 0))
  );
}

const abcGenerator = (function* () {
  while (true) {
    yield 'a';
    yield 'b';
    yield 'c';
  }
})();

function formatTileUrl(urlTemplate: string, tileX: number, tileY: number, tileZoom: number) {
  let url = urlTemplate;

  // Subdomain a, b, or c, see https://leafletjs.com/reference.html#tilelayer
  if (urlTemplate.includes('{s}')) {
    const subdomain = abcGenerator.next().value;
    url = urlTemplate.replace('{s}', subdomain);
  }

  return url.replace('{x}', tileX.toString()).replace('{y}', tileY.toString()).replace('{z}', tileZoom.toString());
}

/**
 * This service can provide a list of map layers that should be
 * used for a web map image for a certain location.
 */
@Injectable()
export class MapLayersService {
  constructor(private userSettings: UserSettingService) {}

  private async getUserSelectedMapConfig() {
    const { topoMap: userSelectedMap } = await firstValueFrom(this.userSettings.userSetting$);
    const mapConfig = settings.map.tiles.topoMaps[userSelectedMap];
    return mapConfig;
  }

  async getMapLayerForLocation(location: Feature) {
    const mapConfig = await this.getUserSelectedMapConfig();
    const mapLayers = getMapLayersWithMatchingBoundsForLocation(mapConfig, location);
    return mapLayers;
  }

  getUrlForTile(mapId: string, options: ITopoMapLayerOptions, tileX: number, tileY: number, tileZoom: number) {
    return formatTileUrl(options.url, tileX, tileY, tileZoom);
  }
}

@Injectable()
export class OfflineCapableMapLayersService extends MapLayersService {
  constructor(userSettings: UserSettingService, private offlineMapService: OfflineMapService) {
    super(userSettings);
  }

  getUrlForTile(mapId: string, options: ITopoMapLayerOptions, tileX: number, tileY: number, tileZoom: number): string {
    const mapPackage = this.offlineMapService.offlineTilesRegistry.findRegisteredPackage(mapId, tileX, tileY, tileZoom);

    if (mapPackage == null) {
      return super.getUrlForTile(mapId, options, tileX, tileY, tileZoom);
    }

    if (tileZoom <= mapPackage.zMax && tileZoom >= mapPackage.zMin) {
      return formatTileUrl(`${mapPackage.url}/{z}/{x}/{y}.png`, tileX, tileY, tileZoom);
    }

    return super.getUrlForTile(mapId, options, tileX, tileY, tileZoom);
  }
}
