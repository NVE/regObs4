import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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

  constructor(private statusBar: StatusBar, private platform: Platform) {
    super();
    this._subject = new BehaviorSubject(false);
    if (isAndroidOrIos(this.platform)) {
      this.platform.ready().then(() => {
        this.isFullscreen$.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
          if (val) {
            this.statusBar.hide();
          } else {
            this.statusBar.show();
          }
        });
      });
    }
  }

  toggleFullscreen() {
    this._subject.next(!this._subject.value);
  }
}
