import { Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

export class FakeTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}
