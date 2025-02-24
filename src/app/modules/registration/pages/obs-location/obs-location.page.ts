import { Component, OnInit, NgZone, OnDestroy, inject } from '@angular/core';
import L from 'leaflet';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import {
  ObsLocationEditModel,
  ObsLocationsResponseDtoV2,
  ObsLocationViewModel,
  RegistrationEditModel,
} from 'src/app/modules/common-regobs-api/models';
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
import { NgIf, AsyncPipe } from '@angular/common';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { InitDraft } from 'src/app/core/services/draft/init-draft.model';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss'],
  imports: [
    AsyncPipe,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    NgIf,
    SetLocationInMapComponent,
    TranslatePipe,
  ],
})
export class ObsLocationPage implements OnInit, OnDestroy {
  private draftService = inject(DraftRepositoryService);
  private activatedRoute = inject(ActivatedRoute);
  private ngZone = inject(NgZone);
  private locationService = inject(LocationService);
  private navController = inject(NavController);
  private fullscreenService = inject(FullscreenService);
  private swipeBackService = inject(SwipeBackService);
  private userSettingService = inject(UserSettingService);

  locationMarker!: L.Marker;
  isLoaded = false;
  allowEditLocationName = true;
  selectedLocation?: ObsLocationsResponseDtoV2;
  draft?: RegistrationDraft;
  fullscreen$: Observable<boolean>;
  geoHazard!: GeoHazard;
  private _localDate = moment().toISOString(true);

  private subscription?: Subscription;

  constructor() {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  get localDate(): string {
    if (this.draft?.registration?.DtObsTime) {
      this._localDate = this.draft.registration.DtObsTime;
    }
    return this._localDate;
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
      this.geoHazard = this.draft.registration.GeoHazardTID as GeoHazard;
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

  private hasLocation(draft?: RegistrationDraft): draft is DraftWithLocation {
    return draft?.registration.ObsLocation?.Latitude != null && draft?.registration.ObsLocation?.Longitude != null;
  }

  async onLocationTimeSet(event: LocationTime) {
    const draft = this.draft != null ? this.draft : await this.draftService.create(this.geoHazard);
    await this.setLocationTimeAndSaveDraft(event, draft);
    this.navController.navigateRoot('registration/edit/' + draft.uuid);
  }

  private async setLocationTimeAndSaveDraft(
    { location, datetime, source, spatialAccuracy }: LocationTime,
    draft: InitDraft | RegistrationDraft
  ) {
    const DtObsTime = datetime || draft.registration.DtObsTime;
    if (DtObsTime == null) {
      throw new Error('DtObsTime are required');
    }

    this.draft = {
      ...draft,
      registration: {
        ...draft.registration,
        DtObsTime,
        SourceTID: source || draft.registration.SourceTID,
        ObsLocation: {
          ...draft.registration.ObsLocation,
          ...location,
          Uncertainty: spatialAccuracy,
        },
      },
    };

    // Save updated draft with new obs location
    await this.draftService.save(this.draft);
  }
}

interface DraftWithLocation extends RegistrationDraft {
  registration: RegistrationWithLocation;
}

interface RegistrationWithLocation extends RegistrationEditModel {
  ObsLocation: ObsLocationWithLatLon;
}

interface ObsLocationWithLatLon extends ObsLocationEditModel {
  Latitude: number;
  Longitude: number;
}
