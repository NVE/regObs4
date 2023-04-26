import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { FullscreenService } from 'src/app/core/services/fullscreen/fullscreen.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { constructPolygon, makePolygons } from 'src/app/modules/common-registration/helpers/polygon.helper';
import { settings } from 'src/settings';
import { IPolygon, PolygonArea } from '../../../models/polygon';
import { ActivatedRoute } from '@angular/router';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-set-flood-area',
  templateUrl: './set-flood-area.page.html',
})
export class SetFloodAreaPage implements OnInit {
  locationMarker: L.Marker;
  private map: L.Map;
  fullscreen$: Observable<boolean>;
  fromMarker: L.Marker;
  isLoaded = false;
  draft: RegistrationDraft;
  relativeToLatLng: L.LatLng;
  totalPolygon: IPolygon;
  geoHazard = GeoHazard.Water;
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
    private activatedRoute: ActivatedRoute,
    private draftService: DraftRepositoryService,
    private location: Location,
    private ngZone: NgZone,
    private draftRepository: DraftRepositoryService
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.draft = await this.draftService.load(id);

      if (!this.draft.registration.WaterLevel2) {
        this.draft.registration.WaterLevel2 = {};
      }
      if (!this.draft.registration.GeneralObservation) {
        this.draft.registration.GeneralObservation = {};
      }
      this.relativeToLatLng = this.draft.registration.ObsLocation
        ? L.latLng(this.draft.registration.ObsLocation.Latitude, this.draft.registration.ObsLocation.Longitude)
        : null;
      this.totalPolygon = constructPolygon(
        this.draft.registration.WaterLevel2.Extent as [number, number][],
        settings.map.extentColor,
        PolygonArea
      );
      if (this.relativeToLatLng) {
        this.fromMarker = L.marker(this.relativeToLatLng, {
          icon: this.locationMarkerIcon,
        });
      }
    }
    this.ngZone.run(() => {
      this.isLoaded = true;
    });
  }

  private updateMarkers() {
    this.map.off('drag');
    const polygons = makePolygons('total', this.totalPolygon, this.relativeToLatLng);
    this.totalPolygon.polygon = polygons.polygon;
    this.totalPolygon.active = true;
    this.locationPolygon.next(this.totalPolygon);
    this.cdr.detectChanges();
  }

  async onMapReady(map: L.Map) {
    this.map = map;
    setTimeout(() => {
      this.updateMarkers();
    });
  }

  navBack() {
    this.location.back();
  }
  async save(): Promise<void> {
    this.draftRepository.save(this.draft);
  }

  async onLocationSet() {
    this.navBack();
    this.draft.registration.WaterLevel2.Extent = this.totalPolygon.active
      ? (this.totalPolygon.polygon?.toGeoJSON().geometry.coordinates[0] as [number, number][])
      : null;
    this.save();
  }
}
