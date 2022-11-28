import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { StatusBar } from '@capacitor/status-bar';
import { NgDestoryBase } from '../../helpers/observable-helper';
import { Platform } from '@ionic/angular';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'FullscreenService';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService extends NgDestoryBase {
  private readonly _subject: BehaviorSubject<boolean>;

  get isFullscreen$() {
    return this._subject.asObservable();
  }

  constructor(
    private platform: Platform,
    private logger: LoggingService) {

    super();
    this._subject = new BehaviorSubject(false);

    if (isAndroidOrIos(this.platform)) {
      StatusBar.setOverlaysWebView({overlay: true});
      this.platform.ready().then(() => {
        this.isFullscreen$.pipe(
          takeUntil(this.ngDestroy$),
          switchMap((isFullscreenRequested) =>  {
            if (isFullscreenRequested) {
              return of(this.turnFullscreenOn());
            } else {
              return of(this.turnFullscreenOff());
            }
          }),
          catchError((err) => this.logger.error(err, DEBUG_TAG, 'Fullscreen toggle error'))
        ).subscribe();
      });
    }
  }

  toggleFullscreen() {
    this._subject.next(!this._subject.value);
  }

  private async turnFullscreenOn(): Promise<void> {
    await StatusBar.setOverlaysWebView({overlay: true});
    await StatusBar.hide();
  }

  private async turnFullscreenOff() {
    await StatusBar.setOverlaysWebView({overlay: false});
    await StatusBar.show();
  }
}
