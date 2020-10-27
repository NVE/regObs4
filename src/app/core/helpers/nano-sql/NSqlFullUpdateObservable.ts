import { InanoSQLObserverQuery } from '@nano-sql/core/lib/interfaces';
import { Observable } from 'rxjs';

export class NSqlFullUpdateObservable<T> extends Observable<T> {
  constructor(query: InanoSQLObserverQuery) {
    super((observer) => {
      query.exec((val, err) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(val as unknown as T);
        }
      });
      return () => query.unsubscribe();
    });
  }
}
