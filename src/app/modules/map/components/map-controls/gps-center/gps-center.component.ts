import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss']
})
export class GpsCenterComponent implements OnInit, OnDestroy {
  followMode: boolean;

  private subscription: Subscription;

  constructor(private mapService: MapService, private ngZone: NgZone) { }

  ngOnInit() {
    this.subscription = this.mapService.followMode$.subscribe((val) => {
      this.ngZone.run(() => {
        this.followMode = val;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  centerMapToUser() {
    this.mapService.centerMapToUser();
  }

}
