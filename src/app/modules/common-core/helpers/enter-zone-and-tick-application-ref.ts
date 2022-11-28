import { ApplicationRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { enterZone } from './enter-zone';
import { tickApplicationRef } from './tick-application-ref';

export function enterZoneAndTickApplicationRef<T>(ngZone: NgZone, applicationRef: ApplicationRef): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => source.pipe(enterZone(ngZone), tickApplicationRef(applicationRef));
}
