import { Directive, OnInit, OnDestroy, HostBinding, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AppMode } from '../../../../core/models/app-mode.enum';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Directive({
  selector: '[appHeaderColor]'
})
export class HeaderColorDirective implements OnInit, OnDestroy {

  private appMode: AppMode;
  private subscription: Subscription;

  @HostBinding('class')
  get elementClass(): string {
    return `hydrated app-header-color ${(this.appMode ? this.appMode.toLowerCase() : '')}`;
  }

  constructor(private userSettingService: UserSettingService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.subscription = this.userSettingService.appMode$
      .subscribe((appMode) => {
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
