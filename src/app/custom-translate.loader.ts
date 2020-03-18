import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';
import { settings } from '../settings';
import { UserSettingService } from './core/services/user-setting/user-setting.service';

export function initTranslateService(translateService: TranslateService, userSettingService: UserSettingService) {
  return () => {
    translateService.addLangs(settings.language.supportedLanguages.map((l) => l.lang));
    translateService.setDefaultLang(settings.language.fallbackLang);
    userSettingService.init();
  };
}

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`));
  }
}