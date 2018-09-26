import { Component, OnInit, OnDestroy, HostBinding, Inject } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { DOCUMENT } from '@angular/common';
import { MapService } from '../../core/services/map/map.service';
import { MapView } from '../../core/services/map/map-view.model';
import { Observer } from 'nano-sql/lib/observable';

@Component({
  selector: 'app-map-center-info',
  templateUrl: './map-center-info.component.html',
  styleUrls: ['./map-center-info.component.scss']
})
export class MapCenterInfoComponent implements OnInit, OnDestroy {
  isVisible: boolean;
  $mapView: Observer<MapView>;

  constructor(
    private userSettingService: UserSettingService,
    private events: Events,
    private mapService: MapService,
    @Inject(DOCUMENT) private document: Document) {

  }

  async ngOnInit() {
    const userSettings = await this.userSettingService.getUserSettings();
    this.isVisible = userSettings.showMapCenter;
    this.updateHeight();

    this.events.subscribe(settings.events.userSettingsChanged, (newUserSettings) => {
      this.isVisible = newUserSettings.showMapCenter;
      this.updateHeight();
    });

    this.$mapView = this.mapService.getMapViewObservable();
  }

  private updateHeight() {
    this.document.documentElement.style.setProperty('--map-center-info-height', this.isVisible ? '85px' : '0px');
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.userSettingsChanged);
  }

}
