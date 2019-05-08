import { Component, OnInit, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController } from '@ionic/angular';
import { ObsLocationsResponseDtoV2, ObsLocationDto } from '../../../regobs-api/models';
import { ActivatedRoute } from '@angular/router';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { Observable, Subscription } from 'rxjs';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LoginService } from '../../../login/services/login.service';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { SetLocationInMapComponent } from '../../components/set-location-in-map/set-location-in-map.component';

const DEBUG_TAG = 'ObsLocationPage';

@Component({
  selector: 'app-obs-location',
  templateUrl: './obs-location.page.html',
  styleUrls: ['./obs-location.page.scss'],
})
export class ObsLocationPage implements OnInit, OnDestroy {
  locationMarker: L.Marker;
  isLoaded = false;
  selectedLocation: ObsLocationsResponseDtoV2;
  registration: IRegistration;
  fullscreen$: Observable<boolean>;
  geoHazard: GeoHazard;
  isSaveDisabled = false;
  hasSaved = false;
  @ViewChild(SetLocationInMapComponent) setLocationInMapComponent: SetLocationInMapComponent;

  private subscription: Subscription;
  private loggedInUser: LoggedInUser;

  constructor(
    private registrationService: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private navController: NavController,
    private fullscreenService: FullscreenService,
    private swipeBackService: SwipeBackService,
    private loggingService: LoggingService,
    private loginService: LoginService,
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.registration =
        await this.registrationService.getSavedRegistrationById(id);
      this.geoHazard = this.registration.geoHazard;
    } else if (this.activatedRoute.snapshot.params['geoHazard']) {
      this.geoHazard = parseInt(this.activatedRoute.snapshot.params['geoHazard'], 10);
    }
    if (this.hasLocation(this.registration)) {
      const locationMarkerIcon = L.icon({
        iconUrl: '/assets/icon/map/obs-location.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: 'leaflet/marker-shadow.png',
        shadowSize: [41, 41],
      });
      this.locationMarker = L.marker(
        {
          lat: this.registration.request.ObsLocation.Latitude,
          lng: this.registration.request.ObsLocation.Longitude
        }, { icon: locationMarkerIcon }
      );
      this.selectedLocation = {
        Name: this.registration.request.ObsLocation.LocationName || this.registration.request.ObsLocation.LocationDescription,
        Id: this.registration.request.ObsLocation.ObsLocationID,
      };
    }
    this.subscription = this.loginService.loggedInUser$.subscribe((val) => {
      this.loggedInUser = val;
    });

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
    this.hasSaved = false;
  }

  ionViewWillLeave() {
    this.swipeBackService.enableSwipeBack();
    if (this.registration && this.registration.request && !this.hasSaved && this.setLocationInMapComponent) {
      const obsLocation = this.setLocationInMapComponent.getLocation();
      this.setLocationAndSaveRegistration(obsLocation);
    }
  }

  private hasLocation(reg: IRegistration) {
    return reg
      && reg.request.ObsLocation
      && reg.request.ObsLocation.Latitude
      && reg.request.ObsLocation.Longitude;
  }

  onLocationSet(event: ObsLocationDto) {
    this.ngZone.run(() => {
      this.isSaveDisabled = true;
    });
    if (!this.registration) {
      this.registration = this.registrationService.createNewRegistration(this.geoHazard, this.loggedInUser);
    }
    this.setLocationAndSaveRegistration(event);
    if (this.registration.request.DtObsTime) {
      this.navController.navigateForward('registration/edit/' + this.registration.id);
    } else {
      this.navController.navigateForward('registration/set-time/' + this.registration.id);
    }
  }

  private setLocationAndSaveRegistration(loc: ObsLocationDto) {
    if (loc === undefined || this.registration === undefined) {
      return;
    }
    this.registration.request.ObsLocation = loc;
    this.registrationService.saveRegistration(this.registration);
    this.isSaveDisabled = false;
    this.hasSaved = true;
  }
}
