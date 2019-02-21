import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  _isFullscreen = false;

  _subject: BehaviorSubject<boolean>;

  get isFullscreen$() {
    return this._subject.asObservable().pipe(shareReplay(1));
  }

  constructor(private statusBar: StatusBar) {
    this._subject = new BehaviorSubject(false);
    this.isFullscreen$.subscribe((val) => {
      this._isFullscreen = val;
      if (val) {
        this.statusBar.styleDefault();
      } else {
        this.statusBar.styleBlackTranslucent();
      }
    });
  }

  toggleFullscreen() {
    this._subject.next(!this._isFullscreen);
  }
}
