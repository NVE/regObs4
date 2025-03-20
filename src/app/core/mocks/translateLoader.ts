import { Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

export class FakeTranslateLoader implements TranslateLoader {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(): Observable<any> {
    return of({});
  }
}
