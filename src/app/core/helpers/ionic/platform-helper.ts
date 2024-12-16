import { Platform } from '@ionic/angular/standalone';

export function isAndroidOrIos(platform: Platform): boolean {
  return platform.is('hybrid') && (platform.is('android') || platform.is('ios'));
}
