import { Observer } from 'nano-sql/lib/observable';
import { Observable } from 'rxjs/Observable';

declare module 'nano-sql/lib/observable' {
    interface Observer<T> {
        toRxJS(this: Observer<T>): Observable<T>;
    }
}

function toRxJS<T>(this: Observer<T>): Observable<T> {
    return Observable.create((observer) => {
        const subscription = this.subscribe((val) => {
            observer.next(val);
        });
        return () => subscription.unsubscribe();
    });
}

Observer.prototype.toRxJS = toRxJS;
