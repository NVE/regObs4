import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BasePage } from './base.page';

@Injectable()
export class CanDeactivateRouteGuard implements CanDeactivate<BasePage> {
  async canDeactivate(component: BasePage): Promise<boolean> {
    return component.canLeave();
  }
}
