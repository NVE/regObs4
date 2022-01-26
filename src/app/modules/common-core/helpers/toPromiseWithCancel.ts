import { Observable } from 'rxjs';

export function toPromiseWithCancel<T>(observable: Observable<T>, cancel?: Promise<unknown>): Promise<T> {
  const p = new Promise<T>((resolve, reject) => {
    const subscription = observable
      .subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    if (cancel) {
      cancel.then(() => {
        subscription.unsubscribe();
        reject(new Error('Cancelled'));
      });
    }
  });
  return p;
}
