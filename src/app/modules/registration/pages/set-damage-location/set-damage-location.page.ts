import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DamageObsDto, ObsLocationDto } from '../../../regobs-api/models';
import * as L from 'leaflet';
import { IsEmptyHelper } from '../../../../core/helpers/is-empty.helper';
import { SetLocationInMapComponent } from '../../components/set-location-in-map/set-location-in-map.component';
import { GeoHazard } from '@varsom-regobs-common/core';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable } from 'rxjs';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';

@Component({
  selector: 'app-set-damage-location',
  templateUrl: './set-damage-location.page.html',
  styleUrls: ['./set-damage-location.page.scss']
})
export class SetDamageLocationPage implements OnInit {
  @Input() damageObs: DamageObsDto;
  @Input() geoHazard: GeoHazard;
  @Input() fromLatLng: L.LatLng;
  fromMarker: L.Marker;
  locationMarker: L.Marker;
  locationMarkerIconUrl = '/assets/icon/map/damage-location.svg';
  fullscreen$: Observable<boolean>;

  @ViewChild(SetLocationInMapComponent)
  setLocationInMapComponent: SetLocationInMapComponent;

  constructor(
    private modalController: ModalController,
    private swipeBackService: SwipeBackService,
    private fullscreenService: FullscreenService
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    if (this.fromLatLng) {
      const obsLocationIcon = L.icon({
        iconUrl: '/assets/icon/map/obs-location.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41]
      });
      this.fromMarker = L.marker(this.fromLatLng, { icon: obsLocationIcon });
    }
    if (
      this.damageObs &&
      !IsEmptyHelper.isEmpty(this.damageObs.DamagePosition)
    ) {
      const latLng = L.latLng(
        this.damageObs.DamagePosition.Latitude,
        this.damageObs.DamagePosition.Longitude
      );
      const damageLocationIcon = L.icon({
        iconUrl: this.locationMarkerIconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41]
      });
      this.locationMarker = L.marker(latLng, { icon: damageLocationIcon });
    }
  }

  ionViewDidEnter() {
    this.swipeBackService.disableSwipeBack();
  }

  ionViewWillLeave() {
    this.swipeBackService.enableSwipeBack();
  }

  async onLocationSet(event: ObsLocationDto) {
    this.modalController.dismiss(event);
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.setLocationInMapComponent.confirmLocation();
  }
}
