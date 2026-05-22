import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

/**
 * Blocks navigation on native platforms by redirecting to the root route.
 * Use for pages that should only be available on web/desktop.
 */
export const nativeBlockGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (Capacitor.isNativePlatform()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
