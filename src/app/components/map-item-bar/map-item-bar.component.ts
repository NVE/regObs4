import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscribable, Subscription } from 'rxjs';
import { MapItem } from '../../core/models/map-item.model';
import * as moment from 'moment';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import * as L from 'leaflet';
import { HelperService } from '../../core/services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { AppMode } from '../../core/models/app-mode.enum';
import { settings } from '../../../settings';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';

@Component({
  selector: 'app-map-item-bar',
  templateUrl: './map-item-bar.component.html',
  styleUrls: ['./map-item-bar.component.scss']
})
export class MapItemBarComponent implements OnInit, OnDestroy {

  visible: boolean;
  topHeader: string;
  title: string;
  distanceAndType: string;
  name: string;
  id: number;
  geoHazard: GeoHazard;
  imageUrls: string[] = [];
  masl: number;
  stars: { full: boolean }[] = [];
  hasNoStars: boolean;

  private subscription: Subscription;
  private _isVisible: Subject<boolean>;
  private appMode: AppMode;

  get isVisible(): Observable<boolean> {
    return this._isVisible.asObservable();
  }

  // TODO: Rewrite this component to use observable. Maybe put visibleMapItem observable in map service?

  constructor(
    private geolocation: Geolocation,
    private helper: HelperService,
    private translateService: TranslateService,
    private router: Router,
    private zone: NgZone,
    private userSettingService: UserSettingService
  ) {
    this.visible = false;
    this._isVisible = new Subject();
  }

  ngOnInit() {
    this.subscription = this.userSettingService.appMode$.subscribe((val) => {
      this.appMode = val;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTitle(item: RegistrationViewModel) {
    const allRegistrationNames: Array<string> = (item.Summaries || []).map((registration) => registration.RegistrationName);
    const uniqueValues = Array.from(new Set(allRegistrationNames));
    return uniqueValues.join(', ');
  }

  show(item: MapItem) {

    this.zone.run(() => {
      this.id = item.RegID;
      this.topHeader = item.DtObsTime;
      this.title = this.getTitle(item);
      this.name = item.Observer.NickName;
      this.stars = [];
      for (let i = 0; i < 5; i++) {
        this.stars.push({ full: (item.Observer.CompetenceLevelName || '')[i] === '*' });
      }
      this.hasNoStars = !this.stars.some((x) => x.full);
      this.geoHazard = item.GeoHazardTID;
      this.masl = item.ObsLocation ? item.ObsLocation.Height : undefined;
      this.setDistanceAndType(item);
      this.imageUrls = [];
      if (this.appMode && item.Attachments && item.Attachments.length > 0) {
        this.imageUrls = item.Attachments.map(
          (attachment) => this.getImageUrl(this.appMode, attachment.AttachmentFileName, 'medium'));
      }
      this.visible = true;
      this.publishChange();
    });
  }

  hide() {
    this.zone.run(() => {
      this.visible = false;
      this.publishChange();
    });
  }

  getImageUrl(appMode: AppMode, filename: string, size: 'thumbnail' | 'medium' | 'large' | 'original' | 'raw' = 'medium') {
    return `${settings.services.regObs.webUrl[appMode]}/Attachments/${size}/${filename}`;
  }

  navigateToItem() {
    this.router.navigateByUrl(`view-observation/${this.id}`);
  }

  private publishChange() {
    this._isVisible.next(this.visible);
  }

  private async setDistanceAndType(item: MapItem) {
    this.distanceAndType = ''; // set by promise
    const translations = await this.translateService.get(['MAP_ITEM_BAR.OBSERVATION', 'MAP_ITEM_BAR.AWAY']).toPromise();
    try {
      const currentPosition = await this.geolocation.getCurrentPosition(
        {
          enableHighAccuracy: true,
          timeout: 20 * 1000,
          maximumAge: 10 * 60 * 1000
        });
      const distance = L.latLng(item.ObsLocation.Latitude, item.ObsLocation.Longitude)
        .distanceTo(L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
      this.zone.run(() => {
        this.distanceAndType = `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()} `
          + `${this.helper.getDistanceText(distance)} ${translations['MAP_ITEM_BAR.AWAY'].toLowerCase()}`;
      });
    } catch {
      this.zone.run(() => {
        this.distanceAndType = `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()}`;
      });
    }
  }
}
