import { Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

export class FakeTranslateLoader implements TranslateLoader {
  getTranslation(): Observable<any> {
    return of({});
  }
}
