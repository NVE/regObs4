import { InjectionToken } from '@angular/core';

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<IRegistrationModuleOptions>('forRoot() Module configuration');

export interface IRegistrationModuleOptions {
  adapter?: string;
  autoSync?: boolean;
  attachmentsSupported?: boolean;
}