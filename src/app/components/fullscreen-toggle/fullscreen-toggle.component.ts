import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss']
})
export class FullscreenToggleComponent implements OnInit {

  private _fullscreen: boolean;
  private _isFullscreen: Subject<boolean>;

  get isFullscreen(): Observable<boolean> {
    return this._isFullscreen.asObservable();
  }

  constructor(private statusBar: StatusBar) {
    this._isFullscreen = new Subject();
  }

  ngOnInit() {
  }

  toggleFullscreen() {
    this._fullscreen = !this._fullscreen;
    if (this._fullscreen) {
      this.statusBar.styleDefault();
    } else {
      this.statusBar.styleBlackTranslucent();
    }
    this._isFullscreen.next(this._fullscreen);
  }
}
