import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import * as L from 'leaflet';
import * as snow_warning_regions from '../../../../assets/varslingsomraader.json';
import { GeometryObject, Feature, Polygon, LineString } from 'geojson';
import { settings } from '../../../../settings';
import * as turf from '@turf/turf';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { featureEach } from '@turf/turf';

const STORAGE_KEY_NAME = 'CurrentMapView';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private userSettingService: UserSettingService, private storage: Storage, private geolocation: Geolocation) { }

  async getObservationsFromDate(): Promise<moment.Moment> {
    const userSettings = await this.userSettingService.getUserSettings();
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === userSettings.currentGeoHazard);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
    return moment().subtract(daysBack, 'days').startOf('day');
  }

  getDistanceText(distanceInMeter: number): string {
    if (distanceInMeter > 1000) {
      return `${(distanceInMeter / 1000).toFixed(1)}  km`;
    } else {
      return `${(distanceInMeter || 0).toFixed(0)} m`;
    }
  }

  async setCurrentMapView(bounds: L.LatLngBounds, center: L.LatLng) {
    await this.storage.ready();
    const boundsArray = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
    ];
    return this.storage.set(STORAGE_KEY_NAME, { bounds: boundsArray, center: [center.lat, center.lng] });
  }

  async getCurrentMapView() {
    const values = await this.storage.get(STORAGE_KEY_NAME);
    if (values) {
      return { bounds: L.latLngBounds(values.bounds), center: L.latLng(values.center) };
    } else {
      return null;
    }
  }

  async getDistanceToRegion(): Promise<{ name: string, distance: number }[]> {
    const currentPosition = await this.geolocation.getCurrentPosition(
      {
        enableHighAccuracy: true,
        timeout: 20 * 1000,
        maximumAge: 10 * 60 * 1000
      });
    const target = turf.point([currentPosition.coords.longitude, currentPosition.coords.latitude]);
    return this.getFeaturesFromJson(snow_warning_regions.default).map((feature) => {
      const featurePolygon = feature.geometry as Polygon;
      const nearestPoint = turf.nearest(target, turf.featureCollection(featurePolygon.coordinates[0].map((c) => turf.point(c))));
      return ({
        name: feature.properties[settings.snowRegionsGeoJsonName] as string,
        distance: turf.distance(nearestPoint, target)
      });
    });
  }

  async getAvalancheWarningRegionsForCurrentMapView() {
    const currentView = await this.getCurrentMapView();
    if (currentView !== null) {
      const features = this.getFeaturesFromJson(snow_warning_regions.default);
      return features.filter((r) => {
        const featurePolygon = r.geometry as Polygon;
        const currentViewAsPolygon = this.boundsToGeoPolygon(currentView.bounds);
        return turf.intersect(featurePolygon, currentViewAsPolygon);
      }).map((feature) => {
        return feature.properties[settings.snowRegionsGeoJsonName] as string;
      });
    } else {
      return [];
    }
  }

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

  private getFeaturesFromJson(geoJson: any) {
    const features: Array<Feature<GeometryObject, any>> = [];
    L.geoJSON(geoJson, {
      onEachFeature: (feature) => {
        features.push(feature);
      }
    });
    return features;
  }

  private boundsToGeoPolygon(bounds: L.LatLngBounds) {
    return turf.polygon([[
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
      [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
      [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
      [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
    ]]);
  }
}
