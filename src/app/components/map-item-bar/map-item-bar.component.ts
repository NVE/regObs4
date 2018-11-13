import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapItem } from '../../core/models/map-item.model';
import * as moment from 'moment';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import * as L from 'leaflet';
import { HelperService } from '../../core/services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { RegistrationViewModel } from '../../modules/regobs-api/models';

@Component({
  selector: 'app-map-item-bar',
  templateUrl: './map-item-bar.component.html',
  styleUrls: ['./map-item-bar.component.scss']
})
export class MapItemBarComponent implements OnInit {

  visible: boolean;
  topHeader: string;
  title: string;
  distanceAndType: string;
  name: string;
  id: number;
  geoHazard: GeoHazard;

  private _isVisible: Subject<boolean>;

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
  ) {
    this.visible = false;
    this._isVisible = new Subject();
  }

  ngOnInit() {
  }

  getTitle(item: RegistrationViewModel) {
    const allRegistrationNames: Array<string> = (item.Summaries || []).map((registration) => registration.RegistrationName);
    const uniqueValues = Array.from(new Set(allRegistrationNames));
    return uniqueValues.join(', ');
  }

  show(item: MapItem) {
    this.zone.run(() => {
      this.id = item.RegID;
      this.topHeader = moment(item.DtObsTime).format('d/M HH:mm');
      this.title = this.getTitle(item);
      this.name = item.Observer.NickName;
      this.geoHazard = parseInt(item.GeoHazardTID, 10); //TODO: Bug in api model?
      this.setDistanceAndType(item);
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
