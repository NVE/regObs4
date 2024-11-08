import { BasePage } from './base.page';
import { CanDeactivateFn } from '@angular/router';

export const canDeactivateBasePageComponent: CanDeactivateFn<BasePage> = (component) => {
  return component.canLeave();
};
