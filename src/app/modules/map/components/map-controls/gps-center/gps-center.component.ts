import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GpsCenterComponent implements OnInit, OnDestroy, AfterContentInit {

  followMode: boolean;

  private subscription: Subscription;

  constructor(private mapService: MapService, private cdRef: ChangeDetectorRef) { }

  ngAfterContentInit(): void {
    this.subscription = this.mapService.followMode$.subscribe((val) => {
      this.followMode = val;
      this.cdRef.detectChanges();
    });
    this.cdRef.detectChanges();
  }

  ngOnInit() {
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
