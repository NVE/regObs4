import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { state, trigger, style, transition, animate, keyframes } from '@angular/animations';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable, Subscription } from 'rxjs';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-geo-fab',
  templateUrl: './geo-fab.component.html',
  styleUrls: ['./geo-fab.component.scss'],
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),  // initial
        animate('200ms cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
  ]
})
export class GeoFabComponent implements OnInit, OnDestroy {

  fullscreen$: Observable<boolean>;
  currentGeoHazard: GeoHazard[];

  @Input() color = 'light';
  @Input() isOpen = false;
  @Input() showLabels = true;
  @Output() isOpenChange = new EventEmitter();

  geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];

  get selectableGeoHazards() {
    return this.geoHazardTypes.filter((x) => !(this.currentGeoHazard && this.currentGeoHazard.some((c) => x.some((z) => z === c))));
  }

  constructor(private fullscreenService: FullscreenService, private userSettingService: UserSettingService) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  private geoHazardSubscription: Subscription;

  ngOnInit() {
    this.geoHazardSubscription = this.userSettingService.currentGeoHazardObservable$.subscribe((val) => {
      this.currentGeoHazard = val;
    });
  }

  ngOnDestroy(): void {
    if (this.geoHazardSubscription) {
      this.geoHazardSubscription.unsubscribe();
    }
  }

  toggle() {
    this.triggerOpenClose(!this.isOpen);
  }

  open() {
    this.triggerOpenClose(true);
  }

  close() {
    this.triggerOpenClose(false);
  }

  triggerOpenClose(open: boolean) {
    const changed = this.isOpen !== open;
    if (changed) {
      this.isOpen = open;
      this.isOpenChange.emit(this.isOpen);
    }
  }

  getNames(geoHazards: GeoHazard[]) {
    return geoHazards.map((geoHazard) => `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase());
  }

  async setCurrentGeoHazard(geoHazards: GeoHazard[]) {
    this.close();
    this.currentGeoHazard = geoHazards;
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.currentGeoHazard = geoHazards;
    this.userSettingService.saveUserSettings(userSettings);
  }

  getIconSrc(geoHazards: GeoHazard[]) {
    return `/assets/icon/${this.getGeoClass(geoHazards)}.svg`;
  }

  getGeoClass(geoHazards: GeoHazard[]) {
    if (geoHazards && geoHazards.length > 0) {
      return geoHazards.map((geoHazard) => (<string>GeoHazard[geoHazard]).toLowerCase()).join('_');
    }
    return '';
  }

}
