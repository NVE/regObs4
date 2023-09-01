import { Component, OnInit, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { NavController } from '@ionic/angular';
import { ObsLocationsResponseDtoV2, ObsLocationViewModel } from 'src/app/modules/common-regobs-api/models';
import { ActivatedRoute } from '@angular/router';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import {
  LocationTime,
  SetLocationInMapComponent,
} from '../../components/set-location-in-map/set-location-in-map.component';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { LocationService } from 'src/app/modules/common-regobs-api';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss'],
})
export class ObsLocationPage implements OnInit, OnDestroy {
  locationMarker: L.Marker;
  isLoaded = false;
  allowEditLocationName = true;
  selectedLocation: ObsLocationsResponseDtoV2;
  draft: RegistrationDraft;
  fullscreen$: Observable<boolean>;
  geoHazard: GeoHazard;
  @ViewChild(SetLocationInMapComponent)
  setLocationInMapComponent: SetLocationInMapComponent;

  private subscription: Subscription;

  constructor(
    private draftService: DraftRepositoryService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private locationService: LocationService,
    private navController: NavController,
    private fullscreenService: FullscreenService,
    private swipeBackService: SwipeBackService,
    private userSettingService: UserSettingService
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    const geoHazard = this.activatedRoute.snapshot.params['geoHazard'];
    const lat = this.activatedRoute.snapshot.queryParams['lat'];
    const lon = this.activatedRoute.snapshot.queryParams['lon'];
    const locationId = this.activatedRoute.snapshot.queryParams['locationId'];
    if (id) {
      // Edit an existing draft
      this.draft = await this.draftService.load(id);
      this.geoHazard = this.draft.registration.GeoHazardTID;
    } else if (geoHazard) {
      // New draft - will be created later
      if (isNaN(geoHazard)) {
        const geoHazardCapLetter = geoHazard.charAt(0).toUpperCase() + geoHazard.slice(1);
        this.geoHazard = parseInt(GeoHazard[geoHazardCapLetter], 10);
      } else {
        this.geoHazard = parseInt(geoHazard, 10);
      }
    }
    if (this.geoHazard == null) {
      // No geohazard found, use app mode
      const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
      this.geoHazard = userSettings.currentGeoHazard[0];
    }
    if (lat && lon) {
      this.setLocationMarker(lat, lon);
    } else if (locationId) {
      const location = (await firstValueFrom(
        this.locationService.LocationGet({ locationId: locationId })
      )) as ObsLocationViewModel;
      this.setLocationMarker(location.Latitude, location.Longitude);
      this.selectedLocation = {
        Name: location.LocationName || location.LocationDescription,
        LocationDescription: location.LocationDescription,
        Id: locationId,
      };
    } else if (this.hasLocation(this.draft)) {
      const obsLocation = this.draft.registration.ObsLocation;
      this.allowEditLocationName = obsLocation.LocationName && obsLocation.ObsLocationID ? false : true;
      this.setLocationMarker(obsLocation.Latitude, obsLocation.Longitude);
      this.selectedLocation = {
        Name: obsLocation.LocationName || obsLocation.LocationDescription,
        LocationDescription: obsLocation.LocationDescription,
        Id: obsLocation.ObsLocationID,
      };
    }

    this.ngZone.run(() => {
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setLocationMarker(lat: number, long: number) {
    const locationMarkerIcon = L.icon({
      iconUrl: '/assets/icon/map/obs-location.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });
    this.locationMarker = L.marker(
      {
        lat: lat,
        lng: long,
      },
      { icon: locationMarkerIcon }
    );
  }

  ionViewDidEnter() {
    this.swipeBackService.disableSwipeBack();
  }

  ionViewWillLeave() {
    this.swipeBackService.enableSwipeBack();
  }

  private hasLocation(draft: RegistrationDraft) {
    return (
      draft &&
      draft.registration &&
      draft.registration.ObsLocation &&
      draft.registration.ObsLocation.Latitude &&
      draft.registration.ObsLocation.Longitude
    );
  }

  async onLocationTimeSet(event: LocationTime) {
    if (!this.draft) {
      this.draft = await this.draftService.create(this.geoHazard);
    }

    await this.setLocationTimeAndSaveDraft(event);
    this.navController.navigateRoot('registration/edit/' + this.draft.uuid);
  }

  private async setLocationTimeAndSaveDraft({ location, datetime, source, spatialAccuracy }: LocationTime) {
    if (this.draft === undefined) {
      return;
    }

    if (location !== undefined) {
      location.Uncertainty = spatialAccuracy;
      this.draft = {
        ...this.draft,
        registration: {
          ...this.draft.registration,
          ObsLocation: location,
          SourceTID: source,
        },
      };
    }

    if (datetime !== undefined) {
      this.draft = {
        ...this.draft,
        registration: {
          ...this.draft.registration,
          DtObsTime: datetime,
        },
      };
    }

    // Save updated draft with new obs location
    await this.draftService.save(this.draft);
  }
}
