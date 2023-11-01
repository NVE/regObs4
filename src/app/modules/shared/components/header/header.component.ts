import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { TripLoggerService } from '../../../../core/services/trip-logger/trip-logger.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { AppMode } from 'src/app/modules/common-core/models';
import { SIZE_TO_MEDIA } from '@ionic/core/dist/collection/utils/media';
import { BreakpointService } from '../../../../core/services/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() showMenuButton = true;
  @Input() showFilterButton = true;
  @Input() fullscreenSupport = false;
  @Input() title: string;
  @Input() defaultHref = '/';

  tripRunning = false;
  private appMode = AppMode.Prod;

  isFullscreen$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  splitPaneClosed = true;
  isDesktop: boolean;

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
    private breakpointService: BreakpointService
  ) {}

  ngOnInit() {
    this.isFullscreen$ = this.fullscreenService.isFullscreen$;
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.subscriptions.push(
      this.tripLoggerService.isTripRunning$.subscribe((val) => {
        this.ngZone.run(() => {
          this.tripRunning = val;
        });
      })
    );
    this.subscriptions.push(
      this.userSettingService.appMode$.subscribe((appMode) => {
        this.ngZone.run(() => {
          this.appMode = appMode;
        });
      })
    );
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
