import { Directive, OnInit, OnDestroy, HostBinding, NgZone, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppMode } from 'src/app/modules/common-core/models';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Directive({ selector: '[appHeaderColor]' })
export class HeaderColorDirective implements OnInit, OnDestroy {
  private userSettingService = inject(UserSettingService);
  private ngZone = inject(NgZone);

  private appMode: AppMode;
  private subscription: Subscription;

  @HostBinding('class')
  get elementClass(): string {
    return `hydrated app-header-color ${this.appMode ? this.appMode.toLowerCase() : ''}`;
  }

  ngOnInit(): void {
    this.subscription = this.userSettingService.appMode$.subscribe((appMode) => {
      this.ngZone.run(() => {
        this.appMode = appMode;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
