import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input, ChangeDetectorRef, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { Events, Fab, FabButton } from '@ionic/angular';
import { settings } from '../../../settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss']
})
export class GeoSelectComponent implements OnInit, OnDestroy {

  geoHazardTypes: Array<GeoHazard>;
  isOpen = false;
  currentGeoHazard$: Observable<GeoHazard>;
  isFullscreen = false;
  private fullscreenChangedHandler: (isFullscreen: boolean) => void;

  @Input() inHeader: boolean;

  get size() {
    return this.inHeader && !this.isOpen ? 0.7 : 1.0;
  }

  constructor(
    private userSettingService: UserSettingService,
    private events: Events,
    private ngZone: NgZone) {

    this.fullscreenChangedHandler = (isFullscreen: boolean) => {
      this.ngZone.run(() => {
        this.isFullscreen = isFullscreen;
      });
    };
  }

  async ngOnInit() {
    this.geoHazardTypes = Object.keys(GeoHazard)
      .filter(key => !isNaN(Number(GeoHazard[key])))
      .map((key) => GeoHazard[key]);
    this.currentGeoHazard$ = this.userSettingService.currentGeoHazardObservable$;
    this.events.subscribe(settings.events.fullscreenChanged, this.fullscreenChangedHandler);
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.fullscreenChanged, this.fullscreenChangedHandler);
  }

  getName(geoHazard: GeoHazard) {
    return `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase();
  }

  toggle() {
    this.ngZone.run(() => {
      this.isOpen = !this.isOpen;
    });
  }

  async changeGeoHazard(geoHazard: GeoHazard) {
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.currentGeoHazard = geoHazard;
    await this.userSettingService.saveUserSettings(userSettings);
    this.ngZone.run(() => {
      this.isOpen = false;
      this.events.publish(settings.events.geoHazardChanged, GeoHazard[geoHazard]);
    });
  }
}
