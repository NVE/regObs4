import { Component, OnInit } from '@angular/core';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.page.html',
  styleUrls: ['./new-trip.page.scss'],
})
export class NewTripPage implements OnInit {

  constructor(private tripLoggerService: TripLoggerService) { }

  ngOnInit() {
  }

  startNewTrip() {
    this.tripLoggerService.createNewTrip();
  }

}
