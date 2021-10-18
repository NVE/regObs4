import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'ionic-appauth';
import { App } from '@capacitor/app';

export function initDeepLinks(
  platform: Platform,
  ngZone: NgZone,
  authService: AuthService,
  navController: NavController,
  router: Router
) {
  return () => {
    if (platform.is('hybrid')) {
      App.addListener('appUrlOpen', (data: any) => {
        ngZone.run(() => {
          if (data?.url.indexOf('regobs://callback') >= 0) {
            authService.authorizationCallback(data.url);
          } else {
            const deepLinkRoute = router.createUrlTree([
              data?.url.replace('regobs://', '')
            ]);
            navController.navigateForward(deepLinkRoute);
          }
        });
      });
    }
  };
}
