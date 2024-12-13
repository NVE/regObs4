import { Component, OnDestroy, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, NgClass],
})
export class GpsCenterComponent implements OnDestroy, AfterContentInit {
  followMode: boolean;

  private subscription: Subscription;

  constructor(private mapService: MapService, private cdRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.subscription = this.mapService.followMode$.subscribe((val) => {
      this.followMode = val;
      this.cdRef.detectChanges();
    });
    this.cdRef.detectChanges();
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
