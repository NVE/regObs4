import { Observable } from 'rxjs/Observable';
import { InanoSQLObserverQuery } from '@nano-sql/core/lib/interfaces';

// declare module '@nano-sql/core/lib/interfaces' {
//     interface InanoSQLObserverQuery {
//         toRxJS<T>(this: InanoSQLObserverQuery): Observable<T>;
//     }
// }

export class NanoSqlObservableHelper {
    static toRxJS<T>(query: InanoSQLObserverQuery): Observable<T> {
        return Observable.create((observer) => {
            query.exec((val, err) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(val);
                }
            });
            return () => query.unsubscribe();
        });
    }
}

// InanoSQLObserverQuery.prototype.toRxJS = toRxJS;
