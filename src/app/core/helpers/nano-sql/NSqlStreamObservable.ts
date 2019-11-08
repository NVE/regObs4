import { InanoSQLObserverQuery } from '@nano-sql/core/lib/interfaces';
import { Observable } from 'rxjs';

export class NSqlStreamObservable<T> extends Observable<T> {
    constructor(query: InanoSQLObserverQuery) {
        super((observer) => {
            query.stream(
                (row: T) => observer.next(row),
                () => observer.complete(),
                (err) => observer.error(err)
            );
            return () => query.unsubscribe();
        });
    }
}
