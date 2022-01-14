import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { StatusBar } from '@capacitor/status-bar';
import { NgDestoryBase } from '../../helpers/observable-helper';
import { Platform } from '@ionic/angular';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService extends NgDestoryBase {
  private readonly _subject: BehaviorSubject<boolean>;

  get isFullscreen$() {
    return this._subject.asObservable();
  }

  constructor(private platform: Platform) {
    super();
    this._subject = new BehaviorSubject(false);
    if (isAndroidOrIos(this.platform)) {
      this.platform.ready().then(() => {
        this.isFullscreen$.pipe(
          switchMap((isFullscreen) => from(isFullscreen ? StatusBar.hide() : StatusBar.show())),
          takeUntil(this.ngDestroy$)
        ).subscribe();
      });
    }
  }

  toggleFullscreen() {
    this._subject.next(!this._subject.value);
  }
}
