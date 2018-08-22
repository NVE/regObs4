import { Component, OnInit } from '@angular/core';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation/background-geolocation.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.page.html',
  styleUrls: ['./new-trip.page.scss'],
})
export class NewTripPage implements OnInit {

  isRunning = false;

  constructor(private backgroundGeolocationService: BackgroundGeolocationService) { }

  async ngOnInit() {
    this.isRunning = await this.backgroundGeolocationService.isRunning();
  }

  startTrip() {
    this.isRunning = true;
    this.backgroundGeolocationService.start();
  }

  stopTrip() {
    this.isRunning = false;
    this.backgroundGeolocationService.stop();
    // const locations = await this.backgroundGeolocationService.getLocations();
    // console.log(locations);
  }

}
