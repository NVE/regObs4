import {
  IonToolbar,
  IonGrid,
  IonContent,
  IonBackButton,
  IonRow,
  IonFab,
  IonCol,
  IonTitle,
  IonFabButton,
  IonHeader,
  IonButtons,
} from '@ionic/angular/standalone';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation/background-geolocation.service';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { TripLogState } from '../../core/services/trip-logger/trip-log-state.enum';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { TripLogSummaryComponent } from '../../components/trip-log-summary/trip-log-summary.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-log',
  templateUrl: './trip-log.page.html',
  styleUrls: ['./trip-log.page.scss'],
  imports: [
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonRow,
    IonTitle,
    IonToolbar,
    NgIf,
    TranslatePipe,
    TripLogSummaryComponent,
  ],
})
export class TripLogPage implements OnInit, OnDestroy {
  state: TripLogState = TripLogState.NotStarted;
  private subscription: Subscription;

  constructor(
    private backgroundGeolocationService: BackgroundGeolocationService,
    private tripLoggerService: TripLoggerService
  ) {}

  async ngOnInit() {
    this.subscription = this.tripLoggerService.getTripLogStateAsObservable().subscribe((activity) => {
      this.state = activity.state;
    });
  }

  async startTrip() {
    return this.backgroundGeolocationService.start();
  }

  async pauseTrip() {
    return this.backgroundGeolocationService.stop();
  }

  async completeTrip() {
    // await this.tripLoggerService.updateState(TripLogState.Stopped);
    // this.state = TripLogState.Stopped;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
