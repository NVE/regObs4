import { InjectionToken } from '@angular/core';
import { AppMode } from './app-mode.enum';
import { LangKey } from './lang-key.enum';

export interface AppConfig {
    appMode: AppMode;
    language: LangKey;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const DEFAULT_APP_CONFIG: AppConfig = {
  appMode: AppMode.Prod,
  language: LangKey.nb,
};