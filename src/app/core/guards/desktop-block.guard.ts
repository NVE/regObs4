import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class DesktopBlockGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!Capacitor.isNativePlatform()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
