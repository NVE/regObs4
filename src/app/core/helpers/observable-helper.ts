import { Observable, Subject, Subscription } from 'rxjs';
import { NgZone, OnDestroy, Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

export function toPromiseWithCancel<T>(observable: Observable<T>, cancel?: Promise<void>, timeoutInMs?: number) {
  return new Promise<T>((resolve, reject) => {
    let subscription: Subscription = undefined;
    subscription = (timeoutInMs != null ? observable.pipe(timeout(timeoutInMs)) : observable).subscribe({
      next: (result) => {
        if (subscription) {
          subscription.unsubscribe();
        }
        resolve(result);
      },
      error: (error) => {
        if (subscription) {
          subscription.unsubscribe();
        }
        reject(error);
      },
    });
    if (cancel) {
      cancel.then(() => {
        if (subscription) {
          subscription.unsubscribe();
        }
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
        complete: () => observer.complete(),
      })
    );
}

export function setObservableTimeout() {
  return <T>(source: Observable<T>) =>
    new Observable<T>((observer) =>
      source.subscribe({
        next: (x) => setTimeout(() => observer.next(x)),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
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
