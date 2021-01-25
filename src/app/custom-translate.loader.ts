import { TranslateService } from '@ngx-translate/core';
import { settings } from '../settings';
import { UserSettingService } from './core/services/user-setting/user-setting.service';

export function initTranslateService(
  translateService: TranslateService,
  userSettingService: UserSettingService
): () => void {
  return () => {
    translateService.addLangs(
      settings.language.supportedLanguages.map((l) => l.lang)
    );
    translateService.setDefaultLang(settings.language.fallbackLang);
    userSettingService.init();
  };
}
