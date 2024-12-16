import { IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { Component, OnDestroy, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonFab, IonFabButton, IonIcon, NgClass],
})
export class GpsCenterComponent implements OnDestroy, AfterContentInit {
  followMode: boolean;

  private subscription: Subscription;

  constructor(private mapService: MapService, private cdRef: ChangeDetectorRef) {
    addIcons({ locate });
  }

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
