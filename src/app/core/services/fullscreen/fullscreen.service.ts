import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  _isFullscreen = false;

  _subject: Subject<boolean>;

  get isFullscreen$() {
    return this._subject.asObservable().pipe(shareReplay(1));
  }

  constructor(private statusBar: StatusBar) {
    this._subject = new Subject<boolean>();
    this._subject.next(this._isFullscreen);
  }

  toggleFullscreen() {
    this._isFullscreen = !this._isFullscreen;
    this._subject.next(this._isFullscreen);
    if (this._isFullscreen) {
      this.statusBar.styleDefault();
    } else {
      this.statusBar.styleBlackTranslucent();
    }
  }
}
