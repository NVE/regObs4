import { InjectionToken } from '@angular/core';
import { ISummaryProvider } from './services/summary-providers/summary-provider.interface';

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<IRegistrationModuleOptions>('forRoot() Module configuration');
export const SUMMARY_PROVIDER_TOKEN = new InjectionToken<ISummaryProvider>('Registration summary provider token');

export interface IRegistrationModuleOptions {
  adapter?: string;
  autoSync?: boolean;
  attachmentsSupported?: boolean;
}