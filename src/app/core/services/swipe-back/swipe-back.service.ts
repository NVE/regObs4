import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwipeBackService {

  private _subject: Subject<boolean>;

  swipeBackEnabled$: Observable<boolean>;

  constructor() {
    this._subject = new Subject<boolean>();
    this.swipeBackEnabled$ = this._subject.asObservable().pipe(shareReplay(1));
    this._subject.next(true);
  }

  enableSwipeBack() {
    this._subject.next(true);
  }

  disableSwipeBack() {
    this._subject.next(false);
  }
}
