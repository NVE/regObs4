import { ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tickApplicationRef<T>(applicationRef: ApplicationRef): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => source.pipe(tap(() => applicationRef.tick()));
}
