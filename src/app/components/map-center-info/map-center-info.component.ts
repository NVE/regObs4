import { Component, OnInit, OnDestroy, HostBinding, Inject } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { DOCUMENT } from '@angular/common';
import { MapService } from '../../core/services/map/map.service';
import { MapView } from '../../core/services/map/map-view.model';
import { Observer } from 'nano-sql/lib/observable';
import { MapSearchService } from '../../core/services/map-search/map-search.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss']
})
export class MapCenterInfoComponent implements OnInit, OnDestroy {
  isVisible: boolean;
  mapView: MapView;
  elevation: number;
  private lastMapCenter: L.LatLng;
  placeName: string;
  areaName: string;

  constructor(
    private userSettingService: UserSettingService,
    private events: Events,
    private mapService: MapService,
    private mapSerachService: MapSearchService,
    @Inject(DOCUMENT) private document: Document) {

  }

  async ngOnInit() {
    const userSettings = await this.userSettingService.getUserSettings();
    this.isVisible = userSettings.showMapCenter;
    this.updateHeight();

    this.events.subscribe(settings.events.userSettingsChanged, (newUserSettings) => {
      this.isVisible = newUserSettings.showMapCenter;
      this.updateHeight();
      this.updateInfo();
    });

    this.mapService.getMapViewObservable().subscribe((mapView: MapView) => {
      this.mapView = mapView;
      if (this.isVisible) {
        this.updateInfo();
      }
    });
  }

  private updateHeight() {
    let lines = 1;
    if (this.placeName) {
      lines++;
    }
    if (this.elevation !== undefined) {
      lines++;
    }
    const height = 24 * lines;
    this.document.documentElement.style.setProperty('--map-center-info-height', this.isVisible ? `${height}px` : '0px');
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.userSettingsChanged);
  }

  updateInfo() {
    if (this.mapView) {
      if (!this.lastMapCenter || this.lastMapCenter.distanceTo(this.mapView.center) >= settings.map.metersLimitForUpdateElevation) {
        this.lastMapCenter = this.mapView.center;
        this.updateElevation();
        this.updatePlaceName();
      }
    }
  }

  updateElevation() {
    this.mapSerachService.getElevation(this.mapView.center.lat, this.mapView.center.lng)
      .toPromise().then((result) => {
        setTimeout(() => {
          if (result >= 0) {
            this.elevation = result;
          } else {
            this.elevation = undefined;
          }
          this.updateHeight();
        }, 0);
      }, (error) => {
        console.log('Could not update elevation', error);
      });
  }

  async updatePlaceName() {
    this.mapSerachService.reverseGeocodeWorld(this.mapView.center.lat, this.mapView.center.lng)
      .toPromise().then((result: any) => {
        const firstResult = result.geonames[0];
        if (firstResult) {
          setTimeout(() => {
            this.placeName = firstResult.toponymName;
            this.areaName = firstResult.adminName1;
            this.updateHeight();
          }, 0);
        }
      });
  }
}
