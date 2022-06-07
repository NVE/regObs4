import { Component, OnInit, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { NavController } from '@ionic/angular';
import {
  ObsLocationsResponseDtoV2,
  ObsLocationEditModel
} from 'src/app/modules/common-regobs-api/models';
import { ActivatedRoute } from '@angular/router';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import { LocationTime, SetLocationInMapComponent } from '../../components/set-location-in-map/set-location-in-map.component';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { LoggedInUser } from 'src/app/modules/login/models/logged-in-user.model';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss']
})
export class ObsLocationPage implements OnInit, OnDestroy {
  locationMarker: L.Marker;
  isLoaded = false;
  selectedLocation: ObsLocationsResponseDtoV2;
  draft: RegistrationDraft;
  fullscreen$: Observable<boolean>;
  geoHazard: GeoHazard;
  @ViewChild(SetLocationInMapComponent)
  setLocationInMapComponent: SetLocationInMapComponent;

  private subscription: Subscription;
  private loggedInUser: LoggedInUser;

  constructor(
    private draftService: DraftRepositoryService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private navController: NavController,
    private fullscreenService: FullscreenService,
    private swipeBackService: SwipeBackService,
    private userSettingService: UserSettingService,
    private regobsAuthService: RegobsAuthService
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Edit an existing draft
      this.draft = await this.draftService.load(id);
      this.geoHazard = this.draft.registration.GeoHazardTID;
    } else if (this.activatedRoute.snapshot.params['geoHazard']) {
      // New draft - will be created later
      this.geoHazard = parseInt(this.activatedRoute.snapshot.params['geoHazard'], 10);
    }
    if (this.geoHazard == null) {
      // No geohazard found, use app mode
      const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
      this.geoHazard = userSettings.currentGeoHazard[0];
    }
    if (this.hasLocation(this.draft)) {
      const obsLocation = this.draft.registration.ObsLocation;
      const locationMarkerIcon = L.icon({
        iconUrl: '/assets/icon/map/obs-location.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41]
      });
      this.locationMarker = L.marker(
        {
          lat: obsLocation.Latitude,
          lng: obsLocation.Longitude
        },
        { icon: locationMarkerIcon }
      );
      this.selectedLocation = {
        Name: obsLocation.LocationName || obsLocation.LocationDescription,
        Id: obsLocation.ObsLocationID
      };
    }
    this.subscription = this.regobsAuthService.loggedInUser$.subscribe(
      (val) => {
        this.loggedInUser = val;
      }
    );

    this.ngZone.run(() => {
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      this.draft = this.draftService.create(this.geoHazard);
    }

    await this.setLocationTimeAndSaveDraft(event);
    this.navController.navigateRoot('registration/edit/' + this.draft.uuid);
  }

  private async setLocationTimeAndSaveDraft({location, datetime}: LocationTime) {
    if (this.draft === undefined) {
      return;
    }

    if (location !== undefined) {
      this.draft = {
        ...this.draft,
        registration: {
          ...this.draft.registration,
          ObsLocation: location
        }
      }
    }

    if (datetime !== undefined) {
      this.draft = {
        ...this.draft,
        registration: {
          ...this.draft.registration,
          DtObsTime: datetime
        }
      }
    }

    // Save updated draft with new obs location
    await this.draftService.save(this.draft);
  }
}
