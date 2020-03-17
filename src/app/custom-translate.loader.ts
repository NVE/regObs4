import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

export function initTranslateService(translateService: TranslateService) {
  return () => {
    translateService.addLangs(['nb', 'en']);
    translateService.setDefaultLang('nb');
  };
}

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`));
  }
}