import {
  CanActivate,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSettingService } from '../services/user-setting/user-setting.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutObservationsPopupGuard implements CanActivate {
  constructor(private userSettingService: UserSettingService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userSettingService.userSetting$.pipe(
      tap((us) => {}),
      map((us) => true)
    );
  }

  showPopupInfoIfNotShown() {}
}
