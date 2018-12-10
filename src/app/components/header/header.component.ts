import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { Observable, Subscription } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { AppMode } from '../../core/models/app-mode.enum';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() showMenuButton = true;
  @Input() title: string;
  @Input() defaultHref = '/';

  tripRunning = false;
  private appMode = AppMode.Prod;

  isFullscreen$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  get tripRunning$() {
    return this.tripLoggerService.getLegacyTripAsObservable();
  }

  get headerColor() {
    if (this.tripRunning) {
      return 'trip-running';
    } else {
      return this.appMode.toLowerCase();
    }
  }

  constructor(
    private fullscreenService: FullscreenService,
    private tripLoggerService: TripLoggerService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone,
  ) {

  }

  ngOnInit() {
    this.isFullscreen$ = this.fullscreenService.isFullscreen$;
    this.subscriptions.push(this.tripLoggerService.isTripRunning$.subscribe((val) => {
      this.ngZone.run(() => {
        this.tripRunning = val;
      });
    }));
    this.subscriptions.push(this.userSettingService.userSettingObservable$
      .pipe(
        map((val) => val.appMode),
        distinctUntilChanged())
      .subscribe((appMode) => {
        this.ngZone.run(() => {
          this.appMode = appMode;
        });
      }));
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  endTrip() {
    this.tripLoggerService.stopLegacyTrip();
  }
}
