import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular/standalone';
import { AuthService } from 'ionic-appauth';
import { App } from '@capacitor/app';

export function initDeepLinks(
  platform: Platform,
  authService: AuthService,
  navController: NavController,
  router: Router
) {
  return () => {
    if (platform.is('hybrid')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      App.addListener('appUrlOpen', (data: any) => {
        if (data?.url.indexOf('regobs://callback') >= 0) {
          authService.authorizationCallback(data.url);
        } else {
          const deepLinkRoute = router.createUrlTree([data?.url.replace('regobs://', '')]);
          navController.navigateForward(deepLinkRoute);
        }
      });
    }
  };
}
