import { Component, OnInit, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { IRegistration } from '../../models/registration.model';
import { RegistrationService } from '../../services/registration.service';
import { NavController } from '@ionic/angular';
import { ObsLocationsResponseDtoV2 } from '../../../regobs-api/models';
import { ActivatedRoute } from '@angular/router';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { Observable } from 'rxjs';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { SwipeBackService } from '../../../../core/services/swipe-back/swipe-back.service';
import { ObsLocation } from '../../models/obs-location.model';
import { LoggingService } from '../../../shared/services/logging/logging.service';

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

  constructor(
    private registrationService: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private navController: NavController,
    private fullscreenService: FullscreenService,
    private swipeBackService: SwipeBackService,
    private loggingService: LoggingService,
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
      if (this.registration.request.ObsLocation.ObsLocationID) {
        this.selectedLocation = {
          Name: this.registration.request.ObsLocation.LocationName,
          Id: this.registration.request.ObsLocation.ObsLocationID,
        };
      }
    }
    this.ngZone.run(() => {
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
  }

  ionViewDidEnter() {
    this.swipeBackService.disableSwipeBack();
  }

  ionViewWillLeave() {
    this.swipeBackService.enableSwipeBack();
  }

  private hasLocation(reg: IRegistration) {
    return reg
      && reg.request.ObsLocation
      && reg.request.ObsLocation.Latitude
      && reg.request.ObsLocation.Longitude;
  }

  async onLocationSet(event: ObsLocation) {
    try {
      this.isSaveDisabled = true;
      if (!this.registration) {
        this.registration = await this.registrationService.createNewRegistration(this.geoHazard);
      }
      this.registration.request.ObsLocation = event;
      this.registration.calculatedLocationName = event.calculatedLocationName;
      const id = await this.registrationService.saveRegistration(this.registration);
      if (this.registration.request.DtObsTime) {
        this.navController.navigateForward('registration/edit/' + id);
      } else {
        this.navController.navigateForward('registration/set-time/' + id);
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, 'Could not create new registration');
    } finally {
      this.ngZone.run(() => {
        this.isSaveDisabled = false;
      });
    }
  }

}
