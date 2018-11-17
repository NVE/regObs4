import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { settings } from '../../../../settings';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private userSettingService: UserSettingService) { }

  // async getObservationsFromDate(): Promise<moment.Moment> {
  //   const us = await this.userSettingService.getUserSettings();
  //   return moment().subtract(this.getObservationsDaysBack(us.currentGeoHazard, us), 'days').startOf('day');
  // }

  // getObservationsDaysBack(geoHazard: GeoHazard, userSettings: UserSetting): number {
  //   const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
  //     .find((setting) => setting.geoHazard === geoHazard);
  //   const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
  //   return daysBack;
  // }

  getDistanceText(distanceInMeter: number): string {
    if (distanceInMeter > 1000) {
      return `${(distanceInMeter / 1000).toFixed(1)}  km`;
    } else {
      return `${(distanceInMeter || 0).toFixed(0)} m`;
    }
  }

  // async setCurrentMapView(bounds: L.LatLngBounds, center: L.LatLng) {
  //   await this.storage.ready();
  //   const boundsArray = [
  //     [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
  //     [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
  //   ];
  //   return this.storage.set(STORAGE_KEY_NAME, { bounds: boundsArray, center: [center.lat, center.lng] });
  // }

  // async getCurrentMapView() {
  //   const values = await this.storage.get(STORAGE_KEY_NAME);
  //   if (values) {
  //     return { bounds: L.latLngBounds(values.bounds), center: L.latLng(values.center) };
  //   } else {
  //     return null;
  //   }
  // }

  // async getDistanceToRegion(): Promise<{ name: string, distance: number }[]> {
  //   const currentPosition = await this.geolocation.getCurrentPosition(
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20 * 1000,
  //       maximumAge: 10 * 60 * 1000
  //     });
  //   const target = turf.point([currentPosition.coords.longitude, currentPosition.coords.latitude]);
  //   return this.getFeaturesFromJson(snow_warning_regions.default).map((feature) => {
  //     const featurePolygon = feature.geometry as Polygon;
  //     const nearestPoint = turf.nearest(target, turf.featureCollection(featurePolygon.coordinates[0].map((c) => turf.point(c))));
  //     return ({
  //       name: feature.properties[settings.snowRegionsGeoJsonName] as string,
  //       distance: turf.distance(nearestPoint, target)
  //     });
  //   });
  // }

  // async getAvalancheWarningRegionsForCurrentMapView() {
  //   // const currentView = await this.getCurrentMapView();
  //   const currentView = null; // TODO: Fix implementation
  //   if (currentView !== null) {
  //     const features = this.getFeaturesFromJson(snow_warning_regions.default);
  //     return features.filter((r) => {
  //       const featurePolygon = r.geometry as Polygon;
  //       const currentViewAsPolygon = this.boundsToGeoPolygon(currentView.bounds);
  //       return turf.intersect(featurePolygon, currentViewAsPolygon);
  //     }).map((feature) => {
  //       return feature.properties[settings.snowRegionsGeoJsonName] as string;
  //     });
  //   } else {
  //     return [];
  //   }
  // }

  // async getPolygonGroupForCurrentMapView() {
  //   // const currentView = await this.getCurrentMapView();
  //   const currentView = null; // TODO: Fix implementation
  //   if (currentView !== null) {
  //     const features = this.getFeaturesFromJson(snow_warning_regions.default);
  //     return features.filter((r) => {
  //       const featurePolygon = r.geometry as Polygon;
  //       const currentViewAsPolygon = this.boundsToGeoPolygon(currentView.bounds);
  //       return turf.intersect(featurePolygon, currentViewAsPolygon);
  //     }).map((feature) => {
  //       return feature.properties[settings.snowRegionsGeoJsonName] as string;
  //     });
  //   } else {
  //     return [];
  //   }
  // }

  formatMsToTime(duration: number, showMilliseconds: boolean = false) {
    const milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${(hours < 10) ? '0' + hours : hours}`
      + `:${(minutes < 10) ? '0' + minutes : minutes}`
      + `:${(seconds < 10) ? '0' + seconds : seconds}`
      + (showMilliseconds ? `.${milliseconds}` : '');
  }

  // async getObservationImage(id: number, size: string = 'medium') {
  //   const userSettings = await this.userSettingService.getUserSettings();
  //   const appMode = userSettings.appMode;
  //   return `${settings.services.regObs.serviceUrl[appMode]}/Image/${size}/${id}`;
  // }

  getGeoHazardIcon(geoHazard: GeoHazard) {
    switch (geoHazard) {
      case GeoHazard.Dirt:
        return '/assets/icon/ikon_jordskred.svg';
      case GeoHazard.Ice:
        return '/assets/icon/ikon_isvarsler2.svg';
      case GeoHazard.Snow:
        return '/assets/icon/ikon_snoskred.svg';
      case GeoHazard.Water:
        return '/assets/icon/ikon_flom.svg';
    }
  }

  humanReadableByteSize(bytes: number, si: boolean = true) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  getTimeAsObservable(interval: number): Observable<Date> {
    return Observable.create((observer) => {
      // setInterval(() => observer.next(new Date().toString()), interval)
      const handle = setInterval(() => {
        observer.next(new Date());
      }, interval);
      return () => clearInterval(handle);
    });
  }

  // private getFeaturesFromJson(geoJson: any) {
  //   const features: Array<Feature<GeometryObject, any>> = [];
  //   L.geoJSON(geoJson, {
  //     onEachFeature: (feature) => {
  //       features.push(feature);
  //     }
  //   });
  //   return features;
  // }

  // private boundsToGeoPolygon(bounds: L.LatLngBounds) {
  //   return turf.polygon([[
  //     [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
  //     [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
  //     [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
  //     [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
  //     [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
  //   ]]);
  // }
}
