import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'ionic-appauth';

export function initDeepLinks(
  platform: Platform,
  ngZone: NgZone,
  authService: AuthService,
  navController: NavController,
  router: Router
) {
  return () => {
    if (platform.is('cordova')) {
      (window as any).handleOpenURL = (callbackUrl: string) => {
        ngZone.run(() => {
          if (callbackUrl.indexOf('regobs://callback') >= 0) {
            authService.authorizationCallback(callbackUrl);
          } else {
            const deepLinkRoute = router.createUrlTree([
              callbackUrl.replace('regobs://', '')
            ]);
            navController.navigateForward(deepLinkRoute);
          }
        });
      };
    }
  };
}
