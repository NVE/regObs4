import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

export const desktopBlockGuard: CanActivateFn = () => {
  const router = inject(Router); // Inject the Router service

  if (!Capacitor.isNativePlatform()) {
    router.navigate(['/']); // Redirect to the root route if not on a native platform
    return false; // Block navigation
  }
  return true; // Allow navigation
};
