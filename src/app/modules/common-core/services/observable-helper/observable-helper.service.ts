import { ApplicationRef, NgZone } from '@angular/core';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enterZone, tickApplicationRef } from '../../helpers';
import { enterZoneAndTickApplicationRef } from '../../helpers/enter-zone-and-tick-application-ref';

@Injectable({
  providedIn: 'root'
})
export class ObservableHelperService {

  constructor(private ngZone: NgZone, private applicationRef: ApplicationRef) {
  }

  enterZone<T>(): (source: Observable<T>) => Observable<T> {
    return enterZone(this.ngZone);
  }

  tick<T>(): (source: Observable<T>) => Observable<T> {
    return tickApplicationRef(this.applicationRef);
  }

  enterZoneAndTickApplicationRef<T>(): (source: Observable<T>) => Observable<T> {
    return enterZoneAndTickApplicationRef(this.ngZone, this.applicationRef);
  }

}
