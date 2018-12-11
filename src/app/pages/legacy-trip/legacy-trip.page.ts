import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { Subscription } from 'rxjs';
import { CreateTripDto } from '../../modules/regobs-api/models';
import * as moment from 'moment';
import { LoginService } from '../../core/services/login/login.service';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { settings } from '../../../settings';
import { HelpModalPage } from '../../modules/registration/pages/modal-pages/help-modal/help-modal.page';
import { GuidHelper } from '../../core/helpers/guid.helper';

@Component({
  selector: 'app-legacy-trip',
  templateUrl: './legacy-trip.page.html',
  styleUrls: ['./legacy-trip.page.scss'],
})
export class LegacyTripPage implements OnInit, OnDestroy {


  private tripLoggerSubscription: Subscription;

  isRunning = false;
  tripDto: CreateTripDto;
  minutes = [];
  isLoading = false;
  invalidMinutes = false;
  invalidTripType = false;

  constructor(
    private tripLoggerService: TripLoggerService,
    private ngZone: NgZone,
    private loginService: LoginService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private geoLocation: Geolocation,
    private navController: NavController,
    private modalController: ModalController,
  ) {
    this.tripDto = {};
  }

  ngOnInit() {
    this.tripLoggerSubscription = this.tripLoggerService.getLegacyTripAsObservable().subscribe((val) => {
      this.ngZone.run(() => {
        if (val) {
          this.tripDto = val.request;
          this.isRunning = true;
        } else {
          this.isRunning = false;
        }
      });
    });
    for (let i = moment().get('hours'); i <= 24; i++) {
      this.minutes.push({ name: `${i}:00`, value: i * 60 });
    }
  }

  ngOnDestroy(): void {
    if (this.tripLoggerSubscription) {
      this.tripLoggerSubscription.unsubscribe();
    }
  }

  private isValid() {
    this.ngZone.run(() => {
      if (this.tripDto.ObservationExpectedMinutes === undefined) {
        this.invalidMinutes = true;
      } else {
        this.invalidMinutes = false;
      }
      if (this.tripDto.TripTypeID === undefined) {
        this.invalidTripType = true;
      } else {
        this.invalidTripType = false;
      }
    });
    return !this.invalidTripType && !this.invalidMinutes;
  }

  async startTrip() {
    if (!this.isValid()) {
      return;
    } else {
      const loggedInUser = await this.loginService.getLoggedInUser();
      if (loggedInUser && loggedInUser.isLoggedIn) {
        this.isLoading = true;
        this.tripDto.ObserverGuid = loggedInUser.user.Guid;
        this.tripDto.GeoHazardID = GeoHazard.Snow;
        this.tripDto.DeviceGuid = GuidHelper.createGuid();
        try {
          const currentLocation = await this.geoLocation.getCurrentPosition(settings.gps.currentPositionOptions);
          if (currentLocation) {
            this.tripDto.Lat = currentLocation.coords.latitude.toString();
            this.tripDto.Lng = currentLocation.coords.longitude.toString();
          }
        } catch (error) {
          console.warn('[Warning][LegacyTrip] Could not get geolocation!', error);
        }
        this.tripLoggerService.startLegacyTrip(this.tripDto).subscribe(() => {
          this.ngZone.run(() => {
            this.isLoading = false;
            this.navController.navigateRoot('/');
          });
        }, (error) => {
          console.error('[ERROR][LegacyTrip] Could not start trip!', error);
          this.ngZone.run(() => {
            this.isLoading = false;
            this.tripLoggerService.showTripErrorMessage(true);
          });
        });
      }
    }
  }

  async stopTrip() {
    await this.tripLoggerService.stopLegacyTrip();
  }



  async showHelp() {
    const translation = await this.translateService.get('TRIP.LEGACY_HELP_TEXT').toPromise();
    const modal = await this.modalController.create({
      component: HelpModalPage,
      componentProps: {
        helpText: translation,
      },
    });
    modal.present();
  }

  clearPage() {
    this.tripDto = {};
  }
}
