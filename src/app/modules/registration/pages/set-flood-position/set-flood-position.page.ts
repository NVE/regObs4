import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { Observable, Subject } from 'rxjs';
import { FullscreenService } from 'src/app/core/services/fullscreen/fullscreen.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IPolygon, PolygonArea } from '../../models/polygon';
import { constructPolygon, makePolygons } from 'src/app/modules/common-registration/helpers/polygon.helper';
import { settings } from 'src/settings';

@Component({
  selector: 'app-set-flood-position.page',
  templateUrl: './set-flood-position.page.html',
  styleUrls: ['./set-flood-position.page.scss'],
})
export class SetFloodPositionPage implements OnInit {
  @Input() extent?: [number, number][];
  @Input() relativeToLatLng?: L.LatLng;
  @Input() geoHazard: GeoHazard;

  locationMarker: L.Marker;
  private map: L.Map;
  fullscreen$: Observable<boolean>;
  fromMarker: L.Marker;
  totalPolygon: IPolygon;
  locationPolygon = new Subject<IPolygon>();
  confirmLocationText: string;
  locationMarkerIcon = L.icon({
    iconUrl: '/assets/icon/map/obs-location.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: 'leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });
  constructor(
    private fullscreenService: FullscreenService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    this.totalPolygon = constructPolygon(this.extent, settings.map.extentColor, PolygonArea);
    if (this.relativeToLatLng) {
      this.fromMarker = L.marker(this.relativeToLatLng, {
        icon: this.locationMarkerIcon,
      });
    }
  }

  private updateMarkers() {
    this.map.off('drag');
    const polygons = makePolygons('total', this.totalPolygon, this.relativeToLatLng);
    this.totalPolygon.polygon = polygons.polygon;
    this.totalPolygon.active = true;
    this.locationPolygon.next(this.totalPolygon);
    this.cdr.detectChanges();
  }

  onMapReady(map: L.Map) {
    this.map = map;
    setTimeout(() => {
      this.updateMarkers();
    });
  }

  async onLocationSet() {
    this.modalController.dismiss({
      totalPolygon: this.totalPolygon.active ? this.totalPolygon.polygon?.toGeoJSON().geometry.coordinates[0] : null,
    });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
