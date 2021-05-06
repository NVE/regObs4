import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DamageObsDto, ObsLocationDto } from '../../../regobs-api/models';
import * as L from 'leaflet';
import { IsEmptyHelper } from '../../../../core/helpers/is-empty.helper';
import { SetLocationInMapComponent } from '../../components/set-location-in-map/set-location-in-map.component';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable } from 'rxjs';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import Graphic from '@arcgis/core/Graphic';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { Point } from '@arcgis/core/geometry';

@Component({
  selector: 'app-set-damage-location',
  templateUrl: './set-damage-location.page.html',
  styleUrls: ['./set-damage-location.page.scss']
})
export class SetDamageLocationPage implements OnInit {
  @Input() damageObs: DamageObsDto;
  @Input() geoHazard: GeoHazard;
  @Input() fromLatLng: L.LatLng; //TODO
  fromMarker: Graphic;
  location: Point;
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

  async ngOnInit(): Promise<void> {
    if (this.fromLatLng) {
      this.fromMarker = this.createMarkerFromLeafletLatLng(
        this.fromLatLng,
        '/assets/icon/map/obs-location.svg'
      );
    }
    if (
      this.damageObs &&
      !IsEmptyHelper.isEmpty(this.damageObs.DamagePosition)
    ) {
      this.location = new Point({
        latitude: this.damageObs.DamagePosition.Latitude,
        longitude: this.damageObs.DamagePosition.Longitude
      });
    }
  }

  private createMarker(point: Point, symbolPath?: string): Graphic {
    return new Graphic({
      geometry: point,
      symbol: new PictureMarkerSymbol({
        url: symbolPath ? symbolPath : this.locationMarkerIconUrl,
        width: '25px',
        height: '41px',
        yoffset: '15px'
      })
    });
  }

  private createMarkerFromLeafletLatLng(
    latLng: L.LatLng,
    symbolPath: string
  ): Graphic {
    return this.createMarker(
      new Point({ latitude: latLng.lat, longitude: latLng.lng }),
      symbolPath
    );
  }

  ionViewDidEnter(): void {
    this.swipeBackService.disableSwipeBack();
  }

  ionViewWillLeave(): void {
    this.swipeBackService.enableSwipeBack();
  }

  async onLocationSet(event: ObsLocationDto): Promise<void> {
    this.modalController.dismiss(event);
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  ok(): void {
    this.setLocationInMapComponent.confirmLocation();
  }
}
