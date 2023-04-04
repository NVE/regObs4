import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { Observable, Subject } from 'rxjs';
import { FullscreenService } from 'src/app/core/services/fullscreen/fullscreen.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IPolygon, Polygon, TotalPolygon } from '../../models/polygon';

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

  ngOnInit() {
    this.totalPolygon = this.constructPolygon('flood', this.extent, TotalPolygon);
    if (this.relativeToLatLng) {
      this.fromMarker = L.marker(this.relativeToLatLng, {
        icon: this.locationMarkerIcon,
      });
    }
  }

  //reused
  private constructPolygon(title: string, extent: [number, number][], Type: typeof Polygon) {
    const color = 'red';
    return {
      title,
      active: Boolean(extent),
      polygon: extent
        ? new Type(
            extent.map(([lng, lat]) => [lat, lng]),
            { color }
          )
        : null,
      color,
    };
  }

  //this method is reused!!!
  private makePolygons() {
    if (!this.totalPolygon.polygon) {
      const fallbackLatlng = L.latLng(59.1, 10.3);
      const totalCircle = new L.Circle(this.relativeToLatLng || fallbackLatlng, {
        radius: 150,
      });
      this.totalPolygon.polygon = new TotalPolygon(L.PM.Utils.circleToPolygon(totalCircle, 5).getLatLngs());
      this.totalPolygon.active = true;
    }
  }

  private updateMarkers() {
    this.map.off('drag');
    this.makePolygons();
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
