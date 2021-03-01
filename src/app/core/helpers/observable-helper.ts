import { Observable, Subject } from 'rxjs';
import { NgZone, OnDestroy, Injectable } from '@angular/core';

export function toPromiseWithCancel<T>(
  observable: Observable<T>,
  cancel?: Promise<void>
) {
  return new Promise<T>((resolve, reject) => {
    const subscription = observable.subscribe(
      (result) => {
        subscription.unsubscribe();
        resolve(result);
      },
      (error) => {
        subscription.unsubscribe();
        reject(error);
      }
    );
    if (cancel) {
      cancel.then(() => {
        subscription.unsubscribe();
        reject(new Error('Cancelled'));
      });
    }
  });
}

export function enterZone(zone: NgZone) {
  return <T>(source: Observable<T>) =>
    new Observable<T>((observer) =>
      source.subscribe({
        next: (x) => zone.run(() => observer.next(x)),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      })
    );
}

export function setObservableTimeout() {
  return <T>(source: Observable<T>) =>
    new Observable<T>((observer) =>
      source.subscribe({
        next: (x) => setTimeout(() => observer.next(x)),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      })
    );
}

@Injectable()
export class NgDestoryBase implements OnDestroy {
  protected readonly ngDestroy$: Subject<void>;
  constructor() {
    this.ngDestroy$ = new Subject();
  }
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
